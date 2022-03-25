import { Divider, PageHeader, Space, Switch } from "antd";
import { selectAllPlayers } from "features/team/teamSlice";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { selectMatches } from "../../features/match/matchSlice";
import ScoreBoard from "../../features/score/components/scoreBoard";
import { selectScores } from "../../features/score/scoreSlice";

const ScoreBoardPage: React.FC = () => {
  const matches = useAppSelector(selectMatches);
  const players = useAppSelector(selectAllPlayers);
  const { all, active } = useAppSelector(selectScores);
  const [showArchived, setShowArchived] = useState(false);
  const navigate = useNavigate();

  const toggleArchived = (checked: boolean) => setShowArchived(checked);

  const scores = showArchived ? all : active;

  const showToggle = Object.keys(all).length > Object.keys(active).length;

  return (
    <>
      <PageHeader title={"Score board"} onBack={() => navigate("/game")} />
      <Divider />
      {showToggle && (
        <Space>
          <span>{`${
            showArchived ? "Hide" : "Show"
          } deleted player scores`}</span>
          <Switch onChange={toggleArchived} />
        </Space>
      )}
      <ScoreBoard matches={matches} scores={scores} players={players} />
    </>
  );
};

export default ScoreBoardPage;
