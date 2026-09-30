import * as React from "react"
import { cn } from "cn"
import { Field, FieldBox, FieldHelper, FieldIcon, FieldLabel } from "../Field"

/**
 * Input (Figma › Componentes › Input)
 * Estados: Empty, Active (foco), Filled, Error, Disabled.
 * - `error` como string substitui o helper e pinta label/ícone de danger.
 * - `leftIcon` / `rightIcon`: ícones Lucide de 16px.
 */
export type InputProps = Omit<React.ComponentProps<"input">, "size"> & {
  label?: string
  helper?: string
  error?: string | boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  /** Classes do container externo (largura, margem). */
  containerClassName?: string
}

export function Input({
  id,
  label,
  helper,
  error,
  leftIcon,
  rightIcon,
  disabled,
  className,
  containerClassName,
  ...props
}: InputProps) {
  const generatedId = React.useId()
  const inputId = id ?? generatedId
  const hasError = Boolean(error)
  const helperText = typeof error === "string" ? error : helper

  return (
    <Field error={hasError} disabled={disabled} className={containerClassName}>
      {label && <FieldLabel htmlFor={inputId}>{label}</FieldLabel>}

      <FieldBox>
        {leftIcon && <FieldIcon>{leftIcon}</FieldIcon>}

        <input
          id={inputId}
          disabled={disabled}
          aria-invalid={hasError || undefined}
          data-slot="input"
          className={cn(
            "min-w-0 flex-1 bg-transparent text-base leading-[18px] text-gray-800 outline-none",
            "placeholder:text-gray-400 caret-brand-base",
            "disabled:cursor-not-allowed",
            className
          )}
          {...props}
        />

        {rightIcon && <FieldIcon>{rightIcon}</FieldIcon>}
      </FieldBox>

      {helperText && <FieldHelper>{helperText}</FieldHelper>}
    </Field>
  )
}
