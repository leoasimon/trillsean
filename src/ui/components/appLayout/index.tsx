import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, Popover, Space } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../app/hooks";
import { selectTeam } from "../../../features/team/teamSlice";
import AppMenu from "../appMenu";
import "./appLayout.less";

const AppLayout: React.FC = ({ children }) => {
  const team = useAppSelector(selectTeam);
  const navigate = useNavigate();

  const [displayMenu, setDisplayMenu] = useState(false);

  const closeMenu = () => setDisplayMenu(false);

  const menuIcon = displayMenu ? (
    <MenuUnfoldOutlined style={{ color: "white", fontSize: "24px" }} />
  ) : (
    <MenuFoldOutlined style={{ color: "white", fontSize: "24px" }} />
  );

  const goToGame = () => navigate("/game");
  return (
    <div className="app-layout">
      <header className="app-header">
        <Space
          className="
        app-header-content"
        >
          <h1>Trillsean</h1>
          {team.players.length >= 2 && (
            <Popover
              content={<AppMenu onItemSelection={closeMenu} />}
              trigger="click"
              placement="bottomRight"
              onVisibleChange={setDisplayMenu}
            >
              {menuIcon}
            </Popover>
          )}
        </Space>
      </header>
      <div className="app-content">
        <Space direction="vertical">{children}</Space>
      </div>
      {window.location.pathname !== "/game" && (
        <Button
          type="primary"
          disabled={team.players.length < 2}
          shape="round"
          size="large"
          className="start-gane-button"
          onClick={goToGame}
        >
          Start a game
        </Button>
      )}
    </div>
  );
};

export default AppLayout;
