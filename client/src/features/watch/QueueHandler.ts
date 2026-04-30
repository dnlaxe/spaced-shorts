import { useState } from "react";
import type { Rating, Short } from "../../types/types";

function schedule(queue: Short[], updated: Short): Short[] {
  const [, ...rest] = queue;

  if (needsMoreStepsInSession(updated)) {
    return [...rest, updated];
  }

  return rest;
}

function needsMoreStepsInSession(short: Short): boolean {
  return short.state === "learning" || short.state === "relearning";
}

export function useQueueHandler(
  allShorts: Short[],
  dueShorts: Short[],
  onComplete?: (updatedShorts: Short[]) => void,
) {
  const [queue, setQueue] = useState<Short[]>([...dueShorts]);
  const [updatedShorts, setUpdatedShorts] = useState<Short[]>([]);

  const currentShort = queue[0];
  const done = queue.length === 0;

  function respond(rating: Rating) {
    if (!currentShort) return;

    const updated = mutateShort(currentShort, rating);

    const nextUpdatedShorts = [
      ...updatedShorts.filter((short) => short.id !== updated.id),
      updated,
    ];

    const nextQueue = schedule(queue, updated);

    setUpdatedShorts(nextUpdatedShorts);
    setQueue(nextQueue);

    if (nextQueue.length === 0) {
      const mergedShorts = allShorts.map((short) => {
        const replacement = nextUpdatedShorts.find((s) => s.id === short.id);
        return replacement ?? short;
      });

      onComplete?.(mergedShorts);
    }
  }

  return {
    currentShort,
    respond,
    done,
  };
}

function mutateShort(short: Short, rating: Rating): Short {
  const next: Short = {
    ...short,
    reps: short.reps + 1,
  };

  switch (short.state) {
    case "new":
      handleNew(next, rating);
      break;

    case "learning":
      handleLearning(next, rating);
      break;

    case "review":
      handleReview(next, rating);
      break;

    case "relearning":
      handleRelearning(next, rating);
      break;
  }

  return next;
}

function handleNew(next: Short, rating: Rating) {
  next.state = "learning";
  next.stepIndex = 0;

  handleLearning(next, rating);
}

function handleLearning(next: Short, rating: Rating) {
  switch (rating) {
    case "again":
      next.stepIndex = 0;
      next.lapses += 1;
      break;

    case "hard":
      break;

    case "medium":
      next.stepIndex += 1;
      break;

    case "easy":
      next.stepIndex += 2;
      break;
  }

  if (next.stepIndex >= 2) {
    next.state = "review";
  }
}

function handleReview(next: Short, rating: Rating) {
  switch (rating) {
    case "again":
      next.state = "relearning";
      next.stepIndex = 0;
      next.lapses += 1;
      next.intervals = 0;
      break;

    case "hard":
      next.intervals = Math.max(1, Math.round(next.intervals * 1.2));
      break;

    case "medium":
      next.intervals = Math.max(1, Math.round(next.intervals * next.ease));
      break;

    case "easy":
      next.intervals = Math.max(
        1,
        Math.round(next.intervals * (next.ease + 0.15)),
      );
      break;
  }

  if (next.state === "review") {
    next.due = Date.now() + next.intervals * 24 * 60 * 60 * 1000;
  }
}

function handleRelearning(next: Short, rating: Rating) {
  switch (rating) {
    case "again":
      next.stepIndex = 0;
      break;

    case "medium":
    case "easy":
      next.state = "review";
      break;
  }
}
