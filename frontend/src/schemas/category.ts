import { z } from "zod"

import { CATEGORY_ICON_NAMES } from "@/lib/utils/category-icons"
import { CATEGORY_COLOR_NAMES } from "@/lib/utils/colors"

export const categorySchema = z.object({
  title: z.string().min(1, "Informe um título"),
  description: z.string().optional(),
  icon: z.enum(CATEGORY_ICON_NAMES, "Escolha um ícone"),
  color: z.enum(CATEGORY_COLOR_NAMES, "Escolha uma cor"),
})

export type CategoryFormData = z.infer<typeof categorySchema>
