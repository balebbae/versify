export interface VerseProgress {
  roundsCompleted: number;
  totalRounds: number;
}

export type ProgressMap = Record<number, VerseProgress>;

const STORAGE_KEY = "versify-progress-v1";

export function loadProgress(): ProgressMap {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as ProgressMap) : {};
  } catch {
    return {};
  }
}

export function recordVerseProgress(
  verseId: number,
  roundsCompleted: number,
  totalRounds: number
): void {
  if (typeof window === "undefined") return;
  const map = loadProgress();
  const prev = map[verseId];
  const best = prev
    ? Math.max(prev.roundsCompleted, roundsCompleted)
    : roundsCompleted;
  const clamped = Math.max(0, Math.min(best, totalRounds));
  map[verseId] = { roundsCompleted: clamped, totalRounds };
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(map));
  } catch {
    // ignore write failures (e.g. storage disabled)
  }
}

export function progressPercent(p: VerseProgress | undefined): number {
  if (!p || p.totalRounds === 0) return 0;
  return Math.round((p.roundsCompleted / p.totalRounds) * 100);
}

// useSyncExternalStore plumbing so React components can read localStorage-backed
// progress without calling setState inside an effect (and without hydration
// mismatches). The snapshot is cached and only recomputed when the raw value
// changes, keeping the reference stable across renders.
const EMPTY: ProgressMap = {};
let cachedRaw: string | null = null;
let cachedMap: ProgressMap = EMPTY;

export function subscribeProgress(callback: () => void): () => void {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

export function getProgressSnapshot(): ProgressMap {
  if (typeof window === "undefined") return EMPTY;
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (raw !== cachedRaw) {
    cachedRaw = raw;
    try {
      cachedMap = raw ? (JSON.parse(raw) as ProgressMap) : EMPTY;
    } catch {
      cachedMap = EMPTY;
    }
  }
  return cachedMap;
}

export function getServerProgressSnapshot(): ProgressMap {
  return EMPTY;
}
