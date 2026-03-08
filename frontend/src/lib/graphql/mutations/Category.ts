import { gql } from "@apollo/client";
export const CREATE_CATEGORY = gql`
  mutation createCategory($data: CreateCategoryInput!) {
    createCategory(data: $data) {
      title
      id
      icon
      color
      description
    }
  }
`;

export const DELETE_CATEGORY = gql`
  mutation DeleteCategory($id: String!) {
    deleteCategory(id: $id)
  }
`;

export const UPDATE_CATEGORY = gql`
  mutation UpdateCategory(
    $updateCategoryId: String!
    $data: UpdateCategoryInput!
  ) {
    updateCategory(id: $updateCategoryId, data: $data) {
      id
      title
      description
      icon
      color
    }
  }
`;
