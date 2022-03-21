import { Avatar, Button, Input, List, Modal, Space, Typography } from "antd";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import PlayerEditorForm from "features/players/components/playerEditorForm";
import { playerEditorSchema } from "features/players/schemas";
import { Player, PlayerFormValues } from "features/players/types";
import {
  addPlayer,
  deletePlayer,
  updateName,
  updatePlayer,
} from "features/team/teamSlice";
import { Formik } from "formik";
import React, { useState } from "react";
import { debounce } from "utils";
import { useAppDispatch } from "../../../../app/hooks";
import { Team } from "../../types";

interface TeamEditorFormProps {
  team: Team;
}

const defaultValues: PlayerFormValues = {
  name: "",
};

const TeamEditorForm: React.FC<TeamEditorFormProps> = ({ team }) => {
  const dispatch = useAppDispatch();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [playerToUpdate, setPlayerToUpdate] = useState<Player>();
  const [initialValues, setInitialValues] = useState(defaultValues);

  const handleTeamNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateName(e.target.value));
  };

  const handleUpdatePlayer = (player?: Player) => {
    setPlayerToUpdate(player);
    setIsModalVisible(true);
  };

  const handleDeletePlayer = (id: string) => {
    dispatch(deletePlayer(id));
  };

  const handleSubmit = (playerFormValues: PlayerFormValues) => {
    if (playerToUpdate) {
      dispatch(
        updatePlayer({ id: playerToUpdate.id, player: playerFormValues })
      );
    } else {
      dispatch(addPlayer(playerFormValues));
    }
  };

  return (
    <Space direction="vertical">
      <Input
        type="text"
        defaultValue={team?.name}
        placeholder="Team name"
        onChange={debounce(handleTeamNameChange)}
      />
      <List
        header={<Typography.Title level={5}>Players</Typography.Title>}
        dataSource={team.players}
        footer={[
          <Button
            icon={<PlusOutlined />}
            block
            onClick={() => handleUpdatePlayer()}
          >
            Add a player
          </Button>,
        ]}
        renderItem={(item) => {
          return (
            <List.Item
              actions={[
                <Button
                  icon={<EditOutlined />}
                  onClick={() => handleUpdatePlayer(item)}
                />,
                <Button
                  icon={<DeleteOutlined />}
                  onClick={() => handleDeletePlayer(item.id)}
                />,
              ]}
            >
              <List.Item.Meta
                avatar={<Avatar src={item.avatar} />}
                title={<span>{item.name}</span>}
              />
            </List.Item>
          );
        }}
      />
      {isModalVisible && (
        <Formik
          initialValues={playerToUpdate || initialValues}
          onSubmit={handleSubmit}
          validationSchema={playerEditorSchema}
        >
          {({ submitForm, isSubmitting, isValid }) => {
            const handleCloseModal = () => {
              setPlayerToUpdate(undefined);
              setInitialValues(defaultValues);
              setIsModalVisible(false);
            };

            const handleModalOk = () => {
              setPlayerToUpdate(undefined);
              setIsModalVisible(false);
              setPlayerToUpdate(undefined);
              submitForm();
            };
            return (
              <Modal
                visible={isModalVisible}
                onCancel={handleCloseModal}
                onOk={handleModalOk}
                okText="Save"
                okButtonProps={{
                  disabled: isSubmitting || !isValid,
                }}
              >
                <PlayerEditorForm
                  player={playerToUpdate}
                  playerNames={team.players.map((player) => player.name)}
                />
              </Modal>
            );
          }}
        </Formik>
      )}
    </Space>
  );
};

export default TeamEditorForm;
