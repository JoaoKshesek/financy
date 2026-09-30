import { useEffect, useMemo } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@apollo/client/react"
import { toast } from "sonner"

import { categorySchema, type CategoryFormData } from "@/schemas"
import { CREATE_CATEGORY } from "@/lib/graphql/mutations/categories/create-category"
import { UPDATE_CATEGORY } from "@/lib/graphql/mutations/categories/update-category"
import { LIST_CATEGORIES } from "@/lib/graphql/queries/categories/list-categories"
import type {
  Category,
  CreateCategoryInput,
  UpdateCategoryInput,
} from "@/types"

export type CategoryDraft = Partial<
  Pick<Category, "id" | "title" | "icon" | "color">
> & {
  description?: string | null
}

type UseCategoryModalParams = {
  open: boolean
  category?: CategoryDraft | null
  onOpenChange?: (open: boolean) => void
}

export function useCategoryModal({
  open,
  category,
  onOpenChange,
}: UseCategoryModalParams) {
  const isEditing = Boolean(category?.id)

  const initialValues = useMemo<CategoryFormData>(
    () => ({
      title: category?.title ?? "",
      description: category?.description ?? "",
      icon: category?.icon ?? "BRIEFCASE_BUSINESS",
      color: category?.color ?? "green",
    }),
    [category]
  )

  const [createCategory] = useMutation<
    { createCategory: Category },
    { data: CreateCategoryInput }
  >(CREATE_CATEGORY, { refetchQueries: [LIST_CATEGORIES] })

  const [updateCategory] = useMutation<
    { updateCategory: Category },
    { id: string; data: UpdateCategoryInput }
  >(UPDATE_CATEGORY, { refetchQueries: [LIST_CATEGORIES] })

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema),
    defaultValues: initialValues,
  })

  useEffect(() => {
    if (open) reset(initialValues)
  }, [open, initialValues, reset])

  const onSubmit = handleSubmit(async (formData) => {
    const data = {
      title: formData.title,
      description: formData.description?.trim() || undefined,
      icon: formData.icon,
      color: formData.color,
    }

    try {
      if (isEditing && category?.id) {
        await updateCategory({ variables: { id: category.id, data } })
        toast.success("Categoria atualizada!")
      } else {
        await createCategory({ variables: { data } })
        toast.success("Categoria criada!")
      }

      onOpenChange?.(false)
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Tente novamente."
      toast.error(`Não foi possível salvar a categoria. ${message}`)
    }
  })

  return { isEditing, control, errors, isSubmitting, onSubmit }
}
