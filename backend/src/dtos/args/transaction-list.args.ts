import { ArgsType, Field, Int, registerEnumType } from "type-graphql";

export enum SortOrderEnum {
  ASC = "asc",
  DESC = "desc",
}

registerEnumType(SortOrderEnum, {
  name: "SortOrder",
});

@ArgsType()
export class TransactionListArgs {
  @Field(() => Int, { nullable: true })
  limit?: number;

  @Field(() => Int, { nullable: true })
  offset?: number;

  @Field(() => SortOrderEnum, { nullable: true })
  sort?: SortOrderEnum;

  @Field(() => String, { nullable: true })
  categoryId?: string;

  @Field(() => String, { nullable: true })
  type?: string;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => Int, { nullable: true })
  month?: number;

  @Field(() => Int, { nullable: true })
  year?: number;
}
