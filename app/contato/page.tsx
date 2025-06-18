"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Mail, MapPin, Send, MessageCircle } from "lucide-react"
import { collection, addDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import TopBanner from "@/components/top-banner"
import { useConfiguracoes } from "@/hooks/use-configuracoes"

export default function ContatoPage() {
  const { configuracoes, loading: configLoading } = useConfiguracoes()
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    assunto: "",
    mensagem: "",
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      await addDoc(collection(db, "contatos"), {
        ...formData,
        data: new Date().toISOString(),
        status: "novo",
      })

      setSuccess(true)
      setFormData({
        nome: "",
        email: "",
        telefone: "",
        assunto: "",
        mensagem: "",
      })
    } catch (error) {
      console.error("Erro ao enviar mensagem:", error)
      alert("Erro ao enviar mensagem. Tente novamente.")
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const formatWhatsApp = (telefone: string) => {
    // Remove caracteres especiais e espaços
    const cleanPhone = telefone.replace(/\D/g, "")
    return `https://wa.me/55${cleanPhone}`
  }

  return (
    <div className="min-h-screen">
      <TopBanner />
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-40">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Entre em Contato</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Tem alguma dúvida, sugestão ou quer ser nosso parceiro? Estamos aqui para ouvir você e construir juntos um
            futuro melhor.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Informações de Contato */}
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Fale Conosco</h2>

            <div className="space-y-6">
              {configLoading ? (
                // Loading skeleton
                <div className="space-y-6">
                  {[1, 2, 3].map((i) => (
                    <Card key={i}>
                      <CardContent className="p-6">
                        <div className="flex items-center space-x-4">
                          <div className="w-8 h-8 bg-gray-200 rounded animate-pulse"></div>
                          <div className="flex-1">
                            <div className="h-4 bg-gray-200 rounded w-1/4 mb-2 animate-pulse"></div>
                            <div className="h-3 bg-gray-200 rounded w-1/2 animate-pulse"></div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <>
                  <Card className="hover:shadow-lg transition-shadow duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4">
                        <div className="p-3 rounded-2xl bg-orange-100 group-hover:bg-orange-200 transition-colors duration-200">
                          <Mail className="h-8 w-8 text-orange-500" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">Email</h3>
                          <a
                            href={`mailto:${configuracoes.contato.email}`}
                            className="text-gray-600 hover:text-orange-600 transition-colors duration-200 text-lg"
                          >
                            {configuracoes.contato.email}
                          </a>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="hover:shadow-lg transition-shadow duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4">
                        <div className="p-3 rounded-2xl bg-green-100 group-hover:bg-green-200 transition-colors duration-200">
                          <MessageCircle className="h-8 w-8 text-green-500" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">WhatsApp</h3>
                          <a
                            href={formatWhatsApp(configuracoes.contato.telefone)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-600 hover:text-green-600 transition-colors duration-200 text-lg"
                          >
                            {configuracoes.contato.telefone}
                          </a>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="hover:shadow-lg transition-shadow duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4">
                        <div className="p-3 rounded-2xl bg-blue-100 group-hover:bg-blue-200 transition-colors duration-200">
                          <MapPin className="h-8 w-8 text-blue-500" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">Localização</h3>
                          <p className="text-gray-600 text-lg">{configuracoes.contato.localizacao}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </>
              )}
            </div>

            <div className="mt-8">
              <h3 className="text-xl font-semibold text-slate-900 mb-4">Como Você Pode Ajudar</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Seja um voluntário em nossas atividades</li>
                <li>• Ofereça palestras ou workshops</li>
                <li>• Divulgue nosso trabalho em suas redes</li>
                <li>• Conecte-nos com outras organizações</li>
                <li>• Contribua com recursos ou materiais</li>
              </ul>
            </div>
          </div>

          {/* Formulário de Contato */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Envie sua Mensagem</CardTitle>
                <CardDescription>
                  Preencha o formulário abaixo e entraremos em contato o mais breve possível.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {success ? (
                  <div className="text-center py-8">
                    <div className="bg-green-100 text-green-800 p-4 rounded-lg mb-4">
                      <h3 className="font-semibold mb-2">Mensagem Enviada!</h3>
                      <p>Obrigado pelo contato. Responderemos em breve.</p>
                    </div>
                    <Button onClick={() => setSuccess(false)} variant="outline">
                      Enviar Nova Mensagem
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="nome">Nome *</Label>
                        <Input id="nome" name="nome" value={formData.nome} onChange={handleChange} required />
                      </div>
                      <div>
                        <Label htmlFor="telefone">Telefone</Label>
                        <Input id="telefone" name="telefone" value={formData.telefone} onChange={handleChange} />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="assunto">Assunto *</Label>
                      <Input id="assunto" name="assunto" value={formData.assunto} onChange={handleChange} required />
                    </div>

                    <div>
                      <Label htmlFor="mensagem">Mensagem *</Label>
                      <Textarea
                        id="mensagem"
                        name="mensagem"
                        rows={5}
                        value={formData.mensagem}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <Button type="submit" className="w-full" disabled={loading}>
                      {loading ? (
                        "Enviando..."
                      ) : (
                        <>
                          Enviar Mensagem
                          <Send className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
