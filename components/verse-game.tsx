"use client";

import { useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Home } from "lucide-react";
import { useVerseGame, type WordSlot } from "@/hooks/use-verse-game";
import { verses } from "@/lib/verses";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  VerseProgressList,
  useProgress,
  memorizedCount,
} from "@/components/verse-progress-list";

function ReadingPhase({
  verseText,
  reference,
  onReady,
}: {
  verseText: string;
  reference: string;
  onReady: () => void;
}) {
  return (
    <div className="flex flex-col gap-8">
      <p className="text-base text-muted-foreground">Read and memorize</p>

      <p className="text-2xl leading-10 font-sans">
        {verseText} ({reference})
      </p>

      <div className="flex items-center justify-end">
        <Button size="sm" onClick={onReady}>
          I&apos;m ready
        </Button>
      </div>
    </div>
  );
}

function BlankInput({
  slot,
  isActive,
  onFocus,
  onChange,
  onKeyDown,
  inputRef,
}: {
  slot: WordSlot;
  isActive: boolean;
  onFocus: () => void;
  onChange: (value: string) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  inputRef: (el: HTMLInputElement | null) => void;
}) {
  const strippedWord = slot.word.replace(/[^a-zA-Z0-9']/g, "");
  const charCount = strippedWord.length;
  const widthCh = Math.max(charCount, 2) + 1;

  let borderClass = "border-b-[3px] border-muted-foreground/25";
  if (slot.status === "correct") {
    borderClass = "border-b-[3px] border-green-500";
  } else if (slot.status === "incorrect") {
    borderClass = "border-b-[3px] border-red-500";
  } else if (isActive) {
    borderClass = "border-b-[3px] border-foreground";
  }

  const leadingPunct = slot.word.match(/^([^a-zA-Z0-9']*)/)?.[1] || "";
  const trailingPunct = slot.word.match(/([^a-zA-Z0-9']*)$/)?.[1] || "";

  return (
    <span className="inline-flex items-baseline">
      {leadingPunct && (
        <span className="text-2xl font-sans">{leadingPunct}</span>
      )}
      <span className={`inline-flex items-baseline ${borderClass} mx-0.5`}>
        {slot.status === "correct" ? (
          <span
            className="text-2xl font-sans text-green-600 dark:text-green-400 px-1"
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
            className={`bg-transparent outline-none text-2xl font-sans px-1 ${
              slot.status === "incorrect"
                ? "text-red-600 dark:text-red-400"
                : "text-foreground"
            }`}
            style={{ width: `${widthCh}ch` }}
            disabled={false}
            autoComplete="off"
            autoCapitalize="off"
            spellCheck={false}
          />
        )}
      </span>
      {trailingPunct && (
        <span className="text-2xl font-sans">{trailingPunct}</span>
      )}
    </span>
  );
}

function FillInPhase({
  slots,
  activeBlankIndex,
  submitted,
  allCorrect,
  round,
  totalRounds,
  reference,
  showVerseHint,
  verseText,
  onUpdateInput,
  onSetActive,
  onMoveNext,
  onMovePrev,
  onSubmit,
  onRetry,
  onAdvance,
}: {
  slots: WordSlot[];
  activeBlankIndex: number;
  submitted: boolean;
  allCorrect: boolean;
  round: number;
  totalRounds: number;
  reference: string;
  showVerseHint: boolean;
  verseText: string;
  onUpdateInput: (index: number, value: string) => void;
  onSetActive: (index: number) => void;
  onMoveNext: () => void;
  onMovePrev: () => void;
  onSubmit: () => void;
  onRetry: () => void;
  onAdvance: () => void;
}) {
  const inputRefs = useRef<Map<number, HTMLInputElement>>(new Map());

  const setInputRef = useCallback(
    (index: number) => (el: HTMLInputElement | null) => {
      if (el) {
        inputRefs.current.set(index, el);
      } else {
        inputRefs.current.delete(index);
      }
    },
    []
  );

  useEffect(() => {
    const el = inputRefs.current.get(activeBlankIndex);
    if (el) {
      el.focus();
    }
  }, [activeBlankIndex, round]);

  const handleKeyDown = useCallback(
    (slotIndex: number, e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Tab") {
        e.preventDefault();
        if (e.shiftKey) {
          onMovePrev();
        } else {
          onMoveNext();
        }
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (submitted && allCorrect) {
          onAdvance();
        } else if (submitted && !allCorrect) {
          onRetry();
        } else {
          onSubmit();
        }
      } else if (e.key === " ") {
        e.preventDefault();
        onMoveNext();
      }
    },
    [onMoveNext, onMovePrev, onSubmit, onRetry, onAdvance, submitted, allCorrect]
  );

  const roundLabel =
    round === totalRounds
      ? "Type the entire verse"
      : `Round ${round} of ${totalRounds}`;

  const blankedCount = slots.filter((s) => s.blanked).length;
  const totalWords = slots.length;
  const blankPercent = Math.round((blankedCount / totalWords) * 100);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">{roundLabel}</p>
        <Badge variant="secondary">{blankPercent}% blanked</Badge>
      </div>

      {showVerseHint && (
        <div className="rounded-lg bg-muted/50 px-4 py-3">
          <p className="text-lg leading-8 font-sans text-muted-foreground italic">
            {verseText} ({reference})
          </p>
        </div>
      )}

      <div className="leading-[3.5rem] flex flex-wrap items-baseline gap-y-3">
        {slots.map((slot) =>
          slot.blanked ? (
            <BlankInput
              key={`${round}-${slot.index}`}
              slot={slot}
              isActive={activeBlankIndex === slot.index}
              onFocus={() => onSetActive(slot.index)}
              onChange={(val) => onUpdateInput(slot.index, val)}
              onKeyDown={(e) => handleKeyDown(slot.index, e)}
              inputRef={setInputRef(slot.index)}
            />
          ) : (
            <span key={slot.index} className="text-2xl font-sans mx-0.5">
              {slot.word}
            </span>
          )
        )}
      </div>

      <div className="flex items-center justify-end">
        <div className="flex gap-2">
          {submitted && allCorrect ? (
            <Button size="sm" onClick={onAdvance}>
              {round === totalRounds ? "Next verse" : "Next round"}
            </Button>
          ) : submitted && !allCorrect ? (
            <Button size="sm" variant="outline" onClick={onRetry}>
              Try again
            </Button>
          ) : (
            <Button size="sm" onClick={onSubmit}>
              Check
            </Button>
          )}
        </div>
      </div>

      {submitted && !allCorrect && (
        <p className="text-sm text-muted-foreground">
          Some words are incorrect. Press Enter or click &quot;Try again&quot; to
          fix them.
        </p>
      )}
      {submitted && allCorrect && (
        <p className="text-sm text-green-600 dark:text-green-400">
          All correct! Press Enter to continue.
        </p>
      )}
    </div>
  );
}

function GameComplete({
  onRestart,
}: {
  onRestart: () => void;
}) {
  return (
    <div className="flex flex-col items-center gap-6 py-12 text-center">
      <h2 className="text-2xl font-semibold">All verses complete</h2>
      <p className="text-muted-foreground max-w-sm">
        You&apos;ve memorized all 30 verses. Start again to keep practicing.
      </p>
      <Button onClick={onRestart}>Start over</Button>
    </div>
  );
}

export function VerseGame() {
  const {
    currentVerse,
    phase,
    showVerseHint,
    fillRound,
    gameComplete,
    totalVerses,
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
    canGoPrev,
    canGoNext,
  } = useVerseGame();

  if (!currentVerse && !gameComplete) {
    return (
      <div className="flex flex-col items-center gap-8 py-16">
        <div className="flex flex-col items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight">Versify</h1>
          <p className="text-muted-foreground text-center max-w-sm">
            Memorize 30 Bible verses through progressive fill-in-the-blank
            practice.
          </p>
        </div>
        <Button size="lg" onClick={startGame}>
          Start
        </Button>
        <Button variant="ghost" size="sm" asChild>
          <Link href="/progress">View progress</Link>
        </Button>
      </div>
    );
  }

  if (gameComplete) {
    return <GameComplete onRestart={startGame} />;
  }

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Verse {currentVerse?.id ?? 1} of {totalVerses}
        </p>

        <div className="flex items-center gap-2">
          {phase === "fill" && (
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleVerseHint}
            >
              {showVerseHint ? "Hide verse" : "Show verse"}
            </Button>
          )}
          <Button
            variant="ghost"
            size="icon"
            aria-label="Home"
            onClick={goHome}
          >
            <Home />
          </Button>
          <ProgressDialog />
        </div>
      </div>

      <Card>
        <CardContent>
          {phase === "reading" && currentVerse && (
            <ReadingPhase
              verseText={currentVerse.text}
              reference={currentVerse.reference}
              onReady={beginFill}
            />
          )}

          {phase === "fill" && fillRound && currentVerse && (
            <FillInPhase
              slots={fillRound.slots}
              activeBlankIndex={fillRound.activeBlankIndex}
              submitted={fillRound.submitted}
              allCorrect={fillRound.allCorrect}
              round={fillRound.round}
              totalRounds={fillRound.totalRounds}
              reference={currentVerse.reference}
              showVerseHint={showVerseHint}
              verseText={currentVerse.text}
              onUpdateInput={updateBlankInput}
              onSetActive={setActiveBlank}
              onMoveNext={moveToNextBlank}
              onMovePrev={moveToPrevBlank}
              onSubmit={submitAnswers}
              onRetry={retryIncorrect}
              onAdvance={advanceRound}
            />
          )}
        </CardContent>
      </Card>

      <div className="flex items-center justify-center gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={goToPrevVerse}
          disabled={!canGoPrev}
          aria-label="Previous verse"
        >
          <ChevronLeft />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={goToNextVerse}
          disabled={!canGoNext}
          aria-label="Next verse"
        >
          <ChevronRight />
        </Button>
      </div>
    </div>
  );
}

function ProgressDialog() {
  const progress = useProgress();
  const memorized = memorizedCount(progress);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm">
          Progress
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Progress</DialogTitle>
          <DialogDescription>
            {memorized} of {verses.length} verses memorized
          </DialogDescription>
        </DialogHeader>
        <VerseProgressList compact />
      </DialogContent>
    </Dialog>
  );
}
