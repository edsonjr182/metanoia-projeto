"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Clock, Users } from "lucide-react"

interface LandingPageData {
  id: string
  titulo: string
  descricao: string
  dataEvento: string
  horario: string
  local: string
  capacidade: number
  inscricoes: number
  ativo: boolean
  campos: Array<{
    id: string
    nome: string
    tipo: "texto" | "email" | "telefone" | "textarea"
    obrigatorio: boolean
    placeholder: string
  }>
}

interface LandingPageClientProps {
  landingPage: LandingPageData
}

export default function LandingPageClient({ landingPage }: LandingPageClientProps) {
  const [formData, setFormData] = useState<Record<string, string>>({})
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validar campos obrigatórios
    const camposObrigatorios = landingPage.campos.filter((campo) => campo.obrigatorio)
    for (const campo of camposObrigatorios) {
      if (!formData[campo.id] || formData[campo.id].trim() === "") {
        alert(`O campo ${campo.nome} é obrigatório`)
        return
      }
    }

    setSubmitting(true)

    try {
      const { collection, addDoc, doc, updateDoc, increment } = await import("firebase/firestore")
      const { db } = await import("@/lib/firebase")

      // Salvar inscrição
      await addDoc(collection(db, "inscricoes"), {
        landingPageId: landingPage.id,
        landingPageTitulo: landingPage.titulo,
        dados: formData,
        dataInscricao: new Date().toISOString(),
        status: "ativa",
      })

      // Incrementar contador de inscrições
      const landingPageRef = doc(db, "landingPages", landingPage.id)
      await updateDoc(landingPageRef, {
        inscricoes: increment(1),
      })

      alert("Inscrição realizada com sucesso!")
      setFormData({})
    } catch (error) {
      console.error("Erro ao enviar inscrição:", error)
      alert("Erro ao realizar inscrição. Tente novamente.")
    } finally {
      setSubmitting(false)
    }
  }

  const handleInputChange = (fieldId: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [fieldId]: value,
    }))
  }

  const vagasDisponiveis = landingPage.capacidade - landingPage.inscricoes

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{landingPage.titulo}</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">{landingPage.descricao}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Informações do Evento */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Informações do Evento
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <span>{new Date(landingPage.dataEvento).toLocaleDateString("pt-BR")}</span>
                </div>

                <div className="flex items-center gap-3">
                  <Clock className="h-4 w-4 text-gray-500" />
                  <span>{landingPage.horario}</span>
                </div>

                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-gray-500" />
                  <span>{landingPage.local}</span>
                </div>

                <div className="flex items-center gap-3">
                  <Users className="h-4 w-4 text-gray-500" />
                  <span>
                    {landingPage.inscricoes} / {landingPage.capacidade} inscritos
                  </span>
                </div>

                <div className="pt-4">
                  {vagasDisponiveis > 0 ? (
                    <Badge variant="default" className="bg-green-100 text-green-800">
                      {vagasDisponiveis} vagas disponíveis
                    </Badge>
                  ) : (
                    <Badge variant="destructive">Esgotado</Badge>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Formulário de Inscrição */}
            <Card>
              <CardHeader>
                <CardTitle>Inscreva-se</CardTitle>
                <CardDescription>Preencha os dados abaixo para se inscrever no evento</CardDescription>
              </CardHeader>
              <CardContent>
                {vagasDisponiveis > 0 ? (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {landingPage.campos.map((campo) => (
                      <div key={campo.id}>
                        <Label htmlFor={campo.id}>
                          {campo.nome}
                          {campo.obrigatorio && <span className="text-red-500 ml-1">*</span>}
                        </Label>

                        {campo.tipo === "textarea" ? (
                          <Textarea
                            id={campo.id}
                            placeholder={campo.placeholder}
                            value={formData[campo.id] || ""}
                            onChange={(e) => handleInputChange(campo.id, e.target.value)}
                            required={campo.obrigatorio}
                          />
                        ) : (
                          <Input
                            id={campo.id}
                            type={campo.tipo === "email" ? "email" : campo.tipo === "telefone" ? "tel" : "text"}
                            placeholder={campo.placeholder}
                            value={formData[campo.id] || ""}
                            onChange={(e) => handleInputChange(campo.id, e.target.value)}
                            required={campo.obrigatorio}
                          />
                        )}
                      </div>
                    ))}

                    <Button type="submit" className="w-full" disabled={submitting}>
                      {submitting ? "Enviando..." : "Realizar Inscrição"}
                    </Button>
                  </form>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-600 mb-4">Infelizmente as vagas para este evento estão esgotadas.</p>
                    <p className="text-sm text-gray-500">Entre em contato conosco para mais informações.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
