export const ALL = "ALL"

export type TransactionFiltersValues = {
  search: string
  type: typeof ALL | "INCOME" | "EXPENSE"
  categoryId: string
  period: string
}

export const DEFAULT_TRANSACTION_FILTERS: TransactionFiltersValues = {
  search: "",
  type: ALL,
  categoryId: ALL,
  period: ALL,
}
