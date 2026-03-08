import { Field, Float, Int, ObjectType } from "type-graphql";
import { CategoryModel } from "./category.model";

@ObjectType()
export class CategorySummaryItem {
  @Field(() => CategoryModel)
  category!: CategoryModel;

  @Field(() => Int)
  totalTransactions!: number;

  @Field(() => Float)
  totalAmount!: number;
}

@ObjectType()
export class CategorySummary {
  @Field(() => Int)
  totalCategories!: number;

  @Field(() => Int)
  totalTransactions!: number;

  @Field(() => String, { nullable: true })
  mostUsedCategoryTitle!: string | null;

  @Field(() => [CategorySummaryItem])
  categories!: CategorySummaryItem[];
}
