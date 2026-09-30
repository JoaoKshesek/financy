import { z } from "zod"

export const registerSchema = z.object({
  name: z.string().min(3, "O nome deve ter no mínimo 3 caracteres"),
  email: z.email("Informe um e-mail válido"),
  password: z.string().min(8, "A senha deve ter no mínimo 8 caracteres"),
})

export type RegisterFormData = z.infer<typeof registerSchema>
