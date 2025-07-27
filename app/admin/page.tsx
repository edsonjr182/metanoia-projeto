"use client"

import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { UserProfile } from "@/components/auth/user-profile"
import LoginForm from "@/components/auth/login-form"
import ProtectedRoute from "@/components/protected-route"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import ConteudosAdmin from "@/components/admin/conteudos-admin"
import CursosAdmin from "@/components/admin/cursos-admin"
import PalestrasAdmin from "@/components/admin/palestras-admin"
import ContatosAdmin from "@/components/admin/contatos-admin"
import UsuariosAdmin from "@/components/admin/usuarios-admin"
import ConfiguracoesAdmin from "@/components/admin/configuracoes-admin"
import LandingPagesAdmin from "@/components/admin/landing-pages-admin"
import { LayoutDashboard, FileText, GraduationCap, Mic, Mail, Users, Settings, MousePointer } from "lucide-react"

export default function AdminPage() {
  const { user, loading } = useAuth()
  const [activeTab, setActiveTab] = useState("dashboard")

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Painel Administrativo</h1>
            <p className="text-gray-600 mt-2">Faça login para acessar o painel</p>
          </div>
          <LoginForm />
        </div>
      </div>
    )
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Painel Administrativo</h1>
            <p className="text-gray-600">Gerencie o conteúdo do Projeto Metanoia</p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-8">
              <TabsTrigger value="dashboard" className="flex items-center space-x-2">
                <LayoutDashboard className="h-4 w-4" />
                <span className="hidden sm:inline">Dashboard</span>
              </TabsTrigger>
              <TabsTrigger value="landing-pages" className="flex items-center space-x-2">
                <MousePointer className="h-4 w-4" />
                <span className="hidden sm:inline">Landing Pages</span>
              </TabsTrigger>
              <TabsTrigger value="conteudos" className="flex items-center space-x-2">
                <FileText className="h-4 w-4" />
                <span className="hidden sm:inline">Conteúdos</span>
              </TabsTrigger>
              <TabsTrigger value="cursos" className="flex items-center space-x-2">
                <GraduationCap className="h-4 w-4" />
                <span className="hidden sm:inline">Cursos</span>
              </TabsTrigger>
              <TabsTrigger value="palestras" className="flex items-center space-x-2">
                <Mic className="h-4 w-4" />
                <span className="hidden sm:inline">Palestras</span>
              </TabsTrigger>
              <TabsTrigger value="contatos" className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span className="hidden sm:inline">Contatos</span>
              </TabsTrigger>
              <TabsTrigger value="usuarios" className="flex items-center space-x-2">
                <Users className="h-4 w-4" />
                <span className="hidden sm:inline">Usuários</span>
              </TabsTrigger>
              <TabsTrigger value="configuracoes" className="flex items-center space-x-2">
                <Settings className="h-4 w-4" />
                <span className="hidden sm:inline">Config</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="dashboard">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Landing Pages</CardTitle>
                    <MousePointer className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">12</div>
                    <p className="text-xs text-muted-foreground">+2 este mês</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Leads Capturados</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">245</div>
                    <p className="text-xs text-muted-foreground">+18% em relação ao mês passado</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Cursos Ativos</CardTitle>
                    <GraduationCap className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">8</div>
                    <p className="text-xs text-muted-foreground">3 novos este mês</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Palestras</CardTitle>
                    <Mic className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">15</div>
                    <p className="text-xs text-muted-foreground">Próxima: 25/01</p>
                  </CardContent>
                </Card>
              </div>

              <div className="mt-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Bem-vindo ao Painel Administrativo</CardTitle>
                    <CardDescription>
                      Gerencie todo o conteúdo do Projeto Metanoia de forma centralizada
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <UserProfile />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="landing-pages">
              <LandingPagesAdmin />
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
