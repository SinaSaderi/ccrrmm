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
        label: "Email",
        name: "email",
        type: "email",
        validation: Yup.string().email("Invalid email").required("Email is required"),
      },
      {
        label: "Mobile",
        name: "mobile",
        validation: Yup.string().required("Mobile is required"),
      },
      {
        label: "Phone",
        name: "phone",
        validation: Yup.string().required("Phone is required"),
      },
    ],
    [
      {
        label: "Address",
        name: "address",
        validation: Yup.string().required("Address is required"),
      },
      {
        label: "Budget",
        name: "budget",
      },
    ],
    [
      {
        type: "hidden",
        label: "Password",
        name: "password",
        defaultValue: "321321",
        validation: Yup.string()
          .required("Password is required")
          .min(5, "Your password is too short."),
      },
      {
        type: "hidden",
        defaultValue: "321321",
        label: "Confirm Password",
        name: "confirmPassword",
        validation: Yup.string().oneOf([Yup.ref("password"), null], "Passwords must match"),
      },
    ],
    [
      {
        label: "Orders",
        name: "orders",
      },
    ],
  ],
};
