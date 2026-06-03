import { useState } from "react";
import type { Rating, Short } from "../../types/types";
import { Link } from "react-router";
import { useQueueHandler } from "./QueueHandler";

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

  function handleClick(rating: Rating) {
    respond(rating);
    setSelected(rating);
    setTimeout(() => setSelected(null), 400);
  }

  const { currentShort, respond, done } = useQueueHandler(
    allShorts,
    shorts,
    onComplete,
  );

  const borderColors: Record<string, string> = {
    again: "border-purple-500",
    hard: "border-pink-500",
    medium: "border-cyan-500",
    easy: "border-emerald-500",
  };


  if (done) {
    return (
      <div className="flex flex-col flex-1 items-center justify-center gap-6">
        <p className="text-xl">Session complete!</p>
        <Link to="/playlists" className="border px-6 py-2">
          Go back to playlists
        </Link>
      </div>
    );
  }

  const activeBorderClass = selected ? borderColors[selected] : "border-slate-600";

  return (
    <div
      id="bezel"
      className={`watch-container flex flex-col flex-1 w-full md:max-w-[500px] md:mx-auto md:mb-12 border-[6px] rounded-[30px] p-2 gap-2 bg-black font-cursive bezel-transition ${activeBorderClass}`}
    >

      <div className="flex-grow bg-slate-800 rounded-[20px] overflow-hidden">
        <iframe
          src={`https://www.youtube.com/embed/${currentShort.id}`}
          className="w-full h-full"
          allowFullScreen
        />
      </div>

      <div className="flex gap-2 justify-between h-20">

        {/* Exit */}
        <Link
          to="/playlists"
          className="flex-1 flex items-center justify-center bg-slate-600 border-2 border-slate-600 rounded-[20px] text-white font-bold text-2xl transition-transform active:scale-95"
        >
          Exit
        </Link>

        {/* Again */}
        <button
          onPointerDown={() => handleClick("again")}
          className="flex-1 bg-purple-500 border-2 border-purple-500 rounded-[20px] text-white font-bold text-2xl transition-transform active:scale-95"
        >
          Again
        </button>

        {/* Hard */}
        <button
          onPointerDown={() => handleClick("hard")}
          className="flex-1 bg-pink-500 border-2 border-pink-500 rounded-[20px] text-white font-bold text-2xl transition-transform active:scale-95"
        >
          Hard
        </button>

        {/* Ok */}
        <button
          onPointerDown={() => handleClick("medium")}
          className="flex-1 bg-cyan-500 border-2 border-cyan-500 rounded-[20px] text-white font-bold text-2xl transition-transform active:scale-95"
        >
          Ok
        </button>

        {/* Easy */}
        <button
          onPointerDown={() => handleClick("easy")}
          className="flex-1 bg-emerald-500 border-2 border-emerald-500 rounded-[20px] text-white font-bold text-2xl transition-transform active:scale-95"
        >
          Easy
        </button>


      </div>
    </div>
  );

}
