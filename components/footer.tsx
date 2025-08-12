"use client"

import { useState } from "react"
import Link from "next/link"
import { Facebook, Instagram, Twitter, Linkedin, Mail, Phone, MapPin, Heart, Scale, Shield } from "lucide-react"
import { useConfiguracoes } from "@/hooks/use-configuracoes"

export default function Footer() {
  const { configuracoes } = useConfiguracoes()
  const [currentYear] = useState(new Date().getFullYear())

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sobre o Projeto */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-orange-400">Projeto Metanoia</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Transformando vidas através da educação, desenvolvimento pessoal e mudança de mentalidade. Construindo um
              futuro melhor para jovens, famílias e comunidades.
            </p>
            <div className="flex space-x-3">
              {configuracoes.redesSociais.facebook !== "#" && (
                <a
                  href={configuracoes.redesSociais.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-blue-500 transition-colors"
                >
                  <Facebook className="h-5 w-5" />
                </a>
              )}
              {configuracoes.redesSociais.instagram !== "#" && (
                <a
                  href={configuracoes.redesSociais.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-pink-500 transition-colors"
                >
                  <Instagram className="h-5 w-5" />
                </a>
              )}
              {configuracoes.redesSociais.twitter !== "#" && (
                <a
                  href={configuracoes.redesSociais.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                >
                  <Twitter className="h-5 w-5" />
                </a>
              )}
              {configuracoes.redesSociais.linkedin !== "#" && (
                <a
                  href={configuracoes.redesSociais.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-blue-600 transition-colors"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
              )}
            </div>
          </div>

          {/* Links Rápidos */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-orange-400">Links Rápidos</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/sobre" className="text-gray-300 hover:text-orange-400 transition-colors">
                  Sobre Nós
                </Link>
              </li>
              <li>
                <Link href="/palestras" className="text-gray-300 hover:text-orange-400 transition-colors">
                  Palestras
                </Link>
              </li>
              <li>
                <Link href="/cursos" className="text-gray-300 hover:text-orange-400 transition-colors">
                  Cursos
                </Link>
              </li>
              <li>
                <Link href="/jovens" className="text-gray-300 hover:text-orange-400 transition-colors">
                  Jovens
                </Link>
              </li>
              <li>
                <Link href="/familias" className="text-gray-300 hover:text-orange-400 transition-colors">
                  Famílias
                </Link>
              </li>
              <li>
                <Link href="/contato" className="text-gray-300 hover:text-orange-400 transition-colors">
                  Contato
                </Link>
              </li>
            </ul>
          </div>

          {/* Contato */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-orange-400">Contato</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-2 text-gray-300">
                <Mail className="h-4 w-4 text-orange-400" />
                <span>{configuracoes.contato.email}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-300">
                <Phone className="h-4 w-4 text-orange-400" />
                <span>{configuracoes.contato.telefone}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-300">
                <MapPin className="h-4 w-4 text-orange-400" />
                <span>{configuracoes.contato.localizacao}</span>
              </div>
            </div>
          </div>

          {/* Impacto */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-orange-400">Nosso Impacto</h3>
            <div className="space-y-3 text-sm">
              <div className="text-gray-300">
                <div className="text-2xl font-bold text-orange-400">{configuracoes.estatisticas.jovensImpactados}</div>
                <div>Jovens Impactados</div>
              </div>
              <div className="text-gray-300">
                <div className="text-2xl font-bold text-orange-400">
                  {configuracoes.estatisticas.palestrasRealizadas}
                </div>
                <div>Palestras Realizadas</div>
              </div>
              <div className="text-gray-300">
                <div className="text-2xl font-bold text-orange-400">{configuracoes.estatisticas.parceriasAtivas}</div>
                <div>Parcerias Ativas</div>
              </div>
            </div>
          </div>
        </div>

        {/* Linha divisória */}
        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <span>© {currentYear} Projeto Metanoia. Feito com</span>
              <Heart className="h-4 w-4 text-red-500" />
              <span>para transformar vidas.</span>
            </div>

            {/* Links Jurídicos */}
            <div className="flex items-center space-x-6 text-sm">
              <Link
                href="/termos"
                className="text-gray-400 hover:text-blue-400 transition-colors flex items-center space-x-1"
              >
                <Scale className="h-4 w-4" />
                <span>Termos de Uso</span>
              </Link>
              <Link
                href="/privacidade"
                className="text-gray-400 hover:text-green-400 transition-colors flex items-center space-x-1"
              >
                <Shield className="h-4 w-4" />
                <span>Política de Privacidade</span>
              </Link>
            </div>
          </div>

          {/* Informação LGPD */}
          <div className="mt-4 text-center">
            <p className="text-xs text-gray-500">
              Este site está em conformidade com a Lei Geral de Proteção de Dados (LGPD - Lei 13.709/2018)
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
