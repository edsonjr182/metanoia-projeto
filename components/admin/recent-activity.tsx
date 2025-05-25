import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Activity } from "lucide-react"

const activities = [
  {
    id: 1,
    action: "Nova mensagem recebida",
    user: "Maria Silva",
    time: "2 minutos atrás",
    type: "message",
  },
  {
    id: 2,
    action: "Evento criado",
    user: "Admin",
    time: "1 hora atrás",
    type: "event",
  },
  {
    id: 3,
    action: "Conteúdo atualizado",
    user: "Admin",
    time: "3 horas atrás",
    type: "content",
  },
  {
    id: 4,
    action: "Novo usuário cadastrado",
    user: "João Santos",
    time: "5 horas atrás",
    type: "user",
  },
]

export default function RecentActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5" />
          Atividade Recente
        </CardTitle>
        <CardDescription>Últimas ações realizadas no sistema</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-center gap-3">
              <div className="h-2 w-2 rounded-full bg-blue-600"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">{activity.action}</p>
                <p className="text-xs text-gray-500">
                  por {activity.user} • {activity.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
