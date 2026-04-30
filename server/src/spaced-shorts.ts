import express, { Response, Request } from "express";
import cors from "cors";
import { readPlaylists, writePlaylists } from "./data/playlists-store.js";

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);

app.get("/", (_req: Request, res: Response) => {
  res.send({
    message: "Hello World!",
  });
});

app.get("/api/playlists", async (_req: Request, res: Response) => {
  const playlists = await readPlaylists();
  res.json(playlists);
});

app.patch("/api/playlists/:playlistId", async (req: Request, res: Response) => {
  const playlistId = req.params.playlistId;
  const updates = req.body;
  const playlists = await readPlaylists();
  const playlist = playlists.find(
    (item: { id: string }) => item.id === playlistId,
  );

  if (!playlist) {
    res.status(404).json({ error: "Playlist not found" });
    return;
  }

  Object.assign(playlist, updates);
  await writePlaylists(playlists);

  res.json(playlist);
});

app.post("/api/playlists", async (req: Request, res: Response) => {
  const newPlaylist = req.body;
  const playlists = await readPlaylists();

  playlists.unshift(newPlaylist);

  await writePlaylists(playlists);

  res.status(201).json(newPlaylist);
});

app.delete(
  "/api/playlists/:playlistId",
  async (req: Request, res: Response) => {
    const playlistId = req.params.playlistId;
    const playlists = await readPlaylists();
    const nextPlaylists = playlists.filter(
      (item: { id: string }) => item.id !== playlistId,
    );

    if (nextPlaylists.length === playlists.length) {
      res.status(404).json({ error: "Playlist not found" });
      return;
    }

    await writePlaylists(nextPlaylists);
    res.status(204).send();
  },
);

export default app;
