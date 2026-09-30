import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"
import { cn } from "cn"

export const labelButtonVariants = cva(
  [
    "inline-flex shrink-0 items-center justify-center gap-2 rounded-lg font-medium whitespace-nowrap",
    "transition-colors outline-none select-none",
    "focus-visible:ring-2 focus-visible:ring-brand-base/40 focus-visible:ring-offset-1",
    "disabled:pointer-events-none disabled:opacity-50",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0",
  ],
  {
    variants: {
      variant: {
        solid: "bg-brand-base text-white hover:bg-brand-dark",
        outline: "border border-gray-300 bg-white text-gray-700 hover:bg-gray-200",
        danger: "bg-danger text-white hover:bg-red-dark",
      },
      size: {
        md: "h-12 px-4 py-3 text-base leading-6 [&_svg]:size-[18px]",
        sm: "h-9 px-3 py-2 text-sm leading-5 [&_svg]:size-4",
      },
    },
    defaultVariants: {
      variant: "solid",
      size: "md",
    },
  }
)

export type LabelButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof labelButtonVariants> & {
    icon?: React.ReactNode
    asChild?: boolean
  }

export function LabelButton({
  className,
  variant,
  size,
  icon,
  asChild = false,
  children,
  type,
  ...props
}: LabelButtonProps) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="label-button"
      data-variant={variant ?? "solid"}
      data-size={size ?? "md"}
      // Evita submit acidental quando usado fora de <form>
      type={asChild ? undefined : type ?? "button"}
      className={cn(labelButtonVariants({ variant, size }), className, 'cursor-pointer')}
      {...props}
    >
      {asChild ? (
        children
      ) : (
        <>
          {icon}
          {children}
        </>
      )}
    </Comp>
  )
}
