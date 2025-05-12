"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"

const navigation = [
  { name: "Início", href: "/" },
  { name: "Sobre o Projeto", href: "/sobre" },
  { name: "Palestras", href: "/palestras" },
  { name: "Cursos Técnicos", href: "/cursos" },
  { name: "Área para Jovens", href: "/jovens" },
  { name: "Área para Famílias", href: "/familias" },
  { name: "Contato", href: "/contato" },
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled ? "bg-white/90 shadow-md backdrop-blur-md" : "bg-white",
      )}
    >
      <nav className="container mx-auto flex items-center justify-between p-4 sm:px-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="text-2xl font-bold text-blue-950">
              Projeto <span className="text-orange-500">Metanoia</span>
            </span>
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Abrir menu</span>
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-8">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "relative text-sm font-medium leading-6 text-gray-900 transition-colors hover:text-orange-500",
                pathname === item.href ? "text-orange-500" : "",
              )}
            >
              {item.name}
              {pathname === item.href && (
                <motion.span className="absolute -bottom-1 left-0 h-0.5 w-full bg-orange-500" layoutId="underline" />
              )}
            </Link>
          ))}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <Button asChild className="bg-blue-950 hover:bg-blue-900">
            <Link href="/contato">Seja Parceiro</Link>
          </Button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden"
          >
            <div className="fixed inset-0 bg-black/20" onClick={() => setMobileMenuOpen(false)} />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10"
            >
              <div className="flex items-center justify-between">
                <Link href="/" className="-m-1.5 p-1.5" onClick={() => setMobileMenuOpen(false)}>
                  <span className="text-2xl font-bold text-blue-950">
                    Projeto <span className="text-orange-500">Metanoia</span>
                  </span>
                </Link>
                <button
                  type="button"
                  className="-m-2.5 rounded-md p-2.5 text-gray-700"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="sr-only">Fechar menu</span>
                  <X className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div className="mt-6 flow-root">
                <div className="-my-6 divide-y divide-gray-500/10">
                  <div className="space-y-2 py-6">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={cn(
                          "group -mx-3 flex items-center rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50",
                          pathname === item.href ? "text-orange-500" : "",
                        )}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.name}
                        {pathname === item.href && (
                          <motion.span
                            className="ml-auto h-2 w-2 rounded-full bg-orange-500"
                            layoutId="mobileIndicator"
                          />
                        )}
                      </Link>
                    ))}
                  </div>
                  <div className="py-6">
                    <Button asChild className="w-full bg-blue-950 hover:bg-blue-900">
                      <Link href="/contato" onClick={() => setMobileMenuOpen(false)}>
                        Seja Parceiro
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
