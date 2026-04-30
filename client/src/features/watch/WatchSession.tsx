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

  return (
    <div className="watch-container flex flex-col flex-1 md:mb-12 md:mx-24">
      <div className="screen border flex-1">
        <iframe
          src={`https://www.youtube.com/embed/${currentShort.id}`}
          className="w-full h-full"
          allowFullScreen
        />
      </div>

      <div className="difficulty-buttons flex h-24 p-1 md:px-0 gap-1">
        <Link
          to="/playlists"
          className="exit rounded flex-1 flex items-center justify-center uppercase text-2xl tracking-widest bg-gray-300"
        >
          Exit
        </Link>
        <button
          className={`again rounded flex-1 py-2 uppercase text-2xl tracking-widest transition
    ${selected === "again" ? "bg-black text-white" : "bg-red-300"}`}
          onClick={() => handleClick("again")}
        >
          {selected === "again" ? "✔" : "Again"}
        </button>
        <button
          className={`hard rounded flex-1 py-2 uppercase text-2xl tracking-widest transition
    ${selected === "hard" ? "bg-black text-white" : "bg-orange-300"}`}
          onClick={() => handleClick("hard")}
        >
          {selected === "hard" ? "✔" : "Hard"}
        </button>
        <button
          className={`medium rounded flex-1 py-2 uppercase text-2xl tracking-widest transition
    ${selected === "medium" ? "bg-black text-white" : "bg-green-300"}`}
          onClick={() => handleClick("medium")}
        >
          {selected === "medium" ? "✔" : "Ok"}
        </button>
        <button
          className={`easy rounded flex-1 py-2 uppercase text-2xl tracking-widest transition
    ${selected === "easy" ? "bg-black text-white" : "bg-blue-300"}`}
          onClick={() => handleClick("easy")}
        >
          {selected === "easy" ? "✔" : "Easy"}
        </button>
      </div>
    </div>
  );
}
