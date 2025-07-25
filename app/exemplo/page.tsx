"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Calendar,
  Clock,
  Users,
  CheckCircle,
  Star,
  Heart,
  ArrowRight,
  Lightbulb,
  Target,
  TrendingUp,
  User,
} from "lucide-react"
import { useState } from "react"
import { collection, addDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"

export default function ExemploPage() {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    mensagem: "",
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      await addDoc(collection(db, "inscricoes-palestras"), {
        ...formData,
        palestra: "Transforme Sua Mentalidade",
        data: new Date().toISOString(),
        status: "inscrito",
      })

      setSuccess(true)
      setFormData({
        nome: "",
        email: "",
        telefone: "",
        mensagem: "",
      })
    } catch (error) {
      console.error("Erro ao enviar inscrição:", error)
      alert("Erro ao enviar inscrição. Tente novamente.")
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-mesh-gradient opacity-30"></div>
      <div className="absolute inset-0 bg-dot-pattern opacity-20"></div>

      {/* Floating elements */}
      <div className="absolute top-20 left-20 w-32 h-32 bg-orange-400/20 rounded-full blur-3xl animate-float"></div>
      <div
        className="absolute bottom-20 right-20 w-40 h-40 bg-emerald-400/20 rounded-full blur-3xl animate-float"
        style={{ animationDelay: "2s" }}
      ></div>
      <div
        className="absolute top-1/2 left-10 w-24 h-24 bg-blue-400/15 rounded-full blur-3xl animate-float"
        style={{ animationDelay: "4s" }}
      ></div>

      <div className="relative z-10">
        {/* Header */}
        <header className="py-6 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-orange-500/20 rounded-xl backdrop-blur-sm">
                <Heart className="h-8 w-8 text-orange-400" />
              </div>
              <div>
                <span className="font-bold text-xl">Projeto Metanoia</span>
                <p className="text-xs text-gray-400">Transformando Vidas</p>
              </div>
            </div>
            <Badge className="px-4 py-2 bg-orange-500/20 text-orange-300 border-orange-400/30">
              <Calendar className="mr-2 h-4 w-4" />
              Evento Especial
            </Badge>
          </div>
        </header>

        {/* Hero Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-8 px-6 py-3 bg-gradient-to-r from-orange-500/20 to-orange-600/20 text-orange-300 border border-orange-400/30 backdrop-blur-xl rounded-full text-sm font-medium">
              <Lightbulb className="mr-2 h-4 w-4" />
              Palestra Transformadora
            </Badge>

            <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
              Transforme Sua{" "}
              <span className="relative inline-block">
                <span className="text-gradient-orange">Mentalidade</span>
                <div className="absolute -inset-2 bg-gradient-to-r from-orange-400/30 to-orange-600/30 rounded-2xl blur-xl opacity-50 animate-pulse-slow"></div>
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 mb-12 leading-relaxed max-w-3xl mx-auto">
              Descubra como uma mudança de pensamento pode revolucionar sua vida e abrir portas para um futuro de
              <span className="text-white font-semibold"> sucesso e realização pessoal</span>.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="flex items-center justify-center space-x-3 p-4 bg-white/5 rounded-2xl backdrop-blur-sm border border-white/10">
                <Calendar className="h-6 w-6 text-orange-400" />
                <div className="text-left">
                  <p className="text-sm text-gray-400">Data</p>
                  <p className="font-semibold">15 de Fevereiro</p>
                </div>
              </div>
              <div className="flex items-center justify-center space-x-3 p-4 bg-white/5 rounded-2xl backdrop-blur-sm border border-white/10">
                <Clock className="h-6 w-6 text-emerald-400" />
                <div className="text-left">
                  <p className="text-sm text-gray-400">Horário</p>
                  <p className="font-semibold">19:00 - 21:00</p>
                </div>
              </div>
              <div className="flex items-center justify-center space-x-3 p-4 bg-white/5 rounded-2xl backdrop-blur-sm border border-white/10">
                <Users className="h-6 w-6 text-blue-400" />
                <div className="text-left">
                  <p className="text-sm text-gray-400">Vagas</p>
                  <p className="font-semibold">50 pessoas</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <Badge className="mb-6 px-4 py-2 bg-emerald-500/20 text-emerald-300 border-emerald-400/30">
                  <Target className="mr-2 h-4 w-4" />
                  Sobre a Palestra
                </Badge>
                <h2 className="text-4xl font-bold mb-8 leading-tight">
                  Uma Jornada de <span className="text-gradient-emerald">Autodescoberta</span>
                </h2>
                <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                  Nesta palestra transformadora, você aprenderá como pequenas mudanças na forma de pensar podem gerar
                  grandes transformações na sua vida. Descubra técnicas práticas para reprogramar sua mente e alcançar
                  seus objetivos.
                </p>

                <div className="space-y-4">
                  {[
                    "Como identificar padrões de pensamento limitantes",
                    "Técnicas para desenvolver uma mentalidade de crescimento",
                    "Estratégias para superar medos e inseguranças",
                    "Ferramentas práticas para manter a motivação",
                  ].map((item, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-emerald-400 flex-shrink-0" />
                      <span className="text-gray-300">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-orange-400/20 to-emerald-400/20 rounded-3xl blur-2xl"></div>
                <Card className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl overflow-hidden">
                  <CardHeader className="text-center pb-8 pt-10">
                    <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-4 mx-auto mb-6">
                      <User className="h-12 w-12 text-white" />
                    </div>
                    <CardTitle className="text-2xl text-white">Palestrante</CardTitle>
                    <CardDescription className="text-gray-300 text-lg">Dr. João Silva</CardDescription>
                  </CardHeader>
                  <CardContent className="px-8 pb-10">
                    <p className="text-gray-300 text-center leading-relaxed">
                      Psicólogo especialista em desenvolvimento pessoal com mais de 15 anos de experiência. Autor de 3
                      livros sobre transformação mental e já impactou mais de 10.000 pessoas.
                    </p>
                    <div className="flex justify-center mt-6">
                      <div className="flex space-x-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} className="h-5 w-5 text-yellow-400 fill-current" />
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Registration Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <Badge className="mb-6 px-6 py-3 bg-blue-500/20 text-blue-300 border-blue-400/30">
                <TrendingUp className="mr-2 h-4 w-4" />
                Inscreva-se Agora
              </Badge>
              <h2 className="text-4xl font-bold mb-6">
                Garanta Sua <span className="text-gradient-blue">Transformação</span>
              </h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                As vagas são limitadas! Preencha o formulário abaixo e reserve seu lugar nesta experiência única.
              </p>
            </div>

            <Card className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl overflow-hidden">
              <CardContent className="p-8">
                {success ? (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle className="h-10 w-10 text-emerald-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">Inscrição Realizada!</h3>
                    <p className="text-gray-300 mb-6">
                      Parabéns! Sua inscrição foi confirmada. Em breve você receberá mais informações por email.
                    </p>
                    <Button
                      onClick={() => setSuccess(false)}
                      variant="outline"
                      className="border-white/30 text-white hover:bg-white/10"
                    >
                      Nova Inscrição
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="nome" className="text-white mb-2 block">
                          Nome Completo *
                        </Label>
                        <Input
                          id="nome"
                          name="nome"
                          value={formData.nome}
                          onChange={handleChange}
                          className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-orange-400"
                          placeholder="Seu nome completo"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="email" className="text-white mb-2 block">
                          Email *
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-orange-400"
                          placeholder="seu@email.com"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="telefone" className="text-white mb-2 block">
                        Telefone
                      </Label>
                      <Input
                        id="telefone"
                        name="telefone"
                        value={formData.telefone}
                        onChange={handleChange}
                        className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-orange-400"
                        placeholder="(11) 99999-9999"
                      />
                    </div>

                    <div>
                      <Label htmlFor="mensagem" className="text-white mb-2 block">
                        O que você espera desta palestra?
                      </Label>
                      <Textarea
                        id="mensagem"
                        name="mensagem"
                        value={formData.mensagem}
                        onChange={handleChange}
                        className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-orange-400"
                        placeholder="Conte-nos suas expectativas..."
                        rows={4}
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={loading}
                      className="w-full py-4 text-lg font-semibold bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-xl hover:shadow-glow-orange transition-all duration-500 rounded-2xl group"
                    >
                      {loading ? (
                        "Enviando..."
                      ) : (
                        <>
                          Confirmar Inscrição
                          <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                        </>
                      )}
                    </Button>

                    <p className="text-center text-sm text-gray-400 mt-4">
                      * Campos obrigatórios. Suas informações estão seguras conosco.
                    </p>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-white/10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <div className="p-2 bg-orange-500/20 rounded-xl backdrop-blur-sm">
                <Heart className="h-6 w-6 text-orange-400" />
              </div>
              <span className="font-bold text-xl">Projeto Metanoia</span>
            </div>
            <p className="text-gray-400 mb-4">Transformando vidas através da educação, esperança e oportunidades.</p>
            <p className="text-sm text-gray-500">© 2024 Projeto Metanoia. Todos os direitos reservados.</p>
          </div>
        </footer>
      </div>
    </div>
  )
}
