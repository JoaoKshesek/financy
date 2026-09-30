import * as React from "react"
import { cn } from "cn"

import type { TagColor } from "@/components/atoms"

const ICON_COLORS = {
  gray: "text-gray-700",
  brand: "text-brand-base",
  blue: "text-blue-base",
  purple: "text-purple-base",
  pink: "text-pink-base",
  red: "text-red-base",
  orange: "text-orange-base",
  yellow: "text-yellow-base",
  green: "text-green-base",
} as const satisfies Record<StatCardColor, string>

export type StatCardColor = TagColor | "brand"

export type StatCardProps = React.ComponentProps<"div"> & {
  value: string
  label: string
  icon: React.ReactNode
  color?: StatCardColor
}

export function StatCard({
  value,
  label,
  icon,
  color = "gray",
  className,
  ...props
}: StatCardProps) {
  return (
    <div
      data-slot="stat-card"
      className={cn(
        "flex items-start gap-4 rounded-[12px] border border-gray-200 bg-white p-6",
        className
      )}
      {...props}
    >
      <span
        className={cn(
          "flex shrink-0 items-center justify-center p-2 [&_svg]:size-6",
          ICON_COLORS[color]
        )}
      >
        {icon}
      </span>

      <div className="flex flex-col gap-2">
        <strong className="text-[28px] leading-8 font-bold text-gray-800">
          {value}
        </strong>
        <span className="text-xs leading-4 font-medium tracking-[0.6px] text-gray-500 uppercase">
          {label}
        </span>
      </div>
    </div>
  )
}
