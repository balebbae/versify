"use client";

import Link from "next/link";
import { RotateCcw } from "lucide-react";
import { verses } from "@/lib/verses";
import { clearProgress } from "@/lib/progress";
import {
  VerseProgressList,
  useProgress,
  memorizedCount,
} from "@/components/verse-progress-list";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ProgressPage() {
  const progress = useProgress();
  const memorized = memorizedCount(progress);

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
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={clearProgress}
              aria-label="Reset progress"
            >
              <RotateCcw />
            </Button>
            <Button asChild>
              <Link href="/">Back to game</Link>
            </Button>
          </div>
        </div>

        <Card>
          <CardContent>
            <VerseProgressList />
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
