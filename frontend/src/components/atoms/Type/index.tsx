import * as React from "react"
import { CircleArrowDown, CircleArrowUp } from "lucide-react"
import { cn } from "cn"

/**
 * Type (Figma › Componentes › Type)
 * Indicador de tipo da transação: ícone 16px + texto 14/20 Medium, gap 8px.
 * INCOME  → CircleArrowUp   + "Entrada" em green-dark
 * EXPENSE → CircleArrowDown + "Saída"   em red-dark
 *
 * `type` aceita o enum TransactionType do backend sem conversão.
 */
export type TransactionType = "INCOME" | "EXPENSE"

const TYPE_CONFIG = {
  INCOME: { label: "Entrada", Icon: CircleArrowUp, className: "text-green-dark" },
  EXPENSE: { label: "Saída", Icon: CircleArrowDown, className: "text-red-dark" },
} as const satisfies Record<
  TransactionType,
  { label: string; Icon: React.ComponentType<{ className?: string }>; className: string }
>

export type TypeProps = React.ComponentProps<"span"> & {
  type: TransactionType
  /** Oculta o texto e mantém só o ícone (útil em tabelas compactas). */
  iconOnly?: boolean
}

export function Type({ type, iconOnly = false, className, ...props }: TypeProps) {
  const { label, Icon, className: colorClassName } = TYPE_CONFIG[type]

  return (
    <span
      data-slot="type"
      data-type={type}
      aria-label={iconOnly ? label : undefined}
      className={cn(
        "inline-flex shrink-0 items-center gap-2 text-sm font-medium leading-5 whitespace-nowrap",
        colorClassName,
        className
      )}
      {...props}
    >
      <Icon aria-hidden className="size-4 shrink-0" />
      {!iconOnly && label}
    </span>
  )
}

export const TYPE_LABELS: Record<TransactionType, string> = {
  INCOME: TYPE_CONFIG.INCOME.label,
  EXPENSE: TYPE_CONFIG.EXPENSE.label,
}
