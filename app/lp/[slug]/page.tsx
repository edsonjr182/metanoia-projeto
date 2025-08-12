"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Heart, ArrowDown, CheckCircle, Sparkles, Users, Target, Video, MessageCircle, Send, Play } from "lucide-react"
import { collection, query, where, getDocs, addDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { LegalPopup } from "@/components/legal-popup"

interface LandingPage {
  id: string
  nome: string
  slug: string
  titulo: string
  subtitulo: string
  descricao: string
  bannerTipo: "imagem" | "video"
  bannerUrl: string
  videoApresentacao?: {
    ativo: boolean
    url: string
    titulo: string
    descricao: string
    poster?: string
    autoplay: boolean
  }
  gruposLinks?: {
    ativo: boolean
    titulo: string
    descricao: string
    posicao: "antes-sobre" | "depois-sobre" | "antes-formulario"
    whatsapp?: {
      ativo: boolean
      titulo: string
      link: string
    }
    telegram?: {
      ativo: boolean
      titulo: string
      link: string
    }
  }
  sobreTitulo: string
  sobreDescricao: string
  botaoTexto: string
  cores: {
    primaria: string
    secundaria: string
    fundo: string
    texto: string
    botao: string
  }
  ativo: boolean
}

export default function LandingPageView() {
  const params = useParams()
  const slug = params.slug as string
  const [page, setPage] = useState<LandingPage | null>(null)
  const [loading, setLoading] = useState(true)
  const [formLoading, setFormLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [videoLoading, setVideoLoading] = useState(true)
  const [showLegalPopup, setShowLegalPopup] = useState(false)
  const [legalAccepted, setLegalAccepted] = useState(false)
  const [formData, setFormData] = useState({
    nome: "",
    whatsapp: "",
    email: "",
    idade: "",
  })

  useEffect(() => {
    fetchLandingPage()
  }, [slug])

  const fetchLandingPage = async () => {
    try {
      const q = query(collection(db, "landing-pages"), where("slug", "==", slug), where("ativo", "==", true))
      const querySnapshot = await getDocs(q)

      if (!querySnapshot.empty) {
        const doc = querySnapshot.docs[0]
        setPage({ id: doc.id, ...doc.data() } as LandingPage)
      }
    } catch (error) {
      console.error("Erro ao buscar landing page:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!page) return

    if (!legalAccepted) {
      alert("Você deve aceitar os Termos de Uso e Política de Privacidade para continuar.")
      return
    }

    setFormLoading(true)

    try {
      await addDoc(collection(db, "landing-leads"), {
        landingPageId: page.id,
        nome: formData.nome,
        whatsapp: formData.whatsapp,
        email: formData.email,
        idade: Number.parseInt(formData.idade),
        legalAccepted: true,
        legalAcceptedAt: new Date().toISOString(),
        criadoEm: new Date().toISOString(),
      })

      setSuccess(true)
      setFormData({
        nome: "",
        whatsapp: "",
        email: "",
        idade: "",
      })
      setLegalAccepted(false)
    } catch (error) {
      console.error("Erro ao enviar formulário:", error)
      alert("Erro ao enviar formulário. Tente novamente.")
    } finally {
      setFormLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const scrollToForm = () => {
    document.getElementById("formulario")?.scrollIntoView({ behavior: "smooth" })
  }

  const handleLegalAccept = () => {
    setLegalAccepted(true)
    setShowLegalPopup(false)
  }

  const renderGruposSection = () => {
    if (!page?.gruposLinks?.ativo) return null

    const hasActiveGroups = page.gruposLinks.whatsapp?.ativo || page.gruposLinks.telegram?.ativo
    if (!hasActiveGroups) return null

    return (
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-dot-pattern"></div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <Badge
              className="mb-8 px-6 py-3 border rounded-full text-sm font-medium"
              style={{
                backgroundColor: `${page.cores.primaria}20`,
                color: page.cores.primaria,
                borderColor: `${page.cores.primaria}40`,
              }}
            >
              <Users className="mr-2 h-4 w-4" />
              Comunidade
            </Badge>

            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight" style={{ color: page.cores.texto }}>
              {page.gruposLinks.titulo}
            </h2>

            <p className="text-xl opacity-80 max-w-3xl mx-auto mb-12">{page.gruposLinks.descricao}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto animate-fade-in">
            {page.gruposLinks.whatsapp?.ativo && (
              <Card className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 group">
                <CardContent className="p-8 text-center">
                  <div
                    className="w-16 h-16 rounded-2xl p-4 mx-auto mb-6 group-hover:scale-110 transition-transform duration-300"
                    style={{ backgroundColor: "#25D366" }}
                  >
                    <MessageCircle className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4" style={{ color: page.cores.texto }}>
                    {page.gruposLinks.whatsapp.titulo}
                  </h3>
                  <p className="opacity-80 mb-6">Participe das conversas diárias e receba conteúdos exclusivos</p>
                  <Button
                    asChild
                    size="lg"
                    className="w-full py-4 text-lg font-semibold bg-green-500 hover:bg-green-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl group-hover:scale-105"
                  >
                    <a href={page.gruposLinks.whatsapp.link} target="_blank" rel="noopener noreferrer">
                      <MessageCircle className="mr-3 h-5 w-5" />
                      Entrar no Grupo
                    </a>
                  </Button>
                </CardContent>
              </Card>
            )}

            {page.gruposLinks.telegram?.ativo && (
              <Card className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 group">
                <CardContent className="p-8 text-center">
                  <div
                    className="w-16 h-16 rounded-2xl p-4 mx-auto mb-6 group-hover:scale-110 transition-transform duration-300"
                    style={{ backgroundColor: "#0088cc" }}
                  >
                    <Send className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4" style={{ color: page.cores.texto }}>
                    {page.gruposLinks.telegram.titulo}
                  </h3>
                  <p className="opacity-80 mb-6">Receba atualizações em tempo real e conteúdos especiais</p>
                  <Button
                    asChild
                    size="lg"
                    className="w-full py-4 text-lg font-semibold bg-blue-500 hover:bg-blue-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl group-hover:scale-105"
                  >
                    <a href={page.gruposLinks.telegram.link} target="_blank" rel="noopener noreferrer">
                      <Send className="mr-3 h-5 w-5" />
                      Seguir Canal
                    </a>
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>

          <div className="text-center mt-12">
            <Button
              onClick={scrollToForm}
              size="lg"
              className="group px-10 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-500 rounded-2xl"
              style={{
                backgroundColor: page.cores.botao,
                borderColor: page.cores.botao,
                color: "#ffffff",
              }}
            >
              <span className="flex items-center">
                {page.botaoTexto}
                <ArrowDown className="ml-3 h-5 w-5 group-hover:translate-y-1 transition-transform duration-300" />
              </span>
            </Button>
          </div>
        </div>
      </section>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando...</p>
        </div>
      </div>
    )
  }

  if (!page) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Página não encontrada</h1>
          <p className="text-gray-600 mb-8">A landing page que você está procurando não existe ou foi removida.</p>
          <Button asChild>
            <a href="/">Voltar ao início</a>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: page.cores.fundo, color: page.cores.texto }}>
      {/* Banner Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Banner */}
        <div className="absolute inset-0 z-0">
          {page.bannerTipo === "imagem" ? (
            <img src={page.bannerUrl || "/placeholder.svg"} alt="Banner" className="w-full h-full object-cover" />
          ) : (
            <video src={page.bannerUrl} className="w-full h-full object-cover" autoPlay muted loop playsInline />
          )}
          <div className="absolute inset-0 bg-black/50"></div>
        </div>

        {/* Content Overlay */}
        <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
          <div className="animate-fade-in space-y-8">
            <Badge className="inline-flex items-center px-8 py-4 bg-white/20 text-white border border-white/30 backdrop-blur-xl rounded-full text-sm font-medium">
              <Sparkles className="mr-3 h-5 w-5" />
              Projeto Metanoia
            </Badge>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-none tracking-tight">{page.titulo}</h1>

            {page.subtitulo && (
              <p className="text-2xl md:text-3xl lg:text-4xl font-light text-gray-200 max-w-4xl mx-auto leading-relaxed">
                {page.subtitulo}
              </p>
            )}

            {page.descricao && (
              <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">{page.descricao}</p>
            )}

            <div className="pt-8">
              <Button
                onClick={scrollToForm}
                size="lg"
                className="group px-12 py-6 text-xl font-semibold text-white shadow-xl hover:shadow-2xl transition-all duration-500 rounded-3xl relative overflow-hidden"
                style={{
                  backgroundColor: page.cores.botao,
                  borderColor: page.cores.botao,
                }}
              >
                <span className="relative z-10 flex items-center">
                  {page.botaoTexto}
                  <ArrowDown className="ml-4 h-6 w-6 group-hover:translate-y-1 transition-transform duration-300" />
                </span>
              </Button>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-20">
          <div className="w-8 h-14 border-2 border-white/40 rounded-full flex justify-center backdrop-blur-sm bg-white/5">
            <div className="w-1.5 h-5 bg-white/80 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Seção de Grupos - Antes da Seção Sobre */}
      {page?.gruposLinks?.posicao === "antes-sobre" && renderGruposSection()}

      {/* Seção do Vídeo de Apresentação Melhorada */}
      {page.videoApresentacao?.ativo && page.videoApresentacao.url && (
        <section className="py-20 px-4 sm:px-6 lg:px-8 relative">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0 bg-dot-pattern"></div>
          </div>

          <div className="relative z-10 max-w-6xl mx-auto">
            <div className="text-center mb-12 animate-fade-in">
              {page.videoApresentacao.titulo && (
                <>
                  <Badge
                    className="mb-8 px-6 py-3 border rounded-full text-sm font-medium"
                    style={{
                      backgroundColor: `${page.cores.primaria}20`,
                      color: page.cores.primaria,
                      borderColor: `${page.cores.primaria}40`,
                    }}
                  >
                    <Video className="mr-2 h-4 w-4" />
                    Apresentação
                  </Badge>

                  <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight" style={{ color: page.cores.texto }}>
                    {page.videoApresentacao.titulo}
                  </h2>
                </>
              )}

              {page.videoApresentacao.descricao && (
                <p className="text-xl opacity-80 max-w-3xl mx-auto mb-12">{page.videoApresentacao.descricao}</p>
              )}
            </div>

            <div className="animate-fade-in">
              <div className="relative max-w-4xl mx-auto">
                <div
                  className="absolute -inset-4 rounded-3xl blur-2xl opacity-20"
                  style={{ backgroundColor: page.cores.primaria }}
                ></div>

                <Card className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl overflow-hidden shadow-2xl">
                  <CardContent className="p-2">
                    <div className="aspect-video rounded-2xl overflow-hidden bg-black relative">
                      <video
                        src={page.videoApresentacao.url}
                        poster={page.videoApresentacao.poster}
                        className="w-full h-full object-cover"
                        controls
                        autoPlay={page.videoApresentacao.autoplay !== false}
                        muted={page.videoApresentacao.autoplay !== false}
                        playsInline
                        preload="metadata"
                        onLoadStart={() => setVideoLoading(true)}
                        onCanPlay={() => setVideoLoading(false)}
                        onError={(e) => {
                          console.error("Erro ao carregar vídeo:", e)
                          setVideoLoading(false)
                        }}
                      >
                        <source src={page.videoApresentacao.url} type="video/mp4" />
                        Seu navegador não suporta o elemento de vídeo.
                      </video>

                      {/* Loading Overlay */}
                      {videoLoading && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                          <div className="text-center text-white">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
                            <p className="text-sm">Carregando vídeo...</p>
                          </div>
                        </div>
                      )}

                      {/* Play Button Overlay (quando não é autoplay) */}
                      {!page.videoApresentacao.autoplay && !videoLoading && (
                        <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                          <div className="bg-black/50 rounded-full p-6 backdrop-blur-sm">
                            <Play className="h-12 w-12 text-white ml-1" />
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="text-center mt-12">
                <Button
                  onClick={scrollToForm}
                  size="lg"
                  className="group px-10 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-500 rounded-2xl"
                  style={{
                    backgroundColor: page.cores.botao,
                    borderColor: page.cores.botao,
                    color: "#ffffff",
                  }}
                >
                  <span className="flex items-center">
                    {page.botaoTexto}
                    <ArrowDown className="ml-3 h-5 w-5 group-hover:translate-y-1 transition-transform duration-300" />
                  </span>
                </Button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* About Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-dot-pattern"></div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="animate-fade-in">
              <Badge
                className="mb-8 px-6 py-3 border rounded-full text-sm font-medium"
                style={{
                  backgroundColor: `${page.cores.primaria}20`,
                  color: page.cores.primaria,
                  borderColor: `${page.cores.primaria}40`,
                }}
              >
                <Target className="mr-2 h-4 w-4" />
                Sobre o Projeto
              </Badge>

              <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight" style={{ color: page.cores.texto }}>
                {page.sobreTitulo}
              </h2>

              <div className="prose prose-lg max-w-none" style={{ color: page.cores.texto }}>
                <p className="text-xl leading-relaxed mb-8">{page.sobreDescricao}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {[
                  { icon: Users, label: "500+", desc: "Jovens Impactados" },
                  { icon: Target, label: "50+", desc: "Palestras Realizadas" },
                  { icon: Heart, label: "20+", desc: "Parcerias Ativas" },
                ].map((stat, index) => (
                  <div key={index} className="text-center p-4 rounded-2xl bg-white/5 backdrop-blur-sm">
                    <stat.icon className="h-8 w-8 mx-auto mb-3" style={{ color: page.cores.primaria }} />
                    <div className="text-2xl font-bold mb-1" style={{ color: page.cores.texto }}>
                      {stat.label}
                    </div>
                    <div className="text-sm opacity-70">{stat.desc}</div>
                  </div>
                ))}
              </div>

              <Button
                onClick={scrollToForm}
                size="lg"
                className="group px-10 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-500 rounded-2xl"
                style={{
                  backgroundColor: page.cores.botao,
                  borderColor: page.cores.botao,
                  color: "#ffffff",
                }}
              >
                <span className="flex items-center">
                  {page.botaoTexto}
                  <ArrowDown className="ml-3 h-5 w-5 group-hover:translate-y-1 transition-transform duration-300" />
                </span>
              </Button>
            </div>

            <div className="relative animate-fade-in">
              <div
                className="absolute -inset-4 rounded-3xl blur-2xl opacity-20"
                style={{ backgroundColor: page.cores.primaria }}
              ></div>
              <Card className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl overflow-hidden shadow-2xl">
                <CardContent className="p-8">
                  <div className="text-center mb-6">
                    <div
                      className="w-16 h-16 rounded-2xl p-4 mx-auto mb-4"
                      style={{ backgroundColor: page.cores.primaria }}
                    >
                      <Heart className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2" style={{ color: page.cores.texto }}>
                      Transformação Real
                    </h3>
                    <p className="opacity-80">Histórias de sucesso que inspiram</p>
                  </div>
                  <div className="space-y-4">
                    {[
                      "Desenvolvimento pessoal e profissional",
                      "Apoio emocional especializado",
                      "Oportunidades de capacitação",
                      "Rede de apoio e mentoria",
                    ].map((item, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 flex-shrink-0" style={{ color: page.cores.primaria }} />
                        <span className="opacity-90">{item}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Seção de Grupos - Depois da Seção Sobre */}
      {page?.gruposLinks?.posicao === "depois-sobre" && renderGruposSection()}

      {/* Seção de Grupos - Antes do Formulário */}
      {page?.gruposLinks?.posicao === "antes-formulario" && renderGruposSection()}

      {/* Form Section */}
      <section id="formulario" className="py-20 px-4 sm:px-6 lg:px-8 relative">
        {/* Background Gradient */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            background: `linear-gradient(135deg, ${page.cores.primaria}, ${page.cores.secundaria})`,
          }}
        ></div>

        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <Badge
              className="mb-8 px-6 py-3 border rounded-full text-sm font-medium"
              style={{
                backgroundColor: `${page.cores.primaria}20`,
                color: page.cores.primaria,
                borderColor: `${page.cores.primaria}40`,
              }}
            >
              <Users className="mr-2 h-4 w-4" />
              Inscreva-se Agora
            </Badge>

            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight" style={{ color: page.cores.texto }}>
              Faça Parte Desta <span style={{ color: page.cores.primaria }}>Transformação</span>
            </h2>

            <p className="text-xl opacity-80 max-w-2xl mx-auto">
              Preencha o formulário abaixo e dê o primeiro passo para transformar sua vida. Vagas limitadas!
            </p>
          </div>

          <Card className="bg-white/95 backdrop-blur-xl border-0 rounded-3xl shadow-2xl overflow-hidden animate-fade-in">
            <CardContent className="p-8 md:p-12">
              {success ? (
                <div className="text-center py-12">
                  <div
                    className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
                    style={{ backgroundColor: `${page.cores.primaria}20` }}
                  >
                    <CheckCircle className="h-10 w-10" style={{ color: page.cores.primaria }} />
                  </div>
                  <h3 className="text-3xl font-bold mb-4" style={{ color: page.cores.texto }}>
                    Inscrição Realizada!
                  </h3>
                  <p className="text-lg opacity-80 mb-8">
                    Parabéns! Sua inscrição foi confirmada com sucesso. Em breve entraremos em contato com você.
                  </p>
                  <Button
                    onClick={() => {
                      setSuccess(false)
                      setLegalAccepted(false)
                    }}
                    variant="outline"
                    className="border-2"
                    style={{
                      borderColor: page.cores.primaria,
                      color: page.cores.primaria,
                    }}
                  >
                    Nova Inscrição
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label
                        htmlFor="nome"
                        className="text-base font-medium mb-2 block"
                        style={{ color: page.cores.texto }}
                      >
                        Nome Completo *
                      </Label>
                      <Input
                        id="nome"
                        name="nome"
                        value={formData.nome}
                        onChange={handleChange}
                        className="h-14 text-base border-2 rounded-xl focus:ring-2 transition-all duration-300"
                        style={{
                          borderColor: `${page.cores.primaria}40`,
                          focusBorderColor: page.cores.primaria,
                        }}
                        placeholder="Seu nome completo"
                        required
                      />
                    </div>

                    <div>
                      <Label
                        htmlFor="idade"
                        className="text-base font-medium mb-2 block"
                        style={{ color: page.cores.texto }}
                      >
                        Idade *
                      </Label>
                      <Input
                        id="idade"
                        name="idade"
                        type="number"
                        min="15"
                        max="100"
                        value={formData.idade}
                        onChange={handleChange}
                        className="h-14 text-base border-2 rounded-xl focus:ring-2 transition-all duration-300"
                        style={{
                          borderColor: `${page.cores.primaria}40`,
                          focusBorderColor: page.cores.primaria,
                        }}
                        placeholder="Sua idade (mín. 15 anos)"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label
                      htmlFor="whatsapp"
                      className="text-base font-medium mb-2 block"
                      style={{ color: page.cores.texto }}
                    >
                      WhatsApp *
                    </Label>
                    <Input
                      id="whatsapp"
                      name="whatsapp"
                      value={formData.whatsapp}
                      onChange={handleChange}
                      className="h-14 text-base border-2 rounded-xl focus:ring-2 transition-all duration-300"
                      style={{
                        borderColor: `${page.cores.primaria}40`,
                        focusBorderColor: page.cores.primaria,
                      }}
                      placeholder="(11) 99999-9999"
                      required
                    />
                  </div>

                  <div>
                    <Label
                      htmlFor="email"
                      className="text-base font-medium mb-2 block"
                      style={{ color: page.cores.texto }}
                    >
                      Email *
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="h-14 text-base border-2 rounded-xl focus:ring-2 transition-all duration-300"
                      style={{
                        borderColor: `${page.cores.primaria}40`,
                        focusBorderColor: page.cores.primaria,
                      }}
                      placeholder="seu@email.com"
                      required
                    />
                  </div>

                  {/* Checkbox de Aceite dos Termos */}
                  <div className="bg-gray-50 p-6 rounded-xl border-2 border-gray-200">
                    <div className="flex items-start space-x-3">
                      <Checkbox
                        id="legal-accept"
                        checked={legalAccepted}
                        onCheckedChange={(checked) => setLegalAccepted(checked as boolean)}
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <Label
                          htmlFor="legal-accept"
                          className="text-sm font-medium cursor-pointer"
                          style={{ color: page.cores.texto }}
                        >
                          Li e aceito os{" "}
                          <button
                            type="button"
                            onClick={() => setShowLegalPopup(true)}
                            className="text-blue-600 hover:text-blue-800 underline font-semibold"
                          >
                            Termos de Uso e Política de Privacidade
                          </button>{" "}
                          *
                        </Label>
                        <p className="text-xs text-gray-600 mt-1">
                          Ao marcar esta opção, você confirma que leu e concorda com nossos termos e políticas de
                          privacidade, incluindo o tratamento de seus dados pessoais conforme a LGPD.
                        </p>
                      </div>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={formLoading || !legalAccepted}
                    className={`w-full py-6 text-xl font-semibold shadow-xl hover:shadow-2xl transition-all duration-500 rounded-2xl group relative overflow-hidden ${
                      !legalAccepted ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    style={{
                      backgroundColor: legalAccepted ? page.cores.botao : "#9CA3AF",
                      borderColor: legalAccepted ? page.cores.botao : "#9CA3AF",
                      color: "#ffffff",
                    }}
                  >
                    <span className="relative z-10 flex items-center justify-center">
                      {formLoading ? (
                        <>
                          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                          Enviando...
                        </>
                      ) : !legalAccepted ? (
                        "Aceite os termos para continuar"
                      ) : (
                        <>
                          {page.botaoTexto}
                          <CheckCircle className="ml-3 h-6 w-6 group-hover:scale-110 transition-transform duration-300" />
                        </>
                      )}
                    </span>
                    <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </Button>

                  <p className="text-center text-sm opacity-70 mt-4">
                    * Campos obrigatórios. Suas informações estão seguras conosco e protegidas pela LGPD.
                  </p>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-gray-200/20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="p-2 rounded-xl backdrop-blur-sm" style={{ backgroundColor: `${page.cores.primaria}20` }}>
              <Heart className="h-6 w-6" style={{ color: page.cores.primaria }} />
            </div>
            <span className="font-bold text-xl" style={{ color: page.cores.texto }}>
              Projeto Metanoia
            </span>
          </div>
          <p className="opacity-70 mb-4">Transformando vidas através da educação, esperança e oportunidades.</p>
          <div className="flex justify-center space-x-6 text-sm opacity-60 mb-4">
            <button onClick={() => setShowLegalPopup(true)} className="hover:opacity-80 transition-opacity underline">
              Termos de Uso
            </button>
            <button onClick={() => setShowLegalPopup(true)} className="hover:opacity-80 transition-opacity underline">
              Política de Privacidade
            </button>
          </div>
          <p className="text-sm opacity-50">© 2024 Projeto Metanoia. Todos os direitos reservados.</p>
        </div>
      </footer>

      {/* Legal Popup */}
      <LegalPopup isOpen={showLegalPopup} onClose={() => setShowLegalPopup(false)} onAccept={handleLegalAccept} />
    </div>
  )
}
