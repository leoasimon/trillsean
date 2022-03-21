import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import * as R from "ramda";
import { AppDispatch, RootState } from "../../app/store";
import { MatchResult } from "../match/types";
import { Player } from "../team/types";
import { eloRating } from "./eloRating";
import { Scores, UpdatedScores } from "./types";

const initialState: Scores = {};

export const updateScores = createAsyncThunk<
  UpdatedScores,
  MatchResult,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>("score/update", (matchResult, thunkAPI) => {
  const state = thunkAPI.getState();
  const { contestant, winner } = matchResult;
  const winnerIndex = contestant.indexOf(winner);
  const [playerOneName, playerTwoName] = contestant;
  const ra = state.score[playerOneName];
  const rb = state.score[playerTwoName];

  // TODO: undestand why k = 30
  // https://www.geeksforgeeks.org/elo-rating-algorithm/
  return eloRating(ra, rb, 30, winnerIndex + 1);
});

// Initial ELO score: https://stackoverflow.com/questions/1881310/elo-rating-system-start-value-when-players-can-join-the-game-constantly
const scoreSlice = createSlice({
  name: "score",
  initialState,
  reducers: {
    initiate: (state, action: PayloadAction<Player[]>) => {
      action.payload.forEach((player) => {
        state[player.name] = 1000;
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(updateScores.fulfilled, (state, action) => {
      const { contestant } = action.meta.arg;
      const [playerOneName, playerTwoName] = contestant;
      const [playerOneUpdatedScore, playerTwoUpdatedScore] = action.payload;

      state[playerOneName] = playerOneUpdatedScore;
      state[playerTwoName] = playerTwoUpdatedScore;
    });
  },
});

const selectAllScores = (state: RootState) => state.score;

export const selectActivePlayersScores = (state: RootState) => {
  const { team, score } = state;
  const activePlayerNames = R.map(R.prop("name"))(team.value?.players || []);
  return R.pick(activePlayerNames, score);
};

export const selectScores = (state: RootState) => ({
  all: selectAllScores(state),
  active: selectActivePlayersScores(state),
});

export const { initiate } = scoreSlice.actions;

export default scoreSlice.reducer;
