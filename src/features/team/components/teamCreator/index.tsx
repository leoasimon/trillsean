import React from "react";
import { Button, Form, Input, List, Space, Typography } from "antd";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";

import { useAppSelector } from "../../../../app/hooks";
import { selectTeam } from "../../teamSlice";

const TeamCreator: React.FC = () => {
  const team = useAppSelector(selectTeam);

  const onFinish = (values: any) => {
    console.log({ values });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log({ errorInfo });
  };

  return (
    <Space direction="vertical">
      <Typography.Title level={3}>Create your Team</Typography.Title>
      <Form
        name="team"
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
          rules={[{ required: true, message: "Your team needs a name" }]}
        >
          <Form.List
            name="players"
            rules={[
              {
                validator: (_, value) => {
                  if (value.length < 2) {
                    return Promise.reject(
                      "Your team requires at least two players"
                    );
                  }
                  return Promise.resolve();
                },
              },
            ]}
          >
            {(fields, { add, remove }) => {
              return (
                <Space direction="vertical">
                  <List
                    dataSource={fields}
                    renderItem={(item) => {
                      return (
                        <Input.Group compact>
                          <Form.Item name={[item.name, "name"]} key={item.key}>
                            <Input />
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
                  <Button
                    onClick={() => add({ name: `Player ${fields.length + 1}` })}
                  >
                    <PlusOutlined /> Add player
                  </Button>
                </Space>
              );
            }}
          </Form.List>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Play
          </Button>
        </Form.Item>
      </Form>
    </Space>
  );
};

export default TeamCreator;
