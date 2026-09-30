import * as React from "react"
import { cn } from "cn"

const ICON_COLORS = {
  purple: "text-purple-base",
  brand: "text-brand-base",
  red: "text-red-base",
} as const

export type SummaryCardProps = React.ComponentProps<"div"> & {
  label: string
  value: string
  icon: React.ReactNode
  color?: keyof typeof ICON_COLORS
}

export function SummaryCard({
  label,
  value,
  icon,
  color = "brand",
  className,
  ...props
}: SummaryCardProps) {
  return (
    <div
      data-slot="summary-card"
      className={cn(
        "flex flex-col items-start gap-4 rounded-[12px] border border-gray-200 bg-white p-6",
        className
      )}
      {...props}
    >
      <div className="flex items-center gap-3">
        <span className={cn("flex shrink-0 [&_svg]:size-5", ICON_COLORS[color])}>
          {icon}
        </span>
        <span className="text-xs leading-4 font-medium tracking-[0.6px] text-gray-500 uppercase">
          {label}
        </span>
      </div>

      <strong className="text-[28px] leading-8 font-bold text-gray-800">
        {value}
      </strong>
    </div>
  )
}
