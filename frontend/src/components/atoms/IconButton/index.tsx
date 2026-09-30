import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

/**
 * Icon Button (Figma › Componentes › Icon Button)
 * 32×32, padding 8px, raio 8px, borda gray-300, fundo white, ícone 16px.
 * hover: gray-200 · disabled: opacity 50
 * outline: ícone gray-500 · danger: ícone danger (ex.: Trash)
 */
export const iconButtonVariants = cva(
  [
    "inline-flex size-8 shrink-0 items-center justify-center rounded-lg border border-gray-300 bg-white p-2",
    "transition-colors outline-none select-none hover:bg-gray-200",
    "focus-visible:ring-2 focus-visible:ring-brand-base/40 focus-visible:ring-offset-1",
    "disabled:pointer-events-none disabled:opacity-50",
    "[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  ],
  {
    variants: {
      variant: {
        outline: "text-gray-500",
        danger: "text-danger",
      },
    },
    defaultVariants: {
      variant: "outline",
    },
  }
)

export type IconButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof iconButtonVariants> & {
    /** Obrigatório: botão só com ícone precisa de nome acessível. */
    "aria-label": string
  }

export function IconButton({
  className,
  variant,
  type,
  children,
  ...props
}: IconButtonProps) {
  return (
    <button
      data-slot="icon-button"
      data-variant={variant ?? "outline"}
      type={type ?? "button"}
      className={cn(iconButtonVariants({ variant }), className)}
      {...props}
    >
      {children}
    </button>
  )
}
