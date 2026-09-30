import {
  Arg,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root,
  UseMiddleware,
} from 'type-graphql'
import { TransactionModel } from '../models/transaction.model'
import { CreateTransactionInput, UpdateTransactionInput } from '../dtos/input/transaction.input'

import { GqlUser } from '../graphql/decorators/user.decorator'
import { IsAuth } from '../middlewares/auth.middleware'
import { UserModel } from '../models/user.model'
import { UserService } from '../services/user.service'
import { CategoryModel } from '../models/category.model'
import { CategoryService } from '../services/category.service'
import { TransactionService } from '../services/transaction.service'

@Resolver(() => TransactionModel)
@UseMiddleware(IsAuth)
export class TransactionResolver {
  private transactionService = new TransactionService()
  private userService = new UserService()
  private categoryService = new CategoryService()

  @Query(() => [TransactionModel])
  async listTransactions(@GqlUser() user: UserModel): Promise<TransactionModel[]> {
    return this.transactionService.listTransactions(user.id)
  }

  @Query(() => TransactionModel)
  async getTransaction(
    @Arg('id', () => String) id: string,
    @GqlUser() user: UserModel
  ): Promise<TransactionModel> {
    return this.transactionService.getTransaction(id, user.id)
  }

  @Mutation(() => TransactionModel)
  async createTransaction(
    @Arg('data', () => CreateTransactionInput) data: CreateTransactionInput,
    @GqlUser() user: UserModel
  ): Promise<TransactionModel> {
    return this.transactionService.createTransaction(data, user.id)
  }

  @Mutation(() => TransactionModel)
  async updateTransaction(
    @Arg('data', () => UpdateTransactionInput) data: UpdateTransactionInput,
    @Arg('id', () => String) id: string,
    @GqlUser() user: UserModel
  ): Promise<TransactionModel> {
    return this.transactionService.updateTransaction(id, user.id, data)
  }

  @Mutation(() => Boolean)
  async deleteTransaction(
    @Arg('id', () => String) id: string,
    @GqlUser() user: UserModel
  ): Promise<boolean> {
    await this.transactionService.deleteTransaction(id, user.id)
    return true
  }

  @FieldResolver(() => UserModel)
  async user(@Root() transaction: TransactionModel): Promise<UserModel> {
    return this.userService.findUser(transaction.userId)
  }

  @FieldResolver(() => CategoryModel, { nullable: true })
  async category(@Root() transaction: TransactionModel): Promise<CategoryModel | null> {
    return this.categoryService.getCategory(transaction.categoryId, transaction.userId  )
  }
}
