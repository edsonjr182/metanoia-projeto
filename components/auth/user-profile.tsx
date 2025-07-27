"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { User, Mail, Calendar, Shield, Edit2, Save, X } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

export function UserProfile() {
  const { user } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [displayName, setDisplayName] = useState(user?.displayName || "")

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  const handleSave = () => {
    // Aqui você implementaria a lógica para salvar as alterações
    setIsEditing(false)
  }

  const handleCancel = () => {
    setDisplayName(user?.displayName || "")
    setIsEditing(false)
  }

  if (!user) {
    return (
      <Card>
        <CardContent className="p-6">
          <p className="text-center text-gray-500">Usuário não encontrado</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader className="pb-6">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl">Perfil do Usuário</CardTitle>
            <CardDescription>Gerencie suas informações pessoais</CardDescription>
          </div>
          <Badge variant="secondary" className="bg-orange-100 text-orange-700">
            <Shield className="w-4 h-4 mr-1" />
            Administrador
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Avatar Section */}
        <div className="flex items-center space-x-6">
          <Avatar className="w-24 h-24 ring-4 ring-orange-100">
            <AvatarImage src={user.photoURL || ""} alt={user.displayName || ""} />
            <AvatarFallback className="bg-gradient-to-br from-orange-400 to-orange-600 text-white text-2xl font-bold">
              {user.displayName ? getInitials(user.displayName) : <User className="w-8 h-8" />}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-gray-900">{user.displayName || "Usuário"}</h3>
            <p className="text-gray-500">{user.email}</p>
            <Button variant="outline" size="sm" className="mt-2 bg-transparent">
              Alterar Foto
            </Button>
          </div>
        </div>

        <Separator />

        {/* Profile Information */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-lg font-medium">Informações Pessoais</h4>
            {!isEditing ? (
              <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                <Edit2 className="w-4 h-4 mr-2" />
                Editar
              </Button>
            ) : (
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" onClick={handleCancel}>
                  <X className="w-4 h-4 mr-2" />
                  Cancelar
                </Button>
                <Button size="sm" onClick={handleSave}>
                  <Save className="w-4 h-4 mr-2" />
                  Salvar
                </Button>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="displayName">Nome de Exibição</Label>
              {isEditing ? (
                <Input
                  id="displayName"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="Digite seu nome"
                />
              ) : (
                <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-md">
                  <User className="w-4 h-4 text-gray-400" />
                  <span>{user.displayName || "Não informado"}</span>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-md">
                <Mail className="w-4 h-4 text-gray-400" />
                <span>{user.email}</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="createdAt">Membro desde</Label>
              <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-md">
                <Calendar className="w-4 h-4 text-gray-400" />
                <span>
                  {user.metadata?.creationTime
                    ? new Date(user.metadata.creationTime).toLocaleDateString("pt-BR")
                    : "Data não disponível"}
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastLogin">Último acesso</Label>
              <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-md">
                <Calendar className="w-4 h-4 text-gray-400" />
                <span>
                  {user.metadata?.lastSignInTime
                    ? new Date(user.metadata.lastSignInTime).toLocaleDateString("pt-BR")
                    : "Data não disponível"}
                </span>
              </div>
            </div>
          </div>
        </div>

        <Separator />

        {/* Account Settings */}
        <div className="space-y-4">
          <h4 className="text-lg font-medium">Configurações da Conta</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button variant="outline" className="justify-start bg-transparent">
              Alterar Senha
            </Button>
            <Button variant="outline" className="justify-start bg-transparent">
              Configurações de Privacidade
            </Button>
            <Button variant="outline" className="justify-start bg-transparent">
              Notificações
            </Button>
            <Button variant="outline" className="justify-start text-red-600 hover:text-red-700 bg-transparent">
              Excluir Conta
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
