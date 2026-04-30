import { Link, useLocation } from "react-router";
import type { Short } from "../../types/types";
import { useState } from "react";
import { buildSessionShorts } from "../../lib/session";
import usePlaylists from "../../hooks/usePlaylists";
import WatchSession from "./WatchSession";

export default function WatchPage() {
  const { playlistId } = useLocation().state as { playlistId: string };
  const { playlists, loading, error, updatePlaylistById } = usePlaylists();

  const [sessionStartedAt] = useState(() => Date.now());

  const playlist = playlists.find((p) => p.id === playlistId);

  const allShorts = playlist?.shorts ?? [];
  const settings = playlist?.settings ?? { newLimit: 5, reviewLimit: 5 };

  const dueShorts = buildSessionShorts(allShorts, settings, sessionStartedAt);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!playlistId) {
    return (
      <div>
        No playlist selected. <Link to="/playlists">Go back</Link>
      </div>
    );
  }

  if (!playlist) {
    return <div>Playlist not found.</div>;
  }

  const currentPlaylist = playlist;

  async function onComplete(updatedShorts: Short[]) {
    await updatePlaylistById(playlistId, {
      watchCount: currentPlaylist.watchCount + 1,
      shorts: updatedShorts,
    });
  }

  return (
    <WatchSession
      shorts={dueShorts}
      allShorts={allShorts}
      onComplete={onComplete}
    />
  );
}
