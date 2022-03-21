import { ContestantIds } from "features/players/types";

type ContestantId = string;

export interface Match {
  contestantIds: ContestantIds;
  winner: ContestantId;
  date: number;
}

export interface MatchResult {
  contestantIds: ContestantIds;
  winner: ContestantId;
}
