import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, List, Space } from "antd";
import { generateAvatarUrl } from "features/team/avatar";
import { teamEditorSchema } from "features/team/schemas";
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

const defaultValues: Team = {
  name: "",
  players: [
    {
      name: "",
      avatar: generateAvatarUrl(""),
    },
    {
      name: "",
      avatar: generateAvatarUrl(""),
    },
  ],
};

const F: React.FC<FormikProps<TeamForm>> = ({
  values,
  setFieldValue,
  errors,
  isValid,
  isSubmitting,
  submitForm,
  isInitialValid,
  touched,
}) => {
  const previousRef = useRef<Player[]>(values.players);

  const teamNameError = errors.name;
  const teamNameTouched = touched.name;

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
  }, [values.players, setFieldValue]);

  return (
    <Form layout="vertical" onFinish={submitForm}>
      <Form.Item
        validateStatus={
          teamNameError !== undefined && teamNameTouched ? "error" : "success"
        }
        help={teamNameError}
      >
        <Field type="input" name="name" placeholder="Team name" autoFocus />
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
                    const nameTouched = R.path([item.key, "name"])(
                      touched.players
                    );
                    return (
                      <List.Item
                        key={item.key}
                        actions={[
                          <Button
                            type="text"
                            icon={<DeleteOutlined />}
                            onClick={() => arrayHelper.remove(item.key)}
                            style={{
                              visibility:
                                values.players.length > 2
                                  ? "visible"
                                  : "hidden",
                            }}
                          />,
                        ]}
                      >
                        <Form.Item
                          validateStatus={
                            error && nameTouched ? "error" : "success"
                          }
                          help={nameTouched ? error : ""}
                          style={{ marginBottom: 0 }}
                        >
                          <Field
                            name={`players.${item.key}.name`}
                            placeholder={`Player ${item.key + 1}`}
                          />
                        </Form.Item>
                      </List.Item>
                    );
                  }}
                  footer={[
                    <Button
                      icon={<PlusOutlined />}
                      block
                      size="large"
                      // shape="circle"
                      onClick={() => {
                        arrayHelper.push({
                          name: "",
                          avatar: generateAvatarUrl(""),
                        });
                      }}
                    >
                      Add a player
                    </Button>,
                  ]}
                />
              </Space>
            );
          }}
        </FieldArray>
      </Form.Item>

      <div className="form-footer">
        <Button
          type="primary"
          htmlType="submit"
          size="large"
          disabled={(!isValid && !isInitialValid) || isSubmitting}
        >
          Save
        </Button>
      </div>
    </Form>
  );
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
