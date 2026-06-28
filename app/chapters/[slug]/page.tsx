"use client";

import { use } from "react";
import Link from "next/link";
import { getChapter } from "@/lib/chapters";
import { ChapterGame } from "@/components/chapter-game";
import { Button } from "@/components/ui/button";

export default function ChapterPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const chapter = getChapter(slug);

  return (
    <div className="flex flex-col flex-1 items-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col py-16 px-6">
        {chapter ? (
          <ChapterGame chapter={chapter} />
        ) : (
          <div className="flex flex-col items-center gap-4 py-16 text-center">
            <h2 className="text-xl font-semibold">Chapter not found</h2>
            <Button asChild variant="outline">
              <Link href="/chapters">Back to chapters</Link>
            </Button>
          </div>
        )}
      </main>
    </div>
  );
}
