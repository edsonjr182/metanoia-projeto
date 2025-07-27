"use client"

import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { ProtectedRoute } from "@/components/protected-route"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ConteudosAdmin } from "@/components/admin/conteudos-admin"
import { CursosAdmin } from "@/components/admin/cursos-admin"
import { PalestrasAdmin } from "@/components/admin/palestras-admin"
import { ContatosAdmin } from "@/components/admin/contatos-admin"
import { UsuariosAdmin } from "@/components/admin/usuarios-admin"
import { ConfiguracoesAdmin } from "@/components/admin/configuracoes-admin"
import { LandingPagesAdmin } from "@/components/admin/landing-pages-admin"
import { FileText, GraduationCap, Mic, Mail, Users, Settings, MousePointer } from "lucide-react"

export default function AdminPage() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState("conteudos")

  return (
    <ProtectedRoute adminOnly>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Painel Administrativo</h1>
          <p className="text-gray-600 mt-2">Bem-vindo, {user?.displayName || user?.email}</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-7">
            <TabsTrigger value="conteudos" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Conteúdos
            </TabsTrigger>
            <TabsTrigger value="cursos" className="flex items-center gap-2">
              <GraduationCap className="w-4 h-4" />
              Cursos
            </TabsTrigger>
            <TabsTrigger value="palestras" className="flex items-center gap-2">
              <Mic className="w-4 h-4" />
              Palestras
            </TabsTrigger>
            <TabsTrigger value="contatos" className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              Contatos
            </TabsTrigger>
            <TabsTrigger value="usuarios" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Usuários
            </TabsTrigger>
            <TabsTrigger value="landing-pages" className="flex items-center gap-2">
              <MousePointer className="w-4 h-4" />
              Landing Pages
            </TabsTrigger>
            <TabsTrigger value="configuracoes" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Configurações
            </TabsTrigger>
          </TabsList>

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

          <TabsContent value="landing-pages">
            <LandingPagesAdmin />
          </TabsContent>

          <TabsContent value="configuracoes">
            <ConfiguracoesAdmin />
          </TabsContent>
        </Tabs>
      </div>
    </ProtectedRoute>
  )
}
