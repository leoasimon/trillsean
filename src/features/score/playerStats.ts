import { Match } from "../match/types";

interface PlayerStats {
  [playerId: string]: {
    wins: number;
    defeats: number;
  };
}

// TODO v2: handle pat games?
export const getPlayerStats = (matches: Match[]): PlayerStats => {
  const playerStats: PlayerStats = {};
  matches.forEach((match) => {
    const [playerOneId, playerTwoId] = match.contestantIds;

    const playerOneWin = playerOneId === match.winner;

    if (playerOneId in playerStats) {
      if (playerOneWin) {
        playerStats[playerOneId].wins += 1;
      } else {
        playerStats[playerOneId].defeats += 1;
      }
    } else {
      playerStats[playerOneId] = {
        wins: playerOneWin ? 1 : 0,
        defeats: playerOneWin ? 0 : 1,
      };
    }

    if (playerTwoId in playerStats) {
      if (playerOneWin) {
        playerStats[playerTwoId].defeats += 1;
      } else {
        playerStats[playerTwoId].wins += 1;
      }
    } else {
      playerStats[playerTwoId] = {
        wins: playerOneWin ? 0 : 1,
        defeats: playerOneWin ? 1 : 0,
      };
    }
  });

  return playerStats;
};
