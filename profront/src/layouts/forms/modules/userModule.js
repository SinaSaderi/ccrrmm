import * as Yup from "yup";

// eslint-disable-next-line import/prefer-default-export
export default {
  fields: [
    [
      { name: "group", type: "hidden", defaultValue: "user" },
      { name: "id", type: "hidden", defaultValue: "0", action: "edit" },
      {
        label: "User Type",
        name: "userType",
        id: "userType",
        fiel_type: "select",
        validation: Yup.string().required("User type is required"),
        items: [
          { value: "admin", title: "Admin" },
          { value: "manager", title: "Sale Manager" },
          { value: "agent", title: "Agent" },
        ],
      },
      {
        label: "First name",
        name: "firstName",
        id: "firstName",
        validation: Yup.string().required("First name is required"),
      },
      {
        label: "Last name",
        name: "lastName",
        validation: Yup.string().required("Last name is required"),
      },
    ],
    [
      {
        label: "Username",
        name: "username",
        validation: Yup.string().required("Username is required"),
      },
      {
        label: "Email",
        name: "email",
        type: "email",
        validation: Yup.string().email("Invalid email").required("Email is required"),
      },
    ],
    [
      {
        label: "Mobile",
        name: "mobile",
        validation: Yup.string().required("Mobile is required"),
      },
      {
        label: "Address",
        name: "addr",
        validation: Yup.string().required("Address is required"),
      },
    ],
    [
      {
        label: "Password",
        name: "password",
        type: "password",
        action: "add",
        validation: Yup.string()
          .required("Password is required")
          .min(5, "Your password is too short."),
      },
      {
        label: "Confirm Password",
        name: "confirmPassword",
        type: "password",
        action: "add",
        validation: Yup.string().oneOf([Yup.ref("password"), null], "Passwords must match"),
      },
    ],
  ],
};
