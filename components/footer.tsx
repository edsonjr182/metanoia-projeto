"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Instagram, Facebook, Youtube, ArrowRight } from "lucide-react"
import { Input } from "@/components/ui/input"

export default function Footer() {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false)

  useEffect(() => {
    const adminToken = localStorage.getItem("admin_token")
    setIsAdminLoggedIn(!!adminToken)
  }, [])

  // Se o usuário admin estiver logado, não renderizar o footer
  if (isAdminLoggedIn) {
    return null
  }

  return (
    <footer className="bg-gradient-to-br from-blue-950 to-blue-900 text-white">
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Newsletter Section */}
        <div className="mx-auto mb-12 max-w-3xl rounded-xl bg-gradient-to-r from-blue-800/50 to-blue-900/50 p-8 backdrop-blur-sm">
          <div className="text-center">
            <h3 className="mb-2 text-2xl font-bold">Receba Nossas Novidades</h3>
            <p className="mb-6 text-blue-100">
              Inscreva-se para receber informações sobre eventos, oportunidades e histórias inspiradoras.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Input
                type="email"
                placeholder="Seu e-mail"
                className="border-blue-700/50 bg-blue-800/30 text-white placeholder:text-blue-200/70"
              />
              <Button className="bg-orange-500 hover:bg-orange-600">
                Inscrever-se <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="mb-4 text-lg font-semibold">Projeto Metanoia</h3>
            <p className="mb-4 text-sm text-blue-200">
              Transformando mentalidades e construindo futuros melhores para jovens de periferia.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-800 text-white transition-colors hover:bg-orange-500"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-800 text-white transition-colors hover:bg-orange-500"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-800 text-white transition-colors hover:bg-orange-500"
                aria-label="YouTube"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">Links Rápidos</h3>
            <ul className="space-y-2 text-sm text-blue-200">
              <li>
                <Link href="/sobre" className="inline-block transition-colors hover:text-orange-400">
                  Sobre o Projeto
                </Link>
              </li>
              <li>
                <Link href="/palestras" className="inline-block transition-colors hover:text-orange-400">
                  Palestras
                </Link>
              </li>
              <li>
                <Link href="/cursos" className="inline-block transition-colors hover:text-orange-400">
                  Cursos Técnicos
                </Link>
              </li>
              <li>
                <Link href="/jovens" className="inline-block transition-colors hover:text-orange-400">
                  Área para Jovens
                </Link>
              </li>
              <li>
                <Link href="/familias" className="inline-block transition-colors hover:text-orange-400">
                  Área para Famílias
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">Contato</h3>
            <ul className="space-y-3 text-sm text-blue-200">
              <li className="flex items-start">
                <span className="mr-2 text-orange-400">📧</span>
                <span>contato@projetometanoia.org.br</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-orange-400">📱</span>
                <span>(11) 99999-9999</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-orange-400">📍</span>
                <span>São Paulo, SP</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">Apoie o Projeto</h3>
            <p className="mb-4 text-sm text-blue-200">
              Sua contribuição pode transformar a vida de muitos jovens. Conheça as formas de apoiar o Projeto Metanoia.
            </p>
            <Button asChild className="bg-orange-500 hover:bg-orange-600">
              <Link href="/contato">Seja um Apoiador</Link>
            </Button>
          </div>
        </div>
        <div className="mt-12 border-t border-blue-800 pt-8 text-center text-sm text-blue-300">
          <p>&copy; {new Date().getFullYear()} Projeto Metanoia. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
