import { Table } from "antd";
import { Player } from "features/players/types";
import { Scores } from "features/score/types";
import * as R from "ramda";
import React from "react";
import { Match } from "../../../match/types";
import { getPlayerStats } from "../../playerStats";

interface ScoreBoardProps {
  scores: Scores;
  matches: Match[];
  players: Player[];
}

const bySecondItem = R.descend((tuple: [a: any, b: any]) => tuple[1]);
const sortBySecondItem = R.sort(bySecondItem);

// TODO v2: add player name input filter
// TODO v2: add sort buttons on score / wins / defeats
const ScoreBoard: React.FC<ScoreBoardProps> = ({
  matches,
  scores,
  players,
}) => {
  const playerStats = getPlayerStats(matches);
  const pairedScores = R.toPairs(scores);
  const sortedPairedScores = sortBySecondItem(pairedScores);

  const dataSource = sortedPairedScores.map(([playerId, score]) => {
    const player = players.find((player) => player.id === playerId);
    const playerName = player?.name || "";
    return {
      key: playerName,
      playerName: playerName,
      score: Math.round(score),
      wins: playerName in playerStats ? playerStats[playerName].wins : 0,
      defeats: playerName in playerStats ? playerStats[playerName].defeats : 0,
    };
  });

  const columns = [
    {
      title: "Player name",
      dataIndex: "playerName",
      key: "playerName",
    },
    {
      title: "Score",
      dataIndex: "score",
      key: "score",
    },
    {
      title: "Wins",
      dataIndex: "wins",
      key: "wins",
    },
    {
      title: "Defeats",
      dataIndex: "defeats",
      key: "defeats",
    },
  ];

  return <Table columns={columns} dataSource={dataSource} pagination={false} />;
};

export default ScoreBoard;
