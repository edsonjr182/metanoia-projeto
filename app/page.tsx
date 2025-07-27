"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, Users, BookOpen, Calendar, ArrowRight, Star, Quote, CheckCircle } from "lucide-react"
import Link from "next/link"
import { useConfiguracoes } from "@/hooks/use-configuracoes"

export default function HomePage() {
  const { configuracoes, loading } = useConfiguracoes()

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-transparent to-blue-500/10"></div>
        <div className="absolute inset-0 bg-dot-pattern opacity-20"></div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-orange-400/20 rounded-full blur-xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-blue-400/20 rounded-full blur-xl animate-float-delayed"></div>

        <div className="relative z-10 content-width container-padding text-center">
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Badge */}
            <Badge className="px-6 py-2 bg-orange-500/10 text-orange-300 border-orange-400/20 rounded-full text-sm font-medium">
              ✨ Transformando vidas desde 2020
            </Badge>

            {/* Main Title */}
            <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
              Projeto{" "}
              <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
                Metanoia
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              {loading ? "Carregando..." : configuracoes.sobre.descricao}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
              <Link href="/sobre">
                <Button
                  size="lg"
                  className="group px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-xl font-semibold shadow-glow-orange transition-all duration-500"
                >
                  <span className="flex items-center">
                    Conheça Nossa História
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                </Button>
              </Link>

              <Link href="/contato">
                <Button
                  variant="outline"
                  size="lg"
                  className="px-8 py-4 border-2 border-white/20 text-white hover:bg-white/10 rounded-xl font-semibold backdrop-blur-xl transition-all duration-300 bg-transparent"
                >
                  Entre em Contato
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-16">
              {[
                { number: "500+", label: "Vidas Transformadas" },
                { number: "50+", label: "Palestras Realizadas" },
                { number: "20+", label: "Cursos Oferecidos" },
                { number: "5", label: "Anos de Impacto" },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-orange-400 mb-2">{stat.number}</div>
                  <div className="text-gray-400 text-sm md:text-base">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 bg-white">
        <div className="content-width container-padding">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div>
                <Badge className="mb-4 px-4 py-2 bg-orange-100 text-orange-700 rounded-full">Sobre Nós</Badge>
                <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
                  Transformando Vidas Através da <span className="text-orange-500">Educação</span>
                </h2>
                <p className="text-xl text-gray-600 leading-relaxed">
                  {loading ? "Carregando..." : configuracoes.sobre.missao}
                </p>
              </div>

              <div className="space-y-4">
                {[
                  "Educação de qualidade para todos",
                  "Desenvolvimento de habilidades técnicas",
                  "Apoio psicológico e emocional",
                  "Inserção no mercado de trabalho",
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-6 w-6 text-orange-500 flex-shrink-0" />
                    <span className="text-gray-700 text-lg">{item}</span>
                  </div>
                ))}
              </div>

              <Link href="/sobre">
                <Button
                  size="lg"
                  className="group px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-xl font-semibold shadow-medium transition-all duration-300"
                >
                  Saiba Mais
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </Link>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-orange-400/30 to-orange-600/30 rounded-3xl blur-2xl opacity-30"></div>
              <div className="relative bg-gradient-to-br from-orange-50 to-orange-100 rounded-3xl p-8 shadow-soft">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center p-6 bg-white rounded-2xl shadow-soft">
                    <Heart className="h-12 w-12 text-orange-500 mx-auto mb-4" />
                    <h3 className="font-bold text-slate-900 mb-2">Missão</h3>
                    <p className="text-gray-600 text-sm">Transformar vidas através da educação</p>
                  </div>
                  <div className="text-center p-6 bg-white rounded-2xl shadow-soft">
                    <Users className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                    <h3 className="font-bold text-slate-900 mb-2">Comunidade</h3>
                    <p className="text-gray-600 text-sm">Construindo laços fortes</p>
                  </div>
                  <div className="text-center p-6 bg-white rounded-2xl shadow-soft">
                    <BookOpen className="h-12 w-12 text-green-500 mx-auto mb-4" />
                    <h3 className="font-bold text-slate-900 mb-2">Educação</h3>
                    <p className="text-gray-600 text-sm">Conhecimento para todos</p>
                  </div>
                  <div className="text-center p-6 bg-white rounded-2xl shadow-soft">
                    <Star className="h-12 w-12 text-purple-500 mx-auto mb-4" />
                    <h3 className="font-bold text-slate-900 mb-2">Excelência</h3>
                    <p className="text-gray-600 text-sm">Qualidade em tudo</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-gradient-to-br from-slate-50 to-gray-100">
        <div className="content-width container-padding">
          <div className="text-center mb-16">
            <Badge className="mb-4 px-4 py-2 bg-blue-100 text-blue-700 rounded-full">Nossos Serviços</Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              Como Podemos <span className="text-blue-500">Ajudar</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Oferecemos uma gama completa de serviços para transformar vidas e construir um futuro melhor
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: BookOpen,
                title: "Palestras Motivacionais",
                description: "Palestras inspiradoras que transformam perspectivas e motivam mudanças positivas",
                color: "from-blue-500 to-blue-600",
                href: "/palestras",
              },
              {
                icon: Users,
                title: "Cursos Técnicos",
                description: "Capacitação profissional com cursos técnicos voltados para o mercado de trabalho",
                color: "from-green-500 to-green-600",
                href: "/cursos",
              },
              {
                icon: Heart,
                title: "Apoio aos Jovens",
                description: "Programas especiais de mentoria e desenvolvimento para jovens em situação de risco",
                color: "from-purple-500 to-purple-600",
                href: "/jovens",
              },
              {
                icon: Users,
                title: "Suporte às Famílias",
                description: "Orientação e apoio para famílias em situação de vulnerabilidade social",
                color: "from-orange-500 to-orange-600",
                href: "/familias",
              },
              {
                icon: Calendar,
                title: "Eventos Comunitários",
                description: "Organização de eventos que fortalecem os laços comunitários e promovem integração",
                color: "from-pink-500 to-pink-600",
                href: "/contato",
              },
              {
                icon: Star,
                title: "Consultoria Social",
                description: "Consultoria especializada para organizações que desejam impacto social positivo",
                color: "from-indigo-500 to-indigo-600",
                href: "/contato",
              },
            ].map((service, index) => (
              <Card
                key={index}
                className="group hover:shadow-glow transition-all duration-500 border-0 bg-white/80 backdrop-blur-sm"
              >
                <CardHeader className="pb-4">
                  <div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${service.color} p-4 mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <service.icon className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-xl text-slate-900 group-hover:text-orange-600 transition-colors duration-300">
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 text-base leading-relaxed mb-6">
                    {service.description}
                  </CardDescription>
                  <Link href={service.href}>
                    <Button
                      variant="ghost"
                      className="group/btn p-0 h-auto text-orange-600 hover:text-orange-700 font-semibold"
                    >
                      Saiba mais
                      <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-white">
        <div className="content-width container-padding">
          <div className="text-center mb-16">
            <Badge className="mb-4 px-4 py-2 bg-green-100 text-green-700 rounded-full">Depoimentos</Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              Histórias de <span className="text-green-500">Transformação</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Conheça algumas das vidas que foram transformadas através do nosso trabalho
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Maria Silva",
                role: "Ex-participante do programa",
                content:
                  "O Projeto Metanoia mudou completamente minha vida. Hoje tenho uma profissão e posso sustentar minha família com dignidade.",
                rating: 5,
              },
              {
                name: "João Santos",
                role: "Jovem beneficiário",
                content:
                  "Graças ao apoio recebido, consegui sair das ruas e hoje estou cursando técnico em informática. Meu futuro é promissor!",
                rating: 5,
              },
              {
                name: "Ana Costa",
                role: "Mãe de família",
                content:
                  "O suporte que recebi me ajudou a superar momentos difíceis. Hoje sou uma pessoa mais forte e confiante.",
                rating: 5,
              },
            ].map((testimonial, index) => (
              <Card
                key={index}
                className="group hover:shadow-glow transition-all duration-500 border-0 bg-gradient-to-br from-white to-gray-50"
              >
                <CardContent className="p-8">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <Quote className="w-8 h-8 text-orange-400 mb-4" />
                  <p className="text-gray-700 text-lg leading-relaxed mb-6 italic">"{testimonial.content}"</p>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900">{testimonial.name}</h4>
                      <p className="text-gray-500 text-sm">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section className="py-24 bg-gradient-to-br from-orange-50 to-orange-100">
        <div className="content-width container-padding">
          <div className="text-center mb-16">
            <Badge className="mb-4 px-4 py-2 bg-orange-100 text-orange-700 rounded-full">Próximos Eventos</Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              Participe dos Nossos <span className="text-orange-500">Eventos</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Fique por dentro das próximas atividades e faça parte da nossa comunidade
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Palestra: Superando Desafios",
                date: "15 de Março, 2024",
                time: "19:00",
                location: "Centro Comunitário",
                description: "Uma palestra inspiradora sobre como superar obstáculos e alcançar seus objetivos.",
              },
              {
                title: "Workshop: Desenvolvimento Pessoal",
                date: "22 de Março, 2024",
                time: "14:00",
                location: "Sede do Projeto",
                description: "Workshop prático focado no desenvolvimento de habilidades pessoais e profissionais.",
              },
              {
                title: "Evento Comunitário: Dia da Família",
                date: "30 de Março, 2024",
                time: "10:00",
                location: "Praça Central",
                description: "Um dia especial dedicado às famílias com atividades recreativas e educativas.",
              },
            ].map((event, index) => (
              <Card key={index} className="group hover:shadow-glow transition-all duration-500 border-0 bg-white">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-2">
                    <Badge className="bg-orange-100 text-orange-700">{event.date}</Badge>
                    <span className="text-sm text-gray-500">{event.time}</span>
                  </div>
                  <CardTitle className="text-xl text-slate-900 group-hover:text-orange-600 transition-colors duration-300">
                    {event.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{event.description}</p>
                  <div className="flex items-center text-sm text-gray-500 mb-6">
                    <Calendar className="w-4 h-4 mr-2" />
                    {event.location}
                  </div>
                  <Button className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white">
                    Participar
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-transparent to-blue-500/10"></div>
        <div className="absolute inset-0 bg-dot-pattern opacity-20"></div>

        <div className="relative z-10 content-width container-padding text-center">
          <div className="max-w-4xl mx-auto space-y-8">
            <Badge className="px-6 py-2 bg-orange-500/10 text-orange-300 border-orange-400/20 rounded-full">
              Faça Parte da Mudança
            </Badge>

            <h2 className="text-4xl md:text-6xl font-bold leading-tight">
              Juntos Podemos{" "}
              <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
                Transformar Vidas
              </span>
            </h2>

            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Sua participação e apoio são fundamentais para continuarmos transformando vidas. Entre em contato conosco
              e descubra como você pode fazer a diferença.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
              <Link href="/contato">
                <Button
                  size="lg"
                  className="group px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-xl font-semibold shadow-glow-orange transition-all duration-500"
                >
                  <span className="flex items-center">
                    Entre em Contato
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                </Button>
              </Link>

              <Link href="/sobre">
                <Button
                  variant="outline"
                  size="lg"
                  className="px-8 py-4 border-2 border-white/20 text-white hover:bg-white/10 rounded-xl font-semibold backdrop-blur-xl transition-all duration-300 bg-transparent"
                >
                  Saiba Mais Sobre Nós
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
