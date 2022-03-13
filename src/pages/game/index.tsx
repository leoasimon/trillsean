import { PageHeader } from "antd";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import WinnerModal from "../../features/match/components/winnerModal";
import WinnerSelection from "../../features/match/components/winnerSelection";
import { add } from "../../features/match/matchSlice";
import { MatchResult } from "../../features/match/types";
import { updateScores } from "../../features/score/scoreSlice";
import ContestantSelector from "../../features/team/components/contestantSelector";
import { selectTeam } from "../../features/team/teamSlice";
import { Contestant, ContestantNames, Player } from "../../features/team/types";

const GamePage: React.FC = () => {
  const team = useAppSelector(selectTeam);
  const dispatch = useAppDispatch();

  const [contestantNames, setContestantNames] = useState<ContestantNames>();
  const [contestant, setContestant] = useState<Contestant>();
  const [confirmedWinner, setConfirmedWinner] = useState<Player>();

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
    setConfirmedWinner(winner);
  };

  return (
    <>
      <PageHeader
        title={team.name}
        subTitle={contestant ? "Select a winner" : ""}
      />
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
      <WinnerModal
        confirmedWinner={confirmedWinner}
        quit={() => setConfirmedWinner(undefined)}
      />
    </>
  );
};

export default GamePage;
