export type Playlist = {
  id: string;
  title: string;
  shorts: Short[];
  settings: { newLimit: number; reviewLimit: number };
  watchCount: number;
};

export type Short = {
  id: string;
  due: number;
  intervals: number;
  ease: number;
  state: string;
  stepIndex: number;
  reps: number;
  lapses: number;
};

export type Rating = "again" | "hard" | "medium" | "easy";
