import { gql } from "@apollo/client";
export const GET_CATEGORIES = gql`
  query getCategories {
    listCategories {
      id
      title
      description
      color
      icon
    }
  }
`;
