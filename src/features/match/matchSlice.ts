import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { Match, MatchResult } from "./types";

const initialState: Match[] = [];

export const matchSlice = createSlice({
  name: "match",
  initialState,
  reducers: {
    add: (state, action: PayloadAction<MatchResult>) => {
      state.push({
        contestantIds: action.payload.contestantIds,
        winner: action.payload.winner,
        date: Date.now(),
      });
    },
  },
});

export const { add } = matchSlice.actions;

export const selectMatches = (state: RootState) => state.match;

export default matchSlice.reducer;
