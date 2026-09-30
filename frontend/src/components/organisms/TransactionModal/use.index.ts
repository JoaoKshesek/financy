import { createElement, useEffect, useMemo } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQuery } from "@apollo/client/react"
import { toast } from "sonner"

import { transactionSchema, type TransactionFormData } from "@/schemas"
import { CATEGORY_ICONS } from "@/lib/utils/category-icons"
import { CREATE_TRANSACTION } from "@/lib/graphql/mutations/transactions/create-transaction"
import { UPDATE_TRANSACTION } from "@/lib/graphql/mutations/transactions/update-transaction"
import { LIST_CATEGORIES } from "@/lib/graphql/queries/categories/list-categories"
import { LIST_TRANSACTIONS } from "@/lib/graphql/queries/transactions/list-transactions"
import { GET_DASHBOARD } from "@/lib/graphql/queries/dashboard/get-dashboard"
import type {
  Category,
  CreateTransactionInput,
  Transaction,
  UpdateTransactionInput,
} from "@/types"

export type TransactionDraft = Partial<
  Pick<Transaction, "id" | "description" | "amount" | "type" | "categoryId">
> & {
  date?: string
}

type UseTransactionModalParams = {
  open: boolean
  transaction?: TransactionDraft | null
  onOpenChange?: (open: boolean) => void
}

function toDateInput(iso?: string) {
  if (!iso) return ""
  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) return ""

  const month = String(date.getMonth() + 1).padStart(2, "0")
  const day = String(date.getDate()).padStart(2, "0")

  return `${date.getFullYear()}-${month}-${day}`
}

function toIso(dateInput: string) {
  return new Date(`${dateInput}T12:00:00`).toISOString()
}

export function useTransactionModal({
  open,
  transaction,
  onOpenChange,
}: UseTransactionModalParams) {
  const isEditing = Boolean(transaction?.id)

  const { data: categoriesData } = useQuery<{ listCategories: Category[] }>(
    LIST_CATEGORIES
  )

  const categoryOptions = useMemo(
    () =>
      (categoriesData?.listCategories ?? []).map((category) => ({
        value: category.id,
        label: category.title,
        icon: createElement(CATEGORY_ICONS[category.icon]),
      })),
    [categoriesData]
  )

  const refetchQueries = [LIST_TRANSACTIONS, LIST_CATEGORIES, GET_DASHBOARD]

  const [createTransaction] = useMutation<
    { createTransaction: Transaction },
    { data: CreateTransactionInput }
  >(CREATE_TRANSACTION, { refetchQueries })

  const [updateTransaction] = useMutation<
    { updateTransaction: Transaction },
    { id: string; data: UpdateTransactionInput }
  >(UPDATE_TRANSACTION, { refetchQueries })

  const initialValues = useMemo<TransactionFormData>(
    () => ({
      type: transaction?.type ?? "EXPENSE",
      description: transaction?.description ?? "",
      date: toDateInput(transaction?.date),
      amount: transaction?.amount ?? 0,
      categoryId: transaction?.categoryId ?? "",
    }),
    [transaction]
  )

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TransactionFormData>({
    resolver: zodResolver(transactionSchema),
    defaultValues: initialValues,
  })

  useEffect(() => {
    if (open) reset(initialValues)
  }, [open, initialValues, reset])

  const onSubmit = handleSubmit(async (formData) => {
    const data = {
      description: formData.description,
      amount: formData.amount,
      date: toIso(formData.date),
      type: formData.type,
      categoryId: formData.categoryId,
    }

    try {
      if (isEditing && transaction?.id) {
        await updateTransaction({ variables: { id: transaction.id, data } })
        toast.success("Transação atualizada!")
      } else {
        await createTransaction({ variables: { data } })
        toast.success("Transação criada!")
      }

      onOpenChange?.(false)
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Tente novamente."
      toast.error(`Não foi possível salvar a transação. ${message}`)
    }
  })

  return { isEditing, control, errors, isSubmitting, onSubmit, categoryOptions }
}
