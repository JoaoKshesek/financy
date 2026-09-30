import { ChevronLeft, ChevronRight, SquarePen, Trash2 } from "lucide-react"
import { cn } from "cn"

import {
  IconButton,
  PaginationButton,
  Tag,
  Type,
  type TagColor,
  type TransactionType,
} from "@/components/atoms"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { CATEGORY_ICONS } from "@/lib/utils/category-icons"
import { ICON_BOX } from "@/lib/utils/colors"
import { formatSignedCurrency } from "@/lib/utils/currency"
import { formatShortDate } from "@/lib/utils/period"
import type { Transaction } from "@/types"

const TYPE_ICON = {
  INCOME: "[&_svg]:text-green-base",
  EXPENSE: "[&_svg]:text-red-base",
} as const satisfies Record<TransactionType, string>

const HEAD =
  "px-6 py-3 text-xs leading-4 font-medium tracking-[0.6px] text-gray-500 uppercase"

export type TransactionsListProps = {
  transactions: Transaction[]
  page: number
  pageCount: number
  rangeStart: number
  rangeEnd: number
  total: number
  onPageChange: (page: number) => void
  onEdit?: (transaction: Transaction) => void
  onDelete?: (transaction: Transaction) => void
}

export function TransactionsList({
  transactions,
  page,
  pageCount,
  rangeStart,
  rangeEnd,
  total,
  onPageChange,
  onEdit,
  onDelete,
}: TransactionsListProps) {
  return (
    <section
      data-slot="transactions-list"
      className="flex w-full flex-col overflow-hidden rounded-[12px] border border-gray-200 bg-white"
    >
      <Table>
        <TableHeader>
          <TableRow className="border-gray-200 hover:bg-transparent">
            <TableHead className={HEAD}>Descrição</TableHead>
            <TableHead className={cn(HEAD, "text-center")}>Data</TableHead>
            <TableHead className={cn(HEAD, "text-center")}>Categoria</TableHead>
            <TableHead className={cn(HEAD, "text-center")}>Tipo</TableHead>
            <TableHead className={cn(HEAD, "text-right")}>Valor</TableHead>
            <TableHead className={cn(HEAD, "text-right")}>Ações</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {transactions.map((transaction) => {
            const category = transaction.category
            const color: TagColor = category?.color ?? "gray"
            const Icon = category
              ? CATEGORY_ICONS[category.icon]
              : CATEGORY_ICONS.RECEIPT_TEXT

            return (
              <TableRow
                key={transaction.id}
                className="border-gray-200 hover:bg-gray-100"
              >
                <TableCell className="px-6 py-2">
                  <div className="flex items-center gap-4">
                    <span
                      className={cn(
                        "flex size-10 shrink-0 items-center justify-center rounded-[8px] [&_svg]:size-4",
                        ICON_BOX[color]
                      )}
                    >
                      <Icon />
                    </span>
                    <span className="text-base leading-6 font-medium text-gray-800">
                      {transaction.description}
                    </span>
                  </div>
                </TableCell>

                <TableCell className="px-6 py-2 text-center text-sm leading-5 text-gray-600">
                  {formatShortDate(transaction.date)}
                </TableCell>

                <TableCell className="px-6 py-2">
                  <div className="flex justify-center">
                    <Tag color={color} className="px-3 py-1.5">
                      {category?.title ?? "Sem categoria"}
                    </Tag>
                  </div>
                </TableCell>

                <TableCell className="px-6 py-2">
                  <div className="flex justify-center">
                    <Type
                      type={transaction.type}
                      className={TYPE_ICON[transaction.type]}
                    />
                  </div>
                </TableCell>

                <TableCell className="px-6 py-2 text-right text-sm leading-5 font-semibold text-gray-800">
                  {formatSignedCurrency(transaction.amount, transaction.type)}
                </TableCell>

                <TableCell className="px-6 py-2">
                  <div className="flex items-center justify-end gap-2">
                    <IconButton
                      variant="danger"
                      aria-label={`Excluir ${transaction.description}`}
                      onClick={() => onDelete?.(transaction)}
                      className="cursor-pointer rounded-[8px]"
                    >
                      <Trash2 />
                    </IconButton>
                    <IconButton
                      aria-label={`Editar ${transaction.description}`}
                      onClick={() => onEdit?.(transaction)}
                      className="cursor-pointer rounded-[8px] text-gray-700"
                    >
                      <SquarePen />
                    </IconButton>
                  </div>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>

      <div className="flex items-center justify-between gap-4 border-t border-gray-200 px-6 py-4">
        <span className="text-sm leading-5 text-gray-600">
          {rangeStart} a {rangeEnd} | {total} resultados
        </span>

        <div className="flex items-center gap-2">
          <PaginationButton
            aria-label="Página anterior"
            disabled={page <= 1}
            onClick={() => onPageChange(page - 1)}
            className="cursor-pointer"
          >
            <ChevronLeft />
          </PaginationButton>

          {Array.from({ length: pageCount }, (_, index) => index + 1).map(
            (number) => (
              <PaginationButton
                key={number}
                active={number === page}
                aria-label={`Página ${number}`}
                onClick={() => onPageChange(number)}
                className="cursor-pointer"
              >
                {number}
              </PaginationButton>
            )
          )}

          <PaginationButton
            aria-label="Próxima página"
            disabled={page >= pageCount}
            onClick={() => onPageChange(page + 1)}
            className="cursor-pointer"
          >
            <ChevronRight />
          </PaginationButton>
        </div>
      </div>
    </section>
  )
}
