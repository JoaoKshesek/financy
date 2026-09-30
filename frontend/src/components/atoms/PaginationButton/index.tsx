import * as React from "react"
import { cn } from "cn"

/**
 * Pagination Button (Figma › Componentes › Pagination Button)
 * 32×32, raio 8px, texto 14/20 Medium.
 * default: white + borda gray-300 + texto gray-700 · hover: gray-200
 * active:  brand-base + texto white, sem borda · disabled: opacity 50
 */
export type PaginationButtonProps = React.ComponentProps<"button"> & {
  /** Página atual. */
  active?: boolean
}

export function PaginationButton({
  className,
  active = false,
  type,
  children,
  ...props
}: PaginationButtonProps) {
  return (
    <button
      data-slot="pagination-button"
      data-active={active || undefined}
      aria-current={active ? "page" : undefined}
      type={type ?? "button"}
      className={cn(
        "inline-flex size-8 shrink-0 items-center justify-center rounded-lg text-sm font-medium leading-5",
        "transition-colors outline-none select-none",
        "focus-visible:ring-2 focus-visible:ring-brand-base/40 focus-visible:ring-offset-1",
        "disabled:pointer-events-none disabled:opacity-50",
        "[&_svg]:size-4 [&_svg]:shrink-0",
        active
          ? "bg-brand-base text-white"
          : "border border-gray-300 bg-white text-gray-700 hover:bg-gray-200",
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}
