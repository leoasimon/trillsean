import React, { useState } from "react";
import { Card, Modal, Space } from "antd";

import { Contestant, Player } from "../../../team/types";

const { Meta } = Card;

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
      <Space direction="vertical">
        <Card
          hoverable
          cover={<img src={playerOne.avatar} alt={playerOne.name} />}
          onClick={() => setWinner(playerOne)}
        >
          <Meta title={playerOne.name} />
        </Card>
        VS
        <Card
          hoverable
          cover={<img src={playerTwo.avatar} alt={playerTwo.name} />}
          onClick={() => setWinner(playerTwo)}
        >
          <Meta title={playerTwo.name} />
        </Card>
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
