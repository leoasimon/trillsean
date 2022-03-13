import { ArrowRightOutlined } from "@ant-design/icons";
import { Button, Col, Modal, Row, Space, Typography } from "antd";
import { ReactComponent as Awards } from "assets/awards.svg";
import { Player } from "features/team/types";
import React from "react";
import CountUp from "react-countup";
import { Link } from "react-router-dom";
import "./winnerModal.less";

interface WinnerModalProps {
  confirmedWinner?: Player;
  quit: () => void;
}

const WinnerModal: React.FC<WinnerModalProps> = ({ confirmedWinner, quit }) => {
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
            <CountUp start={0} end={1} className="counter-text" />
          </Space>
        </Space>
        <Space>
          <Space className="score-counter">
            <Typography.Title level={3} className="aligned-title">
              Score
            </Typography.Title>
            <CountUp
              start={1000}
              end={1200}
              delay={2.5}
              duration={3.5}
              className="counter-text"
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
