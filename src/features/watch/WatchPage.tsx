import { Link, useLocation } from "react-router";
import { useQueueHandler } from "./QueueHandler";
import useLocalStorageState from "../../hooks/useLocalStorage";
import data from "../../data/db";
import type { Review } from "../../types/types";

export default function WatchPage() {
  const { playlistId } = useLocation().state as { playlistId: string };
  const [playlists, setPlaylists] = useLocalStorageState("playlists", data);

  const shorts = playlists.find((p) => p.id === playlistId)?.shorts ?? [];

  function onComplete(review: Review) {
    console.log("session finished");
    console.log(review);

    setPlaylists((prev) =>
      prev.map((playlist) =>
        playlist.id === review.playlistId
          ? { ...playlist, watchCount: playlist.watchCount + 1 }
          : playlist,
      ),
    );
  }

  const { currentShort, respond, done } = useQueueHandler(
    shorts,
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
          src={`https://www.youtube.com/embed/${currentShort}`}
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
          className="again rounded flex-1 py-2 uppercase text-2xl tracking-widest bg-red-300"
          onClick={() => respond("again")}
        >
          Again
        </button>
        <button
          className="hard rounded flex-1 py-2 uppercase text-2xl tracking-widest bg-orange-300"
          onClick={() => respond("hard")}
        >
          Hard
        </button>
        <button
          className="medium rounded flex-1 py-2 uppercase text-2xl tracking-widest bg-green-300"
          onClick={() => respond("medium")}
        >
          OK
        </button>
        <button
          className="easy rounded flex-1 py-2 uppercase text-2xl tracking-widest bg-blue-300"
          onClick={() => respond("easy")}
        >
          Easy
        </button>
      </div>
    </div>
  );
}
