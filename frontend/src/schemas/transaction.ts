import { z } from "zod"

export const transactionSchema = z.object({
  type: z.enum(["EXPENSE", "INCOME"]),
  description: z.string().min(1, "Informe uma descrição"),
  date: z.string().min(1, "Selecione uma data"),
  amount: z.number().positive("Informe um valor maior que zero"),
  categoryId: z.string().min(1, "Selecione uma categoria"),
})

export type TransactionFormData = z.infer<typeof transactionSchema>
