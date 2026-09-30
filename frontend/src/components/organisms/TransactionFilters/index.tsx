import type { Control } from "react-hook-form"
import { Search } from "lucide-react"

import type { SelectOption } from "@/components/atoms"
import { ControlledInput, ControlledSelectInput } from "@/components/molecules"
import type { TransactionFiltersValues } from "@/schemas"

export type TransactionFiltersProps = {
  control: Control<TransactionFiltersValues>
  typeOptions: SelectOption[]
  categoryOptions: SelectOption[]
  periodOptions: SelectOption[]
}

export function TransactionFilters({
  control,
  typeOptions,
  categoryOptions,
  periodOptions,
}: TransactionFiltersProps) {
  return (
    <div
      data-slot="transaction-filters"
      className="flex w-full items-start justify-between gap-4 rounded-[12px] border border-gray-200 bg-white px-6 py-5"
    >
      <ControlledInput<TransactionFiltersValues>
        name="search"
        control={control}
        label="Buscar"
        placeholder="Buscar por descrição"
        leftIcon={<Search />}
        containerClassName="flex-1"
      />

      <ControlledSelectInput<TransactionFiltersValues>
        name="type"
        control={control}
        label="Tipo"
        options={typeOptions}
        containerClassName="flex-1"
      />

      <ControlledSelectInput<TransactionFiltersValues>
        name="categoryId"
        control={control}
        label="Categoria"
        options={categoryOptions}
        containerClassName="flex-1"
      />

      <ControlledSelectInput<TransactionFiltersValues>
        name="period"
        control={control}
        label="Período"
        options={periodOptions}
        containerClassName="flex-1"
      />
    </div>
  )
}
