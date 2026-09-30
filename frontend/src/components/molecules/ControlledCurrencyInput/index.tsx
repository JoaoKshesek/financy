import * as React from "react"
import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form"
import { cn } from "cn"

import { Field, FieldBox, FieldHelper, FieldLabel } from "@/components/atoms"

function format(value: number) {
  return value.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}

function parse(text: string) {
  const digits = text.replace(/\D/g, "")
  return digits ? Number(digits) / 100 : 0
}

export type ControlledCurrencyInputProps<T extends FieldValues> = {
  name: Path<T>
  control: Control<T>
  label?: string
  helper?: React.ReactNode
  errorMessage?: string
  placeholder?: string
  disabled?: boolean
  containerClassName?: string
}

export function ControlledCurrencyInput<T extends FieldValues>({
  name,
  control,
  label,
  helper,
  errorMessage,
  placeholder = "0,00",
  disabled,
  containerClassName,
}: ControlledCurrencyInputProps<T>) {
  const generatedId = React.useId()
  const hasError = Boolean(errorMessage)

  return (
    <Field error={hasError} disabled={disabled} className={containerClassName}>
      {label && <FieldLabel htmlFor={generatedId}>{label}</FieldLabel>}

      <Controller
        name={name}
        control={control}
        render={({ field: { value, onChange, onBlur, ref } }) => (
          <FieldBox className="h-auto justify-between rounded-[8px] px-3 py-3.5">
            <span className="shrink-0 text-base leading-[18px] text-gray-500">
              R$
            </span>

            <input
              id={generatedId}
              ref={ref}
              inputMode="numeric"
              disabled={disabled}
              aria-invalid={hasError || undefined}
              data-slot="input"
              placeholder={placeholder}
              value={value ? format(Number(value)) : ""}
              onChange={(event) => onChange(parse(event.target.value))}
              onBlur={onBlur}
              className={cn(
                "min-w-0 flex-1 bg-transparent text-base leading-[18px] font-normal text-gray-700 outline-none",
                "caret-brand-base placeholder:text-gray-400",
                "disabled:cursor-not-allowed"
              )}
            />
          </FieldBox>
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
