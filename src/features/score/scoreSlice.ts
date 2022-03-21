import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import * as R from "ramda";
import { RootState } from "../../app/store";
import { MatchResult } from "../match/types";
import { eloRating } from "./eloRating";
import { Scores, UpdatedScores } from "./types";

const initialState: Scores = {};

export const updateScores = createAsyncThunk<
  UpdatedScores,
  MatchResult,
  {
    state: RootState;
  }
>("score/update", (matchResult, thunkAPI) => {
  const state = thunkAPI.getState();
  const { contestantIds, winner } = matchResult;
  const winnerIndex = contestantIds.indexOf(winner);
  const [playerOneId, playerTwoId] = contestantIds;
  const ra = state.score[playerOneId];
  const rb = state.score[playerTwoId];

  // TODO: undestand why k = 30
  // https://www.geeksforgeeks.org/elo-rating-algorithm/
  return eloRating(ra, rb, 30, winnerIndex + 1);
});

// Initial ELO score: https://stackoverflow.com/questions/1881310/elo-rating-system-start-value-when-players-can-join-the-game-constantly
const scoreSlice = createSlice({
  name: "score",
  initialState,
  reducers: {
    initiatePlayerScore: (state, action: PayloadAction<string>) => {
      state[action.payload] = 1000;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(updateScores.fulfilled, (state, action) => {
      const { contestantIds } = action.meta.arg;
      const [playerOneId, playerTwoId] = contestantIds;
      const [playerOneUpdatedScore, playerTwoUpdatedScore] = action.payload;

      state[playerOneId] = playerOneUpdatedScore;
      state[playerTwoId] = playerTwoUpdatedScore;
    });
  },
});

const selectAllScores = (state: RootState) => state.score;

export const selectActivePlayersScores = (state: RootState) => {
  const { team, score } = state;
  const activePlayerNames = R.map(R.prop("id"))(team.value?.players || []);
  return R.pick(activePlayerNames, score);
};

export const selectScores = (state: RootState) => ({
  all: selectAllScores(state),
  active: selectActivePlayersScores(state),
});

export const { initiatePlayerScore } = scoreSlice.actions;

export default scoreSlice.reducer;
