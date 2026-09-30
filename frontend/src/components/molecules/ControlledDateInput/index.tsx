import * as React from "react"
import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form"
import { cn } from "cn"

import { Field, FieldBox, FieldHelper, FieldLabel } from "@/components/atoms"

export type ControlledDateInputProps<T extends FieldValues> = {
  name: Path<T>
  control: Control<T>
  label?: string
  helper?: React.ReactNode
  errorMessage?: string
  disabled?: boolean
  containerClassName?: string
}

export function ControlledDateInput<T extends FieldValues>({
  name,
  control,
  label,
  helper,
  errorMessage,
  disabled,
  containerClassName,
}: ControlledDateInputProps<T>) {
  const generatedId = React.useId()
  const hasError = Boolean(errorMessage)

  return (
    <Field error={hasError} disabled={disabled} className={containerClassName}>
      {label && <FieldLabel htmlFor={generatedId}>{label}</FieldLabel>}

      <Controller
        name={name}
        control={control}
        render={({ field: { value, onChange, onBlur, ref } }) => (
          <FieldBox className="h-auto cursor-pointer justify-between rounded-[8px] px-3 py-3.5">
            <input
              id={generatedId}
              ref={ref}
              type="date"
              disabled={disabled}
              aria-invalid={hasError || undefined}
              data-slot="input"
              value={value ?? ""}
              onChange={(event) => onChange(event.target.value)}
              onBlur={onBlur}
              className={cn(
                "min-w-0 flex-1 cursor-pointer bg-transparent text-base leading-[18px] font-normal text-gray-700 outline-none",
                "caret-brand-base",
                "[&::-webkit-calendar-picker-indicator]:cursor-pointer",
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
