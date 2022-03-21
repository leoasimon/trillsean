import { Card, Modal, Space, Typography } from "antd";
import React, { useState } from "react";
import { Contestant, Player } from "../../../team/types";

interface WinnerSelectionProps {
  contestant: Contestant;
  handleWinnerSelection: (winner: Player, contestants: Contestant) => void;
}

const WinnerSelection: React.FC<WinnerSelectionProps> = ({
  contestant,
  handleWinnerSelection,
}) => {
  const [winner, setWinner] = useState<Player>();

  const [playerOne, playerTwo] = contestant;

  const handleOk = () => {
    if (winner) {
      handleWinnerSelection(winner, contestant);
      setWinner(undefined);
    }
  };

  const handleCancel = () => {
    setWinner(undefined);
  };

  return (
    <>
      <Space direction="vertical" style={{ textAlign: "center" }}>
        <Card
          hoverable
          title={playerOne.name}
          cover={<img src={playerOne.avatar} alt={playerOne.name} />}
          onClick={() => setWinner(playerOne)}
        />
        <Typography.Title level={4}>VS</Typography.Title>
        <Card
          hoverable
          title={playerTwo.name}
          cover={<img src={playerTwo.avatar} alt={playerTwo.name} />}
          onClick={() => setWinner(playerTwo)}
        />
      </Space>
      <Modal
        title={`${winner?.name} won this match?`}
        visible={winner !== undefined}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Confirm"
      >
        <Card cover={<img src={winner?.avatar} alt={winner?.name} />} />
      </Modal>
    </>
  );
};

export default WinnerSelection;
