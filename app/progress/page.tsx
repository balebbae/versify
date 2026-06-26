"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import { verses } from "@/lib/verses";
import { getVerseTotalRounds } from "@/hooks/use-verse-game";
import {
  subscribeProgress,
  getProgressSnapshot,
  getServerProgressSnapshot,
  progressPercent,
} from "@/lib/progress";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

export default function ProgressPage() {
  const progress = useSyncExternalStore(
    subscribeProgress,
    getProgressSnapshot,
    getServerProgressSnapshot
  );

  const memorized = verses.filter((v) => {
    const p = progress[v.id];
    return p && p.roundsCompleted >= p.totalRounds;
  }).length;

  return (
    <div className="flex flex-col flex-1 items-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col py-16 px-6 gap-8">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <h1 className="text-3xl font-semibold tracking-tight">Progress</h1>
            <p className="text-sm text-muted-foreground">
              {memorized} of {verses.length} verses memorized
            </p>
          </div>
          <Button asChild>
            <Link href="/">Back to game</Link>
          </Button>
        </div>

        <Card>
          <CardContent className="flex flex-col divide-y">
            {verses.map((verse) => {
              const totalRounds = getVerseTotalRounds(verse);
              const stored = progress[verse.id];
              const p = stored ?? { roundsCompleted: 0, totalRounds };
              const percent = progressPercent(p);
              return (
                <div
                  key={verse.id}
                  className="flex flex-col gap-2 py-4 first:pt-0 last:pb-0"
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-sm font-medium">
                      {verse.reference}
                    </span>
                    <span className="text-xs text-muted-foreground whitespace-nowrap">
                      {p.roundsCompleted}/{p.totalRounds} rounds
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-1">
                    {verse.text}
                  </p>
                  <Progress value={percent} />
                </div>
              );
            })}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
