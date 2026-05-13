import PlaylistCard from "./components/PlaylistCard";
import type { Playlist, Short } from "../../types/types";
import usePlaylists from "../../hooks/usePlaylists";
import { PlusIcon } from "@phosphor-icons/react";

export default function PlaylistsPage() {
  const {
    playlists,
    loading,
    error,
    updatePlaylistById,
    createPlaylistInState,
    deletePlaylistById,
  } = usePlaylists();

  async function addShortToPlaylist(segment: string, playlistId: string) {
    const playlist = playlists.find((p) => p.id === playlistId);

    if (!playlist) return;

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

    await updatePlaylistById(playlistId, {
      shorts: [...playlist.shorts, newShort],
    });
  }

  async function deleteShortFromPlaylist(segment: string, playlistId: string) {
    const playlist = playlists.find((p) => p.id === playlistId);

    if (!playlist) return;

    await updatePlaylistById(playlistId, {
      shorts: playlist.shorts.filter((s) => s.id !== segment),
    });
  }

  async function deletePlaylist(playlistId: string) {
    await deletePlaylistById(playlistId);
  }

  async function updateNewLimit(newLimit: number, playlistId: string) {
    const playlist = playlists.find((p) => p.id === playlistId);

    if (!playlist) return;

    await updatePlaylistById(playlistId, {
      settings: { ...playlist.settings, newLimit },
    });
  }

  async function updateReviewLimit(reviewLimit: number, playlistId: string) {
    const playlist = playlists.find((p) => p.id === playlistId);

    if (!playlist) return;

    await updatePlaylistById(playlistId, {
      settings: { ...playlist.settings, reviewLimit },
    });
  }

  async function createNewPlaylist(newPlaylist: Playlist) {
    await createPlaylistInState(newPlaylist);
  }

  async function renamePlaylist(newTitle: string, playlistId: string) {
    await updatePlaylistById(playlistId, {
      title: newTitle,
    });
  }

  if (loading) return <div>Loading playlists...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
      <div className="px-4">
        <div className="flex justify-between items-center py-4">
          <h1 className="text-2xl">Your playlists</h1>
          <button
            className="border px-3 py-1 rounded-full flex gap-1 items-center"
            onClick={() =>
              createNewPlaylist({
                id: crypto.randomUUID(),
                title: "Click to edit title",
                shorts: [],
                settings: { newLimit: 5, reviewLimit: 10 },
                watchCount: 0,
              })
            }
          >
            <PlusIcon size={18} />
            New playlist
          </button>
        </div>

        <div className="flex flex-col gap-4">
          {playlists.length === 0 ? (
            <div>No playlists. Click New playlist to create one</div>
          ) : (
            playlists.map((playlist) => (
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
            ))
          )}
        </div>
      </div>
    </>
  );
}
