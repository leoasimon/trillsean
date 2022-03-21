import { generateAvatarUrl } from "features/team/avatar";
import { v4 as uuidv4 } from "uuid";
import { Player, PlayerFormValues } from "./types";

const createPlayer = (playerFormValues: PlayerFormValues): Player => {
  const { name } = playerFormValues;
  const id = uuidv4();
  const avatar = generateAvatarUrl(id);
  return {
    id,
    name,
    avatar,
  };
};

export default createPlayer;
