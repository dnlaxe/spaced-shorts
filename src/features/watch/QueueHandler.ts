import { useState } from "react";
import type { HistoryItem, Rating, Review } from "../../types/types";

function schedule(rest: string[]) {
  return [...rest];
}

export function useQueueHandler(
  shorts: string[],
  playlistId: string,
  onComplete?: (review: Review) => void,
) {
  const [queue, setQueue] = useState([...shorts]);
  const [history, setHistory] = useState<HistoryItem[]>([]);

  const currentShort = queue[0];
  const done = queue.length === 0;

  function respond(rating: Rating) {
    if (!currentShort) return;

    const answer: HistoryItem = {
      shortId: currentShort,
      rating,
      answeredAt: Date.now(),
    };

    const nextHistory = [...history, answer];
    const [, ...rest] = queue;
    const nextQueue = schedule(rest);

    setHistory(nextHistory);
    setQueue(nextQueue);

    if (nextQueue.length === 0) {
      onComplete?.({
        playlistId,
        answers: nextHistory,
      });
    }
  }

  return {
    currentShort,
    respond,
    history,
    done,
  };
}
