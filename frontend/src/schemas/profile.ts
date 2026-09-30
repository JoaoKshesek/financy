import { z } from "zod"

export const profileSchema = z.object({
  name: z.string().min(3, "O nome deve ter no mínimo 3 caracteres"),
  email: z.email(),
})

export type ProfileFormData = z.infer<typeof profileSchema>
