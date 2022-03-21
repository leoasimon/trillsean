import { Button, Card, Modal, Space, Typography } from "antd";
import PlayerSelectionList from "features/players/components/playerSelectionList";
import { ContestantIds, Player } from "features/players/types";
import React, { ReactNode, useMemo, useState } from "react";
import { Team } from "../../types";

const SelectContestantButton: React.FC<{
  contestantIndex: number;
  selectContestant: (index: number) => void;
}> = ({ contestantIndex, selectContestant }) => {
  return (
    <Button onClick={() => selectContestant(contestantIndex)}>
      {`Player ${contestantIndex}`}
    </Button>
  );
};

const ChangeContestantButton: React.FC<{
  contestantIndex: number;
  selectContestant: (index: number) => void;
}> = ({ contestantIndex, selectContestant }) => {
  return (
    <Button type="text" onClick={() => selectContestant(contestantIndex)}>
      {`Change`}
    </Button>
  );
};

const PlayerCard: React.FC<{ player: Player; actions?: ReactNode[] }> = ({
  player,
  actions = [],
}) => {
  return (
    <Card
      title={player.name}
      cover={<img src={player.avatar} alt={player.name} />}
      actions={actions}
    />
  );
};

interface ContestantSelectorProps {
  team: Team;
  setContestantIds: (contestantIds: ContestantIds) => void;
}

const ContestantSelector: React.FC<ContestantSelectorProps> = ({
  team,
  setContestantIds,
}) => {
  const [firstContestant, setFirstContestant] = useState<Player>();
  const [secondContestant, setSecondContestant] = useState<Player>();
  const [selecting, setSelecting] = useState<number>();

  const secondPlayerOptions = useMemo(() => {
    return team.players.filter(
      (player) => player.name !== firstContestant?.name
    );
  }, [firstContestant, team.players]);

  const firstPlayerOptions = useMemo(() => {
    return team.players.filter(
      (player) => player.name !== secondContestant?.name
    );
  }, [secondContestant, team.players]);

  const onFinish = () => {
    if (firstContestant !== undefined && secondContestant !== undefined) {
      setContestantIds([firstContestant.id, secondContestant.id]);
    }
  };

  const handleCancel = () => setSelecting(undefined);

  const handleSelect = (player: Player) => {
    const setContestant =
      selecting === 1 ? setFirstContestant : setSecondContestant;
    setSelecting(undefined);
    setContestant(player);
  };

  const options = selecting === 1 ? firstPlayerOptions : secondPlayerOptions;

  return (
    <Space direction="vertical" style={{ textAlign: "center" }}>
      {firstContestant === undefined ? (
        <SelectContestantButton
          contestantIndex={1}
          selectContestant={setSelecting}
        />
      ) : (
        <PlayerCard
          player={firstContestant}
          actions={[
            <ChangeContestantButton
              contestantIndex={1}
              selectContestant={setSelecting}
            />,
            <Button type="text" onClick={() => setFirstContestant(undefined)}>
              Delete
            </Button>,
          ]}
        />
      )}
      <Typography.Title level={4}>VS</Typography.Title>
      {secondContestant === undefined ? (
        <SelectContestantButton
          contestantIndex={2}
          selectContestant={setSelecting}
        />
      ) : (
        <PlayerCard
          player={secondContestant}
          actions={[
            <ChangeContestantButton
              contestantIndex={2}
              selectContestant={setSelecting}
            />,

            <Button type="text" onClick={() => setSecondContestant(undefined)}>
              Delete
            </Button>,
          ]}
        />
      )}
      <Button
        block
        type="primary"
        size="large"
        disabled={
          firstContestant === undefined || secondContestant === undefined
        }
        onClick={onFinish}
      >
        Play
      </Button>
      <Modal
        visible={selecting !== undefined}
        onCancel={handleCancel}
        footer={null}
        destroyOnClose
      >
        <PlayerSelectionList players={options} selectPlayer={handleSelect} />
      </Modal>
    </Space>
  );
};

export default ContestantSelector;
