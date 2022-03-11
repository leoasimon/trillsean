import React, { useEffect, useState } from "react";
import ContestantSelector from "../../features/team/components/contestantSelector";
import WinnerSelection from "../../features/match/components/winnerSelection";

import { Contestant, ContestantNames, Player } from "../../features/team/types";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectTeam } from "../../features/team/teamSlice";
import { PageHeader } from "antd";
import { MatchResult } from "../../features/match/types";
import { add } from "../../features/match/matchSlice";
import { updateScores } from "../../features/score/scoreSlice";

const GamePage: React.FC = () => {
  const team = useAppSelector(selectTeam);
  const dispatch = useAppDispatch();

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
  }, [contestantNames, playerOneName, playerTwoName, team.players]);

  const handleWinnerSelection = (winner: Player, contestant: Contestant) => {
    const [playerOne, playerTwo] = contestant;
    const matchResult: MatchResult = {
      contestant: [playerOne.name, playerTwo.name],
      winner: winner.name,
    };
    dispatch(add(matchResult));
    dispatch(updateScores(matchResult));
    setContestant(undefined);
  };

  return (
    <PageHeader
      title={team.name}
      subTitle={contestant ? "Select a winner" : ""}
    >
      {!contestant ? (
        <ContestantSelector
          team={team}
          setContestantNames={setContestantNames}
        />
      ) : (
        <WinnerSelection
          contestant={contestant}
          handleWinnerSelection={handleWinnerSelection}
        />
      )}
    </PageHeader>
  );
};

export default GamePage;
