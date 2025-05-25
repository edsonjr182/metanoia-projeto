import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Calendar, BookOpen, MessageSquare, TrendingUp, Eye } from "lucide-react"
import StatsCard from "@/components/admin/stats-card"
import RecentActivity from "@/components/admin/recent-activity"
import QuickActions from "@/components/admin/quick-actions"

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Bem-vindo ao painel administrativo do Projeto Metanoia</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Jovens Cadastrados"
          value="1,234"
          change="+12%"
          changeType="positive"
          icon={<Users className="h-6 w-6" />}
        />
        <StatsCard
          title="Eventos Realizados"
          value="45"
          change="+8%"
          changeType="positive"
          icon={<Calendar className="h-6 w-6" />}
        />
        <StatsCard
          title="Cursos Ativos"
          value="23"
          change="+3%"
          changeType="positive"
          icon={<BookOpen className="h-6 w-6" />}
        />
        <StatsCard
          title="Mensagens Recebidas"
          value="89"
          change="+15%"
          changeType="positive"
          icon={<MessageSquare className="h-6 w-6" />}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <RecentActivity />
        </div>

        {/* Quick Actions */}
        <div>
          <QuickActions />
        </div>
      </div>

      {/* Analytics Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Visão Geral do Site
          </CardTitle>
          <CardDescription>Estatísticas dos últimos 30 dias</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                <Eye className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Visualizações</p>
                <p className="text-2xl font-bold">12,543</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                <Users className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Visitantes Únicos</p>
                <p className="text-2xl font-bold">8,234</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100">
                <MessageSquare className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Taxa de Conversão</p>
                <p className="text-2xl font-bold">3.2%</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
