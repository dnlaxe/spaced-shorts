# Changelog

## 2026-04-30

### Changed

- Split the project into separate `client` and `server` applications.
- Moved playlist state changes from local-only React updates to backend-backed persistence.
- Refactored playlist state management so `usePlaylists()` coordinates API updates and frontend state.

### Added

- Added playlist API helpers for fetching, creating, updating, and deleting playlists.
- Added server endpoints for `GET /api/playlists`, `POST /api/playlists`, `PATCH /api/playlists/:playlistId`, and `DELETE /api/playlists/:playlistId`.
- Added file-based playlist storage using `server/src/data/db.json` and a small read/write store module.

### Fixed

- Fixed watch session completion so updated shorts and watch counts are saved persistently.
- Fixed playlist page actions so creating, renaming, limit updates, short edits, and deletion can be persisted.

## 2026-04-16

### Added

- Spaced repitition algorithm
- UI feedback on difficulty buttons

## 2026-03-30

### Added

- Playlist management (create, rename, delete)
- Add Shorts via URL
- Delete Shorts from playlists
- Playlist state management in PlaylistsPage
- Navigation between playlists and study view using router state

## 2026-03-30

- Static UI: Navbar, PlaylistCard, PlaylistsPage, WatchPage
- Playlist state in PlaylistsPage with callbacks: add short, delete short, delete playlist, update new/review limits
- PlaylistCard wired to callbacks, passes playlist via router state to WatchPage
- WatchPage: shows one short at a time via index, difficulty buttons advance to next short

## 2026-03-28

- Foundation: Vite + React + TS, Eslint, Prettier, Tailwind, routing
