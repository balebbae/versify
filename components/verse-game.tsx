"use client";

import { useRef, useEffect, useCallback } from "react";
import { useVerseGame, type WordSlot } from "@/hooks/use-verse-game";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

function ReadingPhase({
  verseText,
  reference,
  timeLeft,
  onSkip,
}: {
  verseText: string;
  reference: string;
  timeLeft: number;
  onSkip: () => void;
}) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">Read and memorize</p>
        <div className="flex items-center gap-3">
          <span className="tabular-nums text-sm font-medium">{timeLeft}s</span>
          <Progress value={(timeLeft / 15) * 100} className="w-24" />
        </div>
      </div>

      <p className="text-lg leading-8 font-serif">{verseText}</p>

      <div className="flex items-center justify-between">
        <Badge variant="outline">{reference}</Badge>
        <Button variant="ghost" size="sm" onClick={onSkip}>
          Skip
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
  const charWidth = Math.max(slot.word.replace(/[^a-zA-Z0-9']/g, "").length, 3);

  let borderClass = "border-b-2 border-muted-foreground/30";
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
      {leadingPunct && (
        <span className="text-lg font-serif">{leadingPunct}</span>
      )}
      <span className={`inline-flex items-baseline ${borderClass} mx-0.5`}>
        {slot.status === "correct" ? (
          <span
            className="text-lg font-serif text-green-600 dark:text-green-400 px-0.5"
            style={{ minWidth: `${charWidth}ch` }}
          >
            {slot.word.replace(/^[^a-zA-Z0-9']*|[^a-zA-Z0-9']*$/g, "")}
          </span>
        ) : (
          <input
            ref={inputRef}
            type="text"
            value={slot.userInput}
            onChange={(e) => onChange(e.target.value)}
            onFocus={onFocus}
            onKeyDown={onKeyDown}
            className={`bg-transparent outline-none text-lg font-serif px-0.5 ${
              slot.status === "incorrect"
                ? "text-red-600 dark:text-red-400"
                : "text-foreground"
            }`}
            style={{ width: `${charWidth}ch` }}
            disabled={false}
            autoComplete="off"
            autoCapitalize="off"
            spellCheck={false}
          />
        )}
      </span>
      {trailingPunct && (
        <span className="text-lg font-serif">{trailingPunct}</span>
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

      <div className="leading-10 flex flex-wrap items-baseline gap-y-2">
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
            <span key={slot.index} className="text-lg font-serif mx-0.5">
              {slot.word}
            </span>
          )
        )}
      </div>

      <div className="flex items-center justify-between">
        <Badge variant="outline">{reference}</Badge>

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
    readingTimeLeft,
    fillRound,
    gameComplete,
    completedCount,
    totalVerses,
    startGame,
    skipReading,
    updateBlankInput,
    setActiveBlank,
    moveToNextBlank,
    moveToPrevBlank,
    submitAnswers,
    retryIncorrect,
    advanceRound,
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
      </div>
    );
  }

  if (gameComplete) {
    return <GameComplete onRestart={startGame} />;
  }

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Verse {completedCount + 1} of {totalVerses}
        </p>
        <Progress
          value={(completedCount / totalVerses) * 100}
          className="w-32"
        />
      </div>

      <Card>
        <CardContent>
          {phase === "reading" && currentVerse && (
            <ReadingPhase
              verseText={currentVerse.text}
              reference={currentVerse.reference}
              timeLeft={readingTimeLeft}
              onSkip={skipReading}
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
    </div>
  );
}
