import React from "react";
import { Avatar, Button, Form, Input, List, Space, Typography } from "antd";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { useForm } from "antd/lib/form/Form";

import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { selectTeam, create } from "../../teamSlice";
import { Player } from "../../types";

const TeamCreator: React.FC = () => {
  const team = useAppSelector(selectTeam);
  const dispatch = useAppDispatch();

  const onFinish = (values: any) => {
    dispatch(create(values));
  };

  // TODO v2: add an error message toggle or something
  const onFinishFailed = (errorInfo: any) => {
    console.log({ errorInfo });
  };

  const [form] = useForm();

  return (
    <Space direction="vertical">
      <Typography.Title level={3}>Create your Team</Typography.Title>
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
          {() => {
            return (
              <Button
                type="primary"
                htmlType="submit"
                disabled={form
                  .getFieldsError()
                  .some(({ errors }) => errors.length)}
              >
                Play
              </Button>
            );
          }}
        </Form.Item>
      </Form>
    </Space>
  );
};

export default TeamCreator;
