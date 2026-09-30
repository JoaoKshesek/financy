import * as React from "react"
import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form"
import { CircleArrowDown, CircleArrowUp } from "lucide-react"
import { cn } from "cn"

import { Field, FieldHelper, FieldLabel } from "@/components/atoms"
import type { TransactionType } from "@/types"

type ToggleOption = {
  value: TransactionType
  label: string
  Icon: React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>
  activeClassName: string
  activeIconClassName: string
}

const OPTIONS: readonly ToggleOption[] = [
  {
    value: "EXPENSE",
    label: "Despesa",
    Icon: CircleArrowDown,
    activeClassName: "border-red-base",
    activeIconClassName: "text-red-base",
  },
  {
    value: "INCOME",
    label: "Receita",
    Icon: CircleArrowUp,
    activeClassName: "border-brand-base",
    activeIconClassName: "text-brand-base",
  },
]

export type ControlledTypeToggleProps<T extends FieldValues> = {
  name: Path<T>
  control: Control<T>
  label?: string
  helper?: React.ReactNode
  errorMessage?: string
  containerClassName?: string
}

export function ControlledTypeToggle<T extends FieldValues>({
  name,
  control,
  label,
  helper,
  errorMessage,
  containerClassName,
}: ControlledTypeToggleProps<T>) {
  const hasError = Boolean(errorMessage)

  return (
    <Field error={hasError} className={containerClassName}>
      {label && <FieldLabel>{label}</FieldLabel>}

      <Controller
        name={name}
        control={control}
        render={({ field: { value, onChange } }) => (
          <div
            role="radiogroup"
            aria-label={label ?? "Tipo da transação"}
            className="flex w-full rounded-[12px] border border-gray-200 bg-white p-2"
          >
            {OPTIONS.map((option) => {
              const selected = value === option.value

              return (
                <button
                  key={option.value}
                  type="button"
                  role="radio"
                  aria-checked={selected}
                  onClick={() => onChange(option.value)}
                  className={cn(
                    "flex w-1/2 cursor-pointer items-center justify-center gap-3 rounded-[12px] border border-white px-4 py-3 transition-colors",
                    "text-base leading-[18px] font-medium",
                    selected ? "text-gray-800" : "text-gray-600",
                    selected && option.activeClassName
                  )}
                >
                  <option.Icon
                    aria-hidden
                    className={cn(
                      "size-5 shrink-0",
                      selected ? option.activeIconClassName : "text-gray-400"
                    )}
                  />
                  {option.label}
                </button>
              )
            })}
          </div>
        )}
      />

      {(errorMessage || helper) && (
        <FieldHelper className={cn(hasError && "text-danger")}>
          {errorMessage ?? helper}
        </FieldHelper>
      )}
    </Field>
  )
}
