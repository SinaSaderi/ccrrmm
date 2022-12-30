import { gql, useMutation } from "@apollo/client";

export const CREATE_USER_MUTATION = gql`
  mutation createUser($input: UserInput!) {
    createUser(input: $input) {
      user {
        id
        name
        email
      }
    }
  }
`;

export const UPDATE_USER_MUTATION = gql`
  mutation updateUser($input: UserInput!) {
    updateUser(input: $input) {
      user {
        id
        name
        email
      }
    }
  }
`;

export const DELETE_USER_MUTATION = gql`
  mutation deleteUser($id: ID!) {
    deleteUser(id: $id) {
      ok
    }
  }
`;

export const useCreateUserMutation = () => {
  const [createUserMutation, { data, loading, error }] = useMutation(CREATE_USER_MUTATION);
  return {
    createUser: createUserMutation,
    createUserData: data,
    createUserLoading: loading,
    createUserError: error,
  };
};

export const useUpdateUserMutation = () => {
  const [updateUserMutation, { data, loading, error }] = useMutation(UPDATE_USER_MUTATION);
  return {
    updateUser: updateUserMutation,
    updateUserData: data,
    updateUserLoading: loading,
    updateUserError: error,
  };
};

export const useDeleteUserMutation = () => {
  const [deleteUserMutation, { data, loading, error }] = useMutation(DELETE_USER_MUTATION);
  return {
    deleteUser: deleteUserMutation,
    deleteUserData: data,
    deleteUserLoading: loading,
    deleteUserError: error,
  };
};
