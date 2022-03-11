import React from "react";
import { Avatar, Button, Form, Input, List, Space } from "antd";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { useForm } from "antd/lib/form/Form";

import { useAppDispatch } from "../../../../app/hooks";
import { create } from "../../teamSlice";
import { Player, Team } from "../../types";
import { initiate } from "../../../score/scoreSlice";
import { useNavigate } from "react-router-dom";

interface TeamEditorFormProps {
  team: Team;
}

const TeamEditorForm: React.FC<TeamEditorFormProps> = ({ team }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onFinish = (team: Team) => {
    dispatch(create(team));
    dispatch(initiate(team.players));
    navigate("/game");
  };

  // TODO v2: add an error message toggle or something
  const onFinishFailed = (errorInfo: any) => {
    console.log({ errorInfo });
  };

  const [form] = useForm();

  return (
    <Space direction="vertical">
      <Form
        name="team"
        form={form}
        layout="vertical"
        initialValues={{ name: team.name, players: team.players }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Team name"
          name="name"
          rules={[{ required: true, message: "Your team needs a name" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Players"
          name="players"
          rules={[{ required: true, message: "" }]}
        >
          <Form.List
            name="players"
            // TODO: add unique constraint to player names
            rules={[
              {
                validator: async (_, value) => {
                  if (value.length < 2) {
                    return Promise.reject(
                      "Your team needs at least two players"
                    );
                  }
                  return Promise.resolve();
                },
              },
            ]}
          >
            {(fields, { add, remove }, { errors }) => {
              return (
                <Space direction="vertical">
                  <List
                    dataSource={fields}
                    renderItem={(item) => {
                      const player = form.getFieldValue("players")[item.name];
                      return (
                        <Input.Group compact key={item.key}>
                          <Form.Item name={[item.name, "name"]}>
                            <Input />
                          </Form.Item>
                          <Form.Item
                            name={[item.name, "avatar"]}
                            dependencies={[["players", item.name, "name"]]}
                            rules={[
                              // Hack, this is not an actual validation, just a way to
                              // automaticaly update the avatar field on name change
                              ({ getFieldValue, setFieldsValue }) => ({
                                validator() {
                                  const nameValue = getFieldValue([
                                    "players",
                                    item.name,
                                    "name",
                                  ]);
                                  const players: Player[] =
                                    getFieldValue("players");
                                  const newPlayers = players.map(
                                    (player, index) => {
                                      if (index !== item.name) {
                                        return player;
                                      }
                                      return {
                                        ...player,
                                        avatar: `https://avatars.dicebear.com/api/avataaars/${nameValue}.svg`,
                                      };
                                    }
                                  );
                                  setFieldsValue({
                                    players: newPlayers,
                                  });
                                  return Promise.resolve();
                                },
                              }),
                            ]}
                          >
                            <Avatar src={player.avatar} shape="circle" />
                          </Form.Item>
                          {fields.length > 2 && (
                            <Button
                              onClick={() => remove(item.name)}
                              icon={<MinusCircleOutlined />}
                            />
                          )}
                        </Input.Group>
                      );
                    }}
                  />
                  <Form.ErrorList errors={errors} />
                  <Button
                    onClick={() =>
                      add({
                        name: `Player ${fields.length + 1}`,
                        avatar: `https://avatars.dicebear.com/api/avataaars/Player ${
                          fields.length + 1
                        }.svg`,
                      })
                    }
                  >
                    <PlusOutlined /> Add player
                  </Button>
                </Space>
              );
            }}
          </Form.List>
        </Form.Item>

        <Form.Item shouldUpdate>
          {() => (
            <Button
              type="primary"
              htmlType="submit"
              disabled={form
                .getFieldsError()
                .some(({ errors }) => errors.length)}
            >
              Save
            </Button>
          )}
        </Form.Item>
      </Form>
    </Space>
  );
};

export default TeamEditorForm;
