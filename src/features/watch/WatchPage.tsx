import { useState } from "react";
import { Link, useLocation } from "react-router";

type Playlist = {
  id: string;
  title: string;
  shortsCount: number;
  dueCount: number;
  shorts: string[];
  settings: { newLimit: number; reviewLimit: number };
};

export default function WatchPage() {
  const { playlist } = useLocation().state as { playlist: Playlist };
  const [index, setIndex] = useState(0);
  const short = playlist.shorts[index];

  return (
    <>
      <div className="watch-container flex flex-col flex-1 md:mb-12 md:mx-24">
        <div className="screen border flex-1">
          <iframe
            src={`https://www.youtube.com/embed/${short}`}
            className="w-full h-full"
            allowFullScreen
          />
        </div>
        <div className="difficulty-buttons border flex gap-4 p-4">
          <Link
            to="/playlists"
            className="again border flex-1 py-2 text-center"
          >
            Exit
          </Link>
          <button
            className="again border flex-1 py-2"
            onClick={() => setIndex(index + 1)}
          >
            Again
          </button>
          <button
            className="hard border flex-1 py-2"
            onClick={() => setIndex(index + 1)}
          >
            Hard
          </button>
          <button
            className="medium border flex-1 py-2"
            onClick={() => setIndex(index + 1)}
          >
            Medium
          </button>
          <button
            className="easy border flex-1 py-2"
            onClick={() => setIndex(index + 1)}
          >
            Easy
          </button>
        </div>
      </div>
    </>
  );
}
