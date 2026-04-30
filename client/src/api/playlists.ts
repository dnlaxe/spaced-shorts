import type { Playlist } from "../types/types";

const API_BASE_URL = "http://localhost:3000";

export async function getPlaylists(): Promise<Playlist[]> {
  const res = await fetch(`${API_BASE_URL}/api/playlists`);

  if (!res.ok) {
    throw new Error("Fetching playlists failure");
  }

  return res.json();
}

export async function updatePlaylist(
  playlistId: string,
  updates: Partial<Playlist>,
): Promise<Playlist> {
  const res = await fetch(`${API_BASE_URL}/api/playlists/${playlistId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updates),
  });

  if (!res.ok) {
    throw new Error("Updating playlist failed");
  }

  return res.json();
}

export async function createPlaylist(playlist: Playlist): Promise<Playlist> {
  const res = await fetch(`${API_BASE_URL}/api/playlists`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(playlist),
  });

  if (!res.ok) {
    throw new Error("Creating playlist failed");
  }

  return res.json();
}

export async function deletePlaylist(playlistId: string): Promise<void> {
  const res = await fetch(`${API_BASE_URL}/api/playlists/${playlistId}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Deleting playlist failed");
  }
}
