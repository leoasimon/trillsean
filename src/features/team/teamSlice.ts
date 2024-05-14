import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import newPlayer from "features/players/createPlayer";
import { Player, PlayerFormValues } from "features/players/types";
import { initiatePlayerScore } from "features/score/scoreSlice";
import * as R from "ramda";
import { AppDispatch, RootState } from "../../app/store";
import { Team } from "./types";

interface TeamState {
  status: "idle" | "loading" | "error";
  value: Team;
}

const initialState: TeamState = {
  status: "idle",
  value: {
    name: "",
    players: [],
  },
};

export const addPlayer = createAsyncThunk<
  Player,
  PlayerFormValues,
  {
    state: RootState;
    dispatch: AppDispatch;
  }
>("team/createPlayer", async (playerFormValues, thunkApi) => {
  const player = await newPlayer(playerFormValues);
  thunkApi.dispatch(initiatePlayerScore(player.id));
  return player;
});

export const teamSlice = createSlice({
  name: "team",
  initialState,
  reducers: {
    deletePlayer: (state, action: PayloadAction<string>) => {
      state.status = "idle";
      state.value.players = state.value.players.map((player) => {
        if (player.id === action.payload) {
          return { ...player, active: false };
        }
        return player;
      });
    },
    updatePlayer: (
      state,
      action: PayloadAction<{ id: string; player: PlayerFormValues }>
    ) => {
      state.status = "idle";
      state.value.players = state.value.players.map((player) => {
        if (player.id === action.payload.id) {
          return { ...player, ...action.payload.player };
        }
        return player;
      });
    },
    updateName: (state, action: PayloadAction<string>) => {
      state.status = "idle";
      state.value.name = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addPlayer.fulfilled, (state, action) => {
      state.value.players.push(action.payload);
    });
  },
});

export const { deletePlayer, updatePlayer, updateName } = teamSlice.actions;

export const selectTeam = (state: RootState) => ({
  ...state.team.value,
  players: state.team.value.players.filter(R.prop("active")),
});
export const selectActivePlayers = (state: RootState) =>
  state.team.value.players.filter(R.prop("active"));
export const selectAllPlayers = (state: RootState) => state.team.value.players;

export default teamSlice.reducer;
