"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Users,
  BookOpen,
  GraduationCap,
  Mic,
  Mail,
  Settings,
  BarChart3,
  Calendar,
  MessageSquare,
  Globe,
} from "lucide-react"
import ProtectedRoute from "@/components/protected-route"
import { ConteudosAdmin } from "@/components/admin/conteudos-admin"
import { CursosAdmin } from "@/components/admin/cursos-admin"
import { PalestrasAdmin } from "@/components/admin/palestras-admin"
import { ContatosAdmin } from "@/components/admin/contatos-admin"
import { UsuariosAdmin } from "@/components/admin/usuarios-admin"
import { ConfiguracoesAdmin } from "@/components/admin/configuracoes-admin"
import { LandingPagesAdmin } from "@/components/admin/landing-pages-admin"

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("dashboard")

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Painel Administrativo</h1>
            <p className="text-gray-600">Gerencie todo o conteúdo do Projeto Metanoia</p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8 bg-white p-1 rounded-xl shadow-sm">
              <TabsTrigger value="dashboard" className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                <span className="hidden sm:inline">Dashboard</span>
              </TabsTrigger>
              <TabsTrigger value="conteudos" className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                <span className="hidden sm:inline">Conteúdos</span>
              </TabsTrigger>
              <TabsTrigger value="cursos" className="flex items-center gap-2">
                <GraduationCap className="h-4 w-4" />
                <span className="hidden sm:inline">Cursos</span>
              </TabsTrigger>
              <TabsTrigger value="palestras" className="flex items-center gap-2">
                <Mic className="h-4 w-4" />
                <span className="hidden sm:inline">Palestras</span>
              </TabsTrigger>
              <TabsTrigger value="landing-pages" className="flex items-center gap-2">
                <Globe className="h-4 w-4" />
                <span className="hidden sm:inline">Landing Pages</span>
              </TabsTrigger>
              <TabsTrigger value="contatos" className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span className="hidden sm:inline">Contatos</span>
              </TabsTrigger>
              <TabsTrigger value="usuarios" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span className="hidden sm:inline">Usuários</span>
              </TabsTrigger>
              <TabsTrigger value="configuracoes" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                <span className="hidden sm:inline">Config</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="dashboard" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total de Usuários</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">1,234</div>
                    <p className="text-xs text-muted-foreground">+20.1% em relação ao mês passado</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Conteúdos Publicados</CardTitle>
                    <BookOpen className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">89</div>
                    <p className="text-xs text-muted-foreground">+12 novos este mês</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Palestras Agendadas</CardTitle>
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">15</div>
                    <p className="text-xs text-muted-foreground">5 nesta semana</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Mensagens Pendentes</CardTitle>
                    <MessageSquare className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">7</div>
                    <p className="text-xs text-muted-foreground">3 não lidas</p>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Atividades Recentes</CardTitle>
                    <CardDescription>Últimas ações realizadas no sistema</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-4">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">Novo conteúdo publicado</p>
                          <p className="text-xs text-gray-500">Há 2 horas</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">Palestra agendada</p>
                          <p className="text-xs text-gray-500">Há 4 horas</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">Nova mensagem de contato</p>
                          <p className="text-xs text-gray-500">Há 6 horas</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Status do Sistema</CardTitle>
                    <CardDescription>Informações sobre o funcionamento da plataforma</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Sistema</span>
                        <Badge className="bg-green-100 text-green-800">Online</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Banco de Dados</span>
                        <Badge className="bg-green-100 text-green-800">Conectado</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Backup</span>
                        <Badge className="bg-blue-100 text-blue-800">Atualizado</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Última atualização</span>
                        <span className="text-sm text-gray-500">Hoje, 14:30</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="conteudos">
              <ConteudosAdmin />
            </TabsContent>

            <TabsContent value="cursos">
              <CursosAdmin />
            </TabsContent>

            <TabsContent value="palestras">
              <PalestrasAdmin />
            </TabsContent>

            <TabsContent value="landing-pages">
              <LandingPagesAdmin />
            </TabsContent>

            <TabsContent value="contatos">
              <ContatosAdmin />
            </TabsContent>

            <TabsContent value="usuarios">
              <UsuariosAdmin />
            </TabsContent>

            <TabsContent value="configuracoes">
              <ConfiguracoesAdmin />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </ProtectedRoute>
  )
}
