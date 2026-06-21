import { VerseGame } from "@/components/verse-game";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-2xl flex-col items-center justify-center py-16 px-6">
        <VerseGame />
      </main>
    </div>
  );
}
