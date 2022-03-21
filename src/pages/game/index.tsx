import { PageHeader } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import WinnerModal from "../../features/match/components/winnerModal";
import WinnerSelection from "../../features/match/components/winnerSelection";
import { add, selectMatches } from "../../features/match/matchSlice";
import { Match, MatchResult } from "../../features/match/types";
import {
  selectActivePlayersScores,
  updateScores,
} from "../../features/score/scoreSlice";
import ContestantSelector from "../../features/team/components/contestantSelector";
import { selectTeam } from "../../features/team/teamSlice";
import { Contestant, ContestantNames, Player } from "../../features/team/types";

const getVictories = (matches: Match[], playerName: string) => {
  return matches.reduce((acc, match) => {
    return match.winner === playerName ? acc + 1 : acc;
  }, 0);
};

const GamePage: React.FC = () => {
  const team = useAppSelector(selectTeam);
  const scores = useAppSelector(selectActivePlayersScores);
  const matches = useAppSelector(selectMatches);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [contestantNames, setContestantNames] = useState<ContestantNames>();
  const [contestant, setContestant] = useState<Contestant>();
  const [confirmedWinner, setConfirmedWinner] = useState<Player>();
  const [previousScores, setPreviousScores] = useState(scores);

  const [playerOneName, playerTwoName] = contestantNames || [];

  useEffect(() => {
    if (contestantNames !== undefined && team !== undefined) {
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
  }, [contestantNames, playerOneName, playerTwoName, team]);

  const handleWinnerSelection = (winner: Player, contestant: Contestant) => {
    const [playerOne, playerTwo] = contestant;
    const matchResult: MatchResult = {
      contestant: [playerOne.name, playerTwo.name],
      winner: winner.name,
    };
    setPreviousScores(scores);
    dispatch(add(matchResult));
    dispatch(updateScores(matchResult));
    setContestant(undefined);
    setConfirmedWinner(winner);
  };

  const onBack = () => {
    if (!contestant) {
      navigate("/team");
    } else {
      setContestant(undefined);
    }
  };

  if (team) {
    const title =
      contestant === undefined ? "Select contestants" : "Select a winner";
    return (
      <>
        <PageHeader title={title} onBack={onBack} />
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
          previousScore={
            confirmedWinner ? previousScores[confirmedWinner.name] : 0
          }
          score={confirmedWinner ? scores[confirmedWinner.name] || 0 : 0}
          victories={
            confirmedWinner ? getVictories(matches, confirmedWinner.name) : 0
          }
        />
      </>
    );
  }
  return <div />;
};

export default GamePage;
