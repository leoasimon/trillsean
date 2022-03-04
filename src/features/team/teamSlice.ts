import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface Player {
  name: string;
}

export interface Team {
  name: string;
  players: Player[];
}

const initialState: Team = {
  name: "Team name",
  players: [{ name: "Player 1" }, { name: "Player 2" }],
};

export const teamSlice = createSlice({
  name: "team",
  initialState,
  reducers: {
    create: (state, action: PayloadAction<Team>) => {
      state = action.payload;
    },
  },
});

export const { create } = teamSlice.actions;

export const selectTeam = (state: RootState) => state.team;

export default teamSlice.reducer;
