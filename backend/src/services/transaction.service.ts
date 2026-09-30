import { prismaClient } from '../../prisma/prisma'
import { CreateTransactionInput, UpdateTransactionInput } from '../dtos/input/transaction.input'

export class TransactionService {
  async listTransactions(userId: string) {
    return prismaClient.transaction.findMany({
      where: { userId },
    })
  }

  async getTransaction(transactionId: string, userId: string) {
    const transaction = await prismaClient.transaction.findFirst({
      where: { id: transactionId, userId },
    })

    if (!transaction) throw new Error('Transação não encontrada.')

    return transaction
  }

  async createTransaction(data: CreateTransactionInput, userId: string) {
    return prismaClient.transaction.create({
      data: {
        description: data.description,
        type: data.type,
        date: data.date,
        amount: data.amount,
        categoryId: data.categoryId,
        userId: userId,
      },
    })
  }

  async updateTransaction(
    transactionId: string,
    userId: string,
    data: UpdateTransactionInput
  ) {
    const transaction = await prismaClient.transaction.findFirst({
      where: { id: transactionId, userId },
    })
    if (!transaction) throw new Error('Transação não encontrada.')

    return prismaClient.transaction.update({
      where: { id: transactionId },
      data: {
        description: data.description,
        type: data.type,
        date: data.date,
        amount: data.amount,
        categoryId: data.categoryId,
      },
    })
  }

  async deleteTransaction(transactionId: string, userId: string) {
    const transaction = await prismaClient.transaction.findFirst({
      where: { id: transactionId, userId },
    })
    if (!transaction) throw new Error('Transação não encontrada.')

    return prismaClient.transaction.delete({
      where: { id: transactionId },
    })
  }
}
