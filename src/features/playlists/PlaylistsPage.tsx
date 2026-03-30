import PlaylistCard from "./components/PlaylistCard";
import data from "../../data/db";
import { useEffect, useState } from "react";

export default function PlaylistsPage() {
  const [playlists, setPlaylists] = useState(data);

  useEffect(() => console.log(playlists), [playlists]);

  function addShortToPlaylist(playlistId: string, segment: string) {
    setPlaylists(
      playlists.map((p) =>
        p.id === playlistId ? { ...p, shorts: [...p.shorts, segment] } : p,
      ),
    );
  }

  function deleteShortFromPlaylist(playlistId: string, segment: string) {
    setPlaylists(
      playlists.map((p) =>
        p.id === playlistId
          ? { ...p, shorts: p.shorts.filter((s) => s !== segment) }
          : p,
      ),
    );
  }

  function deletePlaylist(playlistId: string) {
    setPlaylists(playlists.filter((p) => p.id !== playlistId));
  }

  function updateNewLimit(newLimit: number, playlistId: string) {
    setPlaylists(
      playlists.map((p) =>
        p.id === playlistId
          ? { ...p, settings: { ...p.settings, newLimit } }
          : p,
      ),
    );
  }

  function updateReviewLimit(reviewLimit: number, playlistId: string) {
    setPlaylists(
      playlists.map((p) =>
        p.id === playlistId
          ? { ...p, settings: { ...p.settings, reviewLimit } }
          : p,
      ),
    );
  }

  return (
    <>
      <div className="px-4">
        <div className="flex justify-between py-4">
          <h1>Your playlists</h1>
          <button className="border">New playlist</button>
        </div>
        <div className="flex flex-col gap-4">
          {playlists.map((playlist) => (
            <PlaylistCard
              key={playlist.id}
              playlist={playlist}
              onAddShort={addShortToPlaylist}
              onDeleteShort={deleteShortFromPlaylist}
              onDeletePlaylist={deletePlaylist}
              onUpdateNewLimit={updateNewLimit}
              onUpdateReviewLimit={updateReviewLimit}
            />
          ))}
        </div>
      </div>
    </>
  );
}
