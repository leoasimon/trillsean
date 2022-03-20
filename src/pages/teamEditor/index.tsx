import React from "react";
import { PageHeader } from "antd";

import { useAppSelector } from "../../app/hooks";
import TeamEditorForm from "../../features/team/components/teamEditorForm";
import { selectTeam } from "../../features/team/teamSlice";

const TeamEditorPage: React.FC = () => {
  const team = useAppSelector(selectTeam);

  const title = team === undefined ? " Create your team" : "Update your team";
  return (
    <>
      <PageHeader title={title} />
      <TeamEditorForm team={team} />
    </>
  );
};

export default TeamEditorPage;
