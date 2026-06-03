import type { Playlist } from "../types/types";

const LOCAL_STORAGE_KEY = "spaced-shorts-playlists";

function readFromStorage(): Playlist[] {
  const data = localStorage.getItem(LOCAL_STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

function writeToStorage(playlists: Playlist[]): void {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(playlists));
}

export async function getPlaylists(): Promise<Playlist[]> {
  return readFromStorage();
}

export async function updatePlaylist(
  playlistId: string,
  updates: Partial<Playlist>,
): Promise<Playlist> {
  const playlists = readFromStorage();
  const index = playlists.findIndex((p) => p.id === playlistId);

  if (index === -1) {
    throw new Error("Playlist not found");
  }

  const updatedPlaylist = {
    ...playlists[index],
    ...updates,
  };

  playlists[index] = updatedPlaylist;
  writeToStorage(playlists);

  return updatedPlaylist;
}

export async function createPlaylist(playlist: Playlist): Promise<Playlist> {
  const playlists = readFromStorage();
  const updatedPlaylists = [playlist, ...playlists];
  writeToStorage(updatedPlaylists);

  return playlist;
}

export async function deletePlaylist(playlistId: string): Promise<void> {
  const playlists = readFromStorage();
  const updatedPlaylists = playlists.filter((p) => p.id !== playlistId);
  writeToStorage(updatedPlaylists);
}
