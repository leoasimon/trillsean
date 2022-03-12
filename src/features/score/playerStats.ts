import { Match } from "../match/types";

interface PlayerStats {
  [playerName: string]: {
    wins: number;
    defeats: number;
  };
}

// TODO: handle pat games?
export const getPlayerStats = (matches: Match[]): PlayerStats => {
  const playerStats: PlayerStats = {};
  matches.forEach((match) => {
    const [playerOneName, playerTwoName] = match.contestant;

    const playerOneWin = playerOneName === match.winner;

    if (playerOneName in playerStats) {
      if (playerOneWin) {
        playerStats[playerOneName].wins += 1;
      } else {
        playerStats[playerOneName].defeats += 1;
      }
    } else {
      playerStats[playerOneName] = {
        wins: playerOneWin ? 1 : 0,
        defeats: playerOneWin ? 0 : 1,
      };
    }

    if (playerTwoName in playerStats) {
      if (playerOneWin) {
        playerStats[playerTwoName].defeats += 1;
      } else {
        playerStats[playerTwoName].wins += 1;
      }
    } else {
      playerStats[playerTwoName] = {
        wins: playerOneWin ? 0 : 1,
        defeats: playerOneWin ? 1 : 0,
      };
    }
  });

  return playerStats;
};
