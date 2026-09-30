import { ArrowUpDown, LoaderCircle, Plus, SearchX, TriangleAlert } from "lucide-react"

import { PageWrapper } from "@/components/organisms/PageWrapper"
import { TransactionModal } from "@/components/organisms/TransactionModal"
import { TransactionFilters } from "@/components/organisms/TransactionFilters"
import { TransactionsList } from "@/components/organisms/TransactionsList"
import { ConfirmDialog } from "@/components/organisms/ConfirmDialog"
import { LabelButton } from "@/components/atoms"
import { EmptyState } from "@/components/molecules"
import { useTransactions } from "./use.index"

export function Transactions() {
  const {
    transactions,
    totalTransactions,
    filteredCount,
    page,
    pageCount,
    rangeStart,
    rangeEnd,
    setPage,
    loading,
    error,
    filtersControl,
    typeOptions,
    categoryOptions,
    periodOptions,
    isModalOpen,
    setIsModalOpen,
    editingTransaction,
    handleNewTransaction,
    handleEditTransaction,
    deletingTransaction,
    setDeletingTransaction,
    deleting,
    handleAskDeleteTransaction,
    handleConfirmDeleteTransaction,
  } = useTransactions()

  return (
    <PageWrapper
      title="Transações"
      description="Gerencie todas as suas transações financeiras"
      action={
        <LabelButton icon={<Plus />} onClick={handleNewTransaction}>
          Nova transação
        </LabelButton>
      }
    >
      <div className="flex flex-col gap-8">
        {!error && totalTransactions > 0 && (
          <TransactionFilters
            control={filtersControl}
            typeOptions={typeOptions}
            categoryOptions={categoryOptions}
            periodOptions={periodOptions}
          />
        )}

        {error && (
          <EmptyState
            variant="error"
            icon={<TriangleAlert />}
            title="Não foi possível carregar as transações"
            description={error.message}
          />
        )}

        {loading && !totalTransactions && (
          <EmptyState
            icon={<LoaderCircle className="animate-spin" />}
            title="Carregando transações…"
          />
        )}

        {!loading && !error && !totalTransactions && (
          <EmptyState
            icon={<ArrowUpDown />}
            title="Nenhuma transação ainda"
            description="Registre a primeira em “Nova transação”."
            action={
              <LabelButton icon={<Plus />} onClick={handleNewTransaction}>
                Nova transação
              </LabelButton>
            }
          />
        )}

        {!error && totalTransactions > 0 && filteredCount === 0 && (
          <EmptyState
            icon={<SearchX />}
            title="Nenhuma transação encontrada"
            description="Ajuste a busca ou os filtros."
          />
        )}

        {filteredCount > 0 && (
          <TransactionsList
            transactions={transactions}
            page={page}
            pageCount={pageCount}
            rangeStart={rangeStart}
            rangeEnd={rangeEnd}
            total={filteredCount}
            onPageChange={setPage}
            onEdit={handleEditTransaction}
            onDelete={handleAskDeleteTransaction}
          />
        )}
      </div>

      <TransactionModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        transaction={editingTransaction}
      />

      <ConfirmDialog
        open={Boolean(deletingTransaction)}
        onOpenChange={(open) => !open && setDeletingTransaction(null)}
        title="Excluir transação"
        description={`"${deletingTransaction?.description}" será removida permanentemente.`}
        loading={deleting}
        onConfirm={handleConfirmDeleteTransaction}
      />
    </PageWrapper>
  )
}
