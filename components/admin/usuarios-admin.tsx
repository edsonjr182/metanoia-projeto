"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
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
import {
  Users,
  Search,
  MoreVertical,
  Eye,
  UserX,
  UserCheck,
  Mail,
  Shield,
  Download,
  TrendingUp,
  User,
} from "lucide-react"
import { collection, getDocs, query, orderBy, doc, updateDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"

interface Usuario {
  id: string
  uid: string
  displayName: string
  email: string
  photoURL?: string
  provider: string
  createdAt: string
  lastLoginAt: string
  status: "ativo" | "inativo"
  role: "admin" | "usuario"
}

export function UsuariosAdmin() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([])
  const [filteredUsuarios, setFilteredUsuarios] = useState<Usuario[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState<"todos" | "ativo" | "inativo">("todos")
  const [selectedUser, setSelectedUser] = useState<Usuario | null>(null)

  useEffect(() => {
    fetchUsuarios()
  }, [])

  useEffect(() => {
    filterUsuarios()
  }, [usuarios, searchTerm, filterStatus])

  const fetchUsuarios = async () => {
    try {
      const q = query(collection(db, "usuarios"), orderBy("createdAt", "desc"))
      const querySnapshot = await getDocs(q)
      const usuariosData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Usuario[]
      setUsuarios(usuariosData)
    } catch (error) {
      console.error("Erro ao buscar usuários:", error)
    } finally {
      setLoading(false)
    }
  }

  const filterUsuarios = () => {
    let filtered = usuarios

    // Filtro por termo de busca
    if (searchTerm) {
      filtered = filtered.filter(
        (usuario) =>
          usuario.displayName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          usuario.email.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Filtro por status
    if (filterStatus !== "todos") {
      filtered = filtered.filter((usuario) => usuario.status === filterStatus)
    }

    setFilteredUsuarios(filtered)
  }

  const handleStatusChange = async (userId: string, newStatus: "ativo" | "inativo") => {
    try {
      await updateDoc(doc(db, "usuarios", userId), { status: newStatus })
      setUsuarios((prev) => prev.map((user) => (user.id === userId ? { ...user, status: newStatus } : user)))
    } catch (error) {
      console.error("Erro ao atualizar status:", error)
    }
  }

  const getInitials = (name: string) => {
    return (
      name
        ?.split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2) || "U"
    )
  }

  const getProviderBadge = (provider: string) => {
    switch (provider) {
      case "google.com":
        return <Badge className="bg-red-100 text-red-800">Google</Badge>
      case "password":
        return <Badge className="bg-blue-100 text-blue-800">Email</Badge>
      default:
        return <Badge variant="secondary">{provider}</Badge>
    }
  }

  const getStatusBadge = (status: string) => {
    return status === "ativo" ? (
      <Badge className="bg-green-100 text-green-800">Ativo</Badge>
    ) : (
      <Badge className="bg-red-100 text-red-800">Inativo</Badge>
    )
  }

  const exportUsuarios = () => {
    const csvContent = [
      ["Nome", "Email", "Provedor", "Status", "Data de Cadastro", "Último Login"],
      ...filteredUsuarios.map((user) => [
        user.displayName || "",
        user.email,
        user.provider,
        user.status,
        new Date(user.createdAt).toLocaleDateString("pt-BR"),
        new Date(user.lastLoginAt).toLocaleDateString("pt-BR"),
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "usuarios.csv"
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const stats = {
    total: usuarios.length,
    ativos: usuarios.filter((u) => u.status === "ativo").length,
    inativos: usuarios.filter((u) => u.status === "inativo").length,
    admins: usuarios.filter((u) => u.role === "admin").length,
    usuarios: usuarios.filter((u) => u.role === "usuario").length,
    google: usuarios.filter((u) => u.provider === "google.com").length,
    email: usuarios.filter((u) => u.provider === "password").length,
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Gerenciar Usuários</h2>
        </div>
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando usuários...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold flex items-center">
            <Users className="mr-3 h-6 w-6" />
            Gerenciar Usuários
          </h2>
          <p className="text-gray-600 mt-1">Visualize e gerencie os usuários cadastrados na plataforma</p>
        </div>
        <Button onClick={exportUsuarios} variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Exportar CSV
        </Button>
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        {[
          { label: "Total", value: stats.total, icon: Users, color: "blue" },
          { label: "Ativos", value: stats.ativos, icon: UserCheck, color: "green" },
          { label: "Inativos", value: stats.inativos, icon: UserX, color: "red" },
          { label: "Admins", value: stats.admins, icon: Shield, color: "purple" },
          { label: "Usuários", value: stats.usuarios, icon: User, color: "orange" },
          { label: "Google", value: stats.google, icon: TrendingUp, color: "red" },
          { label: "Email", value: stats.email, icon: Mail, color: "blue" },
        ].map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <stat.icon className={`h-8 w-8 text-${stat.color}-500`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filtros */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Buscar por nome ou email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant={filterStatus === "todos" ? "default" : "outline"}
                onClick={() => setFilterStatus("todos")}
                size="sm"
              >
                Todos
              </Button>
              <Button
                variant={filterStatus === "ativo" ? "default" : "outline"}
                onClick={() => setFilterStatus("ativo")}
                size="sm"
              >
                Ativos
              </Button>
              <Button
                variant={filterStatus === "inativo" ? "default" : "outline"}
                onClick={() => setFilterStatus("inativo")}
                size="sm"
              >
                Inativos
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Usuários */}
      {filteredUsuarios.length === 0 ? (
        <div className="text-center py-12">
          <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">Nenhum usuário encontrado</h3>
          <p className="text-gray-500">
            {searchTerm || filterStatus !== "todos"
              ? "Tente ajustar os filtros de busca"
              : "Os usuários aparecerão aqui conforme se cadastrarem"}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUsuarios.map((usuario) => (
            <Card key={usuario.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={usuario.photoURL || "/placeholder.svg"} alt={usuario.displayName} />
                      <AvatarFallback className="bg-gradient-to-br from-orange-400 to-orange-600 text-white font-semibold">
                        {getInitials(usuario.displayName)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg">{usuario.displayName || "Usuário"}</CardTitle>
                      <CardDescription className="text-sm">{usuario.email}</CardDescription>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => setSelectedUser(usuario)}>
                        <Eye className="mr-2 h-4 w-4" />
                        Ver Detalhes
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      {usuario.status === "ativo" ? (
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                              <UserX className="mr-2 h-4 w-4" />
                              Desativar
                            </DropdownMenuItem>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Desativar usuário</AlertDialogTitle>
                              <AlertDialogDescription>
                                Tem certeza que deseja desativar este usuário? Ele não conseguirá mais acessar a
                                plataforma.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancelar</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleStatusChange(usuario.id, "inativo")}>
                                Desativar
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      ) : (
                        <DropdownMenuItem onClick={() => handleStatusChange(usuario.id, "ativo")}>
                          <UserCheck className="mr-2 h-4 w-4" />
                          Ativar
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Status:</span>
                    {getStatusBadge(usuario.status)}
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Provedor:</span>
                    {getProviderBadge(usuario.provider)}
                  </div>
                  {usuario.role === "admin" && (
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Role:</span>
                      <Badge className="bg-purple-100 text-purple-800">
                        <Shield className="mr-1 h-3 w-3" />
                        Admin
                      </Badge>
                    </div>
                  )}
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Cadastro:</span>
                    <span className="text-sm text-gray-900">
                      {new Date(usuario.createdAt).toLocaleDateString("pt-BR")}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Último acesso:</span>
                    <span className="text-sm text-gray-900">
                      {new Date(usuario.lastLoginAt).toLocaleDateString("pt-BR")}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Modal de Detalhes do Usuário */}
      {selectedUser && (
        <AlertDialog open={!!selectedUser} onOpenChange={() => setSelectedUser(null)}>
          <AlertDialogContent className="max-w-2xl">
            <AlertDialogHeader>
              <AlertDialogTitle className="flex items-center space-x-3">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={selectedUser.photoURL || "/placeholder.svg"} alt={selectedUser.displayName} />
                  <AvatarFallback className="bg-gradient-to-br from-orange-400 to-orange-600 text-white font-semibold">
                    {getInitials(selectedUser.displayName)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="text-xl font-bold">{selectedUser.displayName || "Usuário"}</div>
                  <div className="text-sm text-gray-600">{selectedUser.email}</div>
                </div>
              </AlertDialogTitle>
            </AlertDialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">Status</label>
                  <div className="mt-1">{getStatusBadge(selectedUser.status)}</div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Provedor de Login</label>
                  <div className="mt-1">{getProviderBadge(selectedUser.provider)}</div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Data de Cadastro</label>
                  <div className="mt-1 text-sm">{new Date(selectedUser.createdAt).toLocaleString("pt-BR")}</div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Último Acesso</label>
                  <div className="mt-1 text-sm">{new Date(selectedUser.lastLoginAt).toLocaleString("pt-BR")}</div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">ID do Usuário</label>
                  <div className="mt-1 text-sm font-mono text-gray-500">{selectedUser.uid}</div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Role</label>
                  <div className="mt-1">
                    <Badge
                      className={
                        selectedUser.role === "admin" ? "bg-purple-100 text-purple-800" : "bg-blue-100 text-blue-800"
                      }
                    >
                      {selectedUser.role === "admin" ? (
                        <>
                          <Shield className="mr-1 h-3 w-3" />
                          Administrador
                        </>
                      ) : (
                        <>
                          <User className="mr-1 h-3 w-3" />
                          Usuário
                        </>
                      )}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
            <AlertDialogFooter>
              <AlertDialogCancel>Fechar</AlertDialogCancel>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  )
}

export default UsuariosAdmin
