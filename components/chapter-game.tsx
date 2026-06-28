"use client";

import { useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Home, RotateCcw } from "lucide-react";
import { useChapterGame, type ChapterSlot } from "@/hooks/use-chapter-game";
import { chapters, type Chapter } from "@/lib/chapters";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

function BlankInput({
  slot,
  isActive,
  onFocus,
  onChange,
  onKeyDown,
  inputRef,
}: {
  slot: ChapterSlot;
  isActive: boolean;
  onFocus: () => void;
  onChange: (value: string) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  inputRef: (el: HTMLInputElement | null) => void;
}) {
  const strippedWord = slot.word.replace(/[^a-zA-Z0-9']/g, "");
  const charCount = strippedWord.length;
  const widthCh = Math.max(charCount, 2) + 1;

  let borderClass = "border-b-2 border-muted-foreground/25";
  if (slot.status === "correct") {
    borderClass = "border-b-2 border-green-500";
  } else if (slot.status === "incorrect") {
    borderClass = "border-b-2 border-red-500";
  } else if (isActive) {
    borderClass = "border-b-2 border-foreground";
  }

  const leadingPunct = slot.word.match(/^([^a-zA-Z0-9']*)/)?.[1] || "";
  const trailingPunct = slot.word.match(/([^a-zA-Z0-9']*)$/)?.[1] || "";

  return (
    <span className="inline-flex items-baseline">
      {leadingPunct && <span>{leadingPunct}</span>}
      <span className={`inline-flex items-baseline ${borderClass} mx-0.5`}>
        {slot.status === "correct" ? (
          <span
            className="text-green-600 dark:text-green-400 px-0.5"
            style={{ minWidth: `${widthCh}ch` }}
          >
            {strippedWord}
          </span>
        ) : (
          <input
            ref={inputRef}
            type="text"
            value={slot.userInput}
            onChange={(e) => onChange(e.target.value)}
            onFocus={onFocus}
            onKeyDown={onKeyDown}
            className={`bg-transparent outline-none px-0.5 ${
              slot.status === "incorrect"
                ? "text-red-600 dark:text-red-400"
                : "text-foreground"
            }`}
            style={{ width: `${widthCh}ch` }}
            autoComplete="off"
            autoCapitalize="off"
            spellCheck={false}
          />
        )}
      </span>
      {trailingPunct && <span>{trailingPunct}</span>}
    </span>
  );
}

export function ChapterGame({ chapter }: { chapter: Chapter }) {
  const {
    verseSlots,
    submitted,
    allCorrect,
    activeKey,
    totalBlanks,
    updateInput,
    setActive,
    moveNext,
    movePrev,
    submit,
    retry,
    reset,
  } = useChapterGame(chapter);

  const inputRefs = useRef<Map<string, HTMLInputElement>>(new Map());

  const setInputRef = useCallback(
    (key: string) => (el: HTMLInputElement | null) => {
      if (el) inputRefs.current.set(key, el);
      else inputRefs.current.delete(key);
    },
    []
  );

  useEffect(() => {
    if (activeKey) {
      inputRefs.current.get(activeKey)?.focus();
    }
  }, [activeKey]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Tab") {
        e.preventDefault();
        if (e.shiftKey) movePrev();
        else moveNext();
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (submitted && !allCorrect) retry();
        else if (!submitted) submit();
      } else if (e.key === " ") {
        e.preventDefault();
        moveNext();
      }
    },
    [moveNext, movePrev, submit, retry, submitted, allCorrect]
  );

  const index = chapters.findIndex((c) => c.slug === chapter.slug);
  const prev = index > 0 ? chapters[index - 1] : null;
  const next = index < chapters.length - 1 ? chapters[index + 1] : null;

  const correctCount = verseSlots
    .flatMap((v) => v.slots)
    .filter((s) => s.blanked && s.status === "correct").length;

  if (chapter.verses.length === 0) {
    return (
      <div className="flex flex-col items-center gap-4 py-16 text-center">
        <h2 className="text-xl font-semibold">{chapter.reference}</h2>
        <p className="text-muted-foreground max-w-sm">
          This chapter hasn&apos;t been added yet.
        </p>
        <Button asChild variant="outline">
          <Link href="/chapters">Back to chapters</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <p className="text-sm text-muted-foreground">Chapter</p>
          <h1 className="text-2xl font-semibold tracking-tight">
            {chapter.reference}
          </h1>
        </div>

        <div className="flex items-center gap-2">
          {submitted && (
            <Badge variant="secondary">
              {correctCount}/{totalBlanks} correct
            </Badge>
          )}
          <Button
            variant="ghost"
            size="icon"
            aria-label="Reset chapter"
            onClick={reset}
          >
            <RotateCcw />
          </Button>
          <Button variant="ghost" size="icon" aria-label="Home" asChild>
            <Link href="/">
              <Home />
            </Link>
          </Button>
        </div>
      </div>

      <Card>
        <CardContent>
          <p className="text-base leading-9 font-sans">
            {verseSlots.map((verse) => (
              <span key={verse.number}>
                <sup className="mr-1 text-xs font-semibold text-muted-foreground">
                  {verse.number}
                </sup>
                {verse.slots.map((slot, i) =>
                  slot.blanked ? (
                    <span key={slot.key}>
                      <BlankInput
                        slot={slot}
                        isActive={activeKey === slot.key}
                        onFocus={() => setActive(slot.key)}
                        onChange={(val) => updateInput(slot.key, val)}
                        onKeyDown={handleKeyDown}
                        inputRef={setInputRef(slot.key)}
                      />
                      {i < verse.slots.length - 1 ? " " : ""}
                    </span>
                  ) : (
                    <span key={slot.key}>
                      {slot.word}
                      {i < verse.slots.length - 1 ? " " : ""}
                    </span>
                  )
                )}{" "}
              </span>
            ))}
          </p>
        </CardContent>
      </Card>

      <div className="flex items-center justify-between gap-2">
        <div className="flex gap-2">
          {prev ? (
            <Button variant="outline" size="icon" asChild aria-label="Previous chapter">
              <Link href={`/chapters/${prev.slug}`}>
                <ChevronLeft />
              </Link>
            </Button>
          ) : (
            <Button variant="outline" size="icon" disabled aria-label="Previous chapter">
              <ChevronLeft />
            </Button>
          )}
          {next ? (
            <Button variant="outline" size="icon" asChild aria-label="Next chapter">
              <Link href={`/chapters/${next.slug}`}>
                <ChevronRight />
              </Link>
            </Button>
          ) : (
            <Button variant="outline" size="icon" disabled aria-label="Next chapter">
              <ChevronRight />
            </Button>
          )}
        </div>

        <div className="flex items-center gap-2">
          {submitted && !allCorrect && (
            <Button variant="outline" onClick={retry}>
              Try again
            </Button>
          )}
          {submitted && allCorrect ? (
            <Badge className="bg-green-600 text-white hover:bg-green-600">
              All correct
            </Badge>
          ) : (
            <Button onClick={submit}>Check</Button>
          )}
        </div>
      </div>

      {submitted && !allCorrect && (
        <p className="text-sm text-muted-foreground">
          Incorrect blanks are marked in red. Fix them and check again.
        </p>
      )}
      {submitted && allCorrect && (
        <p className="text-sm text-green-600 dark:text-green-400">
          You filled in every key word correctly.
        </p>
      )}
    </div>
  );
}
