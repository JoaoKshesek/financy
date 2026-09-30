import * as React from "react"
import { cn } from "cn"

export type ListHeaderProps = React.ComponentProps<"div"> & {
  title: string
  action?: React.ReactNode
}

export function ListHeader({
  title,
  action,
  className,
  ...props
}: ListHeaderProps) {
  return (
    <div
      data-slot="list-header"
      className={cn(
        "flex items-center justify-between px-6 py-[22px]",
        className
      )}
      {...props}
    >
      <h2 className="text-xs leading-4 font-medium tracking-[0.6px] text-gray-500 uppercase">
        {title}
      </h2>
      {action}
    </div>
  )
}
