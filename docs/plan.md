# Plan

## Goal

Spaced repetition for YouTube Shorts.
Paste a link, rate your recall, and the spaced repetition algorithm decides when it appears again.
Users collect shorts into playlists.

A personal project to use the addictiveness of YouTube shorts to help me learn languages.

## Stack

React 19, TypeScript, Vite, React router, Tailwind

## V1

- [x] Foundation: Vite + React + TS, Eslint, Prettier, Tailwind, routing
- [x] Static UI: Navbar, Card, Playlist, Study screen — hardcoded data, no state
- [x] State: wire up real data, interactions, and spaced repetition algorithm
- [x] Playlists: create/rename/delete, add Shorts by URL
- [x] Study: show short, difficulty rating, queue management
- [x] UI shell: mobile drawer, dark mode, responsive layout
- [ ] Final pieces: importing playlists

# V2 ideas

- Stats: review heatmap, daily chart, streak counter, maturity + rating distribution
- UI: landing + FAQ
- Backend storage
- Auth: wire up login/signup pages to a backend
- background preload for seamless transition,
