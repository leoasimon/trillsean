import React from "react";

import "./App.css";
import { useAppSelector } from "./app/hooks";
import TeamCreator from "./features/team/components/teamCreator";
import { selectTeam } from "./features/team/teamSlice";
import GamePage from "./pages/game";

function App() {
  const team = useAppSelector(selectTeam);

  return (
    <div className="App">
      {team.draft ? <TeamCreator team={team} /> : <GamePage team={team} />}
    </div>
  );
}

export default App;
