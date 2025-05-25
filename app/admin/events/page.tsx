"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Plus, Calendar, MapPin, Clock, Users, Edit, Trash2, Search, Eye, Copy, Download } from "lucide-react"

// Dados simulados de eventos
const initialEvents = [
  {
    id: 1,
    title: "Tecnologia como Ferramenta de Transformação",
    description: "Como a tecnologia pode abrir portas para jovens de comunidades periféricas e transformar realidades.",
    speaker: "Ricardo Oliveira",
    date: "2025-06-15",
    time: "19:00",
    location: "Centro Cultural da Juventude",
    address: "Av. Dep. Emílio Carlos, 3641 - Vila Nova Cachoeirinha",
    capacity: 100,
    registered: 45,
    status: "upcoming",
    category: "technology",
    image: "/tech-event.png",
  },
  {
    id: 2,
    title: "Educação Financeira para Jovens",
    description:
      "Aprenda conceitos básicos de finanças pessoais e como fazer seu dinheiro trabalhar para você desde cedo.",
    speaker: "Amanda Santos",
    date: "2025-06-22",
    time: "15:00",
    location: "Biblioteca Municipal",
    address: "Rua da Consolação, 1024 - Consolação",
    capacity: 80,
    registered: 32,
    status: "upcoming",
    category: "finance",
    image: "/finance-event.png",
  },
  {
    id: 3,
    title: "Saúde Mental e Autoconhecimento",
    description:
      "A importância do cuidado com a saúde mental e como o autoconhecimento pode ajudar no desenvolvimento pessoal.",
    speaker: "Dr. Paulo Mendes",
    date: "2025-06-30",
    time: "18:30",
    location: "Casa de Cultura M'Boi Mirim",
    address: "Av. Inácio Dias da Silva, 1100 - Jd. São Luís",
    capacity: 60,
    registered: 28,
    status: "upcoming",
    category: "health",
    image: "/mental-health-event.png",
  },
  {
    id: 4,
    title: "Empreendedorismo Social",
    description: "Como criar negócios que geram impacto positivo na comunidade e transformam realidades sociais.",
    speaker: "Carla Rodrigues",
    date: "2025-05-15",
    time: "19:00",
    location: "Centro Cultural da Penha",
    address: "Largo do Rosário, 20 - Penha de França",
    capacity: 90,
    registered: 90,
    status: "completed",
    category: "business",
    image: "/entrepreneurship-event.png",
  },
  {
    id: 5,
    title: "Carreiras do Futuro",
    description: "Palestra sobre as profissões em alta no mercado e como se preparar para elas.",
    speaker: "Ana Luiza Martins",
    date: "2025-05-10",
    time: "16:00",
    location: "ETEC Parque da Juventude",
    address: "Av. Cruzeiro do Sul, 2630 - Santana",
    capacity: 120,
    registered: 85,
    status: "completed",
    category: "career",
    image: "/career-event.png",
  },
]

type Event = (typeof initialEvents)[0]

export default function EventsManagement() {
  const [events, setEvents] = useState(initialEvents)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [editingEvent, setEditingEvent] = useState<Event | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  // Formulário para novo evento
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    speaker: "",
    date: "",
    time: "",
    location: "",
    address: "",
    capacity: "",
    category: "",
  })

  const categories = [
    { value: "technology", label: "Tecnologia" },
    { value: "finance", label: "Finanças" },
    { value: "health", label: "Saúde Mental" },
    { value: "business", label: "Empreendedorismo" },
    { value: "career", label: "Carreira" },
    { value: "education", label: "Educação" },
  ]

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      upcoming: { label: "Próximo", variant: "default" as const },
      completed: { label: "Realizado", variant: "secondary" as const },
      cancelled: { label: "Cancelado", variant: "destructive" as const },
    }

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.upcoming
    return <Badge variant={config.variant}>{config.label}</Badge>
  }

  const getCategoryBadge = (category: string) => {
    const categoryConfig = {
      technology: { label: "Tecnologia", color: "bg-blue-100 text-blue-800" },
      finance: { label: "Finanças", color: "bg-green-100 text-green-800" },
      health: { label: "Saúde Mental", color: "bg-purple-100 text-purple-800" },
      business: { label: "Empreendedorismo", color: "bg-orange-100 text-orange-800" },
      career: { label: "Carreira", color: "bg-indigo-100 text-indigo-800" },
      education: { label: "Educação", color: "bg-yellow-100 text-yellow-800" },
    }

    const config = categoryConfig[category as keyof typeof categoryConfig] || categoryConfig.technology
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
        {config.label}
      </span>
    )
  }

  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.speaker.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.location.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || event.status === statusFilter
    const matchesCategory = categoryFilter === "all" || event.category === categoryFilter

    return matchesSearch && matchesStatus && matchesCategory
  })

  const handleCreateEvent = async () => {
    setIsLoading(true)

    // Simular criação do evento
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const newEvent: Event = {
      id: events.length + 1,
      ...formData,
      capacity: Number.parseInt(formData.capacity),
      registered: 0,
      status: "upcoming",
      image: "/placeholder-event.png",
    }

    setEvents([...events, newEvent])
    setFormData({
      title: "",
      description: "",
      speaker: "",
      date: "",
      time: "",
      location: "",
      address: "",
      capacity: "",
      category: "",
    })
    setIsCreateDialogOpen(false)
    setIsLoading(false)

    toast({
      title: "Evento criado!",
      description: "O evento foi criado com sucesso.",
    })
  }

  const handleEditEvent = async () => {
    if (!editingEvent) return

    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setEvents(events.map((event) => (event.id === editingEvent.id ? { ...editingEvent } : event)))
    setEditingEvent(null)
    setIsLoading(false)

    toast({
      title: "Evento atualizado!",
      description: "As alterações foram salvas com sucesso.",
    })
  }

  const handleDeleteEvent = async (eventId: number) => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 500))

    setEvents(events.filter((event) => event.id !== eventId))
    setIsLoading(false)

    toast({
      title: "Evento excluído!",
      description: "O evento foi removido com sucesso.",
    })
  }

  const handleDuplicateEvent = (event: Event) => {
    const duplicatedEvent: Event = {
      ...event,
      id: events.length + 1,
      title: `${event.title} (Cópia)`,
      registered: 0,
      status: "upcoming",
    }

    setEvents([...events, duplicatedEvent])

    toast({
      title: "Evento duplicado!",
      description: "Uma cópia do evento foi criada.",
    })
  }

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      speaker: "",
      date: "",
      time: "",
      location: "",
      address: "",
      capacity: "",
      category: "",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gerenciar Eventos</h1>
          <p className="text-gray-600">Crie, edite e gerencie os eventos e palestras do projeto</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Exportar
          </Button>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Novo Evento
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Criar Novo Evento</DialogTitle>
                <DialogDescription>Preencha as informações do evento que será realizado.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="title">Título do Evento</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="Ex: Tecnologia e Inovação"
                    />
                  </div>
                  <div>
                    <Label htmlFor="speaker">Palestrante</Label>
                    <Input
                      id="speaker"
                      value={formData.speaker}
                      onChange={(e) => setFormData({ ...formData, speaker: e.target.value })}
                      placeholder="Nome do palestrante"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="description">Descrição</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Descreva o evento e seus objetivos..."
                    rows={3}
                  />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="date">Data</Label>
                    <Input
                      id="date"
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="time">Horário</Label>
                    <Input
                      id="time"
                      type="time"
                      value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="capacity">Capacidade</Label>
                    <Input
                      id="capacity"
                      type="number"
                      value={formData.capacity}
                      onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                      placeholder="100"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="location">Local</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="Nome do local"
                  />
                </div>
                <div>
                  <Label htmlFor="address">Endereço</Label>
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="Endereço completo"
                  />
                </div>
                <div>
                  <Label htmlFor="category">Categoria</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData({ ...formData, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.value} value={category.value}>
                          {category.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsCreateDialogOpen(false)
                    resetForm()
                  }}
                >
                  Cancelar
                </Button>
                <Button onClick={handleCreateEvent} disabled={isLoading}>
                  {isLoading ? "Criando..." : "Criar Evento"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Estatísticas */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Total de Eventos</p>
                <p className="text-2xl font-bold">{events.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">Próximos</p>
                <p className="text-2xl font-bold">{events.filter((e) => e.status === "upcoming").length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-orange-600" />
              <div>
                <p className="text-sm text-gray-600">Total de Inscritos</p>
                <p className="text-2xl font-bold">{events.reduce((sum, event) => sum + event.registered, 0)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-sm text-gray-600">Realizados</p>
                <p className="text-2xl font-bold">{events.filter((e) => e.status === "completed").length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filtros */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-64">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Buscar eventos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os Status</SelectItem>
                <SelectItem value="upcoming">Próximos</SelectItem>
                <SelectItem value="completed">Realizados</SelectItem>
                <SelectItem value="cancelled">Cancelados</SelectItem>
              </SelectContent>
            </Select>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Categoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas as Categorias</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Eventos */}
      <div className="grid gap-6">
        {filteredEvents.map((event) => (
          <Card key={event.id} className="overflow-hidden">
            <CardContent className="p-0">
              <div className="flex">
                <div className="w-48 h-32 bg-gray-200 flex-shrink-0">
                  <img
                    src={event.image || "/placeholder.svg"}
                    alt={event.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = "/placeholder.svg?height=128&width=192&text=Evento"
                    }}
                  />
                </div>
                <div className="flex-1 p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-xl font-bold text-gray-900">{event.title}</h3>
                        {getStatusBadge(event.status)}
                        {getCategoryBadge(event.category)}
                      </div>
                      <p className="text-gray-600 mb-3 line-clamp-2">{event.description}</p>
                      <div className="grid grid-cols-2 gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          <span>{event.speaker}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>
                            {new Date(event.date).toLocaleDateString("pt-BR")} às {event.time}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          <span>{event.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          <span>
                            {event.registered}/{event.capacity} inscritos
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 ml-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setEditingEvent(event)}
                        className="flex items-center gap-1"
                      >
                        <Edit className="h-3 w-3" />
                        Editar
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDuplicateEvent(event)}
                        className="flex items-center gap-1"
                      >
                        <Copy className="h-3 w-3" />
                        Duplicar
                      </Button>
                      <Button variant="outline" size="sm" className="flex items-center gap-1">
                        <Eye className="h-3 w-3" />
                        Ver
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="destructive" size="sm" className="flex items-center gap-1">
                            <Trash2 className="h-3 w-3" />
                            Excluir
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
                            <AlertDialogDescription>
                              Tem certeza que deseja excluir o evento "{event.title}"? Esta ação não pode ser desfeita.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDeleteEvent(event.id)}>Excluir</AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredEvents.length === 0 && (
        <Card>
          <CardContent className="flex items-center justify-center h-32">
            <div className="text-center">
              <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">Nenhum evento encontrado</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Dialog de Edição */}
      <Dialog open={!!editingEvent} onOpenChange={() => setEditingEvent(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Editar Evento</DialogTitle>
            <DialogDescription>Faça as alterações necessárias no evento.</DialogDescription>
          </DialogHeader>
          {editingEvent && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-title">Título do Evento</Label>
                  <Input
                    id="edit-title"
                    value={editingEvent.title}
                    onChange={(e) => setEditingEvent({ ...editingEvent, title: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="edit-speaker">Palestrante</Label>
                  <Input
                    id="edit-speaker"
                    value={editingEvent.speaker}
                    onChange={(e) => setEditingEvent({ ...editingEvent, speaker: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="edit-description">Descrição</Label>
                <Textarea
                  id="edit-description"
                  value={editingEvent.description}
                  onChange={(e) => setEditingEvent({ ...editingEvent, description: e.target.value })}
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="edit-date">Data</Label>
                  <Input
                    id="edit-date"
                    type="date"
                    value={editingEvent.date}
                    onChange={(e) => setEditingEvent({ ...editingEvent, date: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="edit-time">Horário</Label>
                  <Input
                    id="edit-time"
                    type="time"
                    value={editingEvent.time}
                    onChange={(e) => setEditingEvent({ ...editingEvent, time: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="edit-capacity">Capacidade</Label>
                  <Input
                    id="edit-capacity"
                    type="number"
                    value={editingEvent.capacity}
                    onChange={(e) =>
                      setEditingEvent({ ...editingEvent, capacity: Number.parseInt(e.target.value) || 0 })
                    }
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="edit-location">Local</Label>
                <Input
                  id="edit-location"
                  value={editingEvent.location}
                  onChange={(e) => setEditingEvent({ ...editingEvent, location: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="edit-address">Endereço</Label>
                <Input
                  id="edit-address"
                  value={editingEvent.address}
                  onChange={(e) => setEditingEvent({ ...editingEvent, address: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="edit-status">Status</Label>
                <Select
                  value={editingEvent.status}
                  onValueChange={(value) => setEditingEvent({ ...editingEvent, status: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="upcoming">Próximo</SelectItem>
                    <SelectItem value="completed">Realizado</SelectItem>
                    <SelectItem value="cancelled">Cancelado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingEvent(null)}>
              Cancelar
            </Button>
            <Button onClick={handleEditEvent} disabled={isLoading}>
              {isLoading ? "Salvando..." : "Salvar Alterações"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
