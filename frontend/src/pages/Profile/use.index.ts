import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useNavigate } from "react-router"
import { toast } from "sonner"

import { getInitials } from "@/lib/utils/initials"
import { profileSchema, type ProfileFormData } from "@/schemas"
import { useAuthStore } from "@/stores/auth"

export function useProfile() {
  const user = useAuthStore((state) => state.user)
  const updateProfile = useAuthStore((state) => state.updateProfile)
  const logout = useAuthStore((state) => state.logout)
  const navigate = useNavigate()

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    values: {
      name: user?.name ?? "",
      email: user?.email ?? "",
    },
  })

  const onSubmit = handleSubmit(async (data) => {
    try {
      const updated = await updateProfile({ name: data.name })

      if (updated) {
        toast.success("Perfil atualizado com sucesso!")
      } else {
        toast.error("Não foi possível salvar as alterações.")
      }
    } catch {
      toast.error("Erro ao atualizar o perfil")
    }
  })

  const handleLogout = () => {
    logout()
    navigate("/login", { replace: true })
  }

  return {
    user,
    initials: getInitials(user?.name),
    control,
    errors,
    isSubmitting,
    isDirty,
    onSubmit,
    handleLogout,
  }
}
