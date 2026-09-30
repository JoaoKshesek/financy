import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"

import { loginSchema, type LoginFormData } from "@/schemas"
import { useAuthStore } from "@/stores/auth"

export function useLogin() {
  const login = useAuthStore((state) => state.login)

  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "", remember: false },
  })

  const onSubmit = handleSubmit(async (data) => {
    try {
      const logged = await login({
        email: data.email,
        password: data.password,
      })

      if (logged) {
        toast.success("Login realizado com sucesso!")
      } else {
        toast.error("Não foi possível entrar. Tente novamente.")
      }
    } catch {
      toast.error("Falha ao realizar o login!")
    }
  })

  return { control, register, errors, isSubmitting, onSubmit }
}
