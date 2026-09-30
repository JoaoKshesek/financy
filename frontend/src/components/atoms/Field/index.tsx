import * as React from "react"
import { Label as RadixLabel } from "radix-ui"
import { cn } from "cn"

/**
 * Peças compartilhadas entre Input e Select (Figma › Componentes › Input).
 * - Field: container em coluna com gap 8px. Expõe `group/field` para que
 *   label e ícone reajam ao foco (estado Active) sem JS.
 * - FieldLabel: 14/20 Medium, gray-700 → brand-base no foco → danger no erro.
 * - FieldBox: a caixa em si (borda gray-300, raio 8px, padding 15px 13px).
 * - FieldHelper: 12/16 Regular, gray-500.
 */

type FieldProps = React.ComponentProps<"div"> & {
  error?: boolean
  disabled?: boolean
}

export function Field({ className, error, disabled, ...props }: FieldProps) {
  return (
    <div
      data-slot="field"
      data-error={error || undefined}
      data-disabled={disabled || undefined}
      className={cn("group/field flex w-full flex-col gap-2", className)}
      {...props}
    />
  )
}

type FieldLabelProps = React.ComponentProps<typeof RadixLabel.Root>

export function FieldLabel({ className, ...props }: FieldLabelProps) {
  return (
    <RadixLabel.Root
      data-slot="field-label"
      className={cn(
        "text-sm font-medium leading-5 text-gray-700 transition-colors",
        // Active: label acompanha o foco de qualquer elemento dentro do Field
        "group-focus-within/field:text-brand-base",
        // Error tem prioridade sobre Active
        "group-data-[error]/field:text-danger group-focus-within/field:group-data-[error]/field:text-danger",
        className
      )}
      {...props}
    />
  )
}

type FieldBoxProps = React.ComponentProps<"div">

export function FieldBox({ className, ...props }: FieldBoxProps) {
  return (
    <div
      data-slot="field-box"
      className={cn(
        "flex h-[50px] w-full items-center gap-3 rounded-lg border border-gray-300 bg-white px-[13px] transition-colors",
        "group-data-[disabled]/field:opacity-50",
        className
      )}
      {...props}
    />
  )
}

/** Ícone de 16px dentro da caixa; cor segue o estado do Field. */
export function FieldIcon({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="field-icon"
      className={cn(
        "flex shrink-0 items-center text-gray-500 transition-colors [&_svg]:size-4",
        "group-focus-within/field:text-brand-base",
        "group-data-[error]/field:text-danger group-focus-within/field:group-data-[error]/field:text-danger",
        className
      )}
      {...props}
    />
  )
}

export function FieldHelper({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="field-helper"
      className={cn("text-xs leading-4 text-gray-500", className)}
      {...props}
    />
  )
}
