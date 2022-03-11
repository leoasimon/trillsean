import React, { useState } from "react";
import { Card, Modal, Space, Typography } from "antd";

import { Contestant, Player } from "../../../team/types";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { add, selectMatches } from "../../matchSlice";

const { Meta } = Card;

interface WinnerSelectionProps {
  contestant: Contestant;
}

const WinnerSelection: React.FC<WinnerSelectionProps> = ({ contestant }) => {
  const matches = useAppSelector(selectMatches);
  const [winner, setWinner] = useState<Player>();
  const dispatch = useAppDispatch();

  const [playerOne, playerTwo] = contestant;

  const handleOk = () => {
    if (winner) {
      dispatch(
        add({
          contestant: [playerOne.name, playerTwo.name],
          winner: winner.name,
        })
      );
      setWinner(undefined);
    }
  };

  const handleCancel = () => {
    setWinner(undefined);
  };

  console.log({ matches });
  return (
    <>
      <Space direction="vertical">
        <Typography.Title level={4}>Select a winner</Typography.Title>
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
