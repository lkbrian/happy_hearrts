import * as Yup from "yup";

export const parent_validation = Yup.object().shape({
  name: Yup.string()
    .min(2, "Name is too short")
    .required("Please enter a name"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Please enter an email address"),
  national_id: Yup.string()
    .matches(/^\d{8,}$/, "National ID must be at least 8 digits long")
    .required("Please enter your national ID"),
  phone_number: Yup.string()
    .min(10, "Phone number is too short")
    .required("Please enter a phone number"),
  gender: Yup.string().required("Please select your gender"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters long")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])?.{8,}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, and one number"
    )
    .required("Please enter your password"),
  passport: Yup.string()
    .min(2, "Passport number is too short")
    .required("Please enter a passport number"),
});
