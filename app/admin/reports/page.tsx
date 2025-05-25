"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts"
import { Download, TrendingUp, Users, Calendar, MapPin, Target, Award, FileText } from "lucide-react"

// Dados simulados para os gráficos
const monthlyGrowthData = [
  { month: "Jan", users: 45, events: 3, courses: 2 },
  { month: "Fev", users: 52, events: 4, courses: 3 },
  { month: "Mar", users: 48, events: 5, courses: 2 },
  { month: "Abr", users: 61, events: 4, courses: 4 },
  { month: "Mai", users: 55, events: 6, courses: 3 },
  { month: "Jun", users: 67, events: 5, courses: 5 },
  { month: "Jul", users: 72, events: 7, courses: 4 },
  { month: "Ago", users: 69, events: 6, courses: 6 },
  { month: "Set", users: 78, events: 8, courses: 5 },
  { month: "Out", users: 85, events: 7, courses: 7 },
  { month: "Nov", users: 92, events: 9, courses: 6 },
  { month: "Dez", users: 98, events: 8, courses: 8 },
]

const userTypeData = [
  { name: "Jovens", value: 65, color: "#3B82F6" },
  { name: "Famílias", value: 25, color: "#10B981" },
  { name: "Voluntários", value: 7, color: "#8B5CF6" },
  { name: "Parceiros", value: 3, color: "#F59E0B" },
]

const neighborhoodData = [
  { name: "Vila Nova Cachoeirinha", users: 28, events: 12 },
  { name: "Cidade Tiradentes", users: 24, events: 10 },
  { name: "Capão Redondo", users: 22, events: 8 },
  { name: "Jardim São Luís", users: 18, events: 7 },
  { name: "Brasilândia", users: 16, events: 6 },
  { name: "Cidade Ademar", users: 14, events: 5 },
]

const eventAttendanceData = [
  { event: "Tecnologia e Transformação", registered: 100, attended: 85, completion: 85 },
  { event: "Educação Financeira", registered: 80, attended: 72, completion: 90 },
  { event: "Saúde Mental", registered: 60, attended: 58, completion: 97 },
  { event: "Empreendedorismo Social", registered: 90, attended: 78, completion: 87 },
  { event: "Carreiras do Futuro", registered: 120, attended: 95, completion: 79 },
]

const ageGroupData = [
  { ageGroup: "14-16 anos", count: 45 },
  { ageGroup: "17-19 anos", count: 38 },
  { ageGroup: "20-22 anos", count: 22 },
  { ageGroup: "23-25 anos", count: 15 },
  { ageGroup: "Famílias", count: 28 },
]

export default function ReportsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("12months")
  const [selectedMetric, setSelectedMetric] = useState("users")

  const generateReport = (type: string) => {
    // Simular geração de relatório
    console.log(`Gerando relatório: ${type}`)
  }

  const exportData = (format: string) => {
    // Simular exportação de dados
    console.log(`Exportando dados em formato: ${format}`)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Relatórios e Analytics</h1>
          <p className="text-gray-600">Análise detalhada do desempenho e impacto do projeto</p>
        </div>
        <div className="flex gap-2">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1month">Último mês</SelectItem>
              <SelectItem value="3months">Últimos 3 meses</SelectItem>
              <SelectItem value="6months">Últimos 6 meses</SelectItem>
              <SelectItem value="12months">Último ano</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Exportar
          </Button>
        </div>
      </div>

      {/* KPIs Principais */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total de Usuários</p>
                <p className="text-3xl font-bold text-gray-900">1,234</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="h-4 w-4 text-green-600" />
                  <span className="text-sm font-medium text-green-600">+12%</span>
                  <span className="text-sm text-gray-500">vs mês anterior</span>
                </div>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Eventos Realizados</p>
                <p className="text-3xl font-bold text-gray-900">45</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="h-4 w-4 text-green-600" />
                  <span className="text-sm font-medium text-green-600">+8%</span>
                  <span className="text-sm text-gray-500">vs mês anterior</span>
                </div>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                <Calendar className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Taxa de Participação</p>
                <p className="text-3xl font-bold text-gray-900">87%</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="h-4 w-4 text-green-600" />
                  <span className="text-sm font-medium text-green-600">+5%</span>
                  <span className="text-sm text-gray-500">vs mês anterior</span>
                </div>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-100">
                <Target className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Cursos Concluídos</p>
                <p className="text-3xl font-bold text-gray-900">156</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="h-4 w-4 text-green-600" />
                  <span className="text-sm font-medium text-green-600">+15%</span>
                  <span className="text-sm text-gray-500">vs mês anterior</span>
                </div>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-100">
                <Award className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="users">Usuários</TabsTrigger>
          <TabsTrigger value="events">Eventos</TabsTrigger>
          <TabsTrigger value="geography">Geografia</TabsTrigger>
          <TabsTrigger value="impact">Impacto</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Crescimento Mensal */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Crescimento Mensal
              </CardTitle>
              <CardDescription>Evolução de usuários, eventos e cursos ao longo do ano</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={monthlyGrowthData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="users"
                      stackId="1"
                      stroke="#3B82F6"
                      fill="#3B82F6"
                      fillOpacity={0.6}
                    />
                    <Area
                      type="monotone"
                      dataKey="events"
                      stackId="1"
                      stroke="#10B981"
                      fill="#10B981"
                      fillOpacity={0.6}
                    />
                    <Area
                      type="monotone"
                      dataKey="courses"
                      stackId="1"
                      stroke="#F59E0B"
                      fill="#F59E0B"
                      fillOpacity={0.6}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Distribuição por Tipo de Usuário */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Distribuição de Usuários
                </CardTitle>
                <CardDescription>Tipos de usuários cadastrados no sistema</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={userTypeData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {userTypeData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-4">
                  {userTypeData.map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                      <span className="text-sm">
                        {item.name}: {item.value}%
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Faixa Etária */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Distribuição por Idade
                </CardTitle>
                <CardDescription>Faixas etárias dos participantes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={ageGroupData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="ageGroup" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="count" fill="#3B82F6" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="users" className="space-y-6">
          {/* Crescimento de Usuários */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Crescimento de Usuários
              </CardTitle>
              <CardDescription>Novos cadastros ao longo do tempo</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={monthlyGrowthData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="users" stroke="#3B82F6" strokeWidth={3} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Estatísticas de Usuários */}
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600">68%</p>
                  <p className="text-sm text-gray-600">Taxa de Retenção</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600">3.2</p>
                  <p className="text-sm text-gray-600">Eventos por Usuário</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <p className="text-2xl font-bold text-orange-600">1.8</p>
                  <p className="text-sm text-gray-600">Cursos por Usuário</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="events" className="space-y-6">
          {/* Participação em Eventos */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Participação em Eventos
              </CardTitle>
              <CardDescription>Taxa de comparecimento e conclusão por evento</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {eventAttendanceData.map((event, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">{event.event}</h4>
                      <Badge variant="outline">{event.completion}% conclusão</Badge>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>Inscritos: {event.registered}</span>
                        <span>Participaram: {event.attended}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${(event.attended / event.registered) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Eventos por Mês */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Eventos Realizados por Mês
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyGrowthData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="events" fill="#10B981" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="geography" className="space-y-6">
          {/* Distribuição por Bairro */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Distribuição por Bairro
              </CardTitle>
              <CardDescription>Usuários e eventos por região</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={neighborhoodData} layout="horizontal">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" width={150} />
                    <Tooltip />
                    <Bar dataKey="users" fill="#3B82F6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Mapa de Calor por Região */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {neighborhoodData.map((neighborhood, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm">{neighborhood.name}</h4>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Usuários:</span>
                      <span className="font-medium">{neighborhood.users}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Eventos:</span>
                      <span className="font-medium">{neighborhood.events}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${(neighborhood.users / 30) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="impact" className="space-y-6">
          {/* Métricas de Impacto */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">89%</div>
                <p className="text-sm text-gray-600">Satisfação dos Participantes</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">156</div>
                <p className="text-sm text-gray-600">Certificados Emitidos</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-orange-600 mb-2">73%</div>
                <p className="text-sm text-gray-600">Taxa de Empregabilidade</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">45</div>
                <p className="text-sm text-gray-600">Jovens Empregados</p>
              </CardContent>
            </Card>
          </div>

          {/* Histórias de Sucesso */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                Histórias de Sucesso
              </CardTitle>
              <CardDescription>Principais conquistas dos participantes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-l-4 border-blue-500 pl-4">
                  <h4 className="font-medium">Carlos Silva - Desenvolvedor Web</h4>
                  <p className="text-sm text-gray-600">
                    Após participar do curso de desenvolvimento web, conseguiu emprego em startup de tecnologia.
                  </p>
                  <Badge variant="outline" className="mt-2">
                    Tecnologia
                  </Badge>
                </div>
                <div className="border-l-4 border-green-500 pl-4">
                  <h4 className="font-medium">Maria Santos - Empreendedora</h4>
                  <p className="text-sm text-gray-600">
                    Criou seu próprio negócio de artesanato após as palestras de empreendedorismo.
                  </p>
                  <Badge variant="outline" className="mt-2">
                    Empreendedorismo
                  </Badge>
                </div>
                <div className="border-l-4 border-orange-500 pl-4">
                  <h4 className="font-medium">João Oliveira - Técnico em Administração</h4>
                  <p className="text-sm text-gray-600">
                    Concluiu curso técnico e foi contratado como assistente administrativo.
                  </p>
                  <Badge variant="outline" className="mt-2">
                    Administração
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Ações de Relatório */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Gerar Relatórios
          </CardTitle>
          <CardDescription>Exporte relatórios detalhados para análise externa</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Button variant="outline" className="h-20 flex-col gap-2" onClick={() => generateReport("users")}>
              <Users className="h-6 w-6" />
              <span>Relatório de Usuários</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2" onClick={() => generateReport("events")}>
              <Calendar className="h-6 w-6" />
              <span>Relatório de Eventos</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2" onClick={() => generateReport("impact")}>
              <Target className="h-6 w-6" />
              <span>Relatório de Impacto</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2" onClick={() => generateReport("financial")}>
              <TrendingUp className="h-6 w-6" />
              <span>Relatório Financeiro</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
