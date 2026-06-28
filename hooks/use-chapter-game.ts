import { useState, useCallback, useMemo } from "react";
import type { Chapter, ChapterVerse } from "@/lib/chapters";

export interface ChapterSlot {
  key: string;
  verseNumber: number;
  word: string;
  blanked: boolean;
  userInput: string;
  status: "pending" | "correct" | "incorrect";
}

export interface ChapterVerseSlots {
  number: number;
  slots: ChapterSlot[];
}

function tokenize(text: string): string[] {
  return text.split(/\s+/).filter(Boolean);
}

function stripWord(word: string): string {
  return word.replace(/[^a-zA-Z0-9']/g, "").toLowerCase();
}

function normalize(s: string): string {
  return s.replace(/[^a-zA-Z0-9']/g, "").toLowerCase();
}

function buildVerseSlots(verse: ChapterVerse): ChapterVerseSlots {
  const keywordSet = new Set(verse.keywords.map((k) => normalize(k)));
  const words = tokenize(verse.text);
  const slots: ChapterSlot[] = words.map((word, i) => {
    const blanked = keywordSet.has(stripWord(word));
    return {
      key: `v${verse.number}-w${i}`,
      verseNumber: verse.number,
      word,
      blanked,
      userInput: "",
      status: "pending" as const,
    };
  });
  return { number: verse.number, slots };
}

export function useChapterGame(chapter: Chapter) {
  const initial = useMemo(
    () => chapter.verses.map(buildVerseSlots),
    [chapter]
  );

  const [verseSlots, setVerseSlots] = useState<ChapterVerseSlots[]>(initial);
  const [submitted, setSubmitted] = useState(false);
  const [activeKey, setActiveKey] = useState<string | null>(null);

  // Flat, in-order list of blanked slot keys for keyboard navigation.
  const blankKeys = useMemo(
    () =>
      verseSlots.flatMap((v) =>
        v.slots.filter((s) => s.blanked).map((s) => s.key)
      ),
    [verseSlots]
  );

  const allCorrect = useMemo(
    () =>
      submitted &&
      verseSlots.every((v) =>
        v.slots.every((s) => !s.blanked || s.status === "correct")
      ),
    [submitted, verseSlots]
  );

  const updateInput = useCallback((key: string, value: string) => {
    setVerseSlots((prev) =>
      prev.map((v) => ({
        ...v,
        slots: v.slots.map((s) =>
          s.key === key ? { ...s, userInput: value, status: "pending" } : s
        ),
      }))
    );
  }, []);

  const setActive = useCallback((key: string) => setActiveKey(key), []);

  const moveBy = useCallback(
    (offset: number) => {
      setActiveKey((cur) => {
        if (blankKeys.length === 0) return cur;
        const idx = cur ? blankKeys.indexOf(cur) : -1;
        const next = (idx + offset + blankKeys.length) % blankKeys.length;
        return blankKeys[next];
      });
    },
    [blankKeys]
  );

  const moveNext = useCallback(() => moveBy(1), [moveBy]);
  const movePrev = useCallback(() => moveBy(-1), [moveBy]);

  const submit = useCallback(() => {
    setVerseSlots((prev) =>
      prev.map((v) => ({
        ...v,
        slots: v.slots.map((s) => {
          if (!s.blanked) return s;
          const correct = normalize(s.userInput) === normalize(s.word);
          return { ...s, status: correct ? "correct" : "incorrect" };
        }),
      }))
    );
    setSubmitted(true);
  }, []);

  const retry = useCallback(() => {
    setSubmitted(false);
    setVerseSlots((prev) =>
      prev.map((v) => ({
        ...v,
        slots: v.slots.map((s) =>
          s.status === "incorrect"
            ? { ...s, userInput: "", status: "pending" }
            : s
        ),
      }))
    );
    const firstIncorrect = verseSlots
      .flatMap((v) => v.slots)
      .find((s) => s.status === "incorrect");
    if (firstIncorrect) setActiveKey(firstIncorrect.key);
  }, [verseSlots]);

  const reset = useCallback(() => {
    setVerseSlots(initial);
    setSubmitted(false);
    setActiveKey(null);
  }, [initial]);

  return {
    verseSlots,
    submitted,
    allCorrect,
    activeKey,
    totalBlanks: blankKeys.length,
    updateInput,
    setActive,
    moveNext,
    movePrev,
    submit,
    retry,
    reset,
  };
}
