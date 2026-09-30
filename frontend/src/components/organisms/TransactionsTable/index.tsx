import * as React from "react"
import { ChevronRight, Plus } from "lucide-react"
import { cn } from "cn"

import { ListHeader } from "@/components/molecules"
import { Link, Tag, Type, type TagColor, type TransactionType } from "@/components/atoms"
import { formatSignedCurrency } from "@/lib/utils/currency"
import { ICON_BOX } from "@/lib/utils/colors"

const TYPE_ICON_COLOR = {
  INCOME: "text-brand-base",
  EXPENSE: "text-red-base",
} as const satisfies Record<TransactionType, string>

export type TransactionListItem = {
  id: string
  description: string
  date: string
  category: string
  color: TagColor
  icon: React.ComponentType<{ className?: string }>
  amount: number
  type: TransactionType
}

export type TransactionsTableProps = React.ComponentProps<"section"> & {
  title?: string
  items: TransactionListItem[]
  seeAllTo?: string
  onNewTransaction?: () => void
}

export function TransactionsTable({
  title = "Transações recentes",
  items,
  seeAllTo = "/transacoes",
  onNewTransaction,
  className,
  ...props
}: TransactionsTableProps) {
  return (
    <section
      className={cn("flex flex-col rounded-[12px] border border-gray-200 bg-white", className)}
      {...props}
    >
      <ListHeader
        title={title}
        action={
          <Link to={seeAllTo} iconRight={<ChevronRight />}>
            Ver todas
          </Link>
        }
      />

      <ul className="divide-y divide-gray-200 border-y border-gray-200">
        {items.map((item) => {
          const Icon = item.icon

          return (
            <li
              key={item.id}
              className="flex items-center justify-between gap-6 px-6 py-4"
            >
              <div className="flex items-center gap-4">
                <span
                  className={cn(
                    "flex size-10 shrink-0 items-center justify-center rounded-[8px]",
                    ICON_BOX[item.color]
                  )}
                >
                  <Icon className="size-4" />
                </span>

                <div className="flex flex-col gap-0.5">
                  <span className="text-base leading-6 font-medium text-gray-800">
                    {item.description}
                  </span>
                  <span className="text-sm leading-5 text-gray-600">
                    {item.date}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="flex min-w-[160px] items-center justify-center px-1 py-2">
                  <Tag color={item.color} className="px-3 py-1.5">
                    {item.category}
                  </Tag>
                </div>

                <div className="flex min-w-[160px] items-center justify-end gap-2 pl-2">
                  <span className="text-sm leading-5 font-semibold text-gray-800">
                    {formatSignedCurrency(item.amount, item.type)}
                  </span>
                  <Type
                    type={item.type}
                    iconOnly
                    className={TYPE_ICON_COLOR[item.type]}
                  />
                </div>
              </div>
            </li>
          )
        })}
      </ul>

      <div className="flex items-center justify-center px-6 py-[22px]">
        <button
          type="button"
          onClick={onNewTransaction}
          className="inline-flex cursor-pointer items-center gap-2 text-sm leading-5 font-medium text-brand-base outline-none transition-colors hover:text-brand-dark focus-visible:rounded-sm focus-visible:ring-2 focus-visible:ring-brand-base/40 [&_svg]:size-5 [&_svg]:shrink-0"
        >
          <Plus />
          Nova transação
        </button>
      </div>
    </section>
  )
}
