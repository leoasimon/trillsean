import { Avatar, Button, Form, Select, Space, Typography } from "antd";
import { useForm } from "antd/lib/form/Form";

import React, { useState } from "react";
import { Contestant, Team } from "../../types";

interface ContestantSelectorProps {
  team: Team;
  setContestant: (contestant: Contestant) => void;
}

const { Option } = Select;

const ContestantSelector: React.FC<ContestantSelectorProps> = ({
  team,
  setContestant,
}) => {
  const [form] = useForm();
  const [playerOneOptions, setPlayerOneOptions] = useState(team.players);
  const [playerTwoOptions, setPlayerTwoOptions] = useState(team.players);

  const onFinish = (values: Contestant) => {
    setContestant(values);
  };

  const onValuesChange = (changedValues: any) => {
    if ("playerOne" in changedValues) {
      setPlayerTwoOptions(
        !changedValues.playerOne
          ? team.players
          : team.players.filter(
              (player) => player.name !== changedValues.playerOne
            )
      );
    }
    if ("playerTwo" in changedValues) {
      setPlayerOneOptions(
        !changedValues.playerTwo
          ? team.players
          : team.players.filter(
              (player) => player.name !== changedValues.playerTwo
            )
      );
    }
  };

  return (
    <Space direction="vertical">
      <Typography.Title level={3}>{team.name}</Typography.Title>
      <Form
        name="contestantSelection"
        layout="vertical"
        initialValues={{ playerOne: null, playerTwo: null }}
        form={form}
        onFinish={onFinish}
        onValuesChange={onValuesChange}
      >
        <Form.Item
          label="Player 1"
          name="playerOne"
          rules={[{ required: true }]}
        >
          <Select
            showSearch
            placeholder="Player 1"
            allowClear
            filterOption={(input, option) => {
              return (
                `${option?.value}`
                  .toLowerCase()
                  .indexOf(input.toLocaleLowerCase()) >= 0
              );
            }}
          >
            {playerOneOptions.map((player) => (
              <Option key={player.name} value={player.name}>
                {player.name}
                <Avatar src={player.avatar} />
              </Option>
            ))}
          </Select>
        </Form.Item>
        VS
        <Form.Item
          label="Player 2"
          name="playerTwo"
          rules={[{ required: true }]}
        >
          <Select
            showSearch
            placeholder="Player 2"
            allowClear
            filterOption={(input, option) => {
              return (
                `${option?.value}`
                  .toLowerCase()
                  .indexOf(input.toLocaleLowerCase()) >= 0
              );
            }}
          >
            {playerTwoOptions.map((player) => (
              <Option key={player.name} value={player.name}>
                {player.name}
                <Avatar src={player.avatar} />
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item shouldUpdate>
          {() => {
            const allTouched = form.isFieldsTouched(
              ["playerOne", "playerTwo"],
              true
            );
            const hasErrors = form
              .getFieldsError()
              .some(({ errors }) => errors.length);

            return (
              <Button
                type="primary"
                htmlType="submit"
                disabled={!allTouched || hasErrors}
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

export default ContestantSelector;
