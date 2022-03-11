export interface Player {
  name: string;
  avatar: string;
}

export interface Team {
  name: string;
  players: Player[];
  draft: boolean;
}

export interface TeamForm {
  name: string;
  players: Player[];
}

export type Contestant = [Player, Player];

export type ContestantNames = [string, string];
