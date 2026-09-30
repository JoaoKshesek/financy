import { Link } from "react-router"
import { Lock, Mail, UserRoundPlus } from "lucide-react"

import logo from "@/assets/logo.svg"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ControlledInput } from "@/components/molecules"
import type { LoginFormData } from "@/schemas"
import { useLogin } from "./use.index"

export function Login() {
  const { control, register, errors, isSubmitting, onSubmit } = useLogin()

  return (
    <div className="flex flex-col items-center justify-center gap-6 mt-12">
      <img src={logo} alt="Financy" width="134" height="auto" />

      <Card className="w-full max-w-md rounded-[12px] [--card-spacing:--spacing(8)]">
        <CardHeader className="p-1 text-center">
          <CardTitle className="text-xl leading-7 font-bold">
            Fazer login
          </CardTitle>
          <CardDescription className="text-base leading-6 font-normal">
            Entre na sua conta para continuar
          </CardDescription>
        </CardHeader>

        <CardContent className="gap-6">
          <form onSubmit={onSubmit} noValidate className="flex flex-col gap-4">
            <ControlledInput<LoginFormData>
              name="email"
              control={control}
              label="E-mail"
              type="email"
              placeholder="mail@exemplo.com"
              leftIcon={<Mail />}
              errorMessage={errors.email?.message}
            />

            <ControlledInput<LoginFormData>
              name="password"
              control={control}
              label="Senha"
              type="password"
              placeholder="Digite sua senha"
              leftIcon={<Lock />}
              errorMessage={errors.password?.message}
            />

            <div className="flex items-center justify-between">
              <label className="flex cursor-pointer items-center gap-2 text-sm text-gray-600 select-none">
                <input
                  type="checkbox"
                  {...register("remember")}
                  className="size-4 cursor-pointer rounded border-gray-300 accent-brand-base"
                />
                Lembrar-me
              </label>
              <button
                type="button"
                className="text-sm font-medium text-brand-base hover:text-brand-dark hover:underline cursor-pointer"
              >
                Recuperar senha
              </button>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="h-11 w-full cursor-pointer bg-brand-base text-white hover:bg-brand-dark"
            >
              {isSubmitting ? "Entrando..." : "Entrar"}
            </Button>
          </form>

          <div className="flex items-center gap-4">
            <span className="h-px flex-1 bg-border" />
            <span className="text-sm text-muted-foreground">ou</span>
            <span className="h-px flex-1 bg-border" />
          </div>

          <div className="flex flex-col gap-4">
            <p className="text-center text-sm text-gray-600">
              Ainda não tem uma conta?
            </p>
            <Button variant="outline" className="h-11 w-full cursor-pointer" asChild>
              <Link to="/signup" className="text-gray-700">
                <UserRoundPlus className="size-4 text-gray-700" />
                Criar conta
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
