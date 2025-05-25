"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { Save, Upload, Eye } from "lucide-react"

export default function ContentManagement() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const handleSave = async (section: string) => {
    setIsLoading(true)
    // Simular salvamento
    await new Promise((resolve) => setTimeout(resolve, 1000))

    toast({
      title: "Conteúdo salvo!",
      description: `A seção ${section} foi atualizada com sucesso.`,
    })
    setIsLoading(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gerenciar Conteúdo</h1>
          <p className="text-gray-600">Edite o conteúdo das páginas do site</p>
        </div>
        <Button variant="outline" className="flex items-center gap-2">
          <Eye className="h-4 w-4" />
          Visualizar Site
        </Button>
      </div>

      <Tabs defaultValue="home" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="home">Página Inicial</TabsTrigger>
          <TabsTrigger value="about">Sobre</TabsTrigger>
          <TabsTrigger value="events">Eventos</TabsTrigger>
          <TabsTrigger value="courses">Cursos</TabsTrigger>
          <TabsTrigger value="contact">Contato</TabsTrigger>
        </TabsList>

        <TabsContent value="home">
          <div className="grid gap-6">
            {/* Hero Section */}
            <Card>
              <CardHeader>
                <CardTitle>Seção Principal (Hero)</CardTitle>
                <CardDescription>Edite o conteúdo da seção principal da página inicial</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="hero-title">Título Principal</Label>
                  <Input id="hero-title" defaultValue="Projeto Metanoia" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="hero-subtitle">Subtítulo</Label>
                  <Textarea
                    id="hero-subtitle"
                    defaultValue="Transformando mentalidades e ajudando jovens de periferia a construírem um futuro melhor através de educação, apoio e oportunidades."
                    className="mt-1"
                    rows={3}
                  />
                </div>
                <div>
                  <Label htmlFor="hero-image">Imagem de Fundo</Label>
                  <div className="mt-1 flex items-center gap-2">
                    <Input id="hero-image" type="file" accept="image/*" />
                    <Button variant="outline" size="sm">
                      <Upload className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <Button onClick={() => handleSave("Hero")} disabled={isLoading} className="flex items-center gap-2">
                  <Save className="h-4 w-4" />
                  {isLoading ? "Salvando..." : "Salvar Alterações"}
                </Button>
              </CardContent>
            </Card>

            {/* Mission Section */}
            <Card>
              <CardHeader>
                <CardTitle>Seção Missão</CardTitle>
                <CardDescription>Edite o conteúdo da seção sobre a missão do projeto</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="mission-title">Título da Missão</Label>
                  <Input
                    id="mission-title"
                    defaultValue="Transformando Mentalidades, Construindo Futuros"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="mission-content">Conteúdo da Missão</Label>
                  <Textarea
                    id="mission-content"
                    defaultValue="O Projeto Metanoia nasceu da necessidade de oferecer novas perspectivas para jovens e adolescentes de comunidades periféricas, incentivando-os a sonhar e construir um futuro melhor através de educação, apoio emocional e desenvolvimento de habilidades."
                    className="mt-1"
                    rows={4}
                  />
                </div>
                <Button onClick={() => handleSave("Missão")} disabled={isLoading} className="flex items-center gap-2">
                  <Save className="h-4 w-4" />
                  {isLoading ? "Salvando..." : "Salvar Alterações"}
                </Button>
              </CardContent>
            </Card>

            {/* Statistics */}
            <Card>
              <CardHeader>
                <CardTitle>Estatísticas</CardTitle>
                <CardDescription>Atualize os números do projeto</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-4">
                  <div>
                    <Label htmlFor="stat-youth">Jovens Impactados</Label>
                    <Input id="stat-youth" type="number" defaultValue="500" className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="stat-lectures">Palestras Realizadas</Label>
                    <Input id="stat-lectures" type="number" defaultValue="30" className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="stat-partnerships">Parcerias</Label>
                    <Input id="stat-partnerships" type="number" defaultValue="15" className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="stat-communities">Comunidades</Label>
                    <Input id="stat-communities" type="number" defaultValue="5" className="mt-1" />
                  </div>
                </div>
                <Button
                  onClick={() => handleSave("Estatísticas")}
                  disabled={isLoading}
                  className="mt-4 flex items-center gap-2"
                >
                  <Save className="h-4 w-4" />
                  {isLoading ? "Salvando..." : "Salvar Alterações"}
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="about">
          <Card>
            <CardHeader>
              <CardTitle>Página Sobre</CardTitle>
              <CardDescription>Edite o conteúdo da página sobre o projeto</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="about-history">Nossa História</Label>
                <Textarea
                  id="about-history"
                  defaultValue="O Projeto Metanoia nasceu em 2020, durante a pandemia, quando percebemos que muitos jovens de comunidades periféricas estavam perdendo a esperança no futuro devido às dificuldades socioeconômicas agravadas pela crise."
                  className="mt-1"
                  rows={4}
                />
              </div>
              <div>
                <Label htmlFor="about-mission">Missão</Label>
                <Textarea
                  id="about-mission"
                  defaultValue="Transformar a mentalidade de jovens de periferia, incentivando-os a sonhar e construir um futuro melhor através da educação e do desenvolvimento pessoal."
                  className="mt-1"
                  rows={3}
                />
              </div>
              <div>
                <Label htmlFor="about-vision">Visão</Label>
                <Textarea
                  id="about-vision"
                  defaultValue="Ser referência em projetos de transformação social, criando uma rede de apoio que alcance jovens em todas as comunidades periféricas do Brasil."
                  className="mt-1"
                  rows={3}
                />
              </div>
              <Button onClick={() => handleSave("Sobre")} disabled={isLoading} className="flex items-center gap-2">
                <Save className="h-4 w-4" />
                {isLoading ? "Salvando..." : "Salvar Alterações"}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="events">
          <Card>
            <CardHeader>
              <CardTitle>Gerenciar Eventos</CardTitle>
              <CardDescription>Adicione, edite ou remova eventos e palestras</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Button className="flex items-center gap-2">
                  <Upload className="h-4 w-4" />
                  Adicionar Novo Evento
                </Button>
                <div className="rounded-lg border p-4">
                  <h4 className="font-semibold">Tecnologia como Ferramenta de Transformação</h4>
                  <p className="text-sm text-gray-600">15 de Junho, 2025 • 19:00</p>
                  <div className="mt-2 flex gap-2">
                    <Button size="sm" variant="outline">
                      Editar
                    </Button>
                    <Button size="sm" variant="destructive">
                      Remover
                    </Button>
                  </div>
                </div>
                <div className="rounded-lg border p-4">
                  <h4 className="font-semibold">Educação Financeira para Jovens</h4>
                  <p className="text-sm text-gray-600">22 de Junho, 2025 • 15:00</p>
                  <div className="mt-2 flex gap-2">
                    <Button size="sm" variant="outline">
                      Editar
                    </Button>
                    <Button size="sm" variant="destructive">
                      Remover
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="courses">
          <Card>
            <CardHeader>
              <CardTitle>Gerenciar Cursos</CardTitle>
              <CardDescription>Adicione, edite ou remova informações sobre cursos</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Button className="flex items-center gap-2">
                  <Upload className="h-4 w-4" />
                  Adicionar Novo Curso
                </Button>
                <div className="rounded-lg border p-4">
                  <h4 className="font-semibold">Desenvolvimento Web - SENAI</h4>
                  <p className="text-sm text-gray-600">Duração: 6 meses • Presencial</p>
                  <div className="mt-2 flex gap-2">
                    <Button size="sm" variant="outline">
                      Editar
                    </Button>
                    <Button size="sm" variant="destructive">
                      Remover
                    </Button>
                  </div>
                </div>
                <div className="rounded-lg border p-4">
                  <h4 className="font-semibold">Técnico em Administração - ETEC</h4>
                  <p className="text-sm text-gray-600">Duração: 18 meses • Presencial</p>
                  <div className="mt-2 flex gap-2">
                    <Button size="sm" variant="outline">
                      Editar
                    </Button>
                    <Button size="sm" variant="destructive">
                      Remover
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contact">
          <Card>
            <CardHeader>
              <CardTitle>Informações de Contato</CardTitle>
              <CardDescription>Atualize as informações de contato do projeto</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="contact-email">Email</Label>
                <Input id="contact-email" type="email" defaultValue="contato@projetometanoia.org.br" className="mt-1" />
              </div>
              <div>
                <Label htmlFor="contact-phone">Telefone</Label>
                <Input id="contact-phone" defaultValue="(11) 99999-9999" className="mt-1" />
              </div>
              <div>
                <Label htmlFor="contact-address">Endereço</Label>
                <Textarea
                  id="contact-address"
                  defaultValue="Rua Exemplo, 123 - Bairro, São Paulo, SP - CEP 00000-000"
                  className="mt-1"
                  rows={2}
                />
              </div>
              <div>
                <Label htmlFor="contact-hours">Horário de Atendimento</Label>
                <Textarea
                  id="contact-hours"
                  defaultValue="Segunda a Sexta: 9h às 18h\nSábados: 9h às 13h"
                  className="mt-1"
                  rows={2}
                />
              </div>
              <Button onClick={() => handleSave("Contato")} disabled={isLoading} className="flex items-center gap-2">
                <Save className="h-4 w-4" />
                {isLoading ? "Salvando..." : "Salvar Alterações"}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
