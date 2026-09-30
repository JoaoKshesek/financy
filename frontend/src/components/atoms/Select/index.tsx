import * as React from "react"
import { Select as RadixSelect } from "radix-ui"
import { Check, ChevronDown } from "lucide-react"
import { cn } from "cn"
import { Field, FieldHelper, FieldIcon, FieldLabel } from "../Field"

/**
 * Select (Figma › Componentes › Input › Select)
 * Trigger com a mesma caixa do Input; dropdown com borda gray-300, raio 8px,
 * padding 15px 13px, gap 16px e sombra 0 4px 7.5px rgba(0,0,0,.1).
 * Item selecionado: texto Medium + ícone Check 20px.
 */
export type SelectOption = {
  value: string
  label: string
  /** Ícone opcional exibido antes do texto (ex.: ícone da categoria). */
  icon?: React.ReactNode
}

export type SelectProps = {
  options: SelectOption[]
  label?: string
  helper?: string
  error?: string | boolean
  placeholder?: string
  leftIcon?: React.ReactNode
  disabled?: boolean
  id?: string
  name?: string
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  containerClassName?: string
  className?: string
}

export function Select({
  options,
  label,
  helper,
  error,
  placeholder = "Selecione",
  leftIcon,
  disabled,
  id,
  name,
  value,
  defaultValue,
  onValueChange,
  containerClassName,
  className,
}: SelectProps) {
  const generatedId = React.useId()
  const triggerId = id ?? generatedId
  const hasError = Boolean(error)
  const helperText = typeof error === "string" ? error : helper

  return (
    <Field error={hasError} disabled={disabled} className={containerClassName}>
      {label && <FieldLabel htmlFor={triggerId}>{label}</FieldLabel>}

      <RadixSelect.Root
        name={name}
        value={value}
        defaultValue={defaultValue}
        onValueChange={onValueChange}
        disabled={disabled}
      >
        <RadixSelect.Trigger
          id={triggerId}
          aria-invalid={hasError || undefined}
          data-slot="select-trigger"
          className={cn(
            // Mesma caixa do Input
            "group/trigger flex h-[50px] w-full items-center gap-3 rounded-lg border border-gray-300 bg-white px-[13px] text-left outline-none transition-colors",
            "text-base leading-[18px] text-gray-800 data-[placeholder]:text-gray-400",
            "disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
        >
          {leftIcon && <FieldIcon>{leftIcon}</FieldIcon>}

          <span className="min-w-0 flex-1 truncate">
            <RadixSelect.Value placeholder={placeholder} />
          </span>

          <RadixSelect.Icon asChild>
            <ChevronDown
              aria-hidden
              className="size-4 shrink-0 text-gray-700 transition-transform group-data-[state=open]/trigger:rotate-180"
            />
          </RadixSelect.Icon>
        </RadixSelect.Trigger>

        <RadixSelect.Portal>
          <RadixSelect.Content
            position="popper"
            sideOffset={8}
            data-slot="select-content"
            className={cn(
              "z-50 w-[var(--radix-select-trigger-width)] rounded-lg border border-gray-300 bg-white px-[13px] py-[15px]",
              "shadow-[0px_4px_7.5px_rgba(0,0,0,0.1)]",
              "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0"
            )}
          >
            <RadixSelect.Viewport className="flex flex-col gap-4">
              {options.map((option) => (
                <RadixSelect.Item
                  key={option.value}
                  value={option.value}
                  data-slot="select-item"
                  className={cn(
                    "flex cursor-pointer items-center gap-2 text-base leading-[18px] text-gray-800 outline-none select-none",
                    "data-[highlighted]:text-brand-base data-[state=checked]:font-medium",
                    "data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                  )}
                >
                  {option.icon && (
                    <span className="flex shrink-0 items-center text-gray-500 [&_svg]:size-4">
                      {option.icon}
                    </span>
                  )}
                  <span className="min-w-0 flex-1 truncate">
                    <RadixSelect.ItemText>{option.label}</RadixSelect.ItemText>
                  </span>
                  <RadixSelect.ItemIndicator className="flex shrink-0 items-center">
                    <Check aria-hidden className="size-5 text-success" />
                  </RadixSelect.ItemIndicator>
                </RadixSelect.Item>
              ))}
            </RadixSelect.Viewport>
          </RadixSelect.Content>
        </RadixSelect.Portal>
      </RadixSelect.Root>

      {helperText && <FieldHelper>{helperText}</FieldHelper>}
    </Field>
  )
}
