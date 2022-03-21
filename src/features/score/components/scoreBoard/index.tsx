import React from "react";
import { Table } from "antd";

import { Scores } from "../../scoreSlice";
import { Match } from "../../../match/types";
import { getPlayerStats } from "../../playerStats";

interface ScoreBoardProps {
  scores: Scores;
  matches: Match[];
}

// TODO v2: add player name input filter
// TODO v2: add sort buttons on score / wins / defeats
const ScoreBoard: React.FC<ScoreBoardProps> = ({ matches, scores }) => {
  const playerStats = getPlayerStats(matches);
  const dataSource = Object.keys(scores).map((playerName) => {
    return {
      key: playerName,
      playerName: playerName,
      score: Math.round(scores[playerName]),
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
