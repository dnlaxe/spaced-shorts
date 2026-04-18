import { useState } from "react";
import { Link } from "react-router";
import extractShortId from "../extractShortId";
import type { Playlist } from "../../../types/types";
import { buildSessionShorts } from "../../../lib/session";

type Props = {
  playlist: Playlist;
  onAddShort: (segment: string, playlistId: string) => void;
  onDeleteShort: (segment: string, playlistId: string) => void;
  onDeletePlaylist: (playlistId: string) => void;
  onUpdateNewLimit: (newLimit: number, playlistId: string) => void;
  onUpdateReviewLimit: (newLimit: number, playlistId: string) => void;
  onRenamePlaylist: (newTitle: string, playlistId: string) => void;
};

export default function PlaylistCard({
  playlist,
  onAddShort,
  onDeleteShort,
  onDeletePlaylist,
  onUpdateNewLimit,
  onUpdateReviewLimit,
  onRenamePlaylist,
}: Props) {
  const [openBox, setOpenBox] = useState<
    "add" | "manage" | "settings" | "delete" | null
  >(null);

  const [newUrl, setNewUrl] = useState<string>("");
  const [newPlaylistUrl, setPlaylistUrl] = useState<string>("");
  const [newLimit, setNewLimit] = useState<string>("");
  const [reviewLimit, setReviewLimit] = useState<string>("");
  const [currentTitle, setCurrentTitle] = useState<string>(playlist.title);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [addShortError, setAddShortError] = useState<string>("");

  const [now] = useState(() => Date.now());

  function addShort(url: string, playlistId: string) {
    const shortId = extractShortId(url);
    if (!shortId) {
      setAddShortError("Enter a valid YouTube Shorts URL.");
    } else {
      setAddShortError("");
      console.log(`Adding ${url} to ${playlistId}`);
      onAddShort(shortId, playlistId);
    }
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

  function renamePlaylist(newTitle: string, playlistId: string) {
    console.log(`Renaming ${playlist.title} t0 ${newTitle}`);
    onRenamePlaylist(newTitle, playlistId);
  }

  const sessionCount = buildSessionShorts(
    playlist.shorts,
    playlist.settings,
    now,
  ).length;

  return (
    <>
      <div className="flex flex-col">
        <div className="card-top border flex flex-col p-2">
          <div className="p-2">
            {isEditing ? (
              <div className="name-playlist flex gap-2">
                <input
                  value={currentTitle}
                  className="border-b focus:outline-none flex-1"
                  onChange={(e) => setCurrentTitle(e.target.value)}
                />
                <button
                  className="border px-2"
                  onClick={() => {
                    renamePlaylist(currentTitle, playlist.id);
                    setIsEditing(false);
                  }}
                >
                  Save
                </button>
                <button
                  className="border px-2"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </button>
              </div>
            ) : (
              <span
                className="playlist-title hover:cursor-pointer text-lg"
                onClick={() => {
                  setIsEditing(true);
                  setOpenBox(null);
                }}
              >
                {currentTitle}
              </span>
            )}
          </div>

          <div className="px-2 pb-2">
            <div className="flex gap-2">
              <span className="playlist-count">
                {playlist.shorts.length} shorts /
              </span>
              <span className="due-shorts">{sessionCount} due</span>
            </div>
          </div>
        </div>

        <div className="border border-t-0 flex justify-between p-2 gap-3 bg-slate-50">
          <Link
            to="/watch"
            state={{ playlistId: playlist.id }}
            className={`flex-1 border text-center py-1 bg-white ${
              sessionCount === 0 ? "opacity-50 pointer-events-none" : ""
            }`}
          >
            Practice
          </Link>
          <button
            className="flex-1 border bg-white"
            onClick={() => {
              setOpenBox(openBox === "add" ? null : "add");
              setIsEditing(false);
            }}
          >
            {openBox === "add" ? "X" : "Add"}
          </button>
          <button
            className="flex-1 border bg-white"
            onClick={() => {
              setOpenBox(openBox === "manage" ? null : "manage");
              setIsEditing(false);
            }}
          >
            {openBox === "manage" ? "X" : "Manage"}
          </button>
          <button
            className="flex-1 border bg-white"
            onClick={() => {
              setOpenBox(openBox === "settings" ? null : "settings");
              setIsEditing(false);
            }}
          >
            {openBox === "settings" ? "X" : "Settings"}
          </button>
          <button
            className="flex-1 border bg-white"
            onClick={() => {
              setOpenBox(openBox === "delete" ? null : "delete");
              setIsEditing(false);
            }}
          >
            {openBox === "delete" ? "X" : "Delete"}
          </button>
        </div>

        {openBox === "add" && (
          <div className="add-shorts-box border border-t-0 p-2 flex flex-col gap-2">
            <div className="add-short flex gap-2">
              <input
                type="url"
                value={newUrl}
                onChange={(e) => {
                  setNewUrl(e.target.value);
                  setAddShortError("");
                }}
                placeholder="https://www.youtube.com/shorts/…"
                className="border flex-1 p-2"
              />
              <button
                className="border px-2"
                onClick={() => addShort(newUrl, playlist.id)}
              >
                Add
              </button>
              {addShortError !== "" && <p>{addShortError}</p>}
            </div>
            <div className="add-playlist flex gap-2">
              <input
                type="url"
                value={newPlaylistUrl}
                onChange={(e) => setPlaylistUrl(e.target.value)}
                placeholder="https://www.youtube.com/playlist?list=…"
                className="border flex-1 p-2"
              />
              <button
                className="border px-2"
                onClick={() => importPlaylist(newPlaylistUrl)}
              >
                Import playlist
              </button>
            </div>
          </div>
        )}

        {openBox === "manage" && (
          <div className="shorts-list-box border border-t-0 p-2 flex flex-col gap-2">
            {playlist.shorts.length === 0 ? (
              <div>No shorts. Click Add to add one.</div>
            ) : (
              playlist.shorts.map((short) => (
                <div className="add-short flex border p-2 justify-between gap-2">
                  <span>{short.id}</span>
                  <button
                    className="border"
                    onClick={() =>
                      deleteShortFromPlaylist(short.id, playlist.id)
                    }
                  >
                    Delete
                  </button>
                </div>
              ))
            )}
          </div>
        )}

        {openBox === "settings" && (
          <div className="settings-box flex border border-t-0 p-2 gap-4">
            <div className="flex-1 min-w-0 flex flex-col gap-2">
              <p>New short limit: {playlist.settings.newLimit}</p>

              <div className="flex gap-2 min-w-0 items-end">
                <span className="flex-none">New limit:</span>

                <input
                  className="border flex-1 min-w-0"
                  value={newLimit}
                  onChange={(e) => setNewLimit(e.target.value)}
                />

                <button
                  className="border flex-none px-2"
                  onClick={() => changeNewLimit(Number(newLimit), playlist.id)}
                >
                  Save
                </button>
              </div>
            </div>

            <div className="flex-1 min-w-0 flex flex-col gap-2">
              <p>Review limit: {playlist.settings.reviewLimit}</p>

              <div className="flex gap-2 min-w-0 items-end">
                <span className="flex-none">Review limit:</span>

                <input
                  className="border flex-1 min-w-0"
                  value={reviewLimit}
                  onChange={(e) => setReviewLimit(e.target.value)}
                />

                <button
                  className="border flex-none px-2"
                  onClick={() =>
                    changeReviewLimit(Number(reviewLimit), playlist.id)
                  }
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}

        {openBox === "delete" && (
          <div className="delete-box flex border border-t-0 p-2 gap-2">
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
