import PlaylistCard from "./components/PlaylistCard";
import data from "../../data/db";
import useLocalStorageState from "../../hooks/useLocalStorage";
import type { Playlist, Short } from "../../types/types";

export default function PlaylistsPage() {
  const [playlists, setPlaylists] = useLocalStorageState<Playlist[]>(
    "playlists",
    data,
  );

  function addShortToPlaylist(segment: string, playlistId: string) {
    const newShort: Short = {
      id: segment,
      due: Date.now(),
      intervals: 0,
      ease: 2.5,
      state: "new",
      stepIndex: 0,
      reps: 0,
      lapses: 0,
    };

    setPlaylists(
      playlists.map((p) =>
        p.id === playlistId ? { ...p, shorts: [...p.shorts, newShort] } : p,
      ),
    );
  }

  function deleteShortFromPlaylist(segment: string, playlistId: string) {
    setPlaylists(
      playlists.map((p) =>
        p.id === playlistId
          ? {
              ...p,
              shorts: p.shorts.filter((s) => s.id !== segment),
            }
          : p,
      ),
    );
  }

  function deletePlaylist(playlistId: string) {
    setPlaylists((prev) => prev.filter((p) => p.id !== playlistId));
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

  function createNewPlaylist(newPlaylist: Playlist) {
    setPlaylists((prev) => [newPlaylist, ...prev]);
  }

  function renamePlaylist(newTitle: string, playlistId: string) {
    setPlaylists((prev) =>
      prev.map((p) => (p.id === playlistId ? { ...p, title: newTitle } : p)),
    );
  }

  return (
    <>
      <div className="px-4">
        <div className="flex justify-between items-end py-4">
          <h1>Your playlists</h1>
          <button
            className="border px-3 py-1"
            onClick={() =>
              createNewPlaylist({
                id: crypto.randomUUID(),
                title: "New playlist",
                shorts: [],
                settings: { newLimit: 5, reviewLimit: 10 },
                watchCount: 0,
              })
            }
          >
            New playlist
          </button>
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
              onRenamePlaylist={renamePlaylist}
            />
          ))}
        </div>
      </div>
    </>
  );
}
