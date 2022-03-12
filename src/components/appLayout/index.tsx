import React from "react";
import { Menu, Space } from "antd";

import "./appLayout.less";
import { useAppSelector } from "../../app/hooks";
import { selectTeam } from "../../features/team/teamSlice";
import { Link } from "react-router-dom";

const AppLayout: React.FC = ({ children }) => {
  const team = useAppSelector(selectTeam);
  return (
    <>
      <header className="app-header">
        <Space
          direction="horizontal"
          className="
        app-header-content"
        >
          <h1>Trillsean</h1>
          {team && team.draft === false && (
            <Menu mode="horizontal" key="menu">
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
      {children}
    </>
  );
};

export default AppLayout;
