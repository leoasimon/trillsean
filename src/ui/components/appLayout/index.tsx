import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, Popover, Space, Tooltip } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../app/hooks";
import { selectActivePlayers } from "../../../features/team/teamSlice";
import AppMenu from "../appMenu";
import "./appLayout.less";

const PlayButton: React.FC<{ onClick: () => void; disabled: boolean }> = ({
  onClick,
  disabled,
}) => {
  return (
    <Button
      type="primary"
      disabled={disabled}
      shape="round"
      size="large"
      className="start-gane-button"
      onClick={onClick}
    >
      Start a game
    </Button>
  );
};

const AppLayout: React.FC = ({ children }) => {
  const players = useAppSelector(selectActivePlayers);
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
          {players.length >= 2 && (
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
      {window.location.pathname === "/game" ? null : players.length >= 2 ? (
        <PlayButton onClick={goToGame} disabled={false} />
      ) : (
        <Tooltip title="You need a minimum of two players to start the game">
          <Button
            type="primary"
            disabled={true}
            shape="round"
            size="large"
            className="start-gane-button"
            onClick={goToGame}
          >
            Start a game
          </Button>
        </Tooltip>
      )}
      <footer>
        <div className="contact-section">
          <div className="contact-decoration" />
          <div className="contact-content">
            <a
              href="https://github.com/leoasimon/trillsean"
              target="_blank"
              rel="noreferrer"
            >
              Github
              {/* <img src={githubLogo} alt="GitHub logo" className="w-8" /> */}
            </a>
            <a
              href="https://www.linkedin.com/in/lyg-sim/"
              target="_blank"
              rel="noreferrer"
            >
              Linkedin
              {/* <img src={linkedinLogo} alt="GitHub logo" className="w-8" /> */}
            </a>
          </div>
          <div className="contact-decoration" />
        </div>
        <div className="copyright-section">
          <h3>Trillsean</h3>
          <span>Copyright © 2024 Léo Simon</span>
        </div>
      </footer>
    </div>
  );
};

export default AppLayout;
