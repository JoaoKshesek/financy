import * as React from "react"
import { Link as RouterLink, type LinkProps as RouterLinkProps } from "react-router"
import { cn } from "cn"

/**
 * Link (Figma › Componentes › Link)
 *
 * Dois modos, decididos pela prop `active`:
 * - `active` ausente → link inline: 14/20 Medium, brand-base, sublinhado no hover.
 * - `active` definida → item de navegação 14/20:
 *     true  → Semibold brand-base (página atual, com aria-current)
 *     false → Regular gray-600
 *
 * Usa o Link do react-router. Para URL externa, passe `to="https://..."`
 * e `target="_blank"` normalmente.
 */
export type LinkProps = RouterLinkProps & {
  iconLeft?: React.ReactNode
  iconRight?: React.ReactNode
  /** Marca o link como item de navegação e indica se é a página atual. */
  active?: boolean
  /** Sublinhado no hover. Padrão: ligado no inline, desligado na navegação. */
  underline?: boolean
}

export function Link({
  className,
  iconLeft,
  iconRight,
  active,
  underline,
  children,
  ...props
}: LinkProps) {
  const isNav = active !== undefined
  const showUnderline = underline ?? !isNav

  return (
    <RouterLink
      data-slot="link"
      data-active={active || undefined}
      aria-current={active ? "page" : undefined}
      className={cn(
        "group/link inline-flex items-center gap-1 text-sm leading-5 transition-colors",
        "outline-none focus-visible:rounded-sm focus-visible:ring-2 focus-visible:ring-brand-base/40",
        "[&_svg]:size-5 [&_svg]:shrink-0",
        isNav
          ? active
            ? "font-semibold text-brand-base"
            : "font-normal text-gray-600 hover:text-gray-800"
          : "font-medium text-brand-base",
        className
      )}
      {...props}
    >
      {iconLeft}
      <span
        className={cn(
          "border-b border-transparent transition-colors",
          showUnderline && "group-hover/link:border-current"
        )}
      >
        {children}
      </span>
      {iconRight}
    </RouterLink>
  )
}
