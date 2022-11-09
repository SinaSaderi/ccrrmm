import { gql } from "@apollo/client";

const REGISTER_USER = gql`
  mutation createUser(
    $group: String!
    $userType: String
    $firstName: String!
    $lastName: String!
    $mobile: String!
    $address: String!
    $email: String!
    $username: String
    $realestateCommision: Int
    $agentCommision: Int
    $password: String!
    $confirmPassword: String!
  ) {
    createUser(
      input: {
        group: $group
        userType: $userType
        firstName: $firstName
        lastName: $lastName
        mobile: $mobile
        address: $address
        email: $email
        username: $username
        realestateCommision: $realestateCommision
        agentCommision: $agentCommision
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
