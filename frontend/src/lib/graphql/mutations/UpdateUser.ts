import { gql } from "@apollo/client";

export const UPDATE_USER = gql`
  mutation updateUser($updateUserId: String!, $data: UpdateUserInput!) {
    updateUser(id: $updateUserId, data: $data) {
      id
      name
      email
    }
  }
`;
