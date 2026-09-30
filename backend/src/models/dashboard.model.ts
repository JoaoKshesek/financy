import { Field, Float, Int, ObjectType } from 'type-graphql'
import { CategoryModel } from './category.model'
import { TransactionModel } from './transaction.model'

@ObjectType()
export class CategorySummaryModel {
  @Field(() => CategoryModel)
  category!: CategoryModel

  @Field(() => Int)
  count!: number

  @Field(() => Float)
  total!: number
}

@ObjectType()
export class DashboardModel {
  @Field(() => Float)
  balance!: number

  @Field(() => Float)
  monthIncome!: number

  @Field(() => Float)
  monthExpenses!: number

  @Field(() => [TransactionModel])
  recentTransactions!: TransactionModel[]

  @Field(() => [CategorySummaryModel])
  topCategories!: CategorySummaryModel[]
}
