"use client"

import Link from "next/link"
import { Facebook, Instagram, Twitter, Linkedin, Mail, Phone, MapPin, Heart } from "lucide-react"
import { useConfiguracoes } from "@/hooks/use-configuracoes"

export default function Footer() {
  const { configuracoes } = useConfiguracoes()

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sobre o Projeto */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-orange-400">Projeto Metanoia</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Transformando vidas através da educação e desenvolvimento pessoal. Nosso compromisso é promover mudança de
              mentalidade e crescimento integral.
            </p>
            <div className="flex space-x-4">
              {configuracoes?.redesSociais?.instagram && configuracoes.redesSociais.instagram !== "#" && (
                <Link
                  href={configuracoes.redesSociais.instagram}
                  className="text-gray-400 hover:text-pink-400 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Instagram className="h-5 w-5" />
                </Link>
              )}
              {configuracoes?.redesSociais?.facebook && configuracoes.redesSociais.facebook !== "#" && (
                <Link
                  href={configuracoes.redesSociais.facebook}
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Facebook className="h-5 w-5" />
                </Link>
              )}
              {configuracoes?.redesSociais?.twitter && configuracoes.redesSociais.twitter !== "#" && (
                <Link
                  href={configuracoes.redesSociais.twitter}
                  className="text-gray-400 hover:text-blue-300 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Twitter className="h-5 w-5" />
                </Link>
              )}
              {configuracoes?.redesSociais?.linkedin && configuracoes.redesSociais.linkedin !== "#" && (
                <Link
                  href={configuracoes.redesSociais.linkedin}
                  className="text-gray-400 hover:text-blue-500 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin className="h-5 w-5" />
                </Link>
              )}
            </div>
          </div>

          {/* Links Rápidos */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-orange-400">Links Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/sobre" className="text-gray-300 hover:text-orange-400 transition-colors text-sm">
                  Sobre Nós
                </Link>
              </li>
              <li>
                <Link href="/palestras" className="text-gray-300 hover:text-orange-400 transition-colors text-sm">
                  Palestras
                </Link>
              </li>
              <li>
                <Link href="/cursos" className="text-gray-300 hover:text-orange-400 transition-colors text-sm">
                  Cursos
                </Link>
              </li>
              <li>
                <Link href="/jovens" className="text-gray-300 hover:text-orange-400 transition-colors text-sm">
                  Jovens
                </Link>
              </li>
              <li>
                <Link href="/familias" className="text-gray-300 hover:text-orange-400 transition-colors text-sm">
                  Famílias
                </Link>
              </li>
              <li>
                <Link href="/contato" className="text-gray-300 hover:text-orange-400 transition-colors text-sm">
                  Contato
                </Link>
              </li>
            </ul>
          </div>

          {/* Informações Legais */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-orange-400">Informações Legais</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/termos" className="text-gray-300 hover:text-blue-400 transition-colors text-sm">
                  Termos de Uso
                </Link>
              </li>
              <li>
                <Link href="/privacidade" className="text-gray-300 hover:text-green-400 transition-colors text-sm">
                  Política de Privacidade
                </Link>
              </li>
              <li>
                <span className="text-gray-400 text-sm">LGPD Compliant</span>
              </li>
              <li>
                <span className="text-gray-400 text-sm">Foro: Brasília/DF</span>
              </li>
            </ul>
            {configuracoes?.juridico?.cnpj && (
              <div className="text-gray-400 text-xs">
                <p>CNPJ: {configuracoes.juridico.cnpj}</p>
              </div>
            )}
          </div>

          {/* Contato */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-orange-400">Contato</h3>
            <div className="space-y-3">
              {configuracoes?.contato?.email && (
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4 text-orange-400 flex-shrink-0" />
                  <a
                    href={`mailto:${configuracoes.contato.email}`}
                    className="text-gray-300 hover:text-orange-400 transition-colors text-sm"
                  >
                    {configuracoes.contato.email}
                  </a>
                </div>
              )}
              {configuracoes?.contato?.telefone && (
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4 text-orange-400 flex-shrink-0" />
                  <a
                    href={`tel:${configuracoes.contato.telefone.replace(/\D/g, "")}`}
                    className="text-gray-300 hover:text-orange-400 transition-colors text-sm"
                  >
                    {configuracoes.contato.telefone}
                  </a>
                </div>
              )}
              {configuracoes?.contato?.localizacao && (
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-orange-400 flex-shrink-0" />
                  <span className="text-gray-300 text-sm">{configuracoes.contato.localizacao}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Estatísticas */}
        {(configuracoes?.estatisticas?.jovensImpactados ||
          configuracoes?.estatisticas?.palestrasRealizadas ||
          configuracoes?.estatisticas?.parceriasAtivas) && (
          <div className="border-t border-gray-800 mt-8 pt-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              {configuracoes.estatisticas.jovensImpactados && (
                <div>
                  <div className="text-2xl font-bold text-orange-400">
                    {configuracoes.estatisticas.jovensImpactados}
                  </div>
                  <div className="text-gray-400 text-sm">Jovens Impactados</div>
                </div>
              )}
              {configuracoes.estatisticas.palestrasRealizadas && (
                <div>
                  <div className="text-2xl font-bold text-orange-400">
                    {configuracoes.estatisticas.palestrasRealizadas}
                  </div>
                  <div className="text-gray-400 text-sm">Palestras Realizadas</div>
                </div>
              )}
              {configuracoes.estatisticas.parceriasAtivas && (
                <div>
                  <div className="text-2xl font-bold text-orange-400">{configuracoes.estatisticas.parceriasAtivas}</div>
                  <div className="text-gray-400 text-sm">Parcerias Ativas</div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-6 text-center">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} {configuracoes?.juridico?.razaoSocial || "Projeto Metanoia"}. Todos os
              direitos reservados.
            </p>
            <p className="text-gray-500 text-xs flex items-center">
              Feito com <Heart className="h-3 w-3 mx-1 text-red-500" /> para transformar vidas
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
