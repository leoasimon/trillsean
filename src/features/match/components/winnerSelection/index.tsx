import { Card, Modal, Space, Typography } from "antd";
import { Contestants, Player } from "features/players/types";
import React, { useState } from "react";

interface WinnerSelectionProps {
  contestants: Contestants;
  handleWinnerSelection: (winner: Player, contestants: Contestants) => void;
}

const WinnerSelection: React.FC<WinnerSelectionProps> = ({
  contestants,
  handleWinnerSelection,
}) => {
  const [winner, setWinner] = useState<Player>();

  const [playerOne, playerTwo] = contestants;

  const handleOk = () => {
    if (winner) {
      handleWinnerSelection(winner, contestants);
      setWinner(undefined);
    }
  };

  const handleCancel = () => {
    setWinner(undefined);
  };

  return (
    <>
      <Space
        direction="vertical"
        style={{ textAlign: "center", width: "100%" }}
      >
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
