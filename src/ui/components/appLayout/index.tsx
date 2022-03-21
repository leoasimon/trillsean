import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, Popover, Space } from "antd";
import React, { useState } from "react";
import { useAppSelector } from "../../../app/hooks";
import { selectTeam } from "../../../features/team/teamSlice";
import AppMenu from "../appMenu";
import "./appLayout.less";

const AppLayout: React.FC = ({ children }) => {
  const team = useAppSelector(selectTeam);

  const [displayMenu, setDisplayMenu] = useState(false);

  const closeMenu = () => setDisplayMenu(false);

  const menuIcon = displayMenu ? (
    <MenuUnfoldOutlined style={{ color: "white", fontSize: "24px" }} />
  ) : (
    <MenuFoldOutlined style={{ color: "white", fontSize: "24px" }} />
  );
  return (
    <div className="app-layout">
      <header className="app-header">
        <Space
          className="
        app-header-content"
        >
          <h1>Trillsean</h1>
          {team !== undefined && (
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
    </div>
  );
};

export default AppLayout;
