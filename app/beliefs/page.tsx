import Link from "next/link";
import { beliefs, type BeliefPoint } from "@/lib/beliefs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

function PointBlock({ point, depth }: { point: BeliefPoint; depth: number }) {
  return (
    <div className={depth > 0 ? "border-l border-border pl-4" : ""}>
      <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
        <h3 className="font-medium leading-snug">{point.heading}</h3>
        {point.reference && (
          <span className="text-sm text-muted-foreground">
            {point.reference}
          </span>
        )}
      </div>

      {point.verses && point.verses.length > 0 && (
        <div className="mt-2 flex flex-col gap-2">
          {point.verses.map((v) => (
            <div key={v.reference} className="flex flex-col gap-1">
              <Badge variant="secondary" className="w-fit">
                {v.reference}
              </Badge>
              <p className="text-[15px] leading-relaxed text-muted-foreground">
                {v.text}
              </p>
            </div>
          ))}
        </div>
      )}

      {point.children && point.children.length > 0 && (
        <div className="mt-3 flex flex-col gap-4">
          {point.children.map((child) => (
            <PointBlock key={child.heading} point={child} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function BeliefsPage() {
  return (
    <div className="flex flex-col flex-1 items-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col py-16 px-6 gap-8">
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-col gap-1">
            <h1 className="text-3xl font-semibold tracking-tight">
              10 Basic Beliefs
            </h1>
            <p className="text-sm text-muted-foreground">
              RETS Basic Belief Study guide — main topics and key verses
            </p>
          </div>
          <Button asChild>
            <Link href="/">Back to game</Link>
          </Button>
        </div>

        <nav className="flex flex-wrap gap-2">
          {beliefs.map((belief) => (
            <Button
              key={belief.id}
              variant="outline"
              size="sm"
              asChild
            >
              <a href={`#belief-${belief.id}`}>
                {belief.id}. {belief.title}
              </a>
            </Button>
          ))}
        </nav>

        <div className="flex flex-col gap-6">
          {beliefs.map((belief) => (
            <Card key={belief.id} id={`belief-${belief.id}`} className="scroll-mt-6">
              <CardHeader>
                <div className="flex items-baseline gap-3">
                  <span className="text-sm font-semibold text-muted-foreground">
                    {belief.id}
                  </span>
                  <CardTitle className="text-2xl">{belief.title}</CardTitle>
                </div>
                <p className="text-sm text-muted-foreground">{belief.summary}</p>
              </CardHeader>
              <CardContent className="flex flex-col gap-6">
                {belief.points.map((point) => (
                  <PointBlock key={point.heading} point={point} depth={0} />
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
