import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { chapters } from "@/lib/chapters";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function ChaptersPage() {
  const books = Array.from(new Set(chapters.map((c) => c.book)));

  return (
    <div className="flex flex-col flex-1 items-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col py-16 px-6 gap-8">
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-col gap-1">
            <h1 className="text-3xl font-semibold tracking-tight">Chapters</h1>
            <p className="text-sm text-muted-foreground">
              Fill in the key words for a whole chapter (NASB)
            </p>
          </div>
          <Button asChild>
            <Link href="/">Back to game</Link>
          </Button>
        </div>

        {books.map((book) => (
          <div key={book} className="flex flex-col gap-3">
            <h2 className="text-lg font-medium">{book}</h2>
            <div className="flex flex-col gap-2">
              {chapters
                .filter((c) => c.book === book)
                .map((c) => (
                  <Link key={c.slug} href={`/chapters/${c.slug}`}>
                    <Card className="transition-colors hover:bg-accent">
                      <CardContent className="flex items-center justify-between py-4">
                        <div className="flex items-center gap-3">
                          <span className="font-medium">{c.reference}</span>
                          <Badge variant="secondary">
                            {c.verses.length} verses
                          </Badge>
                        </div>
                        <ChevronRight className="text-muted-foreground" />
                      </CardContent>
                    </Card>
                  </Link>
                ))}
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}
