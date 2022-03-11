import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../../app/store";
import { Team, TeamForm } from "./types";

const initialState: Team = {
  name: "Team name",
  players: [
    {
      name: "Player 1",
      avatar: "https://avatars.dicebear.com/api/avataaars/Player 1.svg",
    },
    {
      name: "Player 2",
      avatar: "https://avatars.dicebear.com/api/avataaars/Player 2.svg",
    },
  ],
  draft: true,
};

export const teamSlice = createSlice({
  name: "team",
  initialState,
  reducers: {
    create: (state, action: PayloadAction<TeamForm>) => {
      state.draft = false;
      state.name = action.payload.name;
      state.players = action.payload.players;
    },
  },
});

export const { create } = teamSlice.actions;

export const selectTeam = (state: RootState) => state.team;

export default teamSlice.reducer;
