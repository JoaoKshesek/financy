import * as React from "react"
import { SquarePen, Trash2 } from "lucide-react"
import { cn } from "cn"

import { IconButton, Tag, type TagColor } from "@/components/atoms"
import { ICON_BOX } from "@/lib/utils/colors"

export type CategoryCardProps = React.ComponentProps<"div"> & {
  title: string
  description?: string | null
  color: TagColor
  icon: React.ReactNode
  tagLabel?: string
  count: number
  onEdit?: () => void
  onDelete?: () => void
}

export function CategoryCard({
  title,
  description,
  color,
  icon,
  tagLabel,
  count,
  onEdit,
  onDelete,
  className,
  ...props
}: CategoryCardProps) {
  return (
    <div
      data-slot="category-card"
      className={cn(
        "flex flex-col gap-5 rounded-[12px] border border-gray-200 bg-white p-6",
        className
      )}
      {...props}
    >
      <div className="flex items-start justify-between">
        <span
          className={cn(
            "flex shrink-0 items-center justify-center rounded-[8px] p-3 [&_svg]:size-4",
            ICON_BOX[color]
          )}
        >
          {icon}
        </span>

        <div className="flex items-center gap-2">
          <IconButton
            variant="danger"
            aria-label={`Excluir categoria ${title}`}
            onClick={onDelete}
            className="cursor-pointer rounded-[8px]"
          >
            <Trash2 />
          </IconButton>
          <IconButton
            aria-label={`Editar categoria ${title}`}
            onClick={onEdit}
            className="cursor-pointer rounded-[8px] text-gray-700"
          >
            <SquarePen />
          </IconButton>
        </div>
      </div>

      <div className="flex flex-col items-start gap-1">
        <h3 className="text-base leading-6 font-semibold text-gray-800">
          {title}
        </h3>
        {description && (
          <p className="text-sm leading-5 font-normal text-gray-600">
            {description}
          </p>
        )}
      </div>

      <div className="flex items-center justify-between gap-4">
        <Tag color={color} className="px-3 py-1.5">
          {tagLabel ?? title}
        </Tag>
        <span className="text-sm leading-5 font-normal text-gray-600">
          {count} {count === 1 ? "item" : "itens"}
        </span>
      </div>
    </div>
  )
}
