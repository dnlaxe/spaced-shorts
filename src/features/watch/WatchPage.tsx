import { Link, useLocation } from "react-router";
import { useQueueHandler } from "./QueueHandler";
import useLocalStorageState from "../../hooks/useLocalStorage";
import data from "../../data/db";
import type { Playlist, Rating, Short } from "../../types/types";
import { useState } from "react";
import { buildSessionShorts } from "../../lib/session";

export default function WatchPage() {
  const { playlistId } = useLocation().state as { playlistId: string };
  const [playlists, setPlaylists] = useLocalStorageState<Playlist[]>(
    "playlists",
    data,
  );

  const [selected, setSelected] = useState<string | null>(null);

  function handleClick(rating: Rating) {
    respond(rating);
    setSelected(rating);
    setTimeout(() => setSelected(null), 400);
  }

  const [sessionStartedAt] = useState(() => Date.now());

  const playlist = playlists.find((p) => p.id === playlistId);
  const allShorts = playlist?.shorts ?? [];
  const settings = playlist?.settings ?? { newLimit: 5, reviewLimit: 5 };

  const dueShorts = buildSessionShorts(allShorts, settings, sessionStartedAt);

  function onComplete(playlistId: string, updatedShorts: Short[]) {
    setPlaylists((prev) =>
      prev.map((playlist) =>
        playlist.id === playlistId
          ? {
              ...playlist,
              watchCount: playlist.watchCount + 1,
              shorts: updatedShorts,
            }
          : playlist,
      ),
    );
  }

  const { currentShort, respond, done } = useQueueHandler(
    dueShorts,
    allShorts,
    playlistId,
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
          className={`easy rounded flex-1 py-2 uppercase text-2xl tracking-widest transition
    ${selected === "again" ? "bg-black text-white" : "bg-red-300"}`}
          onClick={() => handleClick("again")}
        >
          {selected === "again" ? "✔" : "Again"}
        </button>
        <button
          className={`easy rounded flex-1 py-2 uppercase text-2xl tracking-widest transition
    ${selected === "hard" ? "bg-black text-white" : "bg-orange-300"}`}
          onClick={() => handleClick("hard")}
        >
          {selected === "hard" ? "✔" : "Hard"}
        </button>
        <button
          className={`easy rounded flex-1 py-2 uppercase text-2xl tracking-widest transition
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
