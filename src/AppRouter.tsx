import React from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";

import { useAppSelector } from "./app/hooks";
import { selectTeam } from "./features/team/teamSlice";
import GamePage from "./pages/game";
import ScoreBoardPage from "./pages/scoreBoard";
import TeamEditorPage from "./pages/teamEditor";

const RequireAuth: React.FC = ({ children }) => {
  const team = useAppSelector(selectTeam);

  const location = useLocation();

  if (!team || team.draft === true) {
    // Redirect them to the / page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route path="/team" element={<TeamEditorPage />} />
      <Route
        path="game"
        element={
          <RequireAuth>
            <GamePage />
          </RequireAuth>
        }
      />

      <Route
        path="score-board"
        element={
          <RequireAuth>
            <ScoreBoardPage />
          </RequireAuth>
        }
      />
      <Route path="*" element={<Navigate to="/team" />} />
    </Routes>
  );
};

export default AppRouter;
