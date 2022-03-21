// TODO: move Player type to Player features folder
import { Avatar, Button, List } from "antd";
import { Player } from "features/players/types";
import React from "react";

interface PlayerSelectionListProps {
  players: Player[];
  selectPlayer: (player: Player) => void;
}

// TODO v2: Add list filter input
const PlayerSelectionList: React.FC<PlayerSelectionListProps> = ({
  players,
  selectPlayer,
}) => {
  return (
    <List
      itemLayout="vertical"
      dataSource={players}
      pagination={false}
      renderItem={(item) => {
        return (
          <List.Item key={item.name}>
            <List.Item.Meta
              avatar={<Avatar src={item.avatar} />}
              title={
                <Button block type="text" onClick={() => selectPlayer(item)}>
                  {item.name}
                </Button>
              }
            />
          </List.Item>
        );
      }}
    />
  );
};

export default PlayerSelectionList;
