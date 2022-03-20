type Sprite =
  | "male"
  | "female"
  | "human"
  | "identicon"
  | "initials"
  | "bottts"
  | "avataaars"
  | "jdenticon"
  | "gridy"
  | "micah";

const baseUrl = "https://avatars.dicebear.com/api";
const sprites: Sprite = "gridy";

export const generateAvatarUrl = (seed: string) =>
  `${baseUrl}/${sprites}/${seed}.svg`;
