import { gql } from "@apollo/client";
export const SUMMARY_TRANSACTIONS_BY_CATEGORY = gql`
  query categoriesSummary {
    categorySummary {
      categories {
        category {
          id
          title
          icon
          color
          description
        }
        totalAmount
        totalTransactions
      }
      mostUsedCategoryTitle
      totalCategories
      totalTransactions
    }
  }
`;

export const SUMMARY_TRANSACTIONS_AMOUNTS = gql`
  query financialSummary {
    financialSummary {
      totalAmount
      totalIncome
      totalExpense
    }
  }
`;
