import * as Yup from "yup";

export const playerEditorSchema = Yup.object({
  name: Yup.string()
    .min(3, "Too short")
    .max(30, "Too long")
    .required("This field is required"),
});
