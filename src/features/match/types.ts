import { ContestantNames } from "../team/types";

type ContestantName = string;

export interface Match {
  contestant: ContestantNames;
  winner: ContestantName;
  date: number;
}

export interface MatchResult {
  contestant: ContestantNames;
  winner: ContestantName;
}
