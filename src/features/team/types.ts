import { Player } from "features/players/types";

export interface Team {
  name: string;
  players: Player[];
}

export interface TeamForm {
  name: string;
  players: Player[];
}

export type Contestant = [Player, Player];

export type ContestantNames = [string, string];
