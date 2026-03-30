import { useState } from "react";
import { Link } from "react-router";

type Playlist = {
  id: string;
  title: string;
  shortsCount: number;
  dueCount: number;
  shorts: string[];
  settings: { newLimit: number; reviewLimit: number };
};

type Props = {
  playlist: Playlist;
  onAddShort: (segment: string, playlistId: string) => void;
  onDeleteShort: (segment: string, playlistId: string) => void;
  onDeletePlaylist: (playlistId: string) => void;
  onUpdateNewLimit: (newLimit: number, playlistId: string) => void;
  onUpdateReviewLimit: (newLimit: number, playlistId: string) => void;
};

export default function PlaylistCard({
  playlist,
  onAddShort,
  onDeleteShort,
  onDeletePlaylist,
  onUpdateNewLimit,
  onUpdateReviewLimit,
}: Props) {
  const [openBox, setOpenBox] = useState<
    "add" | "manage" | "settings" | "delete" | null
  >(null);

  const [newUrl, setNewUrl] = useState<string>("");
  const [newPlaylistUrl, setPlaylistUrl] = useState<string>("");
  const [newLimit, setNewLimit] = useState<string>("");
  const [reviewLimit, setReviewLimit] = useState<string>("");

  function addShort(segment: string, playlistId: string) {
    console.log(`Adding ${segment} ti ${playlistId}`);
    onAddShort(segment, playlistId);
  }

  function importPlaylist(playlistUrl: string) {
    console.log(`Importing ${playlistUrl}!`);
  }

  function deleteShortFromPlaylist(segment: string, playlistId: string) {
    console.log(`Deleting ${segment}`);
    onDeleteShort(segment, playlistId);
  }

  function changeNewLimit(newLimit: number, playlistId: string) {
    console.log(`Changing new limit to ${newLimit}`);
    onUpdateNewLimit(newLimit, playlistId);
  }

  function changeReviewLimit(reviewLimit: number, playlistId: string) {
    console.log(`Changing review limit to ${reviewLimit}`);
    onUpdateReviewLimit(reviewLimit, playlistId);
  }

  function confirmDelete(playlistId: string) {
    console.log(`Deleting playlist ${playlist.id}`);
    onDeletePlaylist(playlistId);
  }

  return (
    <>
      <div className="flex flex-col">
        <div className="card-top border flex flex-col p-4">
          <div className="border p-4">
            <form className="name-playlist">
              <input className="border" />
              <button className="border">Save</button>
              <button className="border">Cancel</button>
            </form>
            <span className="playlist-title">{playlist.title}</span>
          </div>
          <div className=" border p-4">
            <div className="flex justify-between">
              <span className="playlist-count">{playlist.shortsCount}</span>
              <span className="due-shorts">{playlist.dueCount}</span>
            </div>
          </div>
        </div>

        <div className="border flex justify-between p-4 gap-4">
          <Link
            to="/watch"
            state={{ playlist }}
            className="flex-1 border text-center"
          >
            Practice
          </Link>
          <button
            className="flex-1 border"
            onClick={() => setOpenBox(openBox === "add" ? null : "add")}
          >
            {openBox === "add" ? "X" : "Add"}
          </button>
          <button
            className="flex-1 border"
            onClick={() => setOpenBox(openBox === "manage" ? null : "manage")}
          >
            {openBox === "manage" ? "X" : "Manage"}
          </button>
          <button
            className="flex-1 border"
            onClick={() =>
              setOpenBox(openBox === "settings" ? null : "settings")
            }
          >
            {openBox === "settings" ? "X" : "Settings"}
          </button>
          <button
            className="flex-1 border"
            onClick={() => setOpenBox(openBox === "delete" ? null : "delete")}
          >
            {openBox === "delete" ? "X" : "Delete"}
          </button>
        </div>

        {openBox === "add" && (
          <div className="add-shorts-box border p-4">
            <div className="add-short flex gap-4">
              <input
                type="url"
                value={newUrl}
                onChange={(e) => setNewUrl(e.target.value)}
                placeholder="https://www.youtube.com/shorts/…"
                className="border flex-1"
              />
              <button
                className="border"
                onClick={() => addShort(newUrl, playlist.id)}
              >
                Add
              </button>
            </div>
            <div className="add-playlist flex gap-4">
              <input
                type="url"
                value={newPlaylistUrl}
                onChange={(e) => setPlaylistUrl(e.target.value)}
                placeholder="https://www.youtube.com/playlist?list=…"
                className="border flex-1"
              />
              <button
                className="border"
                onClick={() => importPlaylist(newPlaylistUrl)}
              >
                Import playlist
              </button>
            </div>
          </div>
        )}

        {openBox === "manage" && (
          <div className="shorts-list-box border p-4">
            {playlist.shorts.map((short) => (
              <div className="add-short flex border p-4 justify-between gap-4">
                <span>{short}</span>
                <button
                  className="border"
                  onClick={() => deleteShortFromPlaylist(short, playlist.id)}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}

        {openBox === "settings" && (
          <div className="settings-box flex border p-4 gap-4">
            <div className="flex-1">
              <p>
                Current new card daily limit:
                {playlist.settings.newLimit}
              </p>
              <label>
                New limit:
                <input
                  className="border"
                  value={newLimit}
                  onChange={(e) => setNewLimit(e.target.value)}
                />
                <button
                  className="border"
                  onClick={() => changeNewLimit(Number(newLimit), playlist.id)}
                >
                  Save
                </button>
              </label>
            </div>
            <div className="flex-1">
              <p>
                Current review card daily limit:
                {playlist.settings.reviewLimit}
              </p>
              <label>
                New limit:
                <input
                  className="border"
                  value={reviewLimit}
                  onChange={(e) => setReviewLimit(e.target.value)}
                />
                <button
                  className="border"
                  onClick={() =>
                    changeReviewLimit(Number(reviewLimit), playlist.id)
                  }
                >
                  Save
                </button>
              </label>
            </div>
          </div>
        )}

        {openBox === "delete" && (
          <div className="delete-box flex border p-4 gap-4">
            <button
              className="border flex-1"
              onClick={() => confirmDelete(playlist.id)}
            >
              Confirm
            </button>
            <button className="border flex-1" onClick={() => setOpenBox(null)}>
              cancel
            </button>
          </div>
        )}
      </div>
    </>
  );
}
