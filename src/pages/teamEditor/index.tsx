import { PageHeader, Space } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import TeamEditorForm from "../../features/team/components/teamEditorForm";
import { selectTeam } from "../../features/team/teamSlice";

const TeamEditorPage: React.FC = () => {
  const team = useAppSelector(selectTeam);

  return (
    <Space direction="vertical">
      <PageHeader title={"Your team"} />
      <TeamEditorForm team={team} />
      {team.players.length >= 2 && <Link to="/game">Play</Link>}
    </Space>
  );
};

export default TeamEditorPage;
