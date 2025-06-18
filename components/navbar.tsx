"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Heart, User, LogOut, Shield, ChevronDown, Menu, X } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { user, logout } = useAuth()
  const pathname = usePathname()
  const [bannerVisible, setBannerVisible] = useState(true)

  useEffect(() => {
    // Verificar estado inicial do banner
    const initialBannerState = localStorage.getItem("topBannerVisible")
    if (initialBannerState !== null) {
      setBannerVisible(initialBannerState === "true")
    }

    // Escutar mudanças no banner
    const handleBannerToggle = (event: CustomEvent) => {
      setBannerVisible(event.detail.visible)
    }

    window.addEventListener("topBannerToggle", handleBannerToggle as EventListener)

    return () => {
      window.removeEventListener("topBannerToggle", handleBannerToggle as EventListener)
    }
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const menuItems = [
    { href: "/", label: "Início" },
    { href: "/sobre", label: "Sobre" },
    { href: "/palestras", label: "Palestras" },
    { href: "/cursos", label: "Cursos" },
    { href: "/jovens", label: "Jovens" },
    { href: "/familias", label: "Famílias" },
    { href: "/contato", label: "Contato" },
  ]

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/"
    return pathname.startsWith(href)
  }

  return (
    <nav
      className={`fixed w-full z-40 transition-all duration-500 ${bannerVisible ? "top-12" : "top-0"} ${
        scrolled
          ? "bg-white/95 backdrop-blur-2xl shadow-soft border-b border-gray-100/50"
          : "bg-gradient-to-r from-slate-950/95 via-slate-900/95 to-slate-950/95 backdrop-blur-2xl"
      }`}
    >
      <div className="content-width container-padding">
        <div
          className={`flex justify-between items-center transition-all duration-500 ${bannerVisible ? "h-16 mt-4" : "h-20"}`}
        >
          {/* Enhanced Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="absolute -inset-2 bg-gradient-to-r from-orange-400/30 to-orange-600/30 rounded-full opacity-0 group-hover:opacity-100 blur-lg transition-all duration-500"></div>
              <div
                className={`relative p-2.5 rounded-xl transition-all duration-500 ${
                  scrolled ? "bg-orange-50 group-hover:bg-orange-100" : "bg-white/10 group-hover:bg-white/20"
                }`}
              >
                <Heart
                  className={`h-7 w-7 transition-all duration-500 ${
                    scrolled ? "text-orange-500" : "text-orange-400"
                  } group-hover:scale-110 group-hover:text-orange-500 relative z-10`}
                />
              </div>
            </div>
            <div className="flex flex-col">
              <span
                className={`font-bold text-xl transition-all duration-500 ${
                  scrolled ? "text-slate-900" : "text-white"
                } group-hover:text-orange-500`}
              >
                Projeto Metanoia
              </span>
              <span
                className={`text-xs font-medium transition-all duration-500 ${
                  scrolled ? "text-gray-500" : "text-gray-400"
                }`}
              >
                Transformando Vidas
              </span>
            </div>
          </Link>

          {/* Enhanced Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-2">
            {menuItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <Button
                  variant="ghost"
                  className={`relative px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                    isActive(item.href)
                      ? scrolled
                        ? "bg-orange-50 text-orange-600 shadow-soft"
                        : "bg-white/10 text-white shadow-soft"
                      : scrolled
                        ? "text-slate-700 hover:text-orange-600 hover:bg-orange-50"
                        : "text-gray-300 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {item.label}
                  {isActive(item.href) && (
                    <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-orange-500 rounded-full"></div>
                  )}
                </Button>
              </Link>
            ))}
          </div>

          {/* Enhanced User Menu / Admin Button */}
          <div className="hidden lg:flex items-center space-x-3">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-14 px-5 rounded-xl hover:bg-white/10 transition-all duration-300 group"
                  >
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-9 w-9 ring-2 ring-orange-400/30 group-hover:ring-orange-400/50 transition-all duration-300">
                        <AvatarImage src={user.photoURL || ""} alt={user.displayName || ""} />
                        <AvatarFallback className="bg-gradient-to-br from-orange-400 to-orange-600 text-white font-semibold text-sm">
                          {user.displayName ? getInitials(user.displayName) : <User className="h-4 w-4" />}
                        </AvatarFallback>
                      </Avatar>
                      <div className="hidden xl:block text-left">
                        <p className={`text-sm font-medium ${scrolled ? "text-slate-900" : "text-white"}`}>
                          {user.displayName || "Usuário"}
                        </p>
                        <p className={`text-xs ${scrolled ? "text-gray-500" : "text-gray-400"}`}>Admin</p>
                      </div>
                      <ChevronDown
                        className={`h-4 w-4 transition-all duration-300 ${
                          scrolled ? "text-slate-600" : "text-gray-400"
                        } group-hover:text-orange-500`}
                      />
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-64 mt-2 p-2 rounded-xl border-0 shadow-xl bg-white/95 backdrop-blur-xl"
                  align="end"
                >
                  <div className="px-3 py-3 bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg mb-2">
                    <p className="text-sm font-medium text-slate-900">{user.displayName || "Usuário"}</p>
                    <p className="text-xs text-slate-600 truncate">{user.email}</p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link
                      href="/admin"
                      className="cursor-pointer flex items-center px-3 py-2 rounded-lg hover:bg-orange-50 transition-colors duration-200"
                    >
                      <Shield className="mr-3 h-4 w-4 text-orange-500" />
                      <div>
                        <p className="font-medium text-slate-900 text-sm">Painel Admin</p>
                        <p className="text-xs text-gray-500">Gerenciar conteúdo</p>
                      </div>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={logout}
                    className="cursor-pointer text-red-600 hover:text-red-700 hover:bg-red-50 flex items-center px-3 py-2 rounded-lg transition-colors duration-200"
                  >
                    <LogOut className="mr-3 h-4 w-4" />
                    <div>
                      <p className="font-medium text-sm">Sair</p>
                      <p className="text-xs text-red-500">Encerrar sessão</p>
                    </div>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="/admin">
                <Button
                  className={`group px-8 py-3 rounded-xl font-medium transition-all duration-500 relative overflow-hidden ${
                    scrolled
                      ? "bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-medium hover:shadow-glow-orange"
                      : "bg-white/10 hover:bg-white/20 text-white border border-white/20 hover:border-white/40 backdrop-blur-xl"
                  }`}
                >
                  <span className="relative z-10 flex items-center">
                    <Shield className="mr-2 h-4 w-4" />
                    Entrar
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </Button>
              </Link>
            )}
          </div>

          {/* Enhanced Mobile menu button */}
          <div className="lg:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className={`relative w-12 h-12 rounded-xl transition-all duration-300 ${
                scrolled ? "text-slate-900 hover:bg-gray-100" : "text-white hover:bg-white/10"
              }`}
            >
              <div className="relative w-5 h-5">
                {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </div>
            </Button>
          </div>
        </div>

        {/* Enhanced Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden animate-slide-up">
            <div
              className={`px-4 pt-4 pb-6 space-y-2 rounded-b-2xl relative overflow-hidden ${
                scrolled ? "bg-white/95 backdrop-blur-xl border-t border-gray-100" : "bg-slate-800/95 backdrop-blur-xl"
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>
              {menuItems.map((item, index) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`block px-4 py-3 rounded-xl font-medium transition-all duration-300 animate-slide-in ${
                    isActive(item.href)
                      ? scrolled
                        ? "bg-orange-50 text-orange-600 shadow-soft"
                        : "bg-white/10 text-white shadow-soft"
                      : scrolled
                        ? "text-slate-700 hover:text-orange-600 hover:bg-orange-50"
                        : "text-gray-300 hover:text-white hover:bg-white/10"
                  }`}
                  style={{ animationDelay: `${index * 50}ms` }}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ))}

              <div className="pt-4 border-t border-gray-200/20">
                {user ? (
                  <div className="space-y-2">
                    <div
                      className={`px-4 py-3 rounded-xl ${scrolled ? "bg-gray-50" : "bg-white/5"} animate-slide-in`}
                      style={{ animationDelay: `${menuItems.length * 50}ms` }}
                    >
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={user.photoURL || ""} alt={user.displayName || ""} />
                          <AvatarFallback className="bg-gradient-to-br from-orange-400 to-orange-600 text-white font-semibold text-sm">
                            {user.displayName ? getInitials(user.displayName) : <User className="h-4 w-4" />}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className={`text-sm font-medium ${scrolled ? "text-slate-900" : "text-white"}`}>
                            {user.displayName || "Admin"}
                          </p>
                          <p className={`text-xs ${scrolled ? "text-gray-500" : "text-gray-400"}`}>{user.email}</p>
                        </div>
                      </div>
                    </div>
                    <Link
                      href="/admin"
                      className={`flex items-center px-4 py-3 rounded-xl font-medium transition-all duration-300 animate-slide-in ${
                        scrolled
                          ? "text-slate-700 hover:text-orange-600 hover:bg-orange-50"
                          : "text-gray-300 hover:text-white hover:bg-white/10"
                      }`}
                      style={{ animationDelay: `${(menuItems.length + 1) * 50}ms` }}
                      onClick={() => setIsOpen(false)}
                    >
                      <Shield className="mr-3 h-4 w-4" />
                      Painel Admin
                    </Link>
                    <button
                      onClick={() => {
                        logout()
                        setIsOpen(false)
                      }}
                      className={`w-full text-left flex items-center px-4 py-3 rounded-xl font-medium transition-all duration-300 text-red-600 hover:bg-red-50 animate-slide-in`}
                      style={{ animationDelay: `${(menuItems.length + 2) * 50}ms` }}
                    >
                      <LogOut className="mr-3 h-4 w-4" />
                      Sair
                    </button>
                  </div>
                ) : (
                  <Link
                    href="/admin"
                    className={`flex items-center px-4 py-3 rounded-xl font-medium transition-all duration-300 animate-slide-in ${
                      scrolled
                        ? "text-slate-700 hover:text-orange-600 hover:bg-orange-50"
                        : "text-gray-300 hover:text-white hover:bg-white/10"
                    }`}
                    style={{ animationDelay: `${menuItems.length * 50}ms` }}
                    onClick={() => setIsOpen(false)}
                  >
                    <Shield className="mr-3 h-4 w-4" />
                    Admin
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
