import React, { useState } from "react";
import ContestantSelector from "../../features/team/components/contestantSelector";

import { Contestant, Team } from "../../features/team/types";

interface GamePageProps {
  team: Team;
}

const GamePage: React.FC<GamePageProps> = ({ team }) => {
  const [contestant, setContestant] = useState<Contestant>({
    playerOne: null,
    playerTwo: null,
  });

  console.log({ contestant });
  return contestant.playerOne === null ? (
    <ContestantSelector team={team} setContestant={setContestant} />
  ) : (
    <div>Let's play</div>
  );
};

export default GamePage;
