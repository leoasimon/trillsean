import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../../app/store";
import { generateAvatarUrl } from "./avatar";
import { Team, TeamForm } from "./types";

interface TeamState {
  status: "idle" | "loading" | "error";
  value?: Team;
}

const initialState: TeamState = {
  status: "idle",
};

export const teamSlice = createSlice({
  name: "team",
  initialState,
  reducers: {
    create: (state, action: PayloadAction<TeamForm>) => {
      state.status = "idle";
      state.value = action.payload;
    },
  },
});

export const { create } = teamSlice.actions;

export const selectTeam = (state: RootState) => state.team.value;

export default teamSlice.reducer;
