import type { Short } from "../types/types";

export function schedule(queue: Short[], updated: Short): Short[] {
  const [, ...rest] = queue;

  if (needsMoreStepsInSession(updated)) {
    return [...rest, updated];
  }

  return rest;
}

function needsMoreStepsInSession(short: Short): boolean {
  return short.state === "learning" || short.state === "relearning";
}
