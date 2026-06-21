import { useState, useCallback, useRef } from "react";
import { verses, type Verse } from "@/lib/verses";

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

function pickBlankedIndices(
  words: string[],
  keywords: string[],
  round: number,
  totalRounds: number
): Set<number> {
  const blanked = new Set<number>();
  const keywordLower = keywords.map((k) => k.toLowerCase());

  if (round === totalRounds) {
    words.forEach((_, i) => blanked.add(i));
    return blanked;
  }

  const keywordIndices: number[] = [];
  const nonKeywordIndices: number[] = [];

  words.forEach((w, i) => {
    const stripped = w.replace(/[^a-zA-Z']/g, "").toLowerCase();
    if (keywordLower.includes(stripped)) {
      keywordIndices.push(i);
    } else {
      nonKeywordIndices.push(i);
    }
  });

  if (round === 1) {
    keywordIndices.forEach((i) => blanked.add(i));
  } else if (round === 2) {
    keywordIndices.forEach((i) => blanked.add(i));
    const extra = Math.ceil(nonKeywordIndices.length * 0.5);
    const shuffled = [...nonKeywordIndices].sort(() => Math.random() - 0.5);
    shuffled.slice(0, extra).forEach((i) => blanked.add(i));
  } else if (round === 3) {
    keywordIndices.forEach((i) => blanked.add(i));
    const extra = Math.ceil(nonKeywordIndices.length * 0.85);
    const shuffled = [...nonKeywordIndices].sort(() => Math.random() - 0.5);
    shuffled.slice(0, extra).forEach((i) => blanked.add(i));
  }

  return blanked;
}

function normalize(s: string): string {
  return s.replace(/[^a-zA-Z0-9']/g, "").toLowerCase();
}

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
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

  const totalRounds = 4;

  const pickNextVerse = useCallback((): Verse | null => {
    if (orderRef.current.length === 0) {
      const remaining = verses.filter((v) => !completedVerseIds.has(v.id));
      if (remaining.length === 0) return null;
      orderRef.current = shuffleArray(remaining.map((v) => v.id));
    }
    const nextId = orderRef.current.shift()!;
    return verses.find((v) => v.id === nextId) ?? null;
  }, [completedVerseIds]);

  const buildFillRound = useCallback(
    (verse: Verse, round: number): FillRoundState => {
      const words = tokenize(verse.text);
      const blankedSet = pickBlankedIndices(
        words,
        verse.keywords,
        round,
        totalRounds
      );

      const slots: WordSlot[] = words.map((word, i) => ({
        index: i,
        word,
        blanked: blankedSet.has(i),
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
    orderRef.current = shuffleArray(verses.map((v) => v.id));
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
    if (fillRound.round < totalRounds) {
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
  };
}
