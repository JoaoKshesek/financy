import { Field, Float, GraphQLISODateTime, ID, ObjectType, registerEnumType } from 'type-graphql'
import { UserModel } from './user.model'
import { TransactionType } from '../generated/prisma/enums.js'
import { CategoryModel } from './category.model'

export { TransactionType }

registerEnumType(TransactionType, {
  name: 'TransactionType',
  description: 'Type of the transaction',
})

@ObjectType()
export class TransactionModel {
  @Field(() => ID)
  id!: string

  @Field(() => String)
  description!: string

  @Field(() => GraphQLISODateTime)
  date!: Date

  @Field(() => Float)
  amount!: number

  @Field(() => TransactionType)
  type!: TransactionType

  @Field(() => String, { nullable: true })
  categoryId!: string | null

  @Field(() => CategoryModel, { nullable: true })
  category?: CategoryModel

  @Field(() => String)
  userId!: string

  @Field(() => UserModel, { nullable: true })
  user?: UserModel

  @Field(() => GraphQLISODateTime)
  createdAt!: Date

  @Field(() => GraphQLISODateTime)
  updatedAt!: Date
}
