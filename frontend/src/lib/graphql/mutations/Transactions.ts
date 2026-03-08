import { gql } from "@apollo/client";

export const CREATE_TRANSACTION = gql`
  mutation CreateTransaction(
    $data: CreateTransactionInput!
    $categoryId: String!
  ) {
    createTransaction(data: $data, categoryId: $categoryId) {
      id
      description
      amount
      user {
        email
        name
      }
      category {
        title
      }
      date
    }
  }
`;

export const DELETE_TRANSACTION = gql`
  mutation DeleteTransaction($id: String!) {
    deleteTransaction(id: $id)
  }
`;

export const UPDATE_TRANSACTION = gql`
  mutation UpdateTransaction(
    $updateTransactionId: String!
    $data: UpdateTransactionInput!
    $categoryId: String!
  ) {
    updateTransaction(
      id: $updateTransactionId
      data: $data
      categoryId: $categoryId
    ) {
      amount
      categoryId
      date
      id
      category {
        color
        icon
        id
        title
      }
      description
      type
    }
  }
`;
