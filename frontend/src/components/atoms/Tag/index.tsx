import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

/**
 * Tag (Figma › Componentes › Tag)
 * Pill (raio 999px), padding 4px 12px, texto 14/20 Medium.
 * Fundo = cor `light`, texto = cor `dark`. Gray é a tag "sem categoria".
 *
 * Os valores de `color` batem 1:1 com o enum CategoryColor do backend,
 * então dá para passar `category.color` direto.
 */
export const tagVariants = cva(
  "inline-flex shrink-0 items-center rounded-full px-3 py-1 text-sm font-medium leading-5 whitespace-nowrap",
  {
    variants: {
      color: {
        gray: "bg-gray-200 text-gray-700",
        blue: "bg-blue-light text-blue-dark",
        purple: "bg-purple-light text-purple-dark",
        pink: "bg-pink-light text-pink-dark",
        red: "bg-red-light text-red-dark",
        orange: "bg-orange-light text-orange-dark",
        yellow: "bg-yellow-light text-yellow-dark",
        green: "bg-green-light text-green-dark",
      },
    },
    defaultVariants: {
      color: "gray",
    },
  }
)

export type TagColor = NonNullable<VariantProps<typeof tagVariants>["color"]>

export type TagProps = Omit<React.ComponentProps<"span">, "color"> &
  VariantProps<typeof tagVariants>

export function Tag({ className, color, ...props }: TagProps) {
  return (
    <span
      data-slot="tag"
      data-color={color ?? "gray"}
      className={cn(tagVariants({ color }), className)}
      {...props}
    />
  )
}
