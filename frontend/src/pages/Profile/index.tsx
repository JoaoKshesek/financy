import { LogOut, Mail, User } from "lucide-react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { ControlledInput } from "@/components/molecules"
import type { ProfileFormData } from "@/schemas"
import { useProfile } from "./use.index"

export function Profile() {
  const { user, initials, control, errors, isSubmitting, onSubmit, handleLogout } =
    useProfile()

  return (
    <div className="flex flex-col items-center py-12">
      <Card className="w-full max-w-md rounded-[12px] [--card-spacing:--spacing(8)]">
        <CardHeader className="flex flex-col items-center gap-2 p-1 text-center">
          <Avatar className="size-16">
            <AvatarFallback className="bg-gray-300 text-xl leading-7 font-medium text-gray-800 uppercase">
              {initials}
            </AvatarFallback>
          </Avatar>

          <CardTitle className="text-xl leading-7 font-bold">
            {user?.name}
          </CardTitle>
          <CardDescription className="text-base leading-6 font-normal">
            {user?.email}
          </CardDescription>
        </CardHeader>

        <CardContent className="gap-6">
          <span className="h-px w-full bg-border" />

          <form onSubmit={onSubmit} noValidate className="flex flex-col gap-4">
            <ControlledInput<ProfileFormData>
              name="name"
              control={control}
              label="Nome completo"
              placeholder="Seu nome"
              leftIcon={<User />}
              errorMessage={errors.name?.message}
            />

            <ControlledInput<ProfileFormData>
              name="email"
              control={control}
              label="E-mail"
              type="email"
              leftIcon={<Mail />}
              helper="O e-mail não pode ser alterado"
              disabled
            />

            <Button
              type="submit"
              disabled={isSubmitting}
              className="h-11 w-full bg-brand-base text-white hover:bg-brand-dark cursor-pointer disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500"
            >
              {isSubmitting ? "Salvando..." : "Salvar alterações"}
            </Button>
          </form>

          <Button
            type="button"
            variant="outline"
            onClick={handleLogout}
            className="h-11 w-full cursor-pointer disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500"
          >
            <LogOut className="size-4 text-danger" />
            Sair da conta
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
