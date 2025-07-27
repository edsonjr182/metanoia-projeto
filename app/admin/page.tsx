"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Users, FileText, MessageSquare, BookOpen, Presentation, Settings, QrCode } from "lucide-react"
import ProtectedRoute from "@/components/protected-route"
import ConteudosAdmin from "@/components/admin/conteudos-admin"
import ContatosAdmin from "@/components/admin/contatos-admin"
import CursosAdmin from "@/components/admin/cursos-admin"
import PalestrasAdmin from "@/components/admin/palestras-admin"
import UsuariosAdmin from "@/components/admin/usuarios-admin"
import ConfiguracoesAdmin from "@/components/admin/configuracoes-admin"
import LandingPagesAdmin from "@/components/admin/landing-pages-admin"

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("conteudos")

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-orange-50">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-2">Painel Administrativo</h1>
                <p className="text-gray-600">Gerencie o conteúdo e configurações do Projeto Metanoia</p>
              </div>
              <Badge variant="outline" className="px-4 py-2 bg-orange-100 text-orange-700 border-orange-200">
                <Settings className="mr-2 h-4 w-4" />
                Admin
              </Badge>
            </div>
          </div>

          {/* Admin Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
            <TabsList className="grid w-full grid-cols-7 bg-white/80 backdrop-blur-sm shadow-soft border-0 p-2 rounded-2xl">
              <TabsTrigger
                value="conteudos"
                className="flex items-center space-x-2 rounded-xl data-[state=active]:bg-orange-500 data-[state=active]:text-white transition-all duration-300"
              >
                <FileText className="h-4 w-4" />
                <span className="hidden sm:inline">Conteúdos</span>
              </TabsTrigger>
              <TabsTrigger
                value="contatos"
                className="flex items-center space-x-2 rounded-xl data-[state=active]:bg-orange-500 data-[state=active]:text-white transition-all duration-300"
              >
                <MessageSquare className="h-4 w-4" />
                <span className="hidden sm:inline">Contatos</span>
              </TabsTrigger>
              <TabsTrigger
                value="cursos"
                className="flex items-center space-x-2 rounded-xl data-[state=active]:bg-orange-500 data-[state=active]:text-white transition-all duration-300"
              >
                <BookOpen className="h-4 w-4" />
                <span className="hidden sm:inline">Cursos</span>
              </TabsTrigger>
              <TabsTrigger
                value="palestras"
                className="flex items-center space-x-2 rounded-xl data-[state=active]:bg-orange-500 data-[state=active]:text-white transition-all duration-300"
              >
                <Presentation className="h-4 w-4" />
                <span className="hidden sm:inline">Palestras</span>
              </TabsTrigger>
              <TabsTrigger
                value="landing-pages"
                className="flex items-center space-x-2 rounded-xl data-[state=active]:bg-orange-500 data-[state=active]:text-white transition-all duration-300"
              >
                <QrCode className="h-4 w-4" />
                <span className="hidden sm:inline">Landing Pages</span>
              </TabsTrigger>
              <TabsTrigger
                value="usuarios"
                className="flex items-center space-x-2 rounded-xl data-[state=active]:bg-orange-500 data-[state=active]:text-white transition-all duration-300"
              >
                <Users className="h-4 w-4" />
                <span className="hidden sm:inline">Usuários</span>
              </TabsTrigger>
              <TabsTrigger
                value="configuracoes"
                className="flex items-center space-x-2 rounded-xl data-[state=active]:bg-orange-500 data-[state=active]:text-white transition-all duration-300"
              >
                <Settings className="h-4 w-4" />
                <span className="hidden sm:inline">Config</span>
              </TabsTrigger>
            </TabsList>

            {/* Tab Contents */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-soft border-0 p-8">
              <TabsContent value="conteudos" className="mt-0">
                <ConteudosAdmin />
              </TabsContent>

              <TabsContent value="contatos" className="mt-0">
                <ContatosAdmin />
              </TabsContent>

              <TabsContent value="cursos" className="mt-0">
                <CursosAdmin />
              </TabsContent>

              <TabsContent value="palestras" className="mt-0">
                <PalestrasAdmin />
              </TabsContent>

              <TabsContent value="landing-pages" className="mt-0">
                <LandingPagesAdmin />
              </TabsContent>

              <TabsContent value="usuarios" className="mt-0">
                <UsuariosAdmin />
              </TabsContent>

              <TabsContent value="configuracoes" className="mt-0">
                <ConfiguracoesAdmin />
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </ProtectedRoute>
  )
}
