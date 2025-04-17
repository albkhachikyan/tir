import * as yup from "yup";

export const createUserSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email().required("Email is required"),
  role: yup.string().required("Role is required"),
  grade: yup
    .number()
    .notRequired()
    .when("role", {
      is: "PUPIL",
      then: (schema) => schema.required("Grade is required"),
      otherwise: (schema) => schema.optional(),
    }),
});
