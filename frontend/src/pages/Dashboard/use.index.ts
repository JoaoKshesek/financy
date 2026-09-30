import { CircleArrowDown, CircleArrowUp, Wallet } from "lucide-react"
import { createElement, useMemo, useState } from "react"
import { useQuery } from "@apollo/client/react"

import type { SummaryCardProps } from "@/components/molecules"
import type { TransactionListItem } from "@/components/organisms/TransactionsTable"
import type { CategoryListItem } from "@/components/organisms/CategoriesList"
import { CATEGORY_ICONS } from "@/lib/utils/category-icons"
import { formatCurrency } from "@/lib/utils/currency"
import { formatShortDate } from "@/lib/utils/period"
import { GET_DASHBOARD } from "@/lib/graphql/queries/dashboard/get-dashboard"
import type { Dashboard } from "@/types"

export function useDashboard() {
  const { data, loading, error } = useQuery<{ dashboard: Dashboard }>(
    GET_DASHBOARD
  )

  const dashboard = data?.dashboard

  const summaryCards: SummaryCardProps[] = [
    {
      label: "Saldo total",
      value: formatCurrency(dashboard?.balance ?? 0),
      icon: createElement(Wallet),
      color: "purple",
    },
    {
      label: "Receitas do mês",
      value: formatCurrency(dashboard?.monthIncome ?? 0),
      icon: createElement(CircleArrowUp),
      color: "brand",
    },
    {
      label: "Despesas do mês",
      value: formatCurrency(dashboard?.monthExpenses ?? 0),
      icon: createElement(CircleArrowDown),
      color: "red",
    },
  ]

  const transactions = useMemo<TransactionListItem[]>(
    () =>
      (dashboard?.recentTransactions ?? []).map((transaction) => ({
        id: transaction.id,
        description: transaction.description,
        date: formatShortDate(transaction.date),
        category: transaction.category?.title ?? "Sem categoria",
        color: transaction.category?.color ?? "gray",
        icon: transaction.category
          ? CATEGORY_ICONS[transaction.category.icon]
          : CATEGORY_ICONS.RECEIPT_TEXT,
        amount: transaction.amount,
        type: transaction.type,
      })),
    [dashboard]
  )

  const categories = useMemo<CategoryListItem[]>(
    () =>
      (dashboard?.topCategories ?? []).map(({ category, count, total }) => ({
        id: category.id,
        name: category.title,
        color: category.color,
        count,
        total,
      })),
    [dashboard]
  )

  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleNewTransaction = () => {
    setIsModalOpen(true)
  }

  return {
    summaryCards,
    transactions,
    categories,
    loading,
    error,
    isModalOpen,
    setIsModalOpen,
    handleNewTransaction,
  }
}
