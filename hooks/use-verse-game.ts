import { useState, useCallback, useRef } from "react";
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

function normalize(s: string): string {
  return s.replace(/[^a-zA-Z0-9']/g, "").toLowerCase();
}

export function useVerseGame() {
  const [completedVerseIds, setCompletedVerseIds] = useState<Set<number>>(
    () => new Set()
  );
  const [currentVerse, setCurrentVerse] = useState<Verse | null>(null);
  const [phase, setPhase] = useState<GamePhase>("reading");
  const [showVerseHint, setShowVerseHint] = useState(false);
  const [fillRound, setFillRound] = useState<FillRoundState | null>(null);
  const [gameComplete, setGameComplete] = useState(false);

  const orderRef = useRef<number[]>([]);

  const pickNextVerse = useCallback((): Verse | null => {
    if (orderRef.current.length === 0) {
      const remaining = verses.filter((v) => !completedVerseIds.has(v.id));
      if (remaining.length === 0) return null;
      orderRef.current = remaining.map((v) => v.id).sort((a, b) => a - b);
    }
    const nextId = orderRef.current.shift()!;
    return verses.find((v) => v.id === nextId) ?? null;
  }, [completedVerseIds]);

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
    orderRef.current = verses.map((v) => v.id).sort((a, b) => a - b);
    const verse = verses.find((v) => v.id === orderRef.current.shift()!)!;
    startReading(verse);
  }, [startReading]);

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

      const remaining = verses.filter(
        (v) => !completedVerseIds.has(v.id) && v.id !== currentVerse.id
      );
      if (remaining.length === 0) {
        setGameComplete(true);
        setCurrentVerse(null);
        setFillRound(null);
      } else {
        const next = pickNextVerse();
        if (next) {
          startReading(next);
        } else {
          setGameComplete(true);
        }
      }
    }
  }, [
    currentVerse,
    fillRound,
    buildFillRound,
    completedVerseIds,
    pickNextVerse,
    startReading,
  ]);

  const goToNextVerse = useCallback(() => {
    if (!currentVerse) return;
    if (fillRound) {
      recordVerseProgress(
        currentVerse.id,
        fillRound.round - 1,
        fillRound.totalRounds
      );
    }
    const next = pickNextVerse();
    if (next) {
      startReading(next);
    } else {
      setGameComplete(true);
      setCurrentVerse(null);
      setFillRound(null);
    }
  }, [currentVerse, fillRound, pickNextVerse, startReading]);

  return {
    currentVerse,
    phase,
    showVerseHint,
    fillRound,
    gameComplete,
    completedCount: completedVerseIds.size,
    totalVerses: verses.length,
    startGame,
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
  };
}
