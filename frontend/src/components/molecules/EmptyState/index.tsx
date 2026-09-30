import * as React from "react"
import { cn } from "cn"

export type EmptyStateProps = React.ComponentProps<"div"> & {
  icon: React.ReactNode
  title: string
  description?: string
  variant?: "default" | "error"
  action?: React.ReactNode
}

export function EmptyState({
  icon,
  title,
  description,
  variant = "default",
  action,
  className,
  ...props
}: EmptyStateProps) {
  return (
    <div
      data-slot="empty-state"
      data-variant={variant}
      className={cn(
        "flex w-full flex-col items-center justify-center gap-4 rounded-[12px] border border-gray-200 bg-white p-12 text-center",
        className
      )}
      {...props}
    >
      <span
        className={cn(
          "flex shrink-0 [&_svg]:size-12",
          variant === "error" ? "text-danger" : "text-gray-400"
        )}
      >
        {icon}
      </span>

      <div className="flex flex-col gap-1">
        <strong className="text-base leading-6 font-semibold text-gray-800">
          {title}
        </strong>
        {description && (
          <p className="text-sm leading-5 font-normal text-gray-600">
            {description}
          </p>
        )}
      </div>

      {action}
    </div>
  )
}
