export interface User {
  id: string
  name: string
  email: string
  createdAt?: string
  updatedAt?: string
}

export interface RegisterInput {
  name: string
  email: string
  password: string
}

export interface LoginInput {
  email: string
  password: string
}

export interface UpdateUserInput {
  name?: string
}

import type { CategoryIconName } from "@/lib/utils/category-icons"
import type { CategoryColorName } from "@/lib/utils/colors"

export type TransactionType = "INCOME" | "EXPENSE"

export interface Category {
  id: string
  title: string
  description?: string | null
  icon: CategoryIconName
  color: CategoryColorName
  userId: string
  createdAt?: string
  updatedAt?: string
}

export interface Transaction {
  id: string
  description: string
  amount: number
  date: string
  type: TransactionType
  categoryId?: string | null
  category?: Category | null
  userId: string
  createdAt?: string
  updatedAt?: string
}

export interface CreateCategoryInput {
  title: string
  description?: string
  icon: CategoryIconName
  color: CategoryColorName
}

export type UpdateCategoryInput = Partial<CreateCategoryInput>

export interface CreateTransactionInput {
  description: string
  amount: number
  date: string
  type: TransactionType
  categoryId?: string
}

export type UpdateTransactionInput = Partial<CreateTransactionInput>

export interface CategorySummary {
  category: Category
  count: number
  total: number
}

export interface Dashboard {
  balance: number
  monthIncome: number
  monthExpenses: number
  recentTransactions: Transaction[]
  topCategories: CategorySummary[]
}
