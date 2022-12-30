import { gql } from "@apollo/client";

// import { USER_FIELDS } from "layouts/lists/Queries";

export const REGISTER_USER = gql`
  mutation createUser(
    $group: String!
    $userType: String
    $firstName: String!
    $lastName: String!
    $mobile: String!
    $addr: String!
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
        addr: $addr
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
        firstName
        lastName
        username
        email
        mobile
        addr
        budget
        groups {
          name
        }
      }
    }
  }
`;

export const UPDATE_USER = gql`
  mutation updateUser(
    $id: String!
    $firstName: String!
    $lastName: String!
    $mobile: String!
    $addr: String!
    $email: String!
    $username: String
  ) {
    updateUser(
      input: {
        id: $id
        firstName: $firstName
        lastName: $lastName
        mobile: $mobile
        addr: $addr
        email: $email
        username: $username
      }
    ) {
      ok
      user {
        id
        firstName
        lastName
        username
        email
        mobile
        addr
        budget
        groups {
          name
        }
      }
    }
  }
`;

export const DELETE_USER_MUTATION = gql`
  mutation deleteUser($id: ID!) {
    deleteUser(id: $id) {
      ok
      user {
        id
        email
      }
      errors {
        field
        message
      }
    }
  }
`;
