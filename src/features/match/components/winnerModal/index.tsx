import { Button, Modal, Space, Typography } from "antd";
import { ReactComponent as Awards } from "assets/awards.svg";
import { Player } from "features/team/types";
import React from "react";
import { Link } from "react-router-dom";
import AnimatedCounter from "ui/components/animatedCounter";
import "./winnerModal.less";

interface WinnerModalProps {
  confirmedWinner?: Player;
  quit: () => void;
  previousScore: number;
  score: number;
  victories: number;
}

const CounterItem = <Typography.Title level={3} className="aligned-title" />;

const WinnerModal: React.FC<WinnerModalProps> = ({
  confirmedWinner,
  quit,
  previousScore,
  score,
  victories,
}) => {
  return (
    <Modal
      centered={true}
      visible={confirmedWinner !== undefined}
      onCancel={quit}
      footer={null}
    >
      <Space
        direction="vertical"
        size={"large"}
        align="center"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <Typography.Title className="winner-title">
          Congratulation!
        </Typography.Title>
        <Awards width={300} className="award-illustration" />
        <Space>
          <Space className="victories-counter">
            <Typography.Title level={3} className="aligned-title">
              Victories
            </Typography.Title>
            <AnimatedCounter
              start={victories - 1}
              end={victories}
              duration={0.5}
              delay={1.6}
              itemWrapper={CounterItem}
            />
          </Space>
        </Space>
        <Space>
          <Space className="score-counter">
            <Typography.Title level={3} className="aligned-title">
              Score
            </Typography.Title>
            <AnimatedCounter
              start={Math.round(previousScore)}
              end={Math.round(score)}
              delay={2}
              itemWrapper={CounterItem}
            />
          </Space>
        </Space>
        <Space key="footer" className="winner-footer">
          <Button type="primary" key="backToGame" onClick={quit}>
            Play again
          </Button>
          <Link key="scoreBoardLink" to="/score-board">
            Score board
          </Link>
        </Space>
      </Space>
    </Modal>
  );
};

export default WinnerModal;
