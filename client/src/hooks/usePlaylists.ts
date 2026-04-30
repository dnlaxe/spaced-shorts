import { useEffect, useState } from "react";
import type { Playlist } from "../types/types";
import {
  createPlaylist,
  deletePlaylist,
  getPlaylists,
  updatePlaylist,
} from "../api/playlists";

export default function usePlaylists() {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadPlaylists() {
      try {
        setLoading(true);
        setError(null);

        const playlists = await getPlaylists();
        setPlaylists(playlists);
      } catch {
        setError("Failed to load playlists");
      } finally {
        setLoading(false);
      }
    }

    loadPlaylists();
  }, []);

  async function updatePlaylistById(
    playlistId: string,
    updates: Partial<Playlist>,
  ) {
    const updatedPlaylist = await updatePlaylist(playlistId, updates);

    setPlaylists((prev) =>
      prev.map((p) => (p.id === playlistId ? updatedPlaylist : p)),
    );
  }

  async function createPlaylistInState(newPlaylist: Playlist) {
    const createdPlaylist = await createPlaylist(newPlaylist);

    setPlaylists((prev) => [createdPlaylist, ...prev]);
  }

  async function deletePlaylistById(playlistId: string) {
    await deletePlaylist(playlistId);

    setPlaylists((prev) => prev.filter((p) => p.id !== playlistId));
  }

  return {
    playlists,
    loading,
    error,
    updatePlaylistById,
    createPlaylistInState,
    deletePlaylistById,
  };
}
