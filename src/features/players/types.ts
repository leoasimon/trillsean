export interface Player {
  id: string;
  name: string;
  avatar: string;
  active: boolean;
}

export interface PlayerFormValues {
  name: string;
}

export type Contestants = [Player, Player];

export type ContestantIds = [string, string];
