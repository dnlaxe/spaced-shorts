import { useState } from "react";
import type { Rating, Short } from "../../types/types";
import { Link } from "react-router";
import { useQueueHandler } from "./useQueueHandler";

type WatchSessionProps = {
  shorts: Short[];
  allShorts: Short[];
  onComplete: (updatedShorts: Short[]) => void;
};

export default function WatchSession({
  shorts,
  allShorts,
  onComplete,
}: WatchSessionProps) {
  const [selected, setSelected] = useState<string | null>(null);

  const { currentShort, respond, done } = useQueueHandler(
    allShorts,
    shorts,
    onComplete,
  );

  function handleClick(rating: Rating) {
    respond(rating);
    setSelected(rating);
    setTimeout(() => setSelected(null), 400);
  }

  const borderColors: Record<string, string> = {
    again: "border-[#FF477C]",
    hard: "border-[#4773FF]",
    medium: "border-[#47FF5E]",
    easy: "border-[#FFCD47]",
  };

  if (done) {
    return (
      <div className="flex flex-col flex-1 items-center justify-center gap-6">
        <p className="text-xl">Session complete!</p>
        <Link
          to="/playlists"
          className="border px-6 py-2 rounded-full bg-white"
        >
          Go back to playlists
        </Link>
      </div>
    );
  }

  const activeBorderClass = selected
    ? borderColors[selected]
    : "border-slate-600";

  return (
    <div
      id="bezel"
      className={`watch-container flex flex-col flex-1 w-full md:max-w-125 md:mx-auto md:mb-12 border-[6px] rounded-[30px] p-1 gap-1 bg-black font-cursive bezel-transition ${activeBorderClass}`}
    >
      <div className="grow bg-slate-800 rounded-t-[20px] overflow-hidden">
        <iframe
          src={`https://www.youtube.com/embed/${currentShort.id}`}
          className="w-full h-full"
          allowFullScreen
        />
      </div>

      <div className="flex gap-1 justify-between h-20 text-xl">
        <Link
          to="/playlists"
          className="flex-1 flex items-center justify-center bg-slate-600 border-2 border-slate-600 rounded-bl-[20px] text-white font-bold transition-transform active:scale-95"
        >
          Exit
        </Link>

        <button
          onPointerDown={() => handleClick("again")}
          className="flex-1 bg-[#FF477C] border-2 border-[#FF477C] text-white font-bold transition-transform active:scale-95"
        >
          Again
        </button>

        <button
          onPointerDown={() => handleClick("hard")}
          className="flex-1 bg-[#4773FF] border-2 border-[#4773FF] text-white font-bold transition-transform active:scale-95"
        >
          Hard
        </button>

        <button
          onPointerDown={() => handleClick("medium")}
          className="flex-1 bg-[#47FF5E] border-2 border-[#47FF5E] text-white font-bold transition-transform active:scale-95"
        >
          Ok
        </button>

        <button
          onPointerDown={() => handleClick("easy")}
          className="flex-1 bg-[#FFCD47] border-2 border-[#FFCD47] rounded-br-[20px] text-white font-bold transition-transform active:scale-95"
        >
          Easy
        </button>
      </div>
    </div>
  );
}
