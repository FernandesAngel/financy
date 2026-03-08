import { Field, Int, ObjectType } from "type-graphql";
import { TransactionModel } from "./transaction.model";

@ObjectType()
export class TransactionListResponse {
  @Field(() => [TransactionModel])
  items!: TransactionModel[];

  @Field(() => Int)
  totalCount!: number;
}
