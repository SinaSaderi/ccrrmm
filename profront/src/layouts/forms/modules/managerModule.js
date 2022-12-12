import * as Yup from "yup";

// eslint-disable-next-line import/prefer-default-export
export default {
  fields: [
    [
      { name: "group", type: "hidden", defaultValue: "manager" },
      { name: "id", type: "hidden", defaultValue: "0", action: "edit" },
      {
        label: "First name",
        name: "firstName",
        id: "firstName",
        validation: Yup.string().required("First name is required"),
        defaultValue: (Math.random() + 1).toString(36).substring(7),
      },
      {
        label: "Last name",
        name: "lastName",
        validation: Yup.string().required("Last name is required"),
        defaultValue: (Math.random() + 1).toString(36).substring(7),
      },
    ],
    [
      {
        label: "Username",
        name: "username",
        validation: Yup.string().required("Username is required"),
        defaultValue: (Math.random() + 1).toString(36).substring(7),
      },
      {
        label: "Email",
        name: "email",
        type: "email",
        validation: Yup.string().email("Invalid email").required("Email is required"),
        defaultValue: `${(Math.random() + 1).toString(36).substring(7)}@gmail.com`,
      },
    ],
    [
      {
        label: "Mobile",
        name: "mobile",
        validation: Yup.string().required("Mobile is required"),
        defaultValue: (Math.random() + 1).toString(36).substring(7),
      },
      {
        label: "Address",
        name: "addr",
        validation: Yup.string().required("Address is required"),
        defaultValue: (Math.random() + 1).toString(36).substring(7),
      },
    ],
    [
      {
        label: "Password",
        name: "password",
        type: "password",
        validation: Yup.string()
          .required("Password is required")
          .min(5, "Your password is too short."),
        defaultValue: "321321",
        action: "add",
      },
      {
        label: "Confirm Password",
        name: "confirmPassword",
        type: "password",
        validation: Yup.string().oneOf([Yup.ref("password"), null], "Passwords must match"),
        defaultValue: "321321",
        action: "add",
      },
    ],
  ],
};
