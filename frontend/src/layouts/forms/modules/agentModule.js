import * as Yup from "yup";

// eslint-disable-next-line import/prefer-default-export
export default {
  fields: [
    [
      { name: "group", type: "hidden", defaultValue: "client" },
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
        name: "address",
        validation: Yup.string().required("Address is required"),
      },
    ],
    [
      {
        label: "Realestate Commission (%)",
        name: "realestate_commision",
        validation: Yup.string().required("Commision is required"),
      },
      {
        label: "Agent Comission (%)",
        name: "agent_comission",
        validation: Yup.string().required("Comission is required"),
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
      },
      {
        label: "Confirm Password",
        name: "confirmPassword",
        type: "password",
        validation: Yup.string().oneOf([Yup.ref("password"), null], "Passwords must match"),
      },
    ],
  ],
};
