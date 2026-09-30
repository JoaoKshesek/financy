import { Modal } from "@/components/organisms/Modal"
import { LabelButton } from "@/components/atoms"

export type ConfirmDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  description?: string
  confirmLabel?: string
  cancelLabel?: string
  loading?: boolean
  onConfirm: () => void | Promise<void>
}

export function ConfirmDialog({
  open,
  onOpenChange,
  title,
  description,
  confirmLabel = "Excluir",
  cancelLabel = "Cancelar",
  loading = false,
  onConfirm,
}: ConfirmDialogProps) {
  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      title={title}
      description={description}
      footer={
        <div className="flex items-center gap-4">
          <LabelButton
            variant="outline"
            disabled={loading}
            onClick={() => onOpenChange(false)}
            className="flex-1 cursor-pointer"
          >
            {cancelLabel}
          </LabelButton>

          <LabelButton
            variant="danger"
            disabled={loading}
            onClick={() => void onConfirm()}
            className="flex-1 cursor-pointer"
          >
            {loading ? "Excluindo..." : confirmLabel}
          </LabelButton>
        </div>
      }
    />
  )
}
