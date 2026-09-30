import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"

import { registerSchema, type RegisterFormData } from "@/schemas"
import { useAuthStore } from "@/stores/auth"

export function useRegister() {
  const signup = useAuthStore((state) => state.signup)

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: "", email: "", password: "" },
  })

  const onSubmit = handleSubmit(async (data) => {
    try {
      const registered = await signup({
        name: data.name,
        email: data.email,
        password: data.password,
      })

      if (registered) {
        toast.success("Cadastro realizado com sucesso!")
      } else {
        toast.error("Não foi possível criar a conta. Tente novamente.")
      }
    } catch {
      toast.error("Erro ao realizar o cadastro")
    }
  })

  return { control, errors, isSubmitting, onSubmit }
}
