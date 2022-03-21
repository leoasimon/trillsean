import React from "react";
import { Menu, Space } from "antd";

import "./appLayout.less";
import { useAppSelector } from "../../../app/hooks";
import { selectTeam } from "../../../features/team/teamSlice";
import { Link } from "react-router-dom";

const AppLayout: React.FC = ({ children }) => {
  const team = useAppSelector(selectTeam);

  return (
    <div className="app-layout">
      <header className="app-header">
        <Space
          className="
        app-header-content"
        >
          <h1>Trillsean</h1>
          {team !== undefined && (
            <Menu mode="horizontal" key="menu" style={{ borderRadius: "6px" }}>
              <Menu.Item key="team">
                <Link to="/team">My team</Link>
              </Menu.Item>
              <Menu.Item key="game">
                <Link to="/game">Play</Link>
              </Menu.Item>
              <Menu.Item key="scoreBoard">
                <Link to="/score-board">Score board</Link>
              </Menu.Item>
            </Menu>
          )}
        </Space>
      </header>
      <div className="app-content">{children}</div>
    </div>
  );
};

export default AppLayout;
