import { useState } from "react";
import type { Rating, Short } from "../../types/types";
import { updateShorts } from "../../lib/spacedAlgo";
import { schedule } from "../../lib/queueHandler";

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

    const updated = updateShorts(currentShort, rating);

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
