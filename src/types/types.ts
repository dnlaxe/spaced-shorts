export type Playlist = {
  id: string;
  title: string;
  dueCount: number;
  shorts: string[];
  settings: { newLimit: number; reviewLimit: number };
  watchCount: number;
};

export type Rating = "again" | "hard" | "medium" | "easy";
export type HistoryItem = {
  shortId: string;
  rating: Rating;
  answeredAt: number;
};

export type Review = {
  playlistId: string;
  answers: HistoryItem[];
};
