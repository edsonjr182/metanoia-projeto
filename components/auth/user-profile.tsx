"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User, Mail, Calendar, Shield, AlertCircle, CheckCircle } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { updateProfile, updatePassword } from "firebase/auth"

export default function UserProfile() {
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [profileData, setProfileData] = useState({
    displayName: user?.displayName || "",
  })
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return

    try {
      setLoading(true)
      setError("")
      setSuccess("")

      await updateProfile(user, {
        displayName: profileData.displayName,
      })

      setSuccess("Perfil atualizado com sucesso!")
    } catch (error: any) {
      setError("Erro ao atualizar perfil")
    } finally {
      setLoading(false)
    }
  }

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setError("As senhas não coincidem")
      return
    }

    if (passwordData.newPassword.length < 6) {
      setError("A nova senha deve ter pelo menos 6 caracteres")
      return
    }

    try {
      setLoading(true)
      setError("")
      setSuccess("")

      await updatePassword(user, passwordData.newPassword)
      setSuccess("Senha atualizada com sucesso!")
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      })
    } catch (error: any) {
      if (error.code === "auth/requires-recent-login") {
        setError("Por segurança, faça login novamente para alterar a senha")
      } else {
        setError("Erro ao atualizar senha")
      }
    } finally {
      setLoading(false)
    }
  }

  if (!user) return null

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  const isEmailUser = user.providerData.some((provider) => provider.providerId === "password")
  const isGoogleUser = user.providerData.some((provider) => provider.providerId === "google.com")

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Meu Perfil</h1>
        <p className="text-gray-600">Gerencie suas informações pessoais e configurações</p>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert className="border-green-200 bg-green-50">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800">{success}</AlertDescription>
        </Alert>
      )}

      {/* Informações do Usuário */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <User className="h-5 w-5 mr-2" />
            Informações Pessoais
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4 mb-6">
            <Avatar className="h-16 w-16">
              <AvatarImage src={user.photoURL || ""} alt={user.displayName || ""} />
              <AvatarFallback className="text-lg">
                {user.displayName ? getInitials(user.displayName) : <User className="h-8 w-8" />}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-lg font-semibold">{user.displayName || "Usuário"}</h3>
              <p className="text-gray-600 flex items-center">
                <Mail className="h-4 w-4 mr-1" />
                {user.email}
              </p>
              <p className="text-sm text-gray-500 flex items-center mt-1">
                <Calendar className="h-4 w-4 mr-1" />
                Membro desde {new Date(user.metadata.creationTime!).toLocaleDateString("pt-BR")}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="flex items-center p-3 bg-gray-50 rounded-lg">
              <Shield className="h-4 w-4 mr-2 text-green-500" />
              <div>
                <p className="font-medium">Status da Conta</p>
                <p className="text-gray-600">{user.emailVerified ? "Verificada" : "Não verificada"}</p>
              </div>
            </div>
            <div className="flex items-center p-3 bg-gray-50 rounded-lg">
              <User className="h-4 w-4 mr-2 text-blue-500" />
              <div>
                <p className="font-medium">Método de Login</p>
                <p className="text-gray-600">
                  {isGoogleUser && "Google"}
                  {isEmailUser && "Email"}
                  {isGoogleUser && isEmailUser && "Google + Email"}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Atualizar Perfil */}
      <Card>
        <CardHeader>
          <CardTitle>Atualizar Perfil</CardTitle>
          <CardDescription>Altere suas informações pessoais</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleProfileUpdate} className="space-y-4">
            <div>
              <Label htmlFor="displayName">Nome de exibição</Label>
              <Input
                id="displayName"
                value={profileData.displayName}
                onChange={(e) => setProfileData({ ...profileData, displayName: e.target.value })}
                placeholder="Seu nome completo"
              />
            </div>
            <Button type="submit" disabled={loading}>
              {loading ? "Salvando..." : "Salvar alterações"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Alterar Senha (apenas para usuários de email) */}
      {isEmailUser && (
        <Card>
          <CardHeader>
            <CardTitle>Alterar Senha</CardTitle>
            <CardDescription>Mantenha sua conta segura com uma senha forte</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handlePasswordUpdate} className="space-y-4">
              <div>
                <Label htmlFor="newPassword">Nova senha</Label>
                <Input
                  id="newPassword"
                  type="password"
                  value={passwordData.newPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                  minLength={6}
                />
              </div>
              <div>
                <Label htmlFor="confirmPassword">Confirmar nova senha</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={passwordData.confirmPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                  minLength={6}
                />
              </div>
              <Button type="submit" disabled={loading}>
                {loading ? "Alterando..." : "Alterar senha"}
              </Button>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
