# Plan

## Goal

Spaced repetition for YouTube Shorts.
Paste a link, rate your recall, and the spaced repetition algorithm decides when it appears again.
Users collect shorts into playlists.

A personal project to use the addictiveness of YouTube shorts to help me learn languages.

## Stack

React 18, TypeScript, Vite, React Router DOM

## V1

- [ ] Foundation: Vite + React + TS, Eslint, Prettier, routing
- [ ] Components: Card, CardProgress, Playlist, ReviewEvent types
- [ ] Schedule: spaced repetition algorithm, daily limits, queue builder
- [ ] Playlists: create/rename/delete, add Shorts by URL, bulk import via YouTube playlist
- [ ] Study: show short, background preload for seamless transition, four-button rating, queue management
- [ ] UI shell: navbar, mobile drawer, dark mode, responsive layout

# V2 ideas

- Stats: review heatmap, daily chart, streak counter, maturity + rating distribution
- UI: landing + FAQ
- Backend storage
- Auth: wire up login/signup pages to a backend
