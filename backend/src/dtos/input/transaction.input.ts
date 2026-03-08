import { Field, Float, InputType } from "type-graphql";
import { CategoryModel } from "../../models/category.model";

@InputType()
export class CreateTransactionInput {
  @Field(() => String)
  description!: string;

  @Field(() => String)
  type!: string;

  @Field(() => Date)
  date!: Date;

  @Field(() => Float)
  amount!: number;
}

@InputType()
export class UpdateTransactionInput {
  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => String, { nullable: true })
  type?: string;

  @Field(() => Date, { nullable: true })
  date?: Date;

  @Field(() => Float, { nullable: true })
  amount?: number;
}
