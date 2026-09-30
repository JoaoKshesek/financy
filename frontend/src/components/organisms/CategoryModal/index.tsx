import { Modal } from "@/components/organisms/Modal"
import {
  ControlledColorPicker,
  ControlledIconPicker,
  ControlledInput,
} from "@/components/molecules"
import type { CategoryFormData } from "@/schemas"
import { useCategoryModal, type CategoryDraft } from "./use.index"

export type CategoryModalProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  category?: CategoryDraft | null
}

export function CategoryModal({
  open,
  onOpenChange,
  category,
}: CategoryModalProps) {
  const { isEditing, control, errors, isSubmitting, onSubmit } =
    useCategoryModal({ open, category, onOpenChange })

  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      title={isEditing ? "Editar categoria" : "Nova categoria"}
      description="Organize suas transações com categorias"
      submitLabel={isSubmitting ? "Salvando..." : "Salvar"}
      onSubmit={onSubmit}
    >
      <form onSubmit={onSubmit} noValidate className="flex flex-col gap-4">
        <ControlledInput<CategoryFormData>
          name="title"
          control={control}
          label="Título"
          placeholder="Ex. Alimentação"
          errorMessage={errors.title?.message}
        />

        <ControlledInput<CategoryFormData>
          name="description"
          control={control}
          label="Descrição"
          placeholder="Descrição da categoria"
          helper="Opcional"
          errorMessage={errors.description?.message}
        />

        <ControlledIconPicker<CategoryFormData>
          name="icon"
          control={control}
          label="Ícone"
          errorMessage={errors.icon?.message}
        />

        <ControlledColorPicker<CategoryFormData>
          name="color"
          control={control}
          label="Cor"
          errorMessage={errors.color?.message}
        />
      </form>
    </Modal>
  )
}
