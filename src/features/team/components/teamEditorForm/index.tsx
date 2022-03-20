import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { Avatar, Button, Form, List, Space } from "antd";
import { generateAvatarUrl } from "features/team/avatar";
import { teamEditorSchema } from "features/team/schemas";
import usePlayerNames from "features/team/usePlayerNames";
import { Field, FieldArray, Formik, FormikProps } from "formik";
import * as R from "ramda";
import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { debounce } from "utils";
import { useAppDispatch } from "../../../../app/hooks";
import { initiate } from "../../../score/scoreSlice";
import { create } from "../../teamSlice";
import { Player, Team, TeamForm } from "../../types";

interface TeamEditorFormProps {
  team?: Team;
}

const F: React.FC<FormikProps<TeamForm>> = ({
  values,
  setFieldValue,
  errors,
  isValid,
  isSubmitting,
  submitForm,
}) => {
  const pickRandomName = usePlayerNames();
  const previousRef = useRef<Player[]>(values.players);

  const teamNameError = errors.name;

  useEffect(() => {
    const updatePlayerAvatar = () => {
      if (values.players.length === previousRef.current.length) {
        const diffPlayerIndex = values.players.reduce((acc, player, index) => {
          const previousName = (previousRef.current as Player[])[index].name;
          if (previousName !== player.name) {
            return index;
          }
          return acc;
        }, -1);
        if (diffPlayerIndex > -1) {
          setFieldValue(
            `players.${diffPlayerIndex}.avatar`,
            generateAvatarUrl(values.players[diffPlayerIndex].name)
          );
        }
      }
      previousRef.current = values.players;
    };
    debounce(updatePlayerAvatar, 500)();
  }, [values.players]);

  return (
    <Form layout="vertical" onFinish={submitForm}>
      <Form.Item
        label="Team name"
        required
        validateStatus={teamNameError !== undefined ? "error" : "success"}
        help={teamNameError}
      >
        <Field type="input" name="name" />
      </Form.Item>
      <Form.Item label="Players" required>
        <FieldArray name="players">
          {(arrayHelper) => {
            return (
              <Space direction="vertical">
                <List
                  dataSource={values.players.map((player, index) => ({
                    ...player,
                    key: index,
                  }))}
                  renderItem={(item) => {
                    const error: string | undefined = R.path(
                      [item.key, "name"],
                      errors.players
                    );
                    return (
                      <Form.Item
                        key={item.key}
                        validateStatus={
                          error !== undefined ? "error" : "success"
                        }
                        help={error}
                      >
                        <Space key={item.key}>
                          <Field name={`players.${item.key}.name`} />
                          <Avatar src={item.avatar} />
                          <Button
                            icon={<DeleteOutlined />}
                            onClick={() => arrayHelper.remove(item.key)}
                            style={{
                              visibility:
                                values.players.length > 2
                                  ? "visible"
                                  : "hidden",
                            }}
                          />
                        </Space>
                      </Form.Item>
                    );
                  }}
                />
                <Button
                  icon={<PlusOutlined />}
                  onClick={() => {
                    const name = pickRandomName();
                    arrayHelper.push({
                      name,
                      avatar: generateAvatarUrl(name),
                    });
                  }}
                >
                  Add a player
                </Button>
              </Space>
            );
          }}
        </FieldArray>
      </Form.Item>

      <Button
        type="primary"
        htmlType="submit"
        disabled={!isValid || isSubmitting}
      >
        Save
      </Button>
    </Form>
  );
};

const defaultValues: Team = {
  name: "Team name",
  players: [
    {
      name: "Player 1",
      avatar: generateAvatarUrl("Player 1"),
    },
    {
      name: "Player 2",
      avatar: generateAvatarUrl("Player 2"),
    },
  ],
};

const TeamEditorForm: React.FC<TeamEditorFormProps> = ({ team }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onFinish = (team: TeamForm) => {
    dispatch(create(team));
    dispatch(initiate(team.players));
    navigate("/game");
  };

  const initialValues = team === undefined ? defaultValues : team;
  return (
    <Space direction="vertical">
      <Formik<TeamForm>
        initialValues={initialValues}
        validationSchema={teamEditorSchema}
        onSubmit={onFinish}
      >
        {(props) => <F {...props} />}
      </Formik>
    </Space>
  );
};

export default TeamEditorForm;
