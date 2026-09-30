import { prismaClient } from '../../prisma/prisma'

const RECENT_TRANSACTIONS = 5
const TOP_CATEGORIES = 5

export class DashboardService {
  async getDashboard(userId: string) {
    const now = new Date()
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1)
    const nextMonthStart = new Date(now.getFullYear(), now.getMonth() + 1, 1)

    const [totals, monthTotals, recentTransactions, grouped] = await Promise.all([
      prismaClient.transaction.groupBy({
        by: ['type'],
        where: { userId },
        _sum: { amount: true },
      }),
      prismaClient.transaction.groupBy({
        by: ['type'],
        where: { userId, date: { gte: monthStart, lt: nextMonthStart } },
        _sum: { amount: true },
      }),
      prismaClient.transaction.findMany({
        where: { userId },
        orderBy: { date: 'desc' },
        take: RECENT_TRANSACTIONS,
        include: { category: true },
      }),
      prismaClient.transaction.groupBy({
        by: ['categoryId'],
        where: { userId, categoryId: { not: null } },
        _count: { _all: true },
        _sum: { amount: true },
        orderBy: { _count: { categoryId: 'desc' } },
        take: TOP_CATEGORIES,
      }),
    ])

    const sumOf = (
      rows: { type: string; _sum: { amount: number | null } }[],
      type: 'INCOME' | 'EXPENSE'
    ) => rows.find((row) => row.type === type)?._sum.amount ?? 0

    const categories = await prismaClient.category.findMany({
      where: { id: { in: grouped.map((row) => row.categoryId as string) } },
    })
    const byId = new Map(categories.map((category) => [category.id, category]))

    return {
      balance: sumOf(totals, 'INCOME') - sumOf(totals, 'EXPENSE'),
      monthIncome: sumOf(monthTotals, 'INCOME'),
      monthExpenses: sumOf(monthTotals, 'EXPENSE'),
      recentTransactions,
      topCategories: grouped
        .map((row) => ({
          category: byId.get(row.categoryId as string),
          count: row._count._all,
          total: row._sum.amount ?? 0,
        }))
        .filter((item) => Boolean(item.category)),
    }
  }
}
