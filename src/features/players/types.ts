export interface Player {
  id: string;
  name: string;
  avatar: string;
}

export interface PlayerFormValues {
  name: string;
}

export type Contestants = [Player, Player];

export type ContestantIds = [string, string];
