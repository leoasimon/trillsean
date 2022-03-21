import { PageHeader } from "antd";
import { ContestantIds, Contestants, Player } from "features/players/types";
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

  const [contestantIds, setContestantIds] = useState<ContestantIds>();
  const [contestants, setContestants] = useState<Contestants>();
  const [confirmedWinner, setConfirmedWinner] = useState<Player>();
  const [previousScores, setPreviousScores] = useState(scores);

  const [playerOneId, playerTwoId] = contestantIds || [];

  useEffect(() => {
    if (contestantIds !== undefined) {
      const playerOne = team.players.find(
        (player) => player.id === playerOneId
      );
      const playerTwo = team.players.find(
        (player) => player.id === playerTwoId
      );

      if (playerOne && playerTwo) {
        setContestants([playerOne, playerTwo]);
      }
    }
  }, [contestantIds, playerOneId, playerTwoId, team]);

  const handleWinnerSelection = (winner: Player, contestants: Contestants) => {
    const [playerOne, playerTwo] = contestants;
    const matchResult: MatchResult = {
      contestantIds: [playerOne.id, playerTwo.id],
      winner: winner.id,
    };
    setPreviousScores(scores);
    dispatch(add(matchResult));
    dispatch(updateScores(matchResult));
    setContestants(undefined);
    setConfirmedWinner(winner);
  };

  const onBack = () => {
    if (!contestants) {
      navigate("/team");
    } else {
      setContestants(undefined);
    }
  };

  if (team) {
    const title =
      contestants === undefined ? "Select contestants" : "Select a winner";
    return (
      <>
        <PageHeader title={title} onBack={onBack} />
        {!contestants ? (
          <ContestantSelector team={team} setContestantIds={setContestantIds} />
        ) : (
          <WinnerSelection
            contestants={contestants}
            handleWinnerSelection={handleWinnerSelection}
          />
        )}
        <WinnerModal
          confirmedWinner={confirmedWinner}
          quit={() => setConfirmedWinner(undefined)}
          previousScore={
            confirmedWinner ? previousScores[confirmedWinner.id] : 0
          }
          score={confirmedWinner ? scores[confirmedWinner.id] || 0 : 0}
          victories={
            confirmedWinner ? getVictories(matches, confirmedWinner.id) : 0
          }
        />
      </>
    );
  }
  return <div />;
};

export default GamePage;
