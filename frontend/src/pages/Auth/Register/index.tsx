import { Link } from "react-router"
import { LogIn, Lock, Mail, User } from "lucide-react"

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
import type { RegisterFormData } from "@/schemas"
import { useRegister } from "./use.index"

export function Register() {
  const { control, errors, isSubmitting, onSubmit } = useRegister()

  return (
    <div className="flex flex-col items-center justify-center gap-6 mt-12">
      <img src={logo} alt="Financy" className="h-8 w-[134px]" />

      <Card className="w-full max-w-md rounded-[12px] [--card-spacing:--spacing(8)]">
        <CardHeader className="p-1 text-center">
          <CardTitle className="text-xl leading-7 font-bold">
            Criar conta
          </CardTitle>
          <CardDescription className="text-base leading-6 font-normal">
            Comece a controlar suas finanças ainda hoje
          </CardDescription>
        </CardHeader>

        <CardContent className="gap-6">
          <form onSubmit={onSubmit} noValidate className="flex flex-col gap-4">
            <ControlledInput<RegisterFormData>
              name="name"
              control={control}
              label="Nome"
              placeholder="Seu nome"
              leftIcon={<User />}
              errorMessage={errors.name?.message}
            />

            <ControlledInput<RegisterFormData>
              name="email"
              control={control}
              label="E-mail"
              type="email"
              placeholder="mail@exemplo.com"
              leftIcon={<Mail />}
              errorMessage={errors.email?.message}
            />

            <ControlledInput<RegisterFormData>
              name="password"
              control={control}
              label="Senha"
              type="password"
              placeholder="Digite sua senha"
              leftIcon={<Lock />}
              helper="A senha deve ter no mínimo 8 caracteres"
              errorMessage={errors.password?.message}
            />

            <Button
              type="submit"
              disabled={isSubmitting}
              className="h-11 w-full cursor-pointer bg-brand-base text-white hover:bg-brand-dark"
            >
              {isSubmitting ? "Criando conta..." : "Cadastrar"}
            </Button>
          </form>

          <div className="flex items-center gap-4">
            <span className="h-px flex-1 bg-border" />
            <span className="text-sm text-muted-foreground">ou</span>
            <span className="h-px flex-1 bg-border" />
          </div>

          <div className="flex flex-col gap-4">
            <p className="text-center text-sm text-gray-600">
              Já tem uma conta?
            </p>
            <Button variant="outline" className="h-11 w-full cursor-pointer" asChild>
              <Link to="/login">
                <LogIn className="size-4" />
                Entrar
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
