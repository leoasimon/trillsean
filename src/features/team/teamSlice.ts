import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import createPlayer from "features/players/createPlayer";
import { PlayerFormValues } from "features/players/types";
import { filter } from "ramda";
import { RootState } from "../../app/store";
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

export const teamSlice = createSlice({
  name: "team",
  initialState,
  reducers: {
    addPlayer: (state, action: PayloadAction<PlayerFormValues>) => {
      state.status = "idle";
      state.value.players.push(createPlayer(action.payload));
    },
    deletePlayer: (state, action: PayloadAction<string>) => {
      state.status = "idle";
      state.value.players = state.value.players.filter((player) => {
        return player.id !== action.payload;
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
});

export const { addPlayer, deletePlayer, updatePlayer, updateName } =
  teamSlice.actions;

export const selectTeam = (state: RootState) => state.team.value;

export default teamSlice.reducer;
