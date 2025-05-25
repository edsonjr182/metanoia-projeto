import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, FileText, Calendar, Users } from "lucide-react"

export default function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Ações Rápidas</CardTitle>
        <CardDescription>Acesso rápido às principais funcionalidades</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <Button className="w-full justify-start" variant="outline">
          <Plus className="mr-2 h-4 w-4" />
          Criar Novo Evento
        </Button>
        <Button className="w-full justify-start" variant="outline">
          <FileText className="mr-2 h-4 w-4" />
          Editar Conteúdo
        </Button>
        <Button className="w-full justify-start" variant="outline">
          <Calendar className="mr-2 h-4 w-4" />
          Gerenciar Agenda
        </Button>
        <Button className="w-full justify-start" variant="outline">
          <Users className="mr-2 h-4 w-4" />
          Ver Usuários
        </Button>
      </CardContent>
    </Card>
  )
}
