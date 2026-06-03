import { useState } from "react";
import { Link } from "react-router";
import extractShortId from "../extractShortId";
import type { Playlist } from "../../../types/types";
import { buildSessionShorts } from "../../../lib/session";
import {
  CheckIcon,
  GearIcon,
  ListIcon,
  PlusIcon,
  TrashIcon,
  XIcon,
} from "@phosphor-icons/react";

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
  const isDrawerOpen = openBox != null;

  const [newUrl, setNewUrl] = useState<string>("");
  // const [newPlaylistUrl, setPlaylistUrl] = useState<string>("");
  const [newLimit, setNewLimit] = useState<string>("");
  const [reviewLimit, setReviewLimit] = useState<string>("");
  const [currentTitle, setCurrentTitle] = useState<string>(playlist.title);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [addShortError, setAddShortError] = useState<string>("");
  const [addShortSaved, setAddShortSaved] = useState(false);

  const [now] = useState(() => Date.now());

  function addShort(url: string, playlistId: string) {
    const shortId = extractShortId(url);
    if (!shortId) {
      setAddShortError("Enter a valid YouTube Shorts URL.");
    } else {
      setAddShortError("");
      console.log(`Adding ${url} to ${playlistId}`);
      onAddShort(shortId, playlistId);
      setNewUrl("");
      setAddShortSaved(true);

      setTimeout(() => {
        setAddShortSaved(false);
      }, 700);
    }
  }

  // function importPlaylist(playlistUrl: string) {
  //   console.log(`Importing ${playlistUrl}!`);
  // }

  function deleteShortFromPlaylist(segment: string, playlistId: string) {
    console.log(`Deleting ${segment}`);
    if (openBox === "manage" && playlist.shorts.length === 1) {
      setOpenBox(null);
    }
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

  const nextDue = playlist.shorts
    .filter((s) => s.state === "review" && s.due > now)
    .sort((a, b) => a.due - b.due)[0];

  const dueLabel =
    sessionCount > 0
      ? `${sessionCount}`
      : nextDue
        ? `${new Date(nextDue.due).toLocaleString([], {
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })}`
        : "";

  return (
    <>
      <div className="playlist-card flex flex-col bg-white">
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
                  disabled={currentTitle.trim().length === 0}
                  onClick={() => {
                    renamePlaylist(currentTitle, playlist.id);
                    setIsEditing(false);
                  }}
                  className="disabled:opacity-50"
                >
                  <CheckIcon size={18} />
                </button>
                <button
                  onClick={() => {
                    setCurrentTitle(playlist.title);
                    setIsEditing(false);
                  }}
                >
                  <XIcon size={18} />
                </button>
              </div>
            ) : (
              <span
                className="playlist-title hover:cursor-pointer text-lg"
                onClick={() => {
                  setIsEditing(true);
                  setOpenBox(null);
                }}
                title="Click to edit title"
              >
                {currentTitle}
              </span>
            )}
          </div>
        </div>

        <div className="border border-t-0 flex py-1 px-2 items-center justify-between">
          {playlist.shorts.length === 0 ? (
            <div className="pl-2">No shorts. Click Add to add one.</div>
          ) : (
            <Link
              to="/watch"
              state={{ playlistId: playlist.id }}
              className={`ml-2 text-sm italic ${sessionCount === 0 ? "pointer-events-none" : "not-italic"
                }`}
            >
              {sessionCount !== 0 ? "Practice " : dueLabel}
              {sessionCount !== 0 ? <span>{dueLabel}</span> : null}
            </Link>
          )}

          <div className="flex">
            {(!isDrawerOpen || openBox === "add") && (
              <button
                className={openBox === "add" ? "px-2" : "px-2"}
                onClick={() => {
                  setOpenBox(openBox === "add" ? null : "add");
                  setIsEditing(false);
                }}
              >
                {openBox === "add" ? (
                  <XIcon size={18} />
                ) : (
                  <PlusIcon size={18} />
                )}
              </button>
            )}

            {playlist.shorts.length > 0 &&
              (!isDrawerOpen || openBox === "manage") && (
                <button
                  className={openBox === "manage" ? "px-2" : "px-2"}
                  onClick={() => {
                    setOpenBox(openBox === "manage" ? null : "manage");
                    setIsEditing(false);
                  }}
                >
                  {openBox === "manage" ? (
                    <XIcon size={18} />
                  ) : (
                    <ListIcon size={18} />
                  )}
                </button>
              )}

            {(!isDrawerOpen || openBox === "settings") && (
              <button
                className={openBox === "settings" ? "px-2" : "px-2"}
                onClick={() => {
                  setOpenBox(openBox === "settings" ? null : "settings");
                  setIsEditing(false);
                }}
              >
                {openBox === "settings" ? (
                  <XIcon size={18} />
                ) : (
                  <GearIcon size={18} />
                )}
              </button>
            )}

            {(!isDrawerOpen || openBox === "delete") && (
              <button
                className={openBox === "delete" ? "px-2" : "px-2"}
                onClick={() => {
                  setOpenBox(openBox === "delete" ? null : "delete");
                  setIsEditing(false);
                }}
              >
                {openBox === "delete" ? "" : <TrashIcon size={18} />}
              </button>
            )}
          </div>
        </div>

        {openBox === "add" && (
          <div className="add-shorts-box border border-t-0 p-2 flex flex-col gap-2">
            <div className="relative add-short flex gap-2">
              <input
                type="url"
                value={newUrl}
                onChange={(e) => {
                  setNewUrl(e.target.value);
                  setAddShortError("");
                }}
                placeholder="https://www.youtube.com/shorts/…"
                className="border flex-1 p-2 pr-12"
              />
              <button
                className="border px-2 absolute right-0 top-0 bottom-0 m-1"
                onClick={() => addShort(newUrl, playlist.id)}
              >
                {addShortSaved ? (
                  <CheckIcon size={18} />
                ) : (
                  <PlusIcon size={18} />
                )}
              </button>
              {addShortError !== "" && <p>{addShortError}</p>}
            </div>
            {/* <div className="add-playlist flex gap-2">
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
            </div> */}
          </div>
        )}

        {openBox === "manage" && (
          <div className="shorts-list-box border border-t-0 p-2 flex flex-col gap-2">
            <div className="px-2">
              <div className="playlist-count">
                {playlist.shorts.length}{" "}
                {playlist.shorts.length === 1 ? "short" : "shorts"}
              </div>
            </div>
            {playlist.shorts.map((short) => (
              <div className="add-short flex border p-2 justify-between gap-2">
                <span>{short.id}</span>
                <button
                  onClick={() => deleteShortFromPlaylist(short.id, playlist.id)}
                >
                  <XIcon size={18} />
                </button>
              </div>
            ))}
          </div>
        )}

        {openBox === "settings" && (
          <div className="settings-box flex border border-t-0 p-4 gap-4">
            <div className="flex-1 min-w-0 flex flex-col gap-2">
              <p>New short limit: {playlist.settings.newLimit}</p>

              <div className="relative flex gap-2 min-w-0 items-end">
                <input
                  className="border flex-1 min-w-0 p-2 pr-12"
                  value={newLimit}
                  onChange={(e) => setNewLimit(e.target.value)}
                  placeholder="New limit:"
                />

                <button
                  className="border flex-none px-2 absolute top-0 right-0 bottom-0 m-1"
                  onClick={() => changeNewLimit(Number(newLimit), playlist.id)}
                >
                  <PlusIcon size={18} />
                </button>
              </div>
            </div>

            <div className="flex-1 min-w-0 flex flex-col gap-2">
              <p>Review limit: {playlist.settings.reviewLimit}</p>

              <div className="relative flex gap-2 min-w-0 items-end">
                <input
                  className="border flex-1 min-w-0 p-2 pr-12"
                  value={reviewLimit}
                  onChange={(e) => setReviewLimit(e.target.value)}
                  placeholder="Review limit:"
                />

                <button
                  className="absolute border flex-none px-2 top-0 bottom-0 right-0 m-1"
                  onClick={() =>
                    changeReviewLimit(Number(reviewLimit), playlist.id)
                  }
                >
                  <PlusIcon size={18} />
                </button>
              </div>
            </div>
          </div>
        )}

        {openBox === "delete" && (
          <div className="delete-box flex border border-t-0 py-2 px-4 gap-4 text-sm flex-row justify-between">
            <div className="text-base">Delete this playlist forever?</div>
            <div className="flex gap-4">
              <button
                className="flex-1"
                onClick={() => confirmDelete(playlist.id)}
              >
                <CheckIcon size={18} />
              </button>
              <button className="flex-1" onClick={() => setOpenBox(null)}>
                <XIcon size={18} />
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
