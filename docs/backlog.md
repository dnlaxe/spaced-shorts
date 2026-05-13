# Backlog

## Current

- Finish playlist import flow
  Accept a pasted list of Shorts URLs or IDs and turn them into cards in one action.
- Add empty states across the app
  Show useful guidance when there are no playlists, no shorts in a playlist, or no due reviews.
- Improve form validation and feedback
  Catch invalid Shorts URLs, duplicate entries, blank playlist names, and failed API requests with clear UI messages.
- Add playlist settings UI
  Expose `newLimit` and `reviewLimit` in the interface instead of keeping them only in the data model.
- Make the UI more consistent
  Standardize spacing, typography, button styles, and page layout patterns across the app.
- Make watch completion more visible
  Add a session summary with reviewed count, ratings used, and what is due next.
- Preload the next short for seamless study flow

## Next

- Tighten the spaced repetition logic
  Revisit `hard` handling in relearning, initial intervals, ease changes, and how many same-session steps a card needs.
- Sort and filter playlists
  Add options like most recently studied, most due cards, alphabetical, and search by playlist title.
- Add study stats
  Track daily reviews, streaks, rating distribution, mature cards, and cards due today.
- Build a dedicated statistics dashboard
- Add optimistic updates or better loading states
  The app currently waits on network calls; make interactions feel immediate and recover cleanly on failure.
- Add tests for core logic
  Start with `extractShortId`, queue scheduling, and API/store behavior because those are easiest to regress.
- Move API base URL into environment config
  Replace the hardcoded localhost URL so the client can run cleanly in different environments.

## Later

- Add user login and logout
- Replace JSON file storage with a real database
  Move beyond file-based persistence before adding multi-user support or deployment.
- Background preload the next Short
  Reduce dead time between cards during study sessions.
- Add landing page and FAQ
  Explain the learning workflow, why Shorts fit the product, and how spaced repetition works here.
- Add import/export tools
  Support backup, restore, and sharing of playlist data.
- Add per-playlist modes
  Examples: language notes, tags, suspended cards, or separate review presets for different topics.
- Add video metadata enrichment
  Fetch title, thumbnail, and channel information so cards are easier to recognize before watching.

## Known Problems

- Playlist API accepts raw request bodies with no validation
  Bad data can be saved directly into `db.json`.
- File-based storage is vulnerable to overwrite races
  Concurrent writes can stomp each other because the whole playlist array is rewritten every time.
- Error handling is thin on both client and server
  Most failures collapse into generic messages, and server routes do not guard file read/write failures.
- Types are too loose in the study model
  `Short.state` is a generic string instead of a stricter union, which makes invalid states easier to introduce.
- Server data path depends on the process working directory
  That is fragile if the server is started from a different location.
