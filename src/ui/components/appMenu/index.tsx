import { Menu } from "antd";
import React from "react";
import { Link } from "react-router-dom";

interface AppMenuProps {
  onItemSelection: () => void;
}

const menuItems = [
  {
    label: "My team",
    key: "team",
    url: "team",
  },
  {
    label: "Play",
    key: "game",
    url: "game",
  },
  {
    label: "Score board",
    key: "scoreBoard",
    url: "score-board",
  },
];
const AppMenu: React.FC<AppMenuProps> = ({ onItemSelection }) => {
  return (
    <Menu key="menu" style={{ borderRadius: "6px" }}>
      {menuItems.map((menuItem) => (
        <Menu.Item key={menuItem.key}>
          <Link to={menuItem.url} onClick={onItemSelection}>
            {menuItem.label}
          </Link>
        </Menu.Item>
      ))}
    </Menu>
  );
};

export default AppMenu;
