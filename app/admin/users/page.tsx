"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Search, Users, UserCheck, UserX, Edit, Trash2, Eye, Download, Mail, Phone } from "lucide-react"

// Dados simulados de usuários
const initialUsers = [
  {
    id: 1,
    name: "Carlos Silva",
    email: "carlos@email.com",
    phone: "(11) 99999-1111",
    age: 17,
    neighborhood: "Vila Nova Cachoeirinha",
    registrationDate: "2025-01-15",
    status: "active",
    type: "youth",
    eventsAttended: 3,
    coursesCompleted: 1,
    lastActivity: "2025-01-24",
  },
  {
    id: 2,
    name: "Maria Santos",
    email: "maria@email.com",
    phone: "(11) 99999-2222",
    age: 19,
    neighborhood: "Cidade Tiradentes",
    registrationDate: "2025-01-10",
    status: "active",
    type: "youth",
    eventsAttended: 5,
    coursesCompleted: 2,
    lastActivity: "2025-01-25",
  },
  {
    id: 3,
    name: "Ana Costa",
    email: "ana@email.com",
    phone: "(11) 99999-3333",
    age: 45,
    neighborhood: "Capão Redondo",
    registrationDate: "2025-01-08",
    status: "active",
    type: "family",
    eventsAttended: 2,
    coursesCompleted: 0,
    lastActivity: "2025-01-23",
  },
  {
    id: 4,
    name: "João Oliveira",
    email: "joao@email.com",
    phone: "(11) 99999-4444",
    age: 18,
    neighborhood: "Jardim São Luís",
    registrationDate: "2024-12-20",
    status: "inactive",
    type: "youth",
    eventsAttended: 1,
    coursesCompleted: 0,
    lastActivity: "2024-12-25",
  },
  {
    id: 5,
    name: "Fernanda Lima",
    email: "fernanda@email.com",
    phone: "(11) 99999-5555",
    age: 16,
    neighborhood: "Brasilândia",
    registrationDate: "2025-01-20",
    status: "active",
    type: "youth",
    eventsAttended: 2,
    coursesCompleted: 0,
    lastActivity: "2025-01-25",
  },
  {
    id: 6,
    name: "Roberto Mendes",
    email: "roberto@email.com",
    phone: "(11) 99999-6666",
    age: 52,
    neighborhood: "Cidade Ademar",
    registrationDate: "2025-01-12",
    status: "active",
    type: "family",
    eventsAttended: 1,
    coursesCompleted: 0,
    lastActivity: "2025-01-22",
  },
]

type User = (typeof initialUsers)[0]

export default function UsersManagement() {
  const [users, setUsers] = useState(initialUsers)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [viewingUser, setViewingUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  // Formulário para novo usuário
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    age: "",
    neighborhood: "",
    type: "",
  })

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      active: { label: "Ativo", variant: "default" as const },
      inactive: { label: "Inativo", variant: "secondary" as const },
      suspended: { label: "Suspenso", variant: "destructive" as const },
    }

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.active
    return <Badge variant={config.variant}>{config.label}</Badge>
  }

  const getTypeBadge = (type: string) => {
    const typeConfig = {
      youth: { label: "Jovem", color: "bg-blue-100 text-blue-800" },
      family: { label: "Família", color: "bg-green-100 text-green-800" },
      volunteer: { label: "Voluntário", color: "bg-purple-100 text-purple-800" },
      partner: { label: "Parceiro", color: "bg-orange-100 text-orange-800" },
    }

    const config = typeConfig[type as keyof typeof typeConfig] || typeConfig.youth
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
        {config.label}
      </span>
    )
  }

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.neighborhood.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || user.status === statusFilter
    const matchesType = typeFilter === "all" || user.type === typeFilter

    return matchesSearch && matchesStatus && matchesType
  })

  const handleCreateUser = async () => {
    setIsLoading(true)

    // Simular criação do usuário
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const newUser: User = {
      id: users.length + 1,
      ...formData,
      age: Number.parseInt(formData.age),
      registrationDate: new Date().toISOString().split("T")[0],
      status: "active",
      eventsAttended: 0,
      coursesCompleted: 0,
      lastActivity: new Date().toISOString().split("T")[0],
    }

    setUsers([...users, newUser])
    setFormData({
      name: "",
      email: "",
      phone: "",
      age: "",
      neighborhood: "",
      type: "",
    })
    setIsCreateDialogOpen(false)
    setIsLoading(false)

    toast({
      title: "Usuário criado!",
      description: "O usuário foi cadastrado com sucesso.",
    })
  }

  const handleEditUser = async () => {
    if (!editingUser) return

    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setUsers(users.map((user) => (user.id === editingUser.id ? { ...editingUser } : user)))
    setEditingUser(null)
    setIsLoading(false)

    toast({
      title: "Usuário atualizado!",
      description: "As alterações foram salvas com sucesso.",
    })
  }

  const handleDeleteUser = async (userId: number) => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 500))

    setUsers(users.filter((user) => user.id !== userId))
    setIsLoading(false)

    toast({
      title: "Usuário excluído!",
      description: "O usuário foi removido com sucesso.",
    })
  }

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      age: "",
      neighborhood: "",
      type: "",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gerenciar Usuários</h1>
          <p className="text-gray-600">Gerencie os usuários cadastrados no sistema</p>
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
                Novo Usuário
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Cadastrar Novo Usuário</DialogTitle>
                <DialogDescription>Preencha as informações do usuário.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Nome Completo</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Nome do usuário"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="email@exemplo.com"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="phone">Telefone</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="(11) 99999-9999"
                    />
                  </div>
                  <div>
                    <Label htmlFor="age">Idade</Label>
                    <Input
                      id="age"
                      type="number"
                      value={formData.age}
                      onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                      placeholder="18"
                    />
                  </div>
                  <div>
                    <Label htmlFor="type">Tipo</Label>
                    <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="youth">Jovem</SelectItem>
                        <SelectItem value="family">Família</SelectItem>
                        <SelectItem value="volunteer">Voluntário</SelectItem>
                        <SelectItem value="partner">Parceiro</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label htmlFor="neighborhood">Bairro</Label>
                  <Input
                    id="neighborhood"
                    value={formData.neighborhood}
                    onChange={(e) => setFormData({ ...formData, neighborhood: e.target.value })}
                    placeholder="Nome do bairro"
                  />
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
                <Button onClick={handleCreateUser} disabled={isLoading}>
                  {isLoading ? "Criando..." : "Criar Usuário"}
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
              <Users className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Total de Usuários</p>
                <p className="text-2xl font-bold">{users.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <UserCheck className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">Usuários Ativos</p>
                <p className="text-2xl font-bold">{users.filter((u) => u.status === "active").length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-orange-600" />
              <div>
                <p className="text-sm text-gray-600">Jovens</p>
                <p className="text-2xl font-bold">{users.filter((u) => u.type === "youth").length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <UserX className="h-5 w-5 text-red-600" />
              <div>
                <p className="text-sm text-gray-600">Inativos</p>
                <p className="text-2xl font-bold">{users.filter((u) => u.status === "inactive").length}</p>
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
                  placeholder="Buscar usuários..."
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
                <SelectItem value="active">Ativos</SelectItem>
                <SelectItem value="inactive">Inativos</SelectItem>
                <SelectItem value="suspended">Suspensos</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os Tipos</SelectItem>
                <SelectItem value="youth">Jovens</SelectItem>
                <SelectItem value="family">Famílias</SelectItem>
                <SelectItem value="volunteer">Voluntários</SelectItem>
                <SelectItem value="partner">Parceiros</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Tabela de Usuários */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Contato</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Atividade</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-gray-500">{user.neighborhood}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-1 text-sm">
                        <Mail className="h-3 w-3" />
                        <span>{user.email}</span>
                      </div>
                      <div className="flex items-center gap-1 text-sm">
                        <Phone className="h-3 w-3" />
                        <span>{user.phone}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      {getTypeBadge(user.type)}
                      <p className="text-sm text-gray-500">{user.age} anos</p>
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(user.status)}</TableCell>
                  <TableCell>
                    <div className="space-y-1 text-sm">
                      <p>{user.eventsAttended} eventos</p>
                      <p>{user.coursesCompleted} cursos</p>
                      <p className="text-gray-500">
                        Último acesso: {new Date(user.lastActivity).toLocaleDateString("pt-BR")}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button variant="outline" size="sm" onClick={() => setViewingUser(user)} className="h-8 w-8 p-0">
                        <Eye className="h-3 w-3" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => setEditingUser(user)} className="h-8 w-8 p-0">
                        <Edit className="h-3 w-3" />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="destructive" size="sm" className="h-8 w-8 p-0">
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
                            <AlertDialogDescription>
                              Tem certeza que deseja excluir o usuário "{user.name}"? Esta ação não pode ser desfeita.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDeleteUser(user.id)}>Excluir</AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {filteredUsers.length === 0 && (
        <Card>
          <CardContent className="flex items-center justify-center h-32">
            <div className="text-center">
              <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">Nenhum usuário encontrado</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Dialog de Visualização */}
      <Dialog open={!!viewingUser} onOpenChange={() => setViewingUser(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Detalhes do Usuário</DialogTitle>
            <DialogDescription>Informações completas do usuário selecionado.</DialogDescription>
          </DialogHeader>
          {viewingUser && (
            <div className="grid gap-6 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-500">Nome</Label>
                  <p className="text-lg font-medium">{viewingUser.name}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">Idade</Label>
                  <p className="text-lg">{viewingUser.age} anos</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-500">Email</Label>
                  <p>{viewingUser.email}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">Telefone</Label>
                  <p>{viewingUser.phone}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-500">Bairro</Label>
                  <p>{viewingUser.neighborhood}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">Tipo</Label>
                  <div className="mt-1">{getTypeBadge(viewingUser.type)}</div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-500">Data de Cadastro</Label>
                  <p>{new Date(viewingUser.registrationDate).toLocaleDateString("pt-BR")}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">Eventos Participados</Label>
                  <p className="text-lg font-medium text-blue-600">{viewingUser.eventsAttended}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">Cursos Concluídos</Label>
                  <p className="text-lg font-medium text-green-600">{viewingUser.coursesCompleted}</p>
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-500">Status</Label>
                <div className="mt-1">{getStatusBadge(viewingUser.status)}</div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setViewingUser(null)}>
              Fechar
            </Button>
            <Button
              onClick={() => {
                setEditingUser(viewingUser)
                setViewingUser(null)
              }}
            >
              Editar Usuário
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog de Edição */}
      <Dialog open={!!editingUser} onOpenChange={() => setEditingUser(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Editar Usuário</DialogTitle>
            <DialogDescription>Faça as alterações necessárias no usuário.</DialogDescription>
          </DialogHeader>
          {editingUser && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-name">Nome Completo</Label>
                  <Input
                    id="edit-name"
                    value={editingUser.name}
                    onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="edit-email">Email</Label>
                  <Input
                    id="edit-email"
                    type="email"
                    value={editingUser.email}
                    onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="edit-phone">Telefone</Label>
                  <Input
                    id="edit-phone"
                    value={editingUser.phone}
                    onChange={(e) => setEditingUser({ ...editingUser, phone: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="edit-age">Idade</Label>
                  <Input
                    id="edit-age"
                    type="number"
                    value={editingUser.age}
                    onChange={(e) => setEditingUser({ ...editingUser, age: Number.parseInt(e.target.value) || 0 })}
                  />
                </div>
                <div>
                  <Label htmlFor="edit-type">Tipo</Label>
                  <Select
                    value={editingUser.type}
                    onValueChange={(value) => setEditingUser({ ...editingUser, type: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="youth">Jovem</SelectItem>
                      <SelectItem value="family">Família</SelectItem>
                      <SelectItem value="volunteer">Voluntário</SelectItem>
                      <SelectItem value="partner">Parceiro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-neighborhood">Bairro</Label>
                  <Input
                    id="edit-neighborhood"
                    value={editingUser.neighborhood}
                    onChange={(e) => setEditingUser({ ...editingUser, neighborhood: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="edit-status">Status</Label>
                  <Select
                    value={editingUser.status}
                    onValueChange={(value) => setEditingUser({ ...editingUser, status: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Ativo</SelectItem>
                      <SelectItem value="inactive">Inativo</SelectItem>
                      <SelectItem value="suspended">Suspenso</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingUser(null)}>
              Cancelar
            </Button>
            <Button onClick={handleEditUser} disabled={isLoading}>
              {isLoading ? "Salvando..." : "Salvar Alterações"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
