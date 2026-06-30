"use client";

import { useSyncExternalStore } from "react";
import { verses } from "@/lib/verses";
import { getVerseTotalRounds } from "@/hooks/use-verse-game";
import {
  subscribeProgress,
  getProgressSnapshot,
  getServerProgressSnapshot,
  progressPercent,
} from "@/lib/progress";
import { Progress } from "@/components/ui/progress";

export function useProgress() {
  return useSyncExternalStore(
    subscribeProgress,
    getProgressSnapshot,
    getServerProgressSnapshot
  );
}

export function memorizedCount(progress: ReturnType<typeof useProgress>): number {
  return verses.filter((v) => {
    const p = progress[v.id];
    return p && p.roundsCompleted >= p.totalRounds;
  }).length;
}

export function VerseProgressList({
  compact = false,
  onSelect,
}: {
  compact?: boolean;
  onSelect?: (verseId: number) => void;
}) {
  const progress = useProgress();

  return (
    <div className="flex flex-col divide-y">
      {verses.map((verse) => {
        const totalRounds = getVerseTotalRounds(verse);
        const stored = progress[verse.id];
        const p = stored ?? { roundsCompleted: 0, totalRounds };
        const percent = progressPercent(p);
        const body = (
          <>
            <div className="flex items-center justify-between gap-4">
              <span className="text-sm font-medium">{verse.reference}</span>
              <span className="text-xs text-muted-foreground whitespace-nowrap">
                {p.roundsCompleted}/{p.totalRounds} rounds
              </span>
            </div>
            {!compact && (
              <p className="text-xs text-muted-foreground line-clamp-1">
                {verse.text}
              </p>
            )}
            <Progress value={percent} />
          </>
        );

        if (onSelect) {
          return (
            <button
              key={verse.id}
              type="button"
              onClick={() => onSelect(verse.id)}
              className="flex flex-col gap-2 py-3 text-left first:pt-0 last:pb-0 -mx-2 px-2 rounded-md transition-colors hover:bg-muted/60 cursor-pointer"
            >
              {body}
            </button>
          );
        }

        return (
          <div
            key={verse.id}
            className="flex flex-col gap-2 py-3 first:pt-0 last:pb-0"
          >
            {body}
          </div>
        );
      })}
    </div>
  );
}
