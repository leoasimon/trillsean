import { Divider, PageHeader, Space } from "antd";
import React from "react";
import { useAppSelector } from "../../app/hooks";
import TeamEditorForm from "../../features/team/components/teamEditorForm";
import { selectTeam } from "../../features/team/teamSlice";

const TeamEditorPage: React.FC = () => {
  const team = useAppSelector(selectTeam);

  return (
    <Space direction="vertical">
      <PageHeader title={"Your team"} />
      <Divider />
      <TeamEditorForm team={team} />
    </Space>
  );
};

export default TeamEditorPage;
