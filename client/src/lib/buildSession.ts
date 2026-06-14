import type { Short } from "../types/types";

export function buildSessionShorts(
  allShorts: Short[],
  settings: { newLimit: number; reviewLimit: number },
  now: number,
): Short[] {
  const learningShorts = allShorts.filter(
    (short) => short.state === "learning" || short.state === "relearning",
  );

  const reviewShorts = allShorts
    .filter((short) => short.state === "review" && short.due < now)
    .sort((a, b) => a.due - b.due)
    .slice(0, settings.reviewLimit);

  const newShorts = allShorts
    .filter((short) => short.state === "new")
    .slice(0, settings.newLimit);

  return [...learningShorts, ...reviewShorts, ...newShorts];
}
