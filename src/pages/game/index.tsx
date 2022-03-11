import React, { useEffect, useState } from "react";
import ContestantSelector from "../../features/team/components/contestantSelector";
import WinnerSelection from "../../features/match/components/winnerSelection";

import { Contestant, ContestantNames, Team } from "../../features/team/types";

interface GamePageProps {
  team: Team;
}

const GamePage: React.FC<GamePageProps> = ({ team }) => {
  const [contestantNames, setContestantNames] = useState<ContestantNames>();

  const [contestant, setContestant] = useState<Contestant>();

  const [playerOneName, playerTwoName] = contestantNames || [];

  useEffect(() => {
    if (contestantNames !== undefined) {
      const playerOne = team.players.find(
        (player) => player.name === playerOneName
      );
      const playerTwo = team.players.find(
        (player) => player.name === playerTwoName
      );

      if (playerOne && playerTwo) {
        setContestant([playerOne, playerTwo]);
      }
    }
  }, [contestantNames]);

  return !contestant ? (
    <ContestantSelector team={team} setContestantNames={setContestantNames} />
  ) : (
    <WinnerSelection contestant={contestant} />
  );
};

export default GamePage;
