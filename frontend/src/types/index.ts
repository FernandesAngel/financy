import type { CategoryColor } from "../utils/category-styles-mapping";

export interface User {
  id: string;
  name: string;
  email: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface RegisterInput {
  name: string;
  email: string;
  password: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export type UpdateUserResponse = {
  updateUser: {
    id: string;
    name: string;
    email: string;
  };
};

export type UpdateUserVariables = {
  updateUserId: string;
  data: {
    name: string;
  };
};

export type Category = {
  id: string;
  title: string;
  color: CategoryColor;
  icon: string;
  description?: string;
};

export type CategoryResponse = {
  listCategories: Category[];
};

export type Transaction = {
  id: string;
  description: string;
  amount: number;
  type: "income" | "expense";
  date: string;
  category: Category;
  categoryId: string;
};

export type ListTransactionsResponse = {
  listTransactions: {
    items: Transaction[];
    totalCount: number;
  };
};

export type CategorySummaryItem = {
  category: Category;
  totalTransactions: number;
  totalAmount: number;
};

export type CategorySummaryResponse = {
  categorySummary: {
    totalCategories: number;
    totalTransactions: number;
    mostUsedCategoryTitle: string | null;
    categories: CategorySummaryItem[];
  };
};

export type FinancialSummary = {
  totalAmount: number;
  totalIncome: number;
  totalExpense: number;
};

export type FinancialSummaryResponse = {
  financialSummary: FinancialSummary;
};
