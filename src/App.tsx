import React from "react";

import "./App.css";
import { useAppSelector } from "./app/hooks";
import TeamCreator from "./features/team/components/teamCreator";
import { selectTeam } from "./features/team/teamSlice";

function App() {
  const team = useAppSelector(selectTeam);

  return (
    <div className="App">
      {team.draft ? <TeamCreator /> : <div>Let's play </div>}
    </div>
  );
}

export default App;
