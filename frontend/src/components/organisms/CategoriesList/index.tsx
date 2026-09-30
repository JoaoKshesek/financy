import * as React from "react"
import { ChevronRight } from "lucide-react"
import { cn } from "cn"

import { ListHeader } from "@/components/molecules"
import { Link, Tag, type TagColor } from "@/components/atoms"
import { formatCurrency } from "@/lib/utils/currency"

export type CategoryListItem = {
  id: string
  name: string
  color: TagColor
  count: number
  total: number
}

export type CategoriesListProps = React.ComponentProps<"section"> & {
  title?: string
  items: CategoryListItem[]
  manageTo?: string
}

export function CategoriesList({
  title = "Categorias",
  items,
  manageTo = "/categorias",
  className,
  ...props
}: CategoriesListProps) {
  return (
    <section
      className={cn(
        "flex flex-col rounded-[12px] border border-gray-200 bg-white",
        className
      )}
      {...props}
    >
      <ListHeader
        title={title}
        action={
          <Link to={manageTo} iconRight={<ChevronRight />}>
            Gerenciar
          </Link>
        }
      />

      <ul className="flex flex-col gap-5 border-t border-gray-200 py-6">
        {items.map((item) => (
          <li
            key={item.id}
            className="flex items-center justify-between gap-6 px-6"
          >
            <Tag color={item.color} className="px-3 py-1.5">
              {item.name}
            </Tag>

            <div className="flex items-center gap-3">
              <span className="text-sm leading-5 text-gray-600">
                {item.count} {item.count === 1 ? "item" : "itens"}
              </span>
              <span className="text-sm leading-5 font-semibold text-gray-800">
                {formatCurrency(item.total)}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
