import logo from "@/assets/logo.svg"
import { Link } from "@/components/atoms"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useHeader } from "./use.index"

export function Header() {
  const { isAuthenticated, navItems, initials } = useHeader()

  if (!isAuthenticated) return null

  return (
    <header className="w-full border-b border-gray-200 bg-white">
      <div className="flex items-center justify-between px-16 py-5">
        <Link to="/" underline={false} aria-label="Financy">
          <img src={logo} alt="Financy" className="h-8 w-[134px]" />
        </Link>

        <nav className="flex items-center gap-5">
          {navItems.map((item) => (
            <Link key={item.to} to={item.to} active={item.active}>
              {item.label}
            </Link>
          ))}
        </nav>

        <Link to="/profile" underline={false} aria-label="Perfil">
          <Avatar size="lg">
            <AvatarFallback className="bg-gray-300 text-sm leading-5 font-medium text-gray-800 uppercase">
              {initials}
            </AvatarFallback>
          </Avatar>
        </Link>
      </div>
    </header>
  )
}
