import * as React from "react"
import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form"
import { cn } from "cn"

import { Field, FieldHelper, FieldLabel, IconButton } from "@/components/atoms"
import { CATEGORY_ICONS, CATEGORY_ICON_NAMES } from "@/lib/utils/category-icons"

export type ControlledIconPickerProps<T extends FieldValues> = {
  name: Path<T>
  control: Control<T>
  label?: string
  helper?: React.ReactNode
  errorMessage?: string
  containerClassName?: string
}

export function ControlledIconPicker<T extends FieldValues>({
  name,
  control,
  label,
  helper,
  errorMessage,
  containerClassName,
}: ControlledIconPickerProps<T>) {
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
            className="grid grid-cols-8 gap-2"
          >
            {CATEGORY_ICON_NAMES.map((iconName) => {
              const Icon = CATEGORY_ICONS[iconName]
              const selected = value === iconName

              return (
                <IconButton
                  key={iconName}
                  role="radio"
                  aria-checked={selected}
                  aria-label={iconName}
                  onClick={() => onChange(iconName)}
                  className={cn(
                    "size-10 cursor-pointer rounded-[8px] [&_svg]:size-5",
                    selected && "border-brand-base bg-gray-100"
                  )}
                >
                  <Icon />
                </IconButton>
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
