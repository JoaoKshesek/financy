import { Modal } from "@/components/organisms/Modal"
import {
  ControlledCurrencyInput,
  ControlledDateInput,
  ControlledInput,
  ControlledSelectInput,
  ControlledTypeToggle,
} from "@/components/molecules"
import type { TransactionFormData } from "@/schemas"
import { useTransactionModal, type TransactionDraft } from "./use.index"

export type TransactionModalProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  transaction?: TransactionDraft | null
}

export function TransactionModal({
  open,
  onOpenChange,
  transaction,
}: TransactionModalProps) {
  const { isEditing, control, errors, isSubmitting, onSubmit, categoryOptions } =
    useTransactionModal({ open, transaction, onOpenChange })

  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      title={isEditing ? "Editar transação" : "Nova transação"}
      description="Registre sua despesa ou receita"
      submitLabel={isSubmitting ? "Salvando..." : "Salvar"}
      onSubmit={onSubmit}
    >
      <form onSubmit={onSubmit} noValidate className="flex flex-col gap-4">
        <ControlledTypeToggle<TransactionFormData>
          name="type"
          control={control}
          errorMessage={errors.type?.message}
        />

        <ControlledInput<TransactionFormData>
          name="description"
          control={control}
          label="Descrição"
          placeholder="Ex. Almoço no restaurante"
          errorMessage={errors.description?.message}
        />

        <div className="grid grid-cols-2 gap-4">
          <ControlledDateInput<TransactionFormData>
            name="date"
            control={control}
            label="Data"
            errorMessage={errors.date?.message}
          />

          <ControlledCurrencyInput<TransactionFormData>
            name="amount"
            control={control}
            label="Valor"
            errorMessage={errors.amount?.message}
          />
        </div>

        <ControlledSelectInput<TransactionFormData>
          name="categoryId"
          control={control}
          label="Categoria"
          placeholder="Selecione"
          options={categoryOptions}
          errorMessage={errors.categoryId?.message}
        />
      </form>
    </Modal>
  )
}
