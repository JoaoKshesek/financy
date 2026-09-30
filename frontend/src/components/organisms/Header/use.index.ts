import { useLocation } from "react-router"

import { getInitials } from "@/lib/utils/initials"
import { useAuthStore } from "@/stores/auth"

const NAV_ITEMS = [
  { label: "Dashboard", to: "/" },
  { label: "Transações", to: "/transacoes" },
  { label: "Categorias", to: "/categorias" },
]

export function useHeader() {
  const { user, isAuthenticated } = useAuthStore()
  const { pathname } = useLocation()

  const navItems = NAV_ITEMS.map((item) => ({
    ...item,
    active: pathname === item.to,
  }))

  return {
    isAuthenticated,
    navItems,
    initials: getInitials(user?.name),
  }
}
