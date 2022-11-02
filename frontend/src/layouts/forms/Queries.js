import { gql } from "@apollo/client";

const REGISTER_USER = gql`
  mutation createUser(
    $group: String!
    $firstName: String!
    $lastName: String!
    $mobile: String!
    $address: String!
    $email: String!
    $username: String!
    $password: String!
    $confirmPassword: String!
  ) {
    createUser(
      input: {
        group: $group
        firstName: $firstName
        lastName: $lastName
        mobile: $mobile
        address: $address
        email: $email
        username: $username
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      ok
      token
      user {
        id
        email
      }
    }
  }
`;

export default REGISTER_USER;
