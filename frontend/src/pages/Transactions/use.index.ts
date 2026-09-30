import { createElement, useMemo, useState } from "react"
import { useForm, useWatch } from "react-hook-form"
import { useMutation, useQuery } from "@apollo/client/react"
import { toast } from "sonner"

import type { SelectOption } from "@/components/atoms"
import { CATEGORY_ICONS } from "@/lib/utils/category-icons"
import { formatPeriod, toPeriod } from "@/lib/utils/period"
import { LIST_CATEGORIES } from "@/lib/graphql/queries/categories/list-categories"
import { DELETE_TRANSACTION } from "@/lib/graphql/mutations/transactions/delete-transaction"
import { LIST_TRANSACTIONS } from "@/lib/graphql/queries/transactions/list-transactions"
import {
  ALL,
  DEFAULT_TRANSACTION_FILTERS,
  type TransactionFiltersValues,
} from "@/schemas"
import type { Category, Transaction } from "@/types"

const PAGE_SIZE = 10

const TYPE_OPTIONS: SelectOption[] = [
  { value: ALL, label: "Todos" },
  { value: "INCOME", label: "Receitas" },
  { value: "EXPENSE", label: "Despesas" },
]

export function useTransactions() {
  const { data, loading, error } = useQuery<{
    listTransactions: Transaction[]
  }>(LIST_TRANSACTIONS)

  const { data: categoriesData } = useQuery<{ listCategories: Category[] }>(
    LIST_CATEGORIES
  )

  const transactions = useMemo(() => data?.listTransactions ?? [], [data])
  const categories = useMemo(
    () => categoriesData?.listCategories ?? [],
    [categoriesData]
  )

  const { control } = useForm<TransactionFiltersValues>({
    defaultValues: DEFAULT_TRANSACTION_FILTERS,
  })

  const filters = useWatch({ control })

  const categoryOptions = useMemo<SelectOption[]>(
    () => [
      { value: ALL, label: "Todas" },
      ...categories.map((category) => ({
        value: category.id,
        label: category.title,
        icon: createElement(CATEGORY_ICONS[category.icon]),
      })),
    ],
    [categories]
  )

  const periodOptions = useMemo<SelectOption[]>(() => {
    const periods = [...new Set(transactions.map((t) => toPeriod(t.date)))].sort(
      (a, b) => b.localeCompare(a)
    )

    return [
      { value: ALL, label: "Todos os períodos" },
      ...periods.map((period) => ({
        value: period,
        label: formatPeriod(period),
      })),
    ]
  }, [transactions])

  const filteredTransactions = useMemo(() => {
    const search = (filters.search ?? "").trim().toLowerCase()

    return transactions.filter((transaction) => {
      if (search && !transaction.description.toLowerCase().includes(search)) {
        return false
      }
      if (filters.type && filters.type !== ALL && transaction.type !== filters.type) {
        return false
      }
      if (
        filters.categoryId &&
        filters.categoryId !== ALL &&
        transaction.categoryId !== filters.categoryId
      ) {
        return false
      }
      if (
        filters.period &&
        filters.period !== ALL &&
        toPeriod(transaction.date) !== filters.period
      ) {
        return false
      }
      return true
    })
  }, [transactions, filters])

  const [page, setPage] = useState(1)

  const pageCount = Math.max(1, Math.ceil(filteredTransactions.length / PAGE_SIZE))
  const safePage = Math.min(page, pageCount)

  const pagedTransactions = useMemo(
    () => filteredTransactions.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE),
    [filteredTransactions, safePage]
  )

  const [editingTransaction, setEditingTransaction] =
    useState<Transaction | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleNewTransaction = () => {
    setEditingTransaction(null)
    setIsModalOpen(true)
  }

  const handleEditTransaction = (transaction: Transaction) => {
    setEditingTransaction(transaction)
    setIsModalOpen(true)
  }

  const [deletingTransaction, setDeletingTransaction] =
    useState<Transaction | null>(null)

  const [deleteTransaction, { loading: deleting }] = useMutation<
    { deleteTransaction: boolean },
    { id: string }
  >(DELETE_TRANSACTION, { refetchQueries: [LIST_TRANSACTIONS] })

  const handleAskDeleteTransaction = (transaction: Transaction) => {
    setDeletingTransaction(transaction)
  }

  const handleConfirmDeleteTransaction = async () => {
    if (!deletingTransaction) return

    try {
      await deleteTransaction({ variables: { id: deletingTransaction.id } })
      toast.success(`Transação "${deletingTransaction.description}" excluída.`)
      setDeletingTransaction(null)
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Tente novamente."
      toast.error(`Não foi possível excluir a transação. ${message}`)
    }
  }

  return {
    transactions: pagedTransactions,
    totalTransactions: transactions.length,
    filteredCount: filteredTransactions.length,
    page: safePage,
    pageCount,
    rangeStart: filteredTransactions.length === 0 ? 0 : (safePage - 1) * PAGE_SIZE + 1,
    rangeEnd: Math.min(safePage * PAGE_SIZE, filteredTransactions.length),
    setPage,
    loading,
    error,
    filtersControl: control,
    typeOptions: TYPE_OPTIONS,
    categoryOptions,
    periodOptions,
    isModalOpen,
    setIsModalOpen,
    editingTransaction,
    handleNewTransaction,
    handleEditTransaction,
    deletingTransaction,
    setDeletingTransaction,
    deleting,
    handleAskDeleteTransaction,
    handleConfirmDeleteTransaction,
  }
}
