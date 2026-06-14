import type { Rating, Short } from "../types/types";

const DAY = 24 * 60 * 60 * 1000;

const EASE = {
  hard: 1.2,
  easy: 0.15,
};

export function updateShorts(short: Short, rating: Rating): Short {
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
    enterReview(next);
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
      next.intervals = Math.max(1, Math.round(next.intervals * EASE.hard));
      enterReview(next);
      break;

    case "medium":
      next.intervals = Math.max(1, Math.round(next.intervals * next.ease));
      enterReview(next);
      break;

    case "easy":
      next.intervals = Math.max(
        1,
        Math.round(next.intervals * (next.ease + EASE.easy)),
      );
      enterReview(next);
      break;
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
      enterReview(next);
      break;
  }
}

function enterReview(next: Short) {
  next.state = "review";

  if (next.intervals < 1) {
    next.intervals = 1;
  }

  next.due = Date.now() + next.intervals * DAY;
}
