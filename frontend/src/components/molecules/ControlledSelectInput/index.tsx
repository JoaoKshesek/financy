import * as React from "react"
import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form"

import { Select, type SelectOption } from "@/components/atoms"

export type ControlledSelectInputProps<T extends FieldValues> = {
  name: Path<T>
  control: Control<T>
  options: SelectOption[]
  label?: string
  helper?: string
  errorMessage?: string
  placeholder?: string
  leftIcon?: React.ReactNode
  disabled?: boolean
  containerClassName?: string
}

export function ControlledSelectInput<T extends FieldValues>({
  name,
  control,
  options,
  label,
  helper,
  errorMessage,
  placeholder,
  leftIcon,
  disabled,
  containerClassName,
}: ControlledSelectInputProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, onChange } }) => (
        <Select
          options={options}
          label={label}
          helper={helper}
          error={errorMessage}
          placeholder={placeholder}
          leftIcon={leftIcon}
          disabled={disabled}
          value={value ?? undefined}
          onValueChange={onChange}
          containerClassName={containerClassName}
          className="h-auto cursor-pointer rounded-[8px] px-3 py-3.5"
        />
      )}
    />
  )
}
