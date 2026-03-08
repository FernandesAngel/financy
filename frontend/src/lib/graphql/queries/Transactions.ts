import { gql } from "@apollo/client";

export const LIST_RECENT_TRANSACTIONS = gql`
  query listTransactions($limit: Int, $sort: SortOrder) {
    listTransactions(limit: $limit, sort: $sort) {
      items {
        amount
        category {
          color
          title
          icon
        }
        id
        type
        date
        description
      }
    }
  }
`;

export const LIST_ALL_TRANSACTIONS = gql`
  query listTransactions(
    $limit: Int
    $sort: SortOrder
    $offset: Int
    $categoryId: String
    $type: String
    $month: Int
    $year: Int
    $description: String
  ) {
    listTransactions(
      limit: $limit
      sort: $sort
      offset: $offset
      categoryId: $categoryId
      type: $type
      month: $month
      year: $year
      description: $description
    ) {
      totalCount
      items {
        amount
        category {
          color
          title
          icon
        }
        id
        type
        date
        description
        categoryId
      }
    }
  }
`;
