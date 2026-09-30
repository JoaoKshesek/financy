import { Field, InputType } from "type-graphql";
import { TransactionType } from "../../models/transaction.model";


@InputType()
export class CreateTransactionInput {
  @Field(() => String)
  description!: string;

  @Field(() => TransactionType)
  type!: TransactionType;

  @Field(() => Date)
  date!: Date;

  @Field(() => Number)
  amount!: number;

  @Field(() => String, { nullable: true })
  categoryId?: string | null;
}

@InputType()
export class UpdateTransactionInput {
  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => TransactionType, { nullable: true })
  type?: TransactionType;

  @Field(() => Date, { nullable: true })
  date?: Date;

  @Field(() => Number, { nullable: true })
  amount?: number;

  @Field(() => String, { nullable: true })
  categoryId?: string | null;
}
