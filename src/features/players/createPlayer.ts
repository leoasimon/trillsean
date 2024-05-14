import { generateAvatarUrl } from "features/team/avatar";
import { v4 as uuidv4 } from "uuid";
import { Player, PlayerFormValues } from "./types";

const newPlayer = async (
  playerFormValues: PlayerFormValues
): Promise<Player> => {
  const { name } = playerFormValues;
  const id = uuidv4();
  const avatar = generateAvatarUrl(id);

  const avatarUri = await avatar.toDataUri();
  return {
    id,
    name,
    avatar: avatarUri,
    active: true,
  };
};

export default newPlayer;
