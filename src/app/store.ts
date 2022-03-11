import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import teamReducer from "../features/team/teamSlice";
import matchReducer from "../features/match/matchSlice";
import scoreReducer from "../features/score/scoreSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    team: teamReducer,
    match: matchReducer,
    score: scoreReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
