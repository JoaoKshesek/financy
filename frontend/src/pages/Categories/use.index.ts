import { ArrowUpDown, Tag } from "lucide-react"
import { createElement, useMemo, useState } from "react"
import { useMutation, useQuery } from "@apollo/client/react"
import { toast } from "sonner"

import type { StatCardProps } from "@/components/molecules"
import { CATEGORY_ICONS } from "@/lib/utils/category-icons"
import { DELETE_CATEGORY } from "@/lib/graphql/mutations/categories/delete-category"
import { LIST_CATEGORIES } from "@/lib/graphql/queries/categories/list-categories"
import { LIST_TRANSACTIONS } from "@/lib/graphql/queries/transactions/list-transactions"
import type { Category, Transaction } from "@/types"

export type CategoryItem = Category & { count: number }

export function useCategories() {
  const { data: categoriesData, loading: loadingCategories, error } = useQuery<{
    listCategories: Category[]
  }>(LIST_CATEGORIES)

  const { data: transactionsData, loading: loadingTransactions } = useQuery<{
    listTransactions: Transaction[]
  }>(LIST_TRANSACTIONS)

  const categories = useMemo(
    () => categoriesData?.listCategories ?? [],
    [categoriesData]
  )
  const transactions = useMemo(
    () => transactionsData?.listTransactions ?? [],
    [transactionsData]
  )

  const items = useMemo<CategoryItem[]>(() => {
    const counts = new Map<string, number>()

    for (const transaction of transactions) {
      if (!transaction.categoryId) continue
      counts.set(
        transaction.categoryId,
        (counts.get(transaction.categoryId) ?? 0) + 1
      )
    }

    return categories.map((category) => ({
      ...category,
      count: counts.get(category.id) ?? 0,
    }))
  }, [categories, transactions])

  const mostUsed = useMemo(
    () =>
      items.reduce<CategoryItem | null>(
        (best, category) =>
          !best || category.count > best.count ? category : best,
        null
      ),
    [items]
  )

  const statCards: StatCardProps[] = [
    {
      value: String(categories.length),
      label: "Total de categorias",
      icon: createElement(Tag),
      color: "gray",
    },
    {
      value: String(transactions.length),
      label: "Total de transações",
      icon: createElement(ArrowUpDown),
      color: "purple",
    },
    {
      value: mostUsed?.title ?? "—",
      label: "Categoria mais utilizada",
      icon: createElement(mostUsed ? CATEGORY_ICONS[mostUsed.icon] : Tag),
      color: mostUsed?.color ?? "gray",
    },
  ]

  const [editingCategory, setEditingCategory] = useState<CategoryItem | null>(
    null
  )
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleNewCategory = () => {
    setEditingCategory(null)
    setIsModalOpen(true)
  }

  const handleEditCategory = (category: CategoryItem) => {
    setEditingCategory(category)
    setIsModalOpen(true)
  }

  const [deletingCategory, setDeletingCategory] = useState<CategoryItem | null>(
    null
  )

  const [deleteCategory, { loading: deleting }] = useMutation<
    { deleteCategory: boolean },
    { id: string }
  >(DELETE_CATEGORY, { refetchQueries: [LIST_CATEGORIES] })

  const handleAskDeleteCategory = (category: CategoryItem) => {
    setDeletingCategory(category)
  }

  const handleConfirmDeleteCategory = async () => {
    if (!deletingCategory) return

    try {
      await deleteCategory({ variables: { id: deletingCategory.id } })
      toast.success(`Categoria "${deletingCategory.title}" excluída.`)
      setDeletingCategory(null)
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Tente novamente."
      toast.error(`Não foi possível excluir a categoria. ${message}`)
    }
  }

  return {
    statCards,
    categories: items,
    loading: loadingCategories || loadingTransactions,
    error,
    isModalOpen,
    setIsModalOpen,
    editingCategory,
    handleNewCategory,
    handleEditCategory,
    deletingCategory,
    setDeletingCategory,
    deleting,
    handleAskDeleteCategory,
    handleConfirmDeleteCategory,
  }
}
