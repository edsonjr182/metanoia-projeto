"use client"
import { useState } from "react"
import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, CheckCircle, User, Phone, Mail, Calendar } from "lucide-react"

interface LandingPageData {
  id: string
  title: string
  slug: string
  videoUrl: string
  description: string
  createdAt: any
}

interface LandingPageClientProps {
  landingPage: LandingPageData
}

export default function LandingPageClient({ landingPage }: LandingPageClientProps) {
  const [formData, setFormData] = useState({
    name: "",
    whatsapp: "",
    email: "",
    age: "",
  })
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Importação dinâmica do Firebase apenas quando necessário
      const { db } = await import("@/lib/firebase")
      const { collection, addDoc } = await import("firebase/firestore")

      await addDoc(collection(db, "landingPageSubmissions"), {
        ...formData,
        landingPageId: landingPage.id,
        createdAt: new Date(),
      })

      setSubmitted(true)
      alert("Inscrição realizada com sucesso!")
    } catch (error) {
      console.error("Erro ao enviar inscrição:", error)
      alert("Erro ao enviar inscrição. Tente novamente.")
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-orange-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md shadow-soft border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-center space-x-3">
            <div className="relative">
              <Heart className="h-8 w-8 text-orange-500" />
              <div className="absolute inset-0 bg-orange-400 rounded-full blur-lg opacity-20"></div>
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
              Projeto Metanoia
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Title */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{landingPage.title}</h1>
        </div>

        {/* Video Section */}
        <div className="mb-12">
          <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
            <iframe
              src={landingPage.videoUrl}
              className="absolute top-0 left-0 w-full h-full rounded-2xl shadow-2xl"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>

        {/* Description */}
        <div className="mb-12">
          <Card className="border-0 shadow-soft bg-white/80 backdrop-blur-sm">
            <CardContent className="p-8">
              <div className="prose prose-lg max-w-none text-gray-700">
                {landingPage.description.split("\n").map((paragraph, index) => (
                  <p key={index} className="mb-4 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Form Section */}
        <div className="max-w-2xl mx-auto">
          <Card className="border-0 shadow-2xl bg-white/90 backdrop-blur-sm">
            <CardHeader className="text-center pb-6">
              <div className="mx-auto w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center mb-4">
                {submitted ? <CheckCircle className="h-8 w-8 text-white" /> : <User className="h-8 w-8 text-white" />}
              </div>
              <CardTitle className="text-2xl font-bold text-gray-900">
                {submitted ? "Inscrição Confirmada!" : "Faça sua Inscrição"}
              </CardTitle>
              {!submitted && <p className="text-gray-600 mt-2">Preencha seus dados para participar</p>}
            </CardHeader>

            <CardContent className="px-8 pb-8">
              {submitted ? (
                <div className="text-center space-y-4">
                  <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                    <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-green-800 mb-2">Obrigado pela sua inscrição!</h3>
                    <p className="text-green-700">Recebemos seus dados com sucesso. Em breve entraremos em contato.</p>
                  </div>

                  <div className="text-sm text-gray-600">
                    <p>
                      <strong>Nome:</strong> {formData.name}
                    </p>
                    <p>
                      <strong>WhatsApp:</strong> {formData.whatsapp}
                    </p>
                    <p>
                      <strong>Email:</strong> {formData.email}
                    </p>
                    <p>
                      <strong>Idade:</strong> {formData.age} anos
                    </p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="name" className="flex items-center space-x-2">
                        <User className="h-4 w-4 text-gray-500" />
                        <span>Nome Completo</span>
                      </Label>
                      <Input
                        id="name"
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        placeholder="Seu nome completo"
                        required
                        className="mt-2"
                      />
                    </div>

                    <div>
                      <Label htmlFor="age" className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        <span>Idade</span>
                      </Label>
                      <Input
                        id="age"
                        type="number"
                        value={formData.age}
                        onChange={(e) => handleInputChange("age", e.target.value)}
                        placeholder="Sua idade"
                        min="1"
                        max="120"
                        required
                        className="mt-2"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="whatsapp" className="flex items-center space-x-2">
                      <Phone className="h-4 w-4 text-gray-500" />
                      <span>WhatsApp</span>
                    </Label>
                    <Input
                      id="whatsapp"
                      type="tel"
                      value={formData.whatsapp}
                      onChange={(e) => handleInputChange("whatsapp", e.target.value)}
                      placeholder="(11) 99999-9999"
                      required
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email" className="flex items-center space-x-2">
                      <Mail className="h-4 w-4 text-gray-500" />
                      <span>Email</span>
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      placeholder="seu@email.com"
                      required
                      className="mt-2"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-3 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    {loading ? "Enviando..." : "Confirmar Inscrição"}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
