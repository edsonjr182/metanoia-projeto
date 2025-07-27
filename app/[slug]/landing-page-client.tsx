"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Star, Play, CheckCircle, Users, Award, TrendingUp } from "lucide-react"
import { db } from "@/lib/firebase"
import { doc, updateDoc, arrayUnion, increment } from "firebase/firestore"

interface LandingPageSection {
  id: string
  type: "hero" | "about" | "benefits" | "testimonials" | "cta" | "custom"
  title: string
  content: string
  videoUrl?: string
  benefits?: string[]
  testimonials?: Array<{
    name: string
    text: string
    rating: number
  }>
  customHtml?: string
  order: number
}

interface LandingPageData {
  id: string
  title: string
  slug: string
  description: string
  primaryColor: string
  secondaryColor: string
  sections: LandingPageSection[]
  formFields: string[]
  thankYouMessage: string
  isActive: boolean
}

interface LandingPageClientProps {
  landingPage: LandingPageData
}

export default function LandingPageClient({ landingPage }: LandingPageClientProps) {
  const [formData, setFormData] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [showVideo, setShowVideo] = useState(false)

  useEffect(() => {
    // Incrementar visualizações
    const incrementViews = async () => {
      try {
        await updateDoc(doc(db, "landingPages", landingPage.id), {
          views: increment(1),
        })
      } catch (error) {
        console.error("Erro ao incrementar visualizações:", error)
      }
    }

    incrementViews()
  }, [landingPage.id])

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const leadData = {
        ...formData,
        timestamp: new Date(),
        source: landingPage.slug,
      }

      await updateDoc(doc(db, "landingPages", landingPage.id), {
        leads: arrayUnion(leadData),
      })

      setIsSubmitted(true)
      setFormData({})
    } catch (error) {
      console.error("Erro ao enviar formulário:", error)
      alert("Erro ao enviar formulário. Tente novamente.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const getVideoEmbedUrl = (url: string) => {
    if (url.includes("youtube.com") || url.includes("youtu.be")) {
      const videoId = url.includes("youtu.be") ? url.split("/").pop()?.split("?")[0] : url.split("v=")[1]?.split("&")[0]
      return `https://www.youtube.com/embed/${videoId}`
    }
    if (url.includes("vimeo.com")) {
      const videoId = url.split("/").pop()
      return `https://player.vimeo.com/video/${videoId}`
    }
    return url
  }

  const renderSection = (section: LandingPageSection) => {
    const sectionStyle = {
      "--primary-color": landingPage.primaryColor,
      "--secondary-color": landingPage.secondaryColor,
    } as React.CSSProperties

    switch (section.type) {
      case "hero":
        return (
          <section
            key={section.id}
            className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4"
            style={sectionStyle}
          >
            <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div className="space-y-4">
                  <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">{section.title}</h1>
                  <p className="text-xl text-gray-600 leading-relaxed">{section.content}</p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    size="lg"
                    className="text-lg px-8 py-4"
                    style={{ backgroundColor: landingPage.primaryColor }}
                    onClick={() => document.getElementById("cta-form")?.scrollIntoView({ behavior: "smooth" })}
                  >
                    Começar Agora
                  </Button>
                  {section.videoUrl && (
                    <Button
                      variant="outline"
                      size="lg"
                      className="text-lg px-8 py-4 bg-transparent"
                      onClick={() => setShowVideo(true)}
                    >
                      <Play className="w-5 h-5 mr-2" />
                      Assistir Vídeo
                    </Button>
                  )}
                </div>
              </div>

              <div className="relative">
                {section.videoUrl && showVideo ? (
                  <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl">
                    <iframe src={getVideoEmbedUrl(section.videoUrl)} className="w-full h-full" allowFullScreen />
                  </div>
                ) : (
                  <div className="aspect-video bg-gradient-to-br from-gray-200 to-gray-300 rounded-2xl shadow-2xl flex items-center justify-center">
                    {section.videoUrl ? (
                      <Button
                        size="lg"
                        onClick={() => setShowVideo(true)}
                        className="bg-white text-gray-900 hover:bg-gray-100"
                      >
                        <Play className="w-8 h-8 mr-2" />
                        Reproduzir Vídeo
                      </Button>
                    ) : (
                      <div className="text-center text-gray-500">
                        <div className="w-24 h-24 mx-auto mb-4 bg-gray-400 rounded-full flex items-center justify-center">
                          <Users className="w-12 h-12" />
                        </div>
                        <p>Imagem do Hero</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </section>
        )

      case "about":
        return (
          <section key={section.id} className="py-20 px-4 bg-white">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">{section.title}</h2>
              <div className="text-lg text-gray-600 leading-relaxed space-y-4">
                {section.content.split("\n").map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>
          </section>
        )

      case "benefits":
        const benefits = section.benefits || section.content.split("\n").filter((b) => b.trim())
        return (
          <section key={section.id} className="py-20 px-4 bg-gray-50">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">{section.title}</h2>
                <p className="text-lg text-gray-600">{section.content}</p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {benefits.map((benefit, index) => (
                  <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                    <CardContent className="p-8 text-center space-y-4">
                      <div
                        className="w-16 h-16 mx-auto rounded-full flex items-center justify-center text-white"
                        style={{ backgroundColor: landingPage.primaryColor }}
                      >
                        {index === 0 && <CheckCircle className="w-8 h-8" />}
                        {index === 1 && <Award className="w-8 h-8" />}
                        {index === 2 && <TrendingUp className="w-8 h-8" />}
                        {index > 2 && <Star className="w-8 h-8" />}
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900">{benefit.split(":")[0]}</h3>
                      <p className="text-gray-600">{benefit.split(":")[1] || benefit}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )

      case "testimonials":
        const testimonials = section.testimonials || [{ name: "Cliente Satisfeito", text: section.content, rating: 5 }]
        return (
          <section key={section.id} className="py-20 px-4 bg-white">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">{section.title}</h2>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {testimonials.map((testimonial, index) => (
                  <Card key={index} className="border-0 shadow-lg">
                    <CardContent className="p-8 space-y-4">
                      <div className="flex space-x-1">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <p className="text-gray-600 italic">"{testimonial.text}"</p>
                      <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )

      case "cta":
        return (
          <section
            key={section.id}
            id="cta-form"
            className="py-20 px-4"
            style={{ backgroundColor: landingPage.primaryColor }}
          >
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-2xl shadow-2xl p-8 lg:p-12">
                <div className="text-center mb-8">
                  <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">{section.title}</h2>
                  <p className="text-lg text-gray-600">{section.content}</p>
                </div>

                {isSubmitted ? (
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">Obrigado!</h3>
                    <p className="text-gray-600">{landingPage.thankYouMessage}</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      {landingPage.formFields.includes("name") && (
                        <div>
                          <Input
                            placeholder="Seu nome completo"
                            value={formData.name || ""}
                            onChange={(e) => handleInputChange("name", e.target.value)}
                            required
                            className="h-12"
                          />
                        </div>
                      )}

                      {landingPage.formFields.includes("email") && (
                        <div>
                          <Input
                            type="email"
                            placeholder="Seu melhor email"
                            value={formData.email || ""}
                            onChange={(e) => handleInputChange("email", e.target.value)}
                            required
                            className="h-12"
                          />
                        </div>
                      )}

                      {landingPage.formFields.includes("phone") && (
                        <div>
                          <Input
                            type="tel"
                            placeholder="Seu telefone"
                            value={formData.phone || ""}
                            onChange={(e) => handleInputChange("phone", e.target.value)}
                            className="h-12"
                          />
                        </div>
                      )}
                    </div>

                    {landingPage.formFields.includes("message") && (
                      <div>
                        <Textarea
                          placeholder="Sua mensagem (opcional)"
                          value={formData.message || ""}
                          onChange={(e) => handleInputChange("message", e.target.value)}
                          rows={4}
                        />
                      </div>
                    )}

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full h-14 text-lg font-semibold"
                      style={{ backgroundColor: landingPage.primaryColor }}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Enviando..." : "Quero Participar Agora!"}
                    </Button>
                  </form>
                )}
              </div>
            </div>
          </section>
        )

      case "custom":
        return (
          <section key={section.id} className="py-20 px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">{section.title}</h2>
              </div>
              <div
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: section.customHtml || section.content }}
              />
            </div>
          </section>
        )

      default:
        return null
    }
  }

  const sortedSections = [...landingPage.sections].sort((a, b) => a.order - b.order)

  return (
    <div className="min-h-screen">
      {/* Botão flutuante de CTA */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          size="lg"
          className="rounded-full shadow-lg hover:shadow-xl transition-shadow"
          style={{ backgroundColor: landingPage.primaryColor }}
          onClick={() => document.getElementById("cta-form")?.scrollIntoView({ behavior: "smooth" })}
        >
          Participar Agora
        </Button>
      </div>

      {/* Renderizar seções */}
      {sortedSections.map(renderSection)}
    </div>
  )
}
