import * as React from "react"
import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form"
import { Eye, EyeClosed } from "lucide-react"
import { cn } from "cn"

import {
  Field,
  FieldBox,
  FieldHelper,
  FieldIcon,
  FieldLabel,
} from "@/components/atoms"
import { useControlledInput } from "./use.index"

type ControlledInputProps<T extends FieldValues> = {
  name: Path<T>
  control: Control<T>
  label?: string
  helper?: React.ReactNode
  errorMessage?: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  containerClassName?: string
} & Omit<
  React.ComponentProps<"input">,
  "name" | "value" | "onChange" | "onBlur" | "ref"
>

export function ControlledInput<T extends FieldValues>({
  name,
  control,
  label,
  helper,
  errorMessage,
  leftIcon,
  rightIcon,
  containerClassName,
  className,
  id,
  type = "text",
  disabled,
  ...inputProps
}: ControlledInputProps<T>) {
  const { inputId, hasError, isPassword, visible, toggleVisible, inputType } =
    useControlledInput({ id, type, errorMessage })

  return (
    <Field
      error={hasError}
      disabled={disabled}
      className={containerClassName}
    >
      {label && <FieldLabel htmlFor={inputId}>{label}</FieldLabel>}

      <Controller
        name={name}
        control={control}
        render={({ field: { value, onChange, onBlur, ref } }) => (
          <FieldBox
            className="h-auto justify-between rounded-[8px] px-3 py-3.5"
          >
            {leftIcon && (
              <FieldIcon className="text-gray-400">{leftIcon}</FieldIcon>
            )}

            <input
              id={inputId}
              ref={ref}
              type={inputType}
              disabled={disabled}
              aria-invalid={hasError || undefined}
              aria-describedby={
                errorMessage || helper ? `${inputId}-helper` : undefined
              }
              data-slot="input"
              value={value ?? ""}
              onChange={onChange}
              onBlur={onBlur}
              className={cn(
                "min-w-0 shadow-none flex-1 bg-transparent text-base leading-[18px] font-normal text-gray-700 outline-none",
                "caret-brand-base placeholder:text-gray-400",
                "disabled:cursor-not-allowed",
                className
              )}
              {...inputProps}
            />

            {isPassword ? (
              <button
                type="button"
                tabIndex={-1}
                onClick={toggleVisible}
                aria-label={visible ? "Ocultar senha" : "Mostrar senha"}
                className="flex shrink-0 cursor-pointer items-center text-gray-700 transition-colors hover:text-gray-800 [&_svg]:size-4"
              >
                {visible ? <Eye  className="text-gray-700"/> : <EyeClosed  className="text-gray-700"/>}
              </button>
            ) : (
              rightIcon && (
                <FieldIcon className="text-gray-700">{rightIcon}</FieldIcon>
              )
            )}
          </FieldBox>
        )}
      />

      {(errorMessage || helper) && (
        <FieldHelper
          id={`${inputId}-helper`}
          className={cn(hasError && "text-danger")}
        >
          {errorMessage ?? helper}
        </FieldHelper>
      )}
    </Field>
  )
}
