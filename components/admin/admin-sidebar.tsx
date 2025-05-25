"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Home, FileText, Calendar, Users, MessageSquare, Settings, BarChart3, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

const navigation = [
  { name: "Dashboard", href: "/admin", icon: Home },
  { name: "Conteúdo", href: "/admin/content", icon: FileText },
  { name: "Eventos", href: "/admin/events", icon: Calendar },
  { name: "Usuários", href: "/admin/users", icon: Users },
  { name: "Mensagens", href: "/admin/messages", icon: MessageSquare },
  { name: "Relatórios", href: "/admin/reports", icon: BarChart3 },
  { name: "Configurações", href: "/admin/settings", icon: Settings },
]

export default function AdminSidebar() {
  const pathname = usePathname()
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    // Verificar se o usuário está autenticado
    const token = localStorage.getItem("admin_token")
    setIsAuthenticated(!!token)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("admin_token")
    window.location.href = "/admin/login"
  }

  // Se não estiver autenticado, não renderizar a sidebar
  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="flex w-64 flex-col bg-white shadow-lg">
      <div className="flex h-16 items-center justify-center border-b border-gray-200">
        <h1 className="text-xl font-bold text-blue-950">
          Projeto <span className="text-orange-500">Metanoia</span>
        </h1>
      </div>

      <nav className="flex-1 space-y-1 p-4">
        {navigation.map((item) => {
          const Icon = item.icon
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "group flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors",
                pathname === item.href
                  ? "bg-blue-100 text-blue-900"
                  : "text-gray-700 hover:bg-gray-100 hover:text-gray-900",
              )}
            >
              <Icon className="mr-3 h-5 w-5" />
              {item.name}
            </Link>
          )
        })}
      </nav>

      <div className="border-t border-gray-200 p-4">
        <Button onClick={handleLogout} variant="outline" className="w-full justify-start">
          <LogOut className="mr-3 h-4 w-4" />
          Sair
        </Button>
      </div>
    </div>
  )
}
