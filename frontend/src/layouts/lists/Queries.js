import { gql } from "@apollo/client";

export const USER_FIELDS = gql`
  fragment UserFields on UserType {
    id
    firstName
    lastName
    username
    email
    mobile
    addr
    budget
    realestateCommision
    agentCommision
    groups {
      name
    }
  }
`;

export const USERS_LIST = gql`
  ${USER_FIELDS}
  query users($group: String) {
    users(group: $group) {
      ...UserFields
      relatedUsers {
        ...UserFields
      }
    }
  }
`;

export const USER_DATA = gql`
  ${USER_FIELDS}
  query user($pk: String!) {
    user(pk: $pk) {
      ...UserFields
      relatedUsers {
        ...UserFields
      }
    }
  }
`;
