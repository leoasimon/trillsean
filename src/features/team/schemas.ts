import { findAllDuplicates, withKeys } from "utils";
import * as Yup from "yup";

const nameSchema = Yup.string()
  .min(3, "Too short")
  .max(30, "Too long")
  .required("This field is required");

export const teamEditorSchema = Yup.object({
  name: nameSchema,
  players: Yup.array()
    .of(
      Yup.object({
        name: nameSchema,
        avatar: Yup.string().required(),
      })
    )
    .min(2, "Your team must have at least two players")
    .test("UniquePlayerNames", (value) => {
      const playerWithKeys = withKeys(value || []);
      const duplicates = findAllDuplicates(playerWithKeys, "name");
      if (duplicates.length) {
        const validationErrors = duplicates.map((duplicate) => {
          const path = `players.${duplicate.key}.name`;
          return new Yup.ValidationError(
            "Duplicated name",
            duplicate.name,
            path
          );
        });
        return new Yup.ValidationError(validationErrors);
      }
      return true;
    }),
});
