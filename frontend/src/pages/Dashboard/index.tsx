import { ArrowUpDown, LoaderCircle, Plus, TriangleAlert } from "lucide-react"

import { PageWrapper } from "@/components/organisms/PageWrapper"
import { TransactionsTable } from "@/components/organisms/TransactionsTable"
import { CategoriesList } from "@/components/organisms/CategoriesList"
import { TransactionModal } from "@/components/organisms/TransactionModal"
import { LabelButton } from "@/components/atoms"
import { EmptyState, SummaryCard } from "@/components/molecules"
import { useDashboard } from "./use.index"

export function Dashboard() {
  const {
    summaryCards,
    transactions,
    categories,
    loading,
    error,
    isModalOpen,
    setIsModalOpen,
    handleNewTransaction,
  } = useDashboard()

  return (
    <PageWrapper>
      <div className="grid grid-cols-3 items-start gap-6">
        {summaryCards.map((card) => (
          <SummaryCard key={card.label} {...card} />
        ))}

        {error && (
          <div className="col-span-3">
            <EmptyState
              variant="error"
              icon={<TriangleAlert />}
              title="Não foi possível carregar a dashboard"
              description={error.message}
            />
          </div>
        )}

        {loading && !transactions.length && (
          <div className="col-span-3">
            <EmptyState
              icon={<LoaderCircle className="animate-spin" />}
              title="Carregando…"
            />
          </div>
        )}

        {!loading && !error && !transactions.length && (
          <div className="col-span-3">
            <EmptyState
              icon={<ArrowUpDown />}
              title="Nenhuma transação ainda"
              description="Registre a primeira em “Transações”."
            />
          </div>
        )}

        {!loading && !error && !transactions.length && (
          <div className="col-span-3 flex justify-center">
            <LabelButton icon={<Plus />} onClick={handleNewTransaction}>
              Nova transação
            </LabelButton>
          </div>
        )}

        {transactions.length > 0 && (
          <TransactionsTable
            items={transactions}
            onNewTransaction={handleNewTransaction}
            className="col-span-2"
          />
        )}

        {categories.length > 0 && <CategoriesList items={categories} />}
      </div>
      <TransactionModal open={isModalOpen} onOpenChange={setIsModalOpen} />
    </PageWrapper>
  )
}
