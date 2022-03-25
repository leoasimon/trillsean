import { Input, Space, Typography } from "antd";
import { Player } from "features/players/types";
import { ErrorMessage, Field, FieldProps } from "formik";
import * as R from "ramda";
import React from "react";

interface PlayerEditorFormProps {
  player?: Player;
  playerNames: string[];
}

// TODO v2: Avatar selection
const PlayerEditorForm: React.FC<PlayerEditorFormProps> = ({
  player,
  playerNames,
}) => {
  const title = player ? "Update player" : "Create player";

  return (
    <Space direction="vertical">
      <Typography.Title level={3}>{title}</Typography.Title>
      <Field
        name="name"
        validate={(value: string) => {
          const foundName = playerNames.find(R.equals(value));
          if (foundName !== undefined) {
            return `${foundName} is already taken`;
          }
        }}
      >
        {({ field }: FieldProps<string>) => {
          return <Input {...field} placeholder="Player name" />;
        }}
      </Field>
      <ErrorMessage name="name" />
    </Space>
  );
};

export default PlayerEditorForm;
