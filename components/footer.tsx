"use client"

import { Heart, Mail, Phone, MapPin, Instagram, Facebook, Twitter, Linkedin, ArrowUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { useConfiguracoes } from "@/hooks/use-configuracoes"

export default function Footer() {
  const { configuracoes, loading } = useConfiguracoes()

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const formatWhatsApp = (telefone: string) => {
    // Remove caracteres especiais e espaços
    const cleanPhone = telefone.replace(/\D/g, "")
    return `https://wa.me/55${cleanPhone}`
  }

  const socialLinks = [
    {
      icon: Instagram,
      href: configuracoes.redesSociais.instagram,
      label: "Instagram",
      color: "from-pink-500 to-purple-600",
    },
    {
      icon: Facebook,
      href: configuracoes.redesSociais.facebook,
      label: "Facebook",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: Twitter,
      href: configuracoes.redesSociais.twitter,
      label: "Twitter",
      color: "from-blue-400 to-blue-500",
    },
    {
      icon: Linkedin,
      href: configuracoes.redesSociais.linkedin,
      label: "LinkedIn",
      color: "from-blue-600 to-blue-700",
    },
  ]

  return (
    <footer className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white relative overflow-hidden">
      {/* Enhanced Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>
      <div className="absolute inset-0 bg-dot-pattern opacity-10"></div>

      <div className="relative z-10 content-width container-padding py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
          {/* Enhanced Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-4 mb-8">
              <div className="relative">
                <div className="absolute -inset-3 bg-gradient-to-r from-orange-400/30 to-orange-600/30 rounded-full blur-lg opacity-50"></div>
                <div className="relative p-4 bg-white/10 rounded-2xl backdrop-blur-sm">
                  <Heart className="h-12 w-12 text-orange-400" />
                </div>
              </div>
              <div>
                <span className="font-bold text-3xl">Projeto Metanoia</span>
                <p className="text-gray-400 text-base mt-1">Transformando Vidas</p>
              </div>
            </div>
            <p className="text-gray-300 text-xl leading-relaxed mb-8 max-w-lg">
              Transformando vidas através da educação, esperança e oportunidades. Juntos construímos um futuro melhor
              para nossa juventude.
            </p>

            {/* Enhanced Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <Button
                  key={social.label}
                  variant="ghost"
                  size="sm"
                  className="w-14 h-14 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all duration-300 group relative overflow-hidden"
                  asChild
                >
                  <a
                    href={social.href !== "#" ? social.href : undefined}
                    aria-label={social.label}
                    target={social.href !== "#" ? "_blank" : undefined}
                    rel={social.href !== "#" ? "noopener noreferrer" : undefined}
                  >
                    <social.icon className="h-6 w-6 text-gray-400 group-hover:text-white transition-colors duration-300 relative z-10" />
                    <div
                      className={`absolute inset-0 bg-gradient-to-r ${social.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}
                    ></div>
                  </a>
                </Button>
              ))}
            </div>
          </div>

          {/* Enhanced Quick Links */}
          <div>
            <h3 className="font-semibold text-2xl mb-8 text-white">Links Rápidos</h3>
            <ul className="space-y-4">
              {[
                { href: "/sobre", label: "Sobre o Projeto" },
                { href: "/palestras", label: "Palestras" },
                { href: "/cursos", label: "Cursos Técnicos" },
                { href: "/jovens", label: "Área para Jovens" },
                { href: "/familias", label: "Área para Famílias" },
                { href: "/contato", label: "Contato" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-orange-400 transition-colors duration-200 flex items-center group text-lg"
                  >
                    <span className="w-3 h-3 bg-orange-500/20 group-hover:bg-orange-500/40 transition-colors duration-200 rounded-full mr-3"></span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Enhanced Contact Info */}
          <div>
            <h3 className="font-semibold text-2xl mb-8 text-white">Contato</h3>
            <div className="space-y-6">
              {loading ? (
                <div className="space-y-4">
                  <div className="animate-pulse">
                    <div className="h-4 bg-gray-700 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-gray-700 rounded w-1/2"></div>
                  </div>
                  <div className="animate-pulse">
                    <div className="h-4 bg-gray-700 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-gray-700 rounded w-1/2"></div>
                  </div>
                  <div className="animate-pulse">
                    <div className="h-4 bg-gray-700 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-gray-700 rounded w-1/2"></div>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex items-start space-x-4 group">
                    <div className="p-3 rounded-2xl bg-orange-500/10 group-hover:bg-orange-500/20 transition-colors duration-200">
                      <Mail className="h-6 w-6 text-orange-400" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400 mb-1">Email</p>
                      <a
                        href={`mailto:${configuracoes.contato.email}`}
                        className="text-gray-300 text-lg hover:text-orange-400 transition-colors duration-200"
                      >
                        {configuracoes.contato.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4 group">
                    <div className="p-3 rounded-2xl bg-emerald-500/10 group-hover:bg-emerald-500/20 transition-colors duration-200">
                      <Phone className="h-6 w-6 text-emerald-400" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400 mb-1">WhatsApp</p>
                      <a
                        href={formatWhatsApp(configuracoes.contato.telefone)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-300 text-lg hover:text-emerald-400 transition-colors duration-200"
                      >
                        {configuracoes.contato.telefone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4 group">
                    <div className="p-3 rounded-2xl bg-blue-500/10 group-hover:bg-blue-500/20 transition-colors duration-200">
                      <MapPin className="h-6 w-6 text-blue-400" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400 mb-1">Localização</p>
                      <p className="text-gray-300 text-lg">{configuracoes.contato.localizacao}</p>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Enhanced Bottom Section */}
        <div className="border-t border-gray-700/50 mt-16 pt-10">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
            <div className="flex items-center space-x-6">
              <p className="text-gray-400 text-base">&copy; 2024 Projeto Metanoia. Todos os direitos reservados.</p>
            </div>

            <div className="flex items-center space-x-6">
              <Badge className="px-4 py-2 bg-orange-500/10 text-orange-300 border-orange-400/20 rounded-full">
                Feito com ❤️ para transformar vidas
              </Badge>

              <Button
                onClick={scrollToTop}
                variant="ghost"
                size="sm"
                className="w-12 h-12 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all duration-300 group"
              >
                <ArrowUp className="h-5 w-5 text-gray-400 group-hover:text-white transition-colors duration-300" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
