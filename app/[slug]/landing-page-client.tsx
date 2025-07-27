"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle, Star, Play, Users, Heart, ArrowRight, Check } from "lucide-react"
import { collection, addDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"

interface LandingPageSection {
  id: string
  type: "hero" | "about" | "benefits" | "testimonials" | "cta" | "custom"
  title: string
  content: string
  videoUrl?: string
  imageUrl?: string
  benefits?: string[]
  testimonials?: Array<{
    name: string
    text: string
    rating: number
    image?: string
  }>
  customHtml?: string
  backgroundColor?: string
  textColor?: string
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
  formFields: Array<{
    name: string
    label: string
    type: string
    required: boolean
  }>
  thankYouMessage: string
  active: boolean
}

interface LandingPageClientProps {
  landingPage: LandingPageData
}

export default function LandingPageClient({ landingPage }: LandingPageClientProps) {
  const [formData, setFormData] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    // Aplicar cores personalizadas
    document.documentElement.style.setProperty("--primary-color", landingPage.primaryColor)
    document.documentElement.style.setProperty("--secondary-color", landingPage.secondaryColor)
  }, [landingPage.primaryColor, landingPage.secondaryColor])

  const handleInputChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      // Validar campos obrigatórios
      for (const field of landingPage.formFields) {
        if (field.required && !formData[field.name]) {
          setError(`O campo ${field.label} é obrigatório`)
          setLoading(false)
          return
        }
      }

      // Salvar lead no Firebase
      await addDoc(collection(db, "leads"), {
        landingPageId: landingPage.id,
        landingPageTitle: landingPage.title,
        data: formData,
        createdAt: new Date(),
      })

      setSubmitted(true)
    } catch (error) {
      console.error("Erro ao enviar formulário:", error)
      setError("Erro ao enviar formulário. Tente novamente.")
    } finally {
      setLoading(false)
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
    switch (section.type) {
      case "hero":
        return (
          <section
            key={section.id}
            className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 overflow-hidden"
            style={{
              background: `linear-gradient(135deg, ${landingPage.primaryColor}15, ${landingPage.secondaryColor}15)`,
            }}
          >
            <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
            <div className="relative z-10 max-w-6xl mx-auto px-4 py-20">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="text-center lg:text-left">
                  <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">{section.title}</h1>
                  <p className="text-xl text-gray-600 mb-8 leading-relaxed">{section.content}</p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                    <Button
                      size="lg"
                      className="text-lg px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                      style={{ backgroundColor: landingPage.primaryColor }}
                      onClick={() => document.getElementById("form-section")?.scrollIntoView({ behavior: "smooth" })}
                    >
                      Quero Participar
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                    {section.videoUrl && (
                      <Button
                        variant="outline"
                        size="lg"
                        className="text-lg px-8 py-4 rounded-xl border-2 bg-transparent"
                        onClick={() => document.getElementById("video-modal")?.click()}
                      >
                        <Play className="mr-2 h-5 w-5" />
                        Assistir Vídeo
                      </Button>
                    )}
                  </div>
                </div>

                {section.videoUrl && (
                  <div className="relative">
                    <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl">
                      <iframe
                        src={getVideoEmbedUrl(section.videoUrl)}
                        className="w-full h-full"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>
        )

      case "about":
        return (
          <section key={section.id} className="py-20 bg-white">
            <div className="max-w-4xl mx-auto px-4 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">{section.title}</h2>
              <p className="text-lg text-gray-600 leading-relaxed">{section.content}</p>
            </div>
          </section>
        )

      case "benefits":
        return (
          <section key={section.id} className="py-20 bg-gray-50">
            <div className="max-w-6xl mx-auto px-4">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">{section.title}</h2>
                <p className="text-lg text-gray-600">{section.content}</p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {section.benefits?.map((benefit, index) => (
                  <Card key={index} className="p-6 hover:shadow-lg transition-shadow duration-300">
                    <CardContent className="p-0">
                      <div className="flex items-start space-x-4">
                        <div
                          className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center"
                          style={{ backgroundColor: `${landingPage.primaryColor}20` }}
                        >
                          <Check className="h-6 w-6" style={{ color: landingPage.primaryColor }} />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-2">{benefit}</h3>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )

      case "testimonials":
        return (
          <section key={section.id} className="py-20 bg-white">
            <div className="max-w-6xl mx-auto px-4">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">{section.title}</h2>
                <p className="text-lg text-gray-600">{section.content}</p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {section.testimonials?.map((testimonial, index) => (
                  <Card key={index} className="p-6">
                    <CardContent className="p-0">
                      <div className="flex items-center mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-5 w-5 ${
                              i < testimonial.rating ? "text-yellow-400 fill-current" : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-gray-600 mb-4 italic">"{testimonial.text}"</p>
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center mr-3">
                          <Users className="h-5 w-5 text-gray-600" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{testimonial.name}</p>
                        </div>
                      </div>
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
            id="form-section"
            className="py-20"
            style={{
              background: `linear-gradient(135deg, ${landingPage.primaryColor}, ${landingPage.secondaryColor})`,
            }}
          >
            <div className="max-w-4xl mx-auto px-4">
              <div className="text-center text-white mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">{section.title}</h2>
                <p className="text-xl opacity-90">{section.content}</p>
              </div>

              {submitted ? (
                <Card className="max-w-md mx-auto">
                  <CardContent className="p-8 text-center">
                    <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Obrigado!</h3>
                    <p className="text-gray-600">{landingPage.thankYouMessage}</p>
                  </CardContent>
                </Card>
              ) : (
                <Card className="max-w-md mx-auto">
                  <CardContent className="p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                      {landingPage.formFields.map((field) => (
                        <div key={field.name}>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            {field.label}
                            {field.required && <span className="text-red-500 ml-1">*</span>}
                          </label>
                          {field.type === "textarea" ? (
                            <Textarea
                              value={formData[field.name] || ""}
                              onChange={(e) => handleInputChange(field.name, e.target.value)}
                              required={field.required}
                              className="w-full"
                              rows={4}
                            />
                          ) : (
                            <Input
                              type={field.type}
                              value={formData[field.name] || ""}
                              onChange={(e) => handleInputChange(field.name, e.target.value)}
                              required={field.required}
                              className="w-full"
                            />
                          )}
                        </div>
                      ))}

                      {error && (
                        <Alert variant="destructive">
                          <AlertDescription>{error}</AlertDescription>
                        </Alert>
                      )}

                      <Button
                        type="submit"
                        disabled={loading}
                        className="w-full text-lg py-3 rounded-xl"
                        style={{ backgroundColor: landingPage.primaryColor }}
                      >
                        {loading ? "Enviando..." : "Enviar Agora"}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              )}
            </div>
          </section>
        )

      case "custom":
        return (
          <section key={section.id} className="py-20 bg-gray-50">
            <div className="max-w-6xl mx-auto px-4">
              <div className="text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">{section.title}</h2>
                <div className="text-lg text-gray-600 leading-relaxed">
                  {section.content.split("\n").map((paragraph, index) => (
                    <p key={index} className="mb-4">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen">
      <style jsx global>{`
        :root {
          --primary-color: ${landingPage.primaryColor};
          --secondary-color: ${landingPage.secondaryColor};
        }
        .bg-grid-pattern {
          background-image: radial-gradient(circle, #00000010 1px, transparent 1px);
          background-size: 20px 20px;
        }
      `}</style>

      {landingPage.sections.sort((a, b) => a.order - b.order).map((section) => renderSection(section))}

      {/* Floating CTA Button */}
      {!submitted && (
        <div className="fixed bottom-6 right-6 z-50">
          <Button
            size="lg"
            className="rounded-full shadow-lg hover:shadow-xl transition-all duration-300 px-6 py-3"
            style={{ backgroundColor: landingPage.primaryColor }}
            onClick={() => document.getElementById("form-section")?.scrollIntoView({ behavior: "smooth" })}
          >
            <Heart className="mr-2 h-5 w-5" />
            Participar
          </Button>
        </div>
      )}
    </div>
  )
}
