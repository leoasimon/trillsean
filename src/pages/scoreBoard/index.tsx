import React from "react";
import { PageHeader } from "antd";

import { useAppSelector } from "../../app/hooks";
import { selectMatches } from "../../features/match/matchSlice";
import ScoreBoard from "../../features/score/components/scoreBoard";
import { selectScores } from "../../features/score/scoreSlice";

const ScoreBoardPage: React.FC = () => {
  const matches = useAppSelector(selectMatches);
  const scores = useAppSelector(selectScores);

  return (
    <>
      <PageHeader title={"Score board"} />
      <ScoreBoard matches={matches} scores={scores} />
    </>
  );
};

export default ScoreBoardPage;
