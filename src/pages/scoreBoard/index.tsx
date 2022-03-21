import React, { useState } from "react";
import { Button, PageHeader } from "antd";

import { useAppSelector } from "../../app/hooks";
import { selectMatches } from "../../features/match/matchSlice";
import ScoreBoard from "../../features/score/components/scoreBoard";
import { selectScores } from "../../features/score/scoreSlice";
import { useNavigate } from "react-router-dom";

const ScoreBoardPage: React.FC = () => {
  const matches = useAppSelector(selectMatches);
  const { all, active } = useAppSelector(selectScores);
  const [showArchived, setShowArchived] = useState(false);
  const navigate = useNavigate();

  const toggleArchived = () => setShowArchived(!showArchived);

  const scores = showArchived ? all : active;
  return (
    <>
      <PageHeader title={"Score board"} onBack={() => navigate("/game")} />
      <Button onClick={toggleArchived}>
        {showArchived
          ? "Hide players no longer on the team"
          : "Show all player scores"}
      </Button>
      <ScoreBoard matches={matches} scores={scores} />
    </>
  );
};

export default ScoreBoardPage;
