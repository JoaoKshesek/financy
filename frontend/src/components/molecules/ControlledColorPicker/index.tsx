import * as React from "react"
import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form"
import { cn } from "cn"

import { Field, FieldHelper, FieldLabel } from "@/components/atoms"
import { CATEGORY_COLOR_NAMES, COLOR_SWATCH } from "@/lib/utils/colors"

export type ControlledColorPickerProps<T extends FieldValues> = {
  name: Path<T>
  control: Control<T>
  label?: string
  helper?: React.ReactNode
  errorMessage?: string
  containerClassName?: string
}

export function ControlledColorPicker<T extends FieldValues>({
  name,
  control,
  label,
  helper,
  errorMessage,
  containerClassName,
}: ControlledColorPickerProps<T>) {
  const generatedId = React.useId()
  const hasError = Boolean(errorMessage)

  return (
    <Field error={hasError} className={containerClassName}>
      {label && <FieldLabel htmlFor={generatedId}>{label}</FieldLabel>}

      <Controller
        name={name}
        control={control}
        render={({ field: { value, onChange } }) => (
          <div
            id={generatedId}
            role="radiogroup"
            aria-label={label}
            className="flex flex-wrap gap-2"
          >
            {CATEGORY_COLOR_NAMES.map((colorName) => {
              const selected = value === colorName

              return (
                <button
                  key={colorName}
                  type="button"
                  role="radio"
                  aria-checked={selected}
                  aria-label={colorName}
                  onClick={() => onChange(colorName)}
                  className={cn(
                    "flex h-[30px] w-[50px] shrink-0 cursor-pointer items-center justify-center rounded-[8px] border border-gray-300 bg-white p-1 transition-colors",
                    "outline-none focus-visible:ring-2 focus-visible:ring-brand-base/40",
                    selected && "border-brand-base bg-gray-100"
                  )}
                >
                  <span
                    aria-hidden
                    className={cn(
                      "h-5 w-10 rounded-[4px]",
                      COLOR_SWATCH[colorName]
                    )}
                  />
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
