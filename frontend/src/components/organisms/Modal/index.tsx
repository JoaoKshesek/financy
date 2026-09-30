import * as React from "react"
import { X } from "lucide-react"
import { cn } from "cn"

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { IconButton, LabelButton } from "@/components/atoms"

export type ModalProps = {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  trigger?: React.ReactNode
  title: string
  description?: string
  children?: React.ReactNode
  submitLabel?: string
  onSubmit?: () => void
  footer?: React.ReactNode
  className?: string
}

export function Modal({
  open,
  onOpenChange,
  trigger,
  title,
  description,
  children,
  submitLabel = "Salvar",
  onSubmit,
  footer,
  className,
}: ModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}

      <DialogContent
        showCloseButton={false}
        className={cn(
          "min-w-[448px] gap-6 rounded-[12px] border border-gray-200 bg-white p-6 ring-0",
          className
        )}
      >
        <DialogHeader className="flex flex-row items-start justify-between gap-6">
          <div className="flex flex-col gap-1 text-left">
            <DialogTitle className="text-base leading-6 font-semibold text-gray-800">
              {title}
            </DialogTitle>
            {description && (
              <DialogDescription className="text-sm leading-5 font-normal text-gray-600">
                {description}
              </DialogDescription>
            )}
          </div>

          <DialogClose asChild>
            <IconButton
              aria-label="Fechar"
              className="cursor-pointer rounded-[8px] text-gray-700"
            >
              <X />
            </IconButton>
          </DialogClose>
        </DialogHeader>

        {children}

        {footer ?? (
          <LabelButton
            type="submit"
            onClick={onSubmit}
            className="w-full cursor-pointer"
          >
            {submitLabel}
          </LabelButton>
        )}
      </DialogContent>
    </Dialog>
  )
}
