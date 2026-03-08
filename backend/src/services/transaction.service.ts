import { registerEnumType } from "type-graphql";
import { prismaClient } from "../../prisma/prisma";
import { TransactionListArgs } from "../dtos/args/transaction-list.args";
import {
  CreateTransactionInput,
  UpdateTransactionInput,
} from "../dtos/input/transaction.input";

export class TransactionService {
  async createTransaction(
    categoryId: string,
    data: CreateTransactionInput,
    userId: string,
  ) {
    const categoryData = await prismaClient.category.findUnique({
      where: {
        id: categoryId,
        userId,
      },
    });
    if (!categoryData) throw new Error("Categoria não encontrada.");
    return prismaClient.transaction.create({
      data: {
        description: data.description,
        type: data.type,
        date: data.date,
        amount: data.amount,
        userId,
        categoryId,
      },
      include: {
        category: true,
      },
    });
  }

  async findTransaction(id: string, userId: string) {
    const transaction = await prismaClient.transaction.findUnique({
      where: {
        id,
        userId,
      },
    });
    if (!transaction) throw new Error("Transação não existe");
    return transaction;
  }

  async listTransactions(userId: string, args: TransactionListArgs) {
    const {
      limit = 10,
      offset = 0,
      sort = "desc",
      categoryId,
      type,
      description,
      month,
      year,
    } = args;

    const where: any = {
      userId,
    };

    if (categoryId) {
      where.categoryId = categoryId;
    }

    if (type) {
      where.type = type;
    }

    if (description) {
      where.description = {
        contains: description.toLowerCase(),
      };
    }

    if (month && year) {
      const startDate = new Date(Date.UTC(year, month - 1, 1));
      const endDate = new Date(Date.UTC(year, month, 1));

      where.date = {
        gte: startDate,
        lt: endDate,
      };
    }

    const [items, totalCount] = await Promise.all([
      prismaClient.transaction.findMany({
        where,
        take: limit,
        skip: offset,
        orderBy: {
          date: sort ?? "desc",
        },
        include: {
          category: true,
        },
      }),
      prismaClient.transaction.count({
        where,
      }),
    ]);

    return {
      items,
      totalCount,
    };
  }

  async getCategorySummary(userId: string) {
    const categories = await prismaClient.category.findMany({
      where: { userId },
    });

    const categoryIds = categories.map((c) => c.id);

    const grouped = await prismaClient.transaction.groupBy({
      by: ["categoryId"],
      where: {
        userId,
        categoryId: { in: categoryIds },
      },
      _count: { id: true },
      _sum: { amount: true },
      orderBy: {
        _count: { id: "desc" },
      },
    });

    const groupedMap = new Map(grouped.map((g) => [g.categoryId, g]));

    const categoriesSummary = categories.map((category) => {
      const group = groupedMap.get(category.id);

      return {
        category,
        totalTransactions: group?._count.id ?? 0,
        totalAmount: group?._sum.amount ?? 0,
      };
    });

    const totalCategories = categories.length;

    const totalTransactions = grouped.reduce(
      (acc, curr) => acc + curr._count.id,
      0,
    );

    const mostUsedCategoryTitle =
      grouped.length > 0
        ? (categories.find((c) => c.id === grouped[0].categoryId)?.title ??
          null)
        : null;

    return {
      totalCategories,
      totalTransactions,
      mostUsedCategoryTitle,
      categories: categoriesSummary,
    };
  }

  async getFinancialSummary(userId: string) {
    const now = new Date();

    const startOfMonth = new Date(
      Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1),
    );

    const startOfNextMonth = new Date(
      Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + 1, 1),
    );

    const [allIncome, allExpense, monthIncome, monthExpense] =
      await Promise.all([
        prismaClient.transaction.aggregate({
          where: { userId, type: "income" },
          _sum: { amount: true },
        }),

        prismaClient.transaction.aggregate({
          where: { userId, type: "expense" },
          _sum: { amount: true },
        }),

        prismaClient.transaction.aggregate({
          where: {
            userId,
            type: "income",
            date: {
              gte: startOfMonth,
              lt: startOfNextMonth,
            },
          },
          _sum: { amount: true },
        }),

        prismaClient.transaction.aggregate({
          where: {
            userId,
            type: "expense",
            date: {
              gte: startOfMonth,
              lt: startOfNextMonth,
            },
          },
          _sum: { amount: true },
        }),
      ]);

    const totalIncomeAll = allIncome._sum.amount ?? 0;
    const totalExpenseAll = allExpense._sum.amount ?? 0;

    return {
      totalAmount: totalIncomeAll - totalExpenseAll,
      totalIncome: monthIncome._sum.amount ?? 0,
      totalExpense: monthExpense._sum.amount ?? 0,
    };
  }

  async updateTransaction(
    id: string,
    data: UpdateTransactionInput,
    userId: string,
    categoryId?: string,
  ) {
    const transaction = await prismaClient.transaction.findUnique({
      where: { id, userId },
    });
    if (!transaction) throw new Error("Transação não existe");
    return prismaClient.transaction.update({
      where: { id },
      data: {
        description: data.description ?? undefined,
        date: data.date ?? undefined,
        amount: data.amount ?? undefined,
        type: data.type ?? undefined,
        categoryId: categoryId ?? undefined,
      },
    });
  }

  async deleteTransaction(id: string, userId: string) {
    const transaction = await prismaClient.transaction.findFirst({
      where: { id, userId },
    });
    if (!transaction) throw new Error("Transação não existe");
    await prismaClient.transaction.delete({
      where: { id },
    });

    return true;
  }
}
