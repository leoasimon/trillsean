import { createAvatar } from "@dicebear/core";
import { lorelei } from "@dicebear/collection";

export const generateAvatarUrl = (name: string) => {
  const avatar = createAvatar(lorelei, {
    seed: name,
  });

  console.log({ avatar, str: avatar.toString() });
  return avatar;
};
