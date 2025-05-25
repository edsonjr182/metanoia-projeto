"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Mail, MailOpen, Archive, Trash2, Reply } from "lucide-react"

// Dados simulados de mensagens
const messages = [
  {
    id: 1,
    name: "Maria Silva",
    email: "maria@email.com",
    subject: "Interesse em ser voluntária",
    message: "Olá, gostaria de saber como posso ajudar o projeto como voluntária...",
    date: "2025-01-25",
    status: "unread",
    type: "volunteer",
  },
  {
    id: 2,
    name: "João Santos",
    email: "joao@empresa.com",
    subject: "Proposta de parceria",
    message: "Nossa empresa tem interesse em estabelecer uma parceria...",
    date: "2025-01-24",
    status: "read",
    type: "partnership",
  },
  {
    id: 3,
    name: "Ana Costa",
    email: "ana@email.com",
    subject: "Dúvidas sobre cursos",
    message: "Gostaria de saber mais informações sobre os cursos técnicos...",
    date: "2025-01-23",
    status: "unread",
    type: "info",
  },
  {
    id: 4,
    name: "Carlos Oliveira",
    email: "carlos@email.com",
    subject: "Agradecimento",
    message: "Quero agradecer pelo apoio que meu filho recebeu no projeto...",
    date: "2025-01-22",
    status: "read",
    type: "feedback",
  },
]

export default function MessagesManagement() {
  const [selectedMessage, setSelectedMessage] = useState<(typeof messages)[0] | null>(null)
  const [searchTerm, setSearchTerm] = useState("")

  const getStatusBadge = (status: string) => {
    return status === "unread" ? <Badge variant="destructive">Não lida</Badge> : <Badge variant="secondary">Lida</Badge>
  }

  const getTypeBadge = (type: string) => {
    const types = {
      volunteer: { label: "Voluntário", variant: "default" as const },
      partnership: { label: "Parceria", variant: "secondary" as const },
      info: { label: "Informação", variant: "outline" as const },
      feedback: { label: "Feedback", variant: "default" as const },
    }

    const typeInfo = types[type as keyof typeof types] || { label: "Geral", variant: "outline" as const }

    return <Badge variant={typeInfo.variant}>{typeInfo.label}</Badge>
  }

  const filteredMessages = messages.filter(
    (message) =>
      message.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.subject.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Mensagens</h1>
        <p className="text-gray-600">Gerencie as mensagens recebidas através do formulário de contato</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Lista de Mensagens */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Caixa de Entrada
              </CardTitle>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Buscar mensagens..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="max-h-96 overflow-y-auto">
                {filteredMessages.map((message) => (
                  <div
                    key={message.id}
                    className={`cursor-pointer border-b p-4 transition-colors hover:bg-gray-50 ${
                      selectedMessage?.id === message.id ? "bg-blue-50" : ""
                    }`}
                    onClick={() => setSelectedMessage(message)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          {message.status === "unread" ? (
                            <Mail className="h-4 w-4 text-blue-600" />
                          ) : (
                            <MailOpen className="h-4 w-4 text-gray-400" />
                          )}
                          <p
                            className={`text-sm font-medium truncate ${
                              message.status === "unread" ? "text-gray-900" : "text-gray-600"
                            }`}
                          >
                            {message.name}
                          </p>
                        </div>
                        <p className="text-sm text-gray-600 truncate">{message.subject}</p>
                        <p className="text-xs text-gray-400 mt-1">{message.date}</p>
                      </div>
                      <div className="flex flex-col gap-1">
                        {getStatusBadge(message.status)}
                        {getTypeBadge(message.type)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Detalhes da Mensagem */}
        <div className="lg:col-span-2">
          {selectedMessage ? (
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle>{selectedMessage.subject}</CardTitle>
                    <CardDescription>
                      De: {selectedMessage.name} ({selectedMessage.email})
                    </CardDescription>
                    <p className="text-sm text-gray-500 mt-1">{selectedMessage.date}</p>
                  </div>
                  <div className="flex gap-2">
                    {getStatusBadge(selectedMessage.status)}
                    {getTypeBadge(selectedMessage.type)}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-lg bg-gray-50 p-4">
                  <p className="text-gray-700">{selectedMessage.message}</p>
                </div>

                <div className="flex gap-2">
                  <Button className="flex items-center gap-2">
                    <Reply className="h-4 w-4" />
                    Responder
                  </Button>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Archive className="h-4 w-4" />
                    Arquivar
                  </Button>
                  <Button variant="destructive" className="flex items-center gap-2">
                    <Trash2 className="h-4 w-4" />
                    Excluir
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="flex items-center justify-center h-64">
                <div className="text-center">
                  <Mail className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">Selecione uma mensagem para visualizar</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Estatísticas */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Mail className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Total de Mensagens</p>
                <p className="text-2xl font-bold">{messages.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <MailOpen className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">Mensagens Lidas</p>
                <p className="text-2xl font-bold">{messages.filter((m) => m.status === "read").length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Mail className="h-5 w-5 text-red-600" />
              <div>
                <p className="text-sm text-gray-600">Não Lidas</p>
                <p className="text-2xl font-bold">{messages.filter((m) => m.status === "unread").length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Reply className="h-5 w-5 text-orange-600" />
              <div>
                <p className="text-sm text-gray-600">Parcerias</p>
                <p className="text-2xl font-bold">{messages.filter((m) => m.type === "partnership").length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
