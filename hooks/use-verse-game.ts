import { useState, useCallback } from "react";
import { verses, type Verse } from "@/lib/verses";
import { recordVerseProgress } from "@/lib/progress";

export type GamePhase = "reading" | "fill";

export interface WordSlot {
  index: number;
  word: string;
  blanked: boolean;
  userInput: string;
  status: "pending" | "correct" | "incorrect";
}

export interface FillRoundState {
  round: number;
  totalRounds: number;
  slots: WordSlot[];
  activeBlankIndex: number;
  submitted: boolean;
  allCorrect: boolean;
}

function tokenize(text: string): string[] {
  return text.split(/\s+/).filter(Boolean);
}

// Tokenizes the reference and keeps the chapter:verse colon as its own token
// so it can always be shown (never blanked). e.g. "Psalm 51:17" ->
// ["(Psalm", "51", ":", "17)"]
function tokenizeReference(reference: string): string[] {
  return tokenize(`(${reference})`).flatMap((w) =>
    w.split(/(:)/).filter(Boolean)
  );
}

function hasAlphaNum(word: string): boolean {
  return /[a-zA-Z0-9]/.test(word);
}

// Gradual, capped schedule of how many words are blanked each round.
// Starts small and grows slowly; the final round always blanks the whole verse.
function buildBlankSchedule(totalWords: number): number[] {
  const base = [3, 5, 8, 12, 18];
  const targets = base.filter((n) => n < totalWords);
  targets.push(totalWords);
  return Array.from(new Set(targets)).sort((a, b) => a - b);
}

// Deterministic PRNG so the random blank order stays stable across a verse's
// rounds (otherwise later rounds wouldn't be supersets of earlier ones).
function mulberry32(seed: number): () => number {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function seededShuffle<T>(array: T[], rand: () => number): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Returns the indices to blank for a given target count. Keywords are
// prioritized, then the remaining words, but within each group the order is
// randomized (seeded per-verse) so blanks appear at random positions while
// each round remains a superset of the previous one.
function pickBlankedIndices(
  words: string[],
  keywords: string[],
  targetCount: number,
  seed: number
): Set<number> {
  const keywordLower = keywords.map((k) => k.toLowerCase());

  const blankable = words
    .map((w, i) => ({ w, i }))
    .filter(({ w }) => hasAlphaNum(w));

  if (targetCount >= blankable.length) {
    return new Set(blankable.map(({ i }) => i));
  }

  const keywordIndices: number[] = [];
  const nonKeywordIndices: number[] = [];

  blankable.forEach(({ w, i }) => {
    const stripped = w.replace(/[^a-zA-Z0-9']/g, "").toLowerCase();
    if (keywordLower.includes(stripped)) {
      keywordIndices.push(i);
    } else {
      nonKeywordIndices.push(i);
    }
  });

  const rand = mulberry32(seed);
  const ordered = [
    ...seededShuffle(keywordIndices, rand),
    ...seededShuffle(nonKeywordIndices, rand),
  ];
  return new Set(ordered.slice(0, targetCount));
}

// Total number of fill-in-the-blank rounds for a verse (same calculation the
// game uses), so the progress page can show "rounds completed / total".
export function getVerseTotalRounds(verse: Verse): number {
  const words = [...tokenize(verse.text), ...tokenizeReference(verse.reference)];
  const blankableCount = words.filter(hasAlphaNum).length;
  return buildBlankSchedule(blankableCount).length;
}

// Answers are compared on letters/digits only, so the user never has to type
// punctuation (apostrophes, hyphens, etc.) that appears in the verse.
function normalize(s: string): string {
  return s.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
}

// Verses always play in fixed (id) order.
const orderedVerses = [...verses].sort((a, b) => a.id - b.id);

export function useVerseGame() {
  const [completedVerseIds, setCompletedVerseIds] = useState<Set<number>>(
    () => new Set()
  );
  const [currentVerse, setCurrentVerse] = useState<Verse | null>(null);
  const [phase, setPhase] = useState<GamePhase>("reading");
  const [showVerseHint, setShowVerseHint] = useState(false);
  const [fillRound, setFillRound] = useState<FillRoundState | null>(null);
  const [gameComplete, setGameComplete] = useState(false);

  const buildFillRound = useCallback(
    (verse: Verse, round: number): FillRoundState => {
      const verseWords = tokenize(verse.text);
      const refWords = tokenizeReference(verse.reference);
      const words = [...verseWords, ...refWords];
      const refKeywords = refWords
        .map((w) => w.replace(/[^a-zA-Z0-9']/g, ""))
        .filter(Boolean);
      const allKeywords = [...verse.keywords, ...refKeywords];
      const blankableCount = words.filter(hasAlphaNum).length;
      const schedule = buildBlankSchedule(blankableCount);
      const totalRounds = schedule.length;
      const targetCount = schedule[Math.min(round, totalRounds) - 1];
      const blankedSet = pickBlankedIndices(
        words,
        allKeywords,
        targetCount,
        verse.id
      );

      const slots: WordSlot[] = words.map((word, i) => ({
        index: i,
        word,
        blanked: blankedSet.has(i) && hasAlphaNum(word),
        userInput: "",
        status: "pending" as const,
      }));

      const firstBlankIdx = slots.findIndex((s) => s.blanked);

      return {
        round,
        totalRounds,
        slots,
        activeBlankIndex: firstBlankIdx >= 0 ? firstBlankIdx : 0,
        submitted: false,
        allCorrect: false,
      };
    },
    []
  );

  const startReading = useCallback(
    (verse: Verse) => {
      setCurrentVerse(verse);
      setPhase("reading");
      setShowVerseHint(false);
    },
    []
  );

  const startGame = useCallback(() => {
    setCompletedVerseIds(new Set());
    setGameComplete(false);
    startReading(orderedVerses[0]);
  }, [startReading]);

  const goHome = useCallback(() => {
    setGameComplete(false);
    setCurrentVerse(null);
    setFillRound(null);
    setPhase("reading");
    setShowVerseHint(false);
  }, []);

  const beginFill = useCallback(() => {
    if (currentVerse) {
      setPhase("fill");
      setShowVerseHint(false);
      setFillRound(buildFillRound(currentVerse, 1));
    }
  }, [currentVerse, buildFillRound]);

  const toggleVerseHint = useCallback(() => {
    setShowVerseHint((prev) => !prev);
  }, []);

  const updateBlankInput = useCallback(
    (slotIndex: number, value: string) => {
      setFillRound((prev) => {
        if (!prev) return prev;
        const newSlots = prev.slots.map((s) =>
          s.index === slotIndex ? { ...s, userInput: value, status: "pending" as const } : s
        );
        return { ...prev, slots: newSlots };
      });
    },
    []
  );

  const setActiveBlank = useCallback((slotIndex: number) => {
    setFillRound((prev) => {
      if (!prev) return prev;
      return { ...prev, activeBlankIndex: slotIndex };
    });
  }, []);

  const moveToNextBlank = useCallback(() => {
    setFillRound((prev) => {
      if (!prev) return prev;
      const blankedSlots = prev.slots.filter(
        (s) => s.blanked && s.status !== "correct"
      );
      const currentIdx = blankedSlots.findIndex(
        (s) => s.index === prev.activeBlankIndex
      );
      if (currentIdx < blankedSlots.length - 1) {
        return {
          ...prev,
          activeBlankIndex: blankedSlots[currentIdx + 1].index,
        };
      }
      return prev;
    });
  }, []);

  const moveToPrevBlank = useCallback(() => {
    setFillRound((prev) => {
      if (!prev) return prev;
      const blankedSlots = prev.slots.filter(
        (s) => s.blanked && s.status !== "correct"
      );
      const currentIdx = blankedSlots.findIndex(
        (s) => s.index === prev.activeBlankIndex
      );
      if (currentIdx > 0) {
        return {
          ...prev,
          activeBlankIndex: blankedSlots[currentIdx - 1].index,
        };
      }
      return prev;
    });
  }, []);

  const submitAnswers = useCallback(() => {
    setFillRound((prev) => {
      if (!prev) return prev;
      const newSlots = prev.slots.map((s) => {
        if (!s.blanked) return s;
        if (s.status === "correct") return s;
        const isCorrect = normalize(s.userInput) === normalize(s.word);
        return { ...s, status: isCorrect ? ("correct" as const) : ("incorrect" as const) };
      });

      const allCorrect = newSlots
        .filter((s) => s.blanked)
        .every((s) => s.status === "correct");

      const firstIncorrect = newSlots.find(
        (s) => s.blanked && s.status === "incorrect"
      );

      return {
        ...prev,
        slots: newSlots,
        submitted: true,
        allCorrect,
        activeBlankIndex: firstIncorrect
          ? firstIncorrect.index
          : prev.activeBlankIndex,
      };
    });
  }, []);

  const retryIncorrect = useCallback(() => {
    setFillRound((prev) => {
      if (!prev) return prev;
      const newSlots = prev.slots.map((s) => {
        if (s.status === "incorrect") {
          return { ...s, userInput: "", status: "pending" as const };
        }
        return s;
      });
      const firstPending = newSlots.find(
        (s) => s.blanked && s.status === "pending"
      );
      return {
        ...prev,
        slots: newSlots,
        submitted: false,
        allCorrect: false,
        activeBlankIndex: firstPending
          ? firstPending.index
          : prev.activeBlankIndex,
      };
    });
  }, []);

  const advanceRound = useCallback(() => {
    if (!currentVerse || !fillRound) return;
    recordVerseProgress(
      currentVerse.id,
      fillRound.round,
      fillRound.totalRounds
    );
    if (fillRound.round < fillRound.totalRounds) {
      setFillRound(buildFillRound(currentVerse, fillRound.round + 1));
    } else {
      setCompletedVerseIds((prev) => {
        const next = new Set(prev);
        next.add(currentVerse.id);
        return next;
      });

      const idx = orderedVerses.findIndex((v) => v.id === currentVerse.id);
      const next = orderedVerses[idx + 1];
      if (next) {
        startReading(next);
      } else {
        setGameComplete(true);
        setCurrentVerse(null);
        setFillRound(null);
      }
    }
  }, [currentVerse, fillRound, buildFillRound, startReading]);

  // Jump to the verse at the given offset (-1 prev, +1 next) in fixed order,
  // recording partial progress for the current verse first.
  const navigateRelative = useCallback(
    (offset: number) => {
      if (!currentVerse) return;
      if (fillRound) {
        recordVerseProgress(
          currentVerse.id,
          fillRound.round - 1,
          fillRound.totalRounds
        );
      }
      const idx = orderedVerses.findIndex((v) => v.id === currentVerse.id);
      const target = orderedVerses[idx + offset];
      if (target) startReading(target);
    },
    [currentVerse, fillRound, startReading]
  );

  // Jump directly to a specific verse by id, recording partial progress for
  // the current verse first (if mid-fill).
  const jumpToVerse = useCallback(
    (verseId: number) => {
      if (currentVerse && fillRound) {
        recordVerseProgress(
          currentVerse.id,
          fillRound.round - 1,
          fillRound.totalRounds
        );
      }
      const target = orderedVerses.find((v) => v.id === verseId);
      if (target) {
        setGameComplete(false);
        startReading(target);
      }
    },
    [currentVerse, fillRound, startReading]
  );

  const goToNextVerse = useCallback(
    () => navigateRelative(1),
    [navigateRelative]
  );
  const goToPrevVerse = useCallback(
    () => navigateRelative(-1),
    [navigateRelative]
  );

  const currentIndex = currentVerse
    ? orderedVerses.findIndex((v) => v.id === currentVerse.id)
    : -1;
  const canGoPrev = currentIndex > 0;
  const canGoNext = currentIndex >= 0 && currentIndex < orderedVerses.length - 1;

  return {
    currentVerse,
    phase,
    showVerseHint,
    fillRound,
    gameComplete,
    completedCount: completedVerseIds.size,
    totalVerses: verses.length,
    startGame,
    goHome,
    beginFill,
    toggleVerseHint,
    updateBlankInput,
    setActiveBlank,
    moveToNextBlank,
    moveToPrevBlank,
    submitAnswers,
    retryIncorrect,
    advanceRound,
    goToNextVerse,
    goToPrevVerse,
    jumpToVerse,
    restartGame: startGame,
    canGoPrev,
    canGoNext,
  };
}
