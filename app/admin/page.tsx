"use client"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/contexts/auth-context"
import { useDashboardStats } from "@/hooks/use-dashboard-stats"
import {
  LogOut,
  Users,
  BookOpen,
  Calendar,
  MessageSquare,
  Heart,
  User,
  BarChart3,
  TrendingUp,
  Settings,
  UserCog,
  Globe,
  UserPlus,
  Loader2,
} from "lucide-react"
import ProtectedRoute from "@/components/protected-route"
import PalestrasAdmin from "@/components/admin/palestras-admin"
import CursosAdmin from "@/components/admin/cursos-admin"
import ConteudosAdmin from "@/components/admin/conteudos-admin"
import ContatosAdmin from "@/components/admin/contatos-admin"
import UserProfile from "@/components/auth/user-profile"
import ConfiguracoesAdmin from "@/components/admin/configuracoes-admin"
import UsuariosAdmin from "@/components/admin/usuarios-admin"
import LandingPagesAdmin from "@/components/admin/landingpages-admin"

export default function AdminPage() {
  const { user, logout } = useAuth()
  const stats = useDashboardStats()

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-metanoia-50">
        {/* Header */}
        <div className="bg-white/80 backdrop-blur-md shadow-soft border-b border-gray-100 sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Heart className="h-10 w-10 text-orange-500" />
                  <div className="absolute inset-0 bg-orange-400 rounded-full blur-lg opacity-20"></div>
                </div>
                <div>
                  <h1 className="font-bold text-2xl bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                    Painel Administrativo
                  </h1>
                  <p className="text-sm text-gray-600">Projeto Metanoia</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="hidden sm:block text-right">
                  <p className="text-sm font-medium text-gray-900">Olá, {user?.displayName}</p>
                  <p className="text-xs text-gray-500">{user?.email}</p>
                </div>
                <Button
                  onClick={logout}
                  variant="outline"
                  size="sm"
                  className="border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 rounded-xl transition-all duration-200 bg-transparent"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sair
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Welcome Section */}
          <div className="mb-12 animate-fade-in">
            <div className="bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700 rounded-3xl p-8 text-white relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
              <div className="relative z-10">
                <Badge className="mb-4 px-3 py-1 bg-white/20 text-white border-white/30">
                  <BarChart3 className="mr-1 h-3 w-3" />
                  Dashboard
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold mb-2">Bem-vindo de volta!</h2>
                <p className="text-orange-100 text-lg">
                  Gerencie o conteúdo do Projeto Metanoia e acompanhe o impacto na vida dos jovens.
                </p>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12 animate-fade-in">
            {[
              {
                title: "Palestras",
                value: stats.loading ? "..." : stats.palestras.toString(),
                change: stats.loading ? "..." : `${stats.palestras} total`,
                icon: Calendar,
                color: "orange",
              },
              {
                title: "Cursos",
                value: stats.loading ? "..." : stats.cursos.toString(),
                change: stats.loading ? "..." : `${stats.cursos} total`,
                icon: BookOpen,
                color: "metanoia",
              },
              {
                title: "Landing Pages",
                value: stats.loading ? "..." : stats.landingPages.toString(),
                change: stats.loading ? "..." : `${stats.landingPages} ativas`,
                icon: Globe,
                color: "purple",
              },
              {
                title: "Leads Capturados",
                value: stats.loading ? "..." : stats.leadsLandingPages.toString(),
                change: stats.loading ? "..." : `${stats.leadsLandingPages} cadastros`,
                icon: UserPlus,
                color: "emerald",
              },
            ].map((stat, index) => (
              <Card
                key={stat.title}
                className="border-0 shadow-soft hover:shadow-medium transition-all duration-300 bg-white/80 backdrop-blur-sm"
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                      <div className="flex items-center">
                        {stats.loading ? (
                          <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
                        ) : (
                          <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                        )}
                      </div>
                      <div className="flex items-center mt-1">
                        <TrendingUp className="h-3 w-3 text-emerald-500 mr-1" />
                        <span className="text-xs text-emerald-600 font-medium">{stat.change}</span>
                      </div>
                    </div>
                    <div className={`p-3 rounded-2xl bg-gradient-to-br from-${stat.color}-100 to-${stat.color}-200`}>
                      <stat.icon className={`h-6 w-6 text-${stat.color}-600`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Secondary Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 animate-fade-in">
            {[
              {
                title: "Conteúdos",
                value: stats.loading ? "..." : stats.conteudos.toString(),
                change: stats.loading ? "..." : `${stats.conteudos} publicados`,
                icon: Users,
                color: "blue",
              },
              {
                title: "Contatos",
                value: stats.loading ? "..." : stats.contatos.toString(),
                change: stats.loading ? "..." : `${stats.contatos} mensagens`,
                icon: MessageSquare,
                color: "red",
              },
              {
                title: "Usuários",
                value: stats.loading ? "..." : stats.usuarios.toString(),
                change: stats.loading ? "..." : `${stats.usuarios} cadastrados`,
                icon: UserCog,
                color: "indigo",
              },
            ].map((stat, index) => (
              <Card
                key={stat.title}
                className="border-0 shadow-soft hover:shadow-medium transition-all duration-300 bg-white/80 backdrop-blur-sm"
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                      <div className="flex items-center">
                        {stats.loading ? (
                          <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
                        ) : (
                          <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                        )}
                      </div>
                      <div className="flex items-center mt-1">
                        <TrendingUp className="h-3 w-3 text-emerald-500 mr-1" />
                        <span className="text-xs text-emerald-600 font-medium">{stat.change}</span>
                      </div>
                    </div>
                    <div className={`p-3 rounded-2xl bg-gradient-to-br from-${stat.color}-100 to-${stat.color}-200`}>
                      <stat.icon className={`h-6 w-6 text-${stat.color}-600`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Main Content */}
          <Tabs defaultValue="palestras" className="space-y-8">
            <TabsList className="grid w-full grid-cols-8 bg-white/80 backdrop-blur-sm p-2 rounded-2xl shadow-soft border-0 h-auto">
              <TabsTrigger
                value="palestras"
                className="flex flex-col items-center py-4 px-6 rounded-xl font-medium data-[state=active]:bg-gradient-to-br data-[state=active]:from-orange-500 data-[state=active]:to-orange-600 data-[state=active]:text-white data-[state=active]:shadow-medium transition-all duration-300"
              >
                <Calendar className="h-5 w-5 mb-2" />
                <span className="text-sm">Palestras</span>
              </TabsTrigger>
              <TabsTrigger
                value="cursos"
                className="flex flex-col items-center py-4 px-6 rounded-xl font-medium data-[state=active]:bg-gradient-to-br data-[state=active]:from-metanoia-500 data-[state=active]:to-metanoia-600 data-[state=active]:text-white data-[state=active]:shadow-medium transition-all duration-300"
              >
                <BookOpen className="h-5 w-5 mb-2" />
                <span className="text-sm">Cursos</span>
              </TabsTrigger>
              <TabsTrigger
                value="conteudos"
                className="flex flex-col items-center py-4 px-6 rounded-xl font-medium data-[state=active]:bg-gradient-to-br data-[state=active]:from-emerald-500 data-[state=active]:to-emerald-600 data-[state=active]:text-white data-[state=active]:shadow-medium transition-all duration-300"
              >
                <Users className="h-5 w-5 mb-2" />
                <span className="text-sm">Conteúdos</span>
              </TabsTrigger>
              <TabsTrigger
                value="contatos"
                className="flex flex-col items-center py-4 px-6 rounded-xl font-medium data-[state=active]:bg-gradient-to-br data-[state=active]:from-red-500 data-[state=active]:to-red-600 data-[state=active]:text-white data-[state=active]:shadow-medium transition-all duration-300"
              >
                <MessageSquare className="h-5 w-5 mb-2" />
                <span className="text-sm">Contatos</span>
              </TabsTrigger>
              <TabsTrigger
                value="landingpages"
                className="flex flex-col items-center py-4 px-6 rounded-xl font-medium data-[state=active]:bg-gradient-to-br data-[state=active]:from-purple-500 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-medium transition-all duration-300"
              >
                <Globe className="h-5 w-5 mb-2" />
                <span className="text-sm">Landing Pages</span>
              </TabsTrigger>
              <TabsTrigger
                value="usuarios"
                className="flex flex-col items-center py-4 px-6 rounded-xl font-medium data-[state=active]:bg-gradient-to-br data-[state=active]:from-blue-500 data-[state=active]:to-blue-600 data-[state=active]:text-white data-[state=active]:shadow-medium transition-all duration-300"
              >
                <UserCog className="h-5 w-5 mb-2" />
                <span className="text-sm">Usuários</span>
              </TabsTrigger>
              <TabsTrigger
                value="perfil"
                className="flex flex-col items-center py-4 px-6 rounded-xl font-medium data-[state=active]:bg-gradient-to-br data-[state=active]:from-slate-500 data-[state=active]:to-slate-600 data-[state=active]:text-white data-[state=active]:shadow-medium transition-all duration-300"
              >
                <User className="h-5 w-5 mb-2" />
                <span className="text-sm">Perfil</span>
              </TabsTrigger>
              <TabsTrigger
                value="configuracoes"
                className="flex flex-col items-center py-4 px-6 rounded-xl font-medium data-[state=active]:bg-gradient-to-br data-[state=active]:from-purple-500 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-medium transition-all duration-300"
              >
                <Settings className="h-5 w-5 mb-2" />
                <span className="text-sm">Configurações</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="palestras" className="animate-fade-in">
              <PalestrasAdmin />
            </TabsContent>

            <TabsContent value="cursos" className="animate-fade-in">
              <CursosAdmin />
            </TabsContent>

            <TabsContent value="conteudos" className="animate-fade-in">
              <ConteudosAdmin />
            </TabsContent>

            <TabsContent value="contatos" className="animate-fade-in">
              <ContatosAdmin />
            </TabsContent>

            <TabsContent value="landingpages" className="animate-fade-in">
              <LandingPagesAdmin />
            </TabsContent>

            <TabsContent value="usuarios" className="animate-fade-in">
              <UsuariosAdmin />
            </TabsContent>

            <TabsContent value="perfil" className="animate-fade-in">
              <UserProfile />
            </TabsContent>

            <TabsContent value="configuracoes" className="animate-fade-in">
              <ConfiguracoesAdmin />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </ProtectedRoute>
  )
}
