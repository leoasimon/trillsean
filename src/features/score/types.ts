export interface Score {
  playerName: string;
  score: number;
}

export interface Scores {
  [playerName: string]: number;
}

export type UpdatedScores = [number, number];
