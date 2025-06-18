"use client"

import { useEffect, useState } from "react"
import { collection, getDocs } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, Users, BookOpen, Lightbulb, ArrowRight, Sparkles, TrendingUp } from "lucide-react"
import Link from "next/link"
import TopBanner from "@/components/top-banner"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function HomePage() {
  const [stats, setStats] = useState({
    jovensImpactados: "500+",
    palestrasRealizadas: "50+",
    parceriasAtivas: "20+",
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      // Buscar palestras
      const palestrasSnapshot = await getDocs(collection(db, "palestras"))
      const palestrasCount = palestrasSnapshot.size

      // Buscar cursos (como proxy para parcerias)
      const cursosSnapshot = await getDocs(collection(db, "cursos"))
      const cursosCount = cursosSnapshot.size

      // Buscar contatos (como proxy para jovens impactados)
      const contatosSnapshot = await getDocs(collection(db, "contatos"))
      const contatosCount = contatosSnapshot.size

      setStats({
        jovensImpactados: contatosCount > 0 ? `${contatosCount * 10}+` : "500+",
        palestrasRealizadas: palestrasCount > 0 ? `${palestrasCount}+` : "50+",
        parceriasAtivas: cursosCount > 0 ? `${cursosCount}+` : "20+",
      })
    } catch (error) {
      console.error("Erro ao buscar estatísticas:", error)
    } finally {
      setLoading(false)
    }
  }
  return (
    <div className="min-h-screen overflow-hidden">
      <TopBanner />
      <Navbar />

      {/* Hero Section - Redesigned with proper spacing */}
      <section className="relative min-h-screen flex items-center justify-center pt-40 pb-20">
        {/* Enhanced background with better gradients */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 -z-10">
          <div className="absolute inset-0 bg-mesh-gradient opacity-30"></div>
          <div className="absolute inset-0 bg-dot-pattern opacity-20"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-transparent"></div>
        </div>

        {/* Floating elements with better positioning and z-index */}
        <div className="absolute top-32 left-10 w-32 h-32 bg-gradient-to-br from-orange-400/20 to-orange-600/15 rounded-full blur-3xl animate-float -z-5"></div>
        <div
          className="absolute bottom-40 right-16 w-40 h-40 bg-gradient-to-br from-emerald-400/20 to-emerald-600/10 rounded-full blur-3xl animate-float -z-5"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/4 w-24 h-24 bg-gradient-to-br from-blue-400/15 to-blue-600/8 rounded-full blur-3xl animate-float -z-5"
          style={{ animationDelay: "4s" }}
        ></div>
        <div
          className="absolute top-1/3 right-1/4 w-36 h-36 bg-gradient-to-br from-purple-400/20 to-purple-600/10 rounded-full blur-3xl animate-float -z-5"
          style={{ animationDelay: "1s" }}
        ></div>

        <div className="relative z-10 content-width container-padding text-center max-w-7xl mx-auto">
          <div className="animate-fade-in space-y-8">
            <Badge className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-orange-500/10 to-orange-600/10 text-orange-300 border border-orange-400/20 hover:bg-orange-500/20 transition-all duration-500 text-sm font-medium backdrop-blur-xl rounded-full">
              <Sparkles className="mr-3 h-5 w-5" />
              Transformando Vidas desde 2020
            </Badge>

            <h1 className="text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-white leading-none tracking-tight">
              Projeto{" "}
              <span className="relative inline-block">
                <span className="text-gradient-orange animate-glow">Metanoia</span>
                <div className="absolute -inset-2 bg-gradient-to-r from-orange-400/30 to-orange-600/30 rounded-2xl blur-xl opacity-50 animate-pulse-slow -z-10"></div>
              </span>
            </h1>

            <p className="text-xl md:text-2xl lg:text-3xl text-gray-300 max-w-5xl mx-auto leading-relaxed font-light">
              Transformando vidas através da{" "}
              <span className="text-white font-semibold bg-gradient-to-r from-orange-400/20 to-orange-600/20 px-3 py-1 rounded-xl backdrop-blur-sm border border-orange-400/20">
                educação
              </span>
              ,{" "}
              <span className="text-white font-semibold bg-gradient-to-r from-emerald-400/20 to-emerald-600/20 px-3 py-1 rounded-xl backdrop-blur-sm border border-emerald-400/20">
                esperança
              </span>{" "}
              e{" "}
              <span className="text-white font-semibold bg-gradient-to-r from-blue-400/20 to-blue-600/20 px-3 py-1 rounded-xl backdrop-blur-sm border border-blue-400/20">
                oportunidades
              </span>
              .<br />
              <span className="text-white font-bold mt-4 block">Ajudamos jovens e adolescentes de periferia</span> a
              voltarem a sonhar com o futuro.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8 pb-16">
              <Link href="/sobre">
                <Button
                  size="lg"
                  className="group px-12 py-6 text-xl font-semibold bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-xl hover:shadow-glow-orange transition-all duration-500 rounded-3xl relative overflow-hidden"
                >
                  <span className="relative z-10 flex items-center">
                    Conheça o Projeto
                    <ArrowRight className="ml-4 h-6 w-6 group-hover:translate-x-2 transition-transform duration-300" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </Button>
              </Link>
              <Link href="/contato">
                <Button
                  size="lg"
                  variant="outline"
                  className="group px-12 py-6 text-xl font-semibold text-white border-2 border-white/50 hover:border-white/80 bg-white/10 hover:bg-white/20 backdrop-blur-xl rounded-3xl transition-all duration-500 hover:shadow-xl"
                >
                  <span className="flex items-center">
                    Seja Parceiro
                    <Heart className="ml-4 h-6 w-6 group-hover:scale-110 transition-transform duration-300" />
                  </span>
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Enhanced scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce-slow z-20">
          <div className="w-8 h-14 border-2 border-white/40 rounded-full flex justify-center backdrop-blur-sm bg-white/5">
            <div className="w-1.5 h-5 bg-gradient-to-b from-white/80 to-transparent rounded-full mt-2 animate-pulse-slow"></div>
          </div>
        </div>
      </section>

      {/* Features Section - Completely redesigned */}
      <section className="section-padding bg-gradient-to-b from-gray-50 via-white to-gray-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50/50 via-transparent to-emerald-50/30"></div>

        <div className="relative z-10 content-width container-padding">
          <div className="text-center mb-24 animate-fade-in">
            <Badge className="mb-8 px-8 py-4 bg-gradient-to-r from-orange-100 to-orange-200 text-orange-700 border border-orange-200 text-base font-medium rounded-full shadow-soft">
              <TrendingUp className="mr-3 h-5 w-5" />
              Como Transformamos Vidas
            </Badge>
            <h2 className="font-bold text-slate-900 mb-10 leading-tight">
              Nosso <span className="text-gradient-orange">Impacto</span> na Comunidade
            </h2>
            <p className="text-2xl text-gray-600 max-w-5xl mx-auto leading-relaxed">
              Oferecemos um ecossistema completo de recursos para apoiar o desenvolvimento pessoal e profissional dos
              jovens, criando oportunidades reais de transformação.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {[
              {
                icon: BookOpen,
                title: "Cursos Técnicos",
                description:
                  "Informações sobre cursos técnicos gratuitos e oportunidades de capacitação profissional com certificação reconhecida.",
                gradient: "from-orange-500 to-orange-600",
                bgGradient: "from-orange-50 to-orange-100",
                iconBg: "bg-orange-500",
              },
              {
                icon: Users,
                title: "Palestras Motivacionais",
                description:
                  "Eventos inspiradores e educativos para motivar e orientar nossos jovens em suas jornadas pessoais.",
                gradient: "from-emerald-500 to-emerald-600",
                bgGradient: "from-emerald-50 to-emerald-100",
                iconBg: "bg-emerald-500",
              },
              {
                icon: Heart,
                title: "Apoio Emocional",
                description:
                  "Suporte psicológico especializado e acompanhamento emocional para jovens e suas famílias.",
                gradient: "from-red-500 to-red-600",
                bgGradient: "from-red-50 to-red-100",
                iconBg: "bg-red-500",
              },
              {
                icon: Lightbulb,
                title: "Empreendedorismo",
                description:
                  "Mentoria em empreendedorismo e desenvolvimento de ideias de negócio com foco em inovação social.",
                gradient: "from-blue-500 to-blue-600",
                bgGradient: "from-blue-50 to-blue-100",
                iconBg: "bg-blue-500",
              },
            ].map((feature, index) => (
              <Card
                key={feature.title}
                className="group hover-lift border-0 bg-white/95 backdrop-blur-xl hover:bg-white transition-all duration-500 animate-fade-in overflow-hidden rounded-3xl shadow-soft hover:shadow-xl"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <CardHeader className="text-center pb-8 pt-10">
                  <div className="relative mx-auto mb-8">
                    <div
                      className={`w-24 h-24 rounded-4xl ${feature.iconBg} p-6 shadow-medium group-hover:shadow-xl group-hover:scale-110 transition-all duration-500 relative overflow-hidden`}
                    >
                      <feature.icon className="h-12 w-12 text-white relative z-10" />
                      <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </div>
                    <div
                      className={`absolute -inset-3 bg-gradient-to-br ${feature.bgGradient} rounded-4xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 -z-10 blur-sm`}
                    ></div>
                  </div>
                  <CardTitle className="text-2xl font-bold text-slate-900 group-hover:text-slate-700 transition-colors duration-300 mb-4">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-8 pb-10">
                  <CardDescription className="text-gray-600 leading-relaxed text-center group-hover:text-gray-700 transition-colors duration-300 text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="section-padding bg-gradient-to-br from-orange-500 via-orange-600 to-orange-700 relative overflow-hidden">
        <div className="absolute inset-0 bg-dot-pattern opacity-20"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-yellow-400/10 via-transparent to-red-500/10"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-orange-700/50 via-transparent to-transparent"></div>

        <div className="relative z-10 content-width container-padding text-center">
          <div className="animate-fade-in">
            <Badge className="mb-12 px-8 py-4 bg-white/20 text-white border border-white/30 backdrop-blur-xl rounded-full">
              <Heart className="mr-3 h-5 w-5" />
              Junte-se a Nós
            </Badge>
            <h2 className="font-bold mb-12 text-white leading-tight">
              Faça Parte Desta{" "}
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-yellow-200 to-yellow-300 bg-clip-text text-transparent">
                  Transformação
                </span>
                <div className="absolute -inset-2 bg-gradient-to-r from-yellow-300/30 to-yellow-400/30 rounded-2xl blur-xl opacity-50 animate-pulse-slow"></div>
              </span>
            </h2>
            <p className="text-2xl md:text-3xl mb-16 text-orange-100 max-w-5xl mx-auto leading-relaxed">
              Seja um parceiro, voluntário ou apoiador. Juntos podemos fazer a diferença na vida de muitos jovens e
              construir um futuro mais justo e próspero para todos.
            </p>
            <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
              <Link href="/contato">
                <Button
                  size="lg"
                  className="group px-16 py-8 text-xl font-semibold bg-white text-orange-600 hover:bg-gray-50 shadow-xl hover:shadow-2xl transition-all duration-500 rounded-3xl relative overflow-hidden"
                >
                  <span className="relative z-10 flex items-center">
                    Entre em Contato
                    <ArrowRight className="ml-4 h-6 w-6 group-hover:translate-x-2 transition-transform duration-300" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-50 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </Button>
              </Link>
              <Link href="/sobre">
                <Button
                  size="lg"
                  variant="outline"
                  className="group px-16 py-8 text-xl font-semibold text-white border-2 border-white bg-white/10 hover:border-white/90 hover:bg-white/20 backdrop-blur-xl rounded-3xl transition-all duration-500 shadow-medium hover:shadow-xl"
                >
                  <span className="flex items-center">
                    Saiba Mais
                    <Sparkles className="ml-4 h-6 w-6 group-hover:scale-110 transition-transform duration-300" />
                  </span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
