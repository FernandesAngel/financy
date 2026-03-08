import {
  Arg,
  Args,
  Ctx,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root,
  UseMiddleware,
} from "type-graphql";
import { UserModel } from "../models/user.model";
import { IsAuth } from "../middlewares/auth.middleware";
import { CategoryModel } from "../models/category.model";
import { CategoryService } from "../services/category.service";
import { GqlUser } from "../graphql/decorators/user.decorator";
import { UserService } from "../services/user.service";
import {
  FinancialSummary,
  TransactionModel,
} from "../models/transaction.model";
import { TransactionService } from "../services/transaction.service";
import {
  CreateTransactionInput,
  UpdateTransactionInput,
} from "../dtos/input/transaction.input";
import { TransactionListResponse } from "../models/transaction-list-response.model";
import { TransactionListArgs } from "../dtos/args/transaction-list.args";
import { CategorySummary } from "../models/category-summary.model";
import { Context } from "vm";

@Resolver(() => TransactionModel)
@UseMiddleware(IsAuth)
export class TransactionResolver {
  private transactionService = new TransactionService();
  private userService = new UserService();

  private categoryService = new CategoryService();

  @Query(() => TransactionModel)
  async getTransaction(
    @Arg("id", () => String) id: string,
    @GqlUser() user: UserModel,
  ): Promise<TransactionModel> {
    const transaction = await this.transactionService.findTransaction(
      id,
      user.id,
    );
    const category = await this.categoryService.findCategory(
      transaction.categoryId,
      user.id,
    );
    return { ...transaction, category };
  }

  @Query(() => TransactionListResponse)
  async listTransactions(
    @Args(() => TransactionListArgs) args: TransactionListArgs,
    @GqlUser() user: UserModel,
  ): Promise<TransactionListResponse> {
    return this.transactionService.listTransactions(user.id, args);
  }

  @Query(() => CategorySummary)
  async categorySummary(@GqlUser() user: UserModel) {
    return this.transactionService.getCategorySummary(user.id);
  }

  @Query(() => FinancialSummary)
  async financialSummary(@GqlUser() user: UserModel) {
    return this.transactionService.getFinancialSummary(user.id);
  }

  @Mutation(() => TransactionModel)
  async createTransaction(
    @Arg("categoryId", () => String) categoryId: string,
    @Arg("data", () => CreateTransactionInput) data: CreateTransactionInput,
    @GqlUser() user: UserModel,
  ): Promise<TransactionModel> {
    return this.transactionService.createTransaction(categoryId, data, user.id);
  }

  @Mutation(() => TransactionModel)
  async updateTransaction(
    @Arg("categoryId", () => String) categoryId: string,
    @Arg("data", () => UpdateTransactionInput) data: UpdateTransactionInput,
    @Arg("id", () => String) id: string,
    @GqlUser() user: UserModel,
  ): Promise<TransactionModel> {
    const updatedTransaction = await this.transactionService.updateTransaction(
      id,
      data,
      user.id,
      categoryId,
    );
    const category = await this.categoryService.findCategory(
      updatedTransaction.categoryId,
      user.id,
    );
    return { ...updatedTransaction, category };
  }

  @Mutation(() => Boolean)
  async deleteTransaction(
    @Arg("id", () => String) id: string,
    @GqlUser() user: UserModel,
  ): Promise<boolean> {
    await this.transactionService.deleteTransaction(id, user.id);
    return true;
  }

  @FieldResolver(() => CategoryModel)
  async category(
    @Root() transaction: TransactionModel,
    @GqlUser() user: UserModel,
  ): Promise<CategoryModel> {
    return this.categoryService.findCategory(transaction.categoryId, user.id);
  }

  @FieldResolver(() => UserModel)
  async user(@Root() transaction: TransactionModel): Promise<UserModel> {
    return this.userService.findUser(transaction.userId);
  }
}
