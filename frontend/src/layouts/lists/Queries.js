import { gql } from "@apollo/client";

const USER_FIELDS = gql`
  fragment UserFields on UserType {
    id
    firstName
    lastName
    username
    email
    mobile
    budget
  }
`;

const USERS_LIST = gql`
  ${USER_FIELDS}
  query users($group: String) {
    users(group: $group) {
      ...UserFields
      relatedUsers {
        ...UserFields
        groups {
          name
        }
      }
    }
  }
`;

export default USERS_LIST;
