"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
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
  Settings,
  Bell,
  Shield,
  Database,
  Mail,
  Palette,
  Save,
  Upload,
  Download,
  Trash2,
  Eye,
  EyeOff,
  RefreshCw,
  AlertTriangle,
} from "lucide-react"

export default function SettingsPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const { toast } = useToast()

  // Estados para as configurações
  const [generalSettings, setGeneralSettings] = useState({
    siteName: "Projeto Metanoia",
    siteDescription: "Transformando mentalidades e construindo futuros",
    siteUrl: "https://projetometanoia.org.br",
    adminEmail: "admin@projetometanoia.org.br",
    timezone: "America/Sao_Paulo",
    language: "pt-BR",
  })

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    newUserRegistration: true,
    newEventRegistration: true,
    newMessage: true,
    systemUpdates: false,
    weeklyReports: true,
    monthlyReports: true,
  })

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    sessionTimeout: "30",
    passwordExpiry: "90",
    loginAttempts: "5",
    requireStrongPassword: true,
  })

  const [emailSettings, setEmailSettings] = useState({
    smtpHost: "smtp.gmail.com",
    smtpPort: "587",
    smtpUsername: "noreply@projetometanoia.org.br",
    smtpPassword: "",
    fromName: "Projeto Metanoia",
    fromEmail: "noreply@projetometanoia.org.br",
  })

  const [themeSettings, setThemeSettings] = useState({
    primaryColor: "#1e3a8a",
    secondaryColor: "#f97316",
    darkMode: false,
    customLogo: "",
    favicon: "",
  })

  const handleSave = async (section: string) => {
    setIsLoading(true)
    // Simular salvamento
    await new Promise((resolve) => setTimeout(resolve, 1000))

    toast({
      title: "Configurações salvas!",
      description: `As configurações de ${section} foram atualizadas com sucesso.`,
    })
    setIsLoading(false)
  }

  const handleBackup = async () => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))

    toast({
      title: "Backup criado!",
      description: "O backup do sistema foi gerado com sucesso.",
    })
    setIsLoading(false)
  }

  const handleRestore = async () => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))

    toast({
      title: "Sistema restaurado!",
      description: "O backup foi restaurado com sucesso.",
    })
    setIsLoading(false)
  }

  const handleReset = async () => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))

    toast({
      title: "Configurações resetadas!",
      description: "Todas as configurações foram restauradas para o padrão.",
    })
    setIsLoading(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Configurações do Sistema</h1>
          <p className="text-gray-600">Gerencie as configurações gerais do Projeto Metanoia</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleBackup} disabled={isLoading} className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Backup
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" className="flex items-center gap-2">
                <RefreshCw className="h-4 w-4" />
                Reset
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Resetar Configurações</AlertDialogTitle>
                <AlertDialogDescription>
                  Tem certeza que deseja resetar todas as configurações para o padrão? Esta ação não pode ser desfeita.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction onClick={handleReset}>Resetar</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="general">Geral</TabsTrigger>
          <TabsTrigger value="notifications">Notificações</TabsTrigger>
          <TabsTrigger value="security">Segurança</TabsTrigger>
          <TabsTrigger value="email">Email</TabsTrigger>
          <TabsTrigger value="appearance">Aparência</TabsTrigger>
          <TabsTrigger value="system">Sistema</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Configurações Gerais
              </CardTitle>
              <CardDescription>Configurações básicas do site e organização</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="siteName">Nome do Site</Label>
                  <Input
                    id="siteName"
                    value={generalSettings.siteName}
                    onChange={(e) => setGeneralSettings({ ...generalSettings, siteName: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="adminEmail">Email do Administrador</Label>
                  <Input
                    id="adminEmail"
                    type="email"
                    value={generalSettings.adminEmail}
                    onChange={(e) => setGeneralSettings({ ...generalSettings, adminEmail: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="siteDescription">Descrição do Site</Label>
                <Textarea
                  id="siteDescription"
                  value={generalSettings.siteDescription}
                  onChange={(e) => setGeneralSettings({ ...generalSettings, siteDescription: e.target.value })}
                  rows={3}
                />
              </div>
              <div>
                <Label htmlFor="siteUrl">URL do Site</Label>
                <Input
                  id="siteUrl"
                  value={generalSettings.siteUrl}
                  onChange={(e) => setGeneralSettings({ ...generalSettings, siteUrl: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="timezone">Fuso Horário</Label>
                  <Select
                    value={generalSettings.timezone}
                    onValueChange={(value) => setGeneralSettings({ ...generalSettings, timezone: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="America/Sao_Paulo">São Paulo (GMT-3)</SelectItem>
                      <SelectItem value="America/New_York">Nova York (GMT-5)</SelectItem>
                      <SelectItem value="Europe/London">Londres (GMT+0)</SelectItem>
                      <SelectItem value="Asia/Tokyo">Tóquio (GMT+9)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="language">Idioma</Label>
                  <Select
                    value={generalSettings.language}
                    onValueChange={(value) => setGeneralSettings({ ...generalSettings, language: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pt-BR">Português (Brasil)</SelectItem>
                      <SelectItem value="en-US">English (US)</SelectItem>
                      <SelectItem value="es-ES">Español</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button onClick={() => handleSave("gerais")} disabled={isLoading} className="flex items-center gap-2">
                <Save className="h-4 w-4" />
                {isLoading ? "Salvando..." : "Salvar Configurações"}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Configurações de Notificação
              </CardTitle>
              <CardDescription>Gerencie quando e como receber notificações</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="emailNotifications">Notificações por Email</Label>
                    <p className="text-sm text-gray-500">Receber notificações gerais por email</p>
                  </div>
                  <Switch
                    id="emailNotifications"
                    checked={notificationSettings.emailNotifications}
                    onCheckedChange={(checked) =>
                      setNotificationSettings({ ...notificationSettings, emailNotifications: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="newUserRegistration">Novos Usuários</Label>
                    <p className="text-sm text-gray-500">Notificar quando novos usuários se cadastrarem</p>
                  </div>
                  <Switch
                    id="newUserRegistration"
                    checked={notificationSettings.newUserRegistration}
                    onCheckedChange={(checked) =>
                      setNotificationSettings({ ...notificationSettings, newUserRegistration: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="newEventRegistration">Inscrições em Eventos</Label>
                    <p className="text-sm text-gray-500">Notificar sobre novas inscrições em eventos</p>
                  </div>
                  <Switch
                    id="newEventRegistration"
                    checked={notificationSettings.newEventRegistration}
                    onCheckedChange={(checked) =>
                      setNotificationSettings({ ...notificationSettings, newEventRegistration: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="newMessage">Novas Mensagens</Label>
                    <p className="text-sm text-gray-500">Notificar sobre mensagens do formulário de contato</p>
                  </div>
                  <Switch
                    id="newMessage"
                    checked={notificationSettings.newMessage}
                    onCheckedChange={(checked) =>
                      setNotificationSettings({ ...notificationSettings, newMessage: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="systemUpdates">Atualizações do Sistema</Label>
                    <p className="text-sm text-gray-500">Notificar sobre atualizações e manutenções</p>
                  </div>
                  <Switch
                    id="systemUpdates"
                    checked={notificationSettings.systemUpdates}
                    onCheckedChange={(checked) =>
                      setNotificationSettings({ ...notificationSettings, systemUpdates: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="weeklyReports">Relatórios Semanais</Label>
                    <p className="text-sm text-gray-500">Receber resumo semanal de atividades</p>
                  </div>
                  <Switch
                    id="weeklyReports"
                    checked={notificationSettings.weeklyReports}
                    onCheckedChange={(checked) =>
                      setNotificationSettings({ ...notificationSettings, weeklyReports: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="monthlyReports">Relatórios Mensais</Label>
                    <p className="text-sm text-gray-500">Receber relatório mensal detalhado</p>
                  </div>
                  <Switch
                    id="monthlyReports"
                    checked={notificationSettings.monthlyReports}
                    onCheckedChange={(checked) =>
                      setNotificationSettings({ ...notificationSettings, monthlyReports: checked })
                    }
                  />
                </div>
              </div>

              <Button
                onClick={() => handleSave("notificações")}
                disabled={isLoading}
                className="flex items-center gap-2"
              >
                <Save className="h-4 w-4" />
                {isLoading ? "Salvando..." : "Salvar Configurações"}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Configurações de Segurança
              </CardTitle>
              <CardDescription>Gerencie a segurança e autenticação do sistema</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="twoFactorAuth">Autenticação de Dois Fatores</Label>
                    <p className="text-sm text-gray-500">Adicionar camada extra de segurança no login</p>
                  </div>
                  <Switch
                    id="twoFactorAuth"
                    checked={securitySettings.twoFactorAuth}
                    onCheckedChange={(checked) => setSecuritySettings({ ...securitySettings, twoFactorAuth: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="requireStrongPassword">Senhas Fortes Obrigatórias</Label>
                    <p className="text-sm text-gray-500">
                      Exigir senhas com pelo menos 8 caracteres, números e símbolos
                    </p>
                  </div>
                  <Switch
                    id="requireStrongPassword"
                    checked={securitySettings.requireStrongPassword}
                    onCheckedChange={(checked) =>
                      setSecuritySettings({ ...securitySettings, requireStrongPassword: checked })
                    }
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="sessionTimeout">Timeout de Sessão (minutos)</Label>
                  <Select
                    value={securitySettings.sessionTimeout}
                    onValueChange={(value) => setSecuritySettings({ ...securitySettings, sessionTimeout: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15 minutos</SelectItem>
                      <SelectItem value="30">30 minutos</SelectItem>
                      <SelectItem value="60">1 hora</SelectItem>
                      <SelectItem value="120">2 horas</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="passwordExpiry">Expiração de Senha (dias)</Label>
                  <Select
                    value={securitySettings.passwordExpiry}
                    onValueChange={(value) => setSecuritySettings({ ...securitySettings, passwordExpiry: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30">30 dias</SelectItem>
                      <SelectItem value="60">60 dias</SelectItem>
                      <SelectItem value="90">90 dias</SelectItem>
                      <SelectItem value="never">Nunca</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="loginAttempts">Tentativas de Login</Label>
                  <Select
                    value={securitySettings.loginAttempts}
                    onValueChange={(value) => setSecuritySettings({ ...securitySettings, loginAttempts: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="3">3 tentativas</SelectItem>
                      <SelectItem value="5">5 tentativas</SelectItem>
                      <SelectItem value="10">10 tentativas</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="rounded-lg bg-yellow-50 p-4 border border-yellow-200">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-yellow-800">Atenção</h4>
                    <p className="text-sm text-yellow-700">
                      Alterações nas configurações de segurança podem afetar o acesso ao sistema. Certifique-se de que
                      você tem acesso alternativo antes de fazer mudanças críticas.
                    </p>
                  </div>
                </div>
              </div>

              <Button onClick={() => handleSave("segurança")} disabled={isLoading} className="flex items-center gap-2">
                <Save className="h-4 w-4" />
                {isLoading ? "Salvando..." : "Salvar Configurações"}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="email" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Configurações de Email
              </CardTitle>
              <CardDescription>Configure o servidor SMTP para envio de emails</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="smtpHost">Servidor SMTP</Label>
                  <Input
                    id="smtpHost"
                    value={emailSettings.smtpHost}
                    onChange={(e) => setEmailSettings({ ...emailSettings, smtpHost: e.target.value })}
                    placeholder="smtp.gmail.com"
                  />
                </div>
                <div>
                  <Label htmlFor="smtpPort">Porta SMTP</Label>
                  <Input
                    id="smtpPort"
                    value={emailSettings.smtpPort}
                    onChange={(e) => setEmailSettings({ ...emailSettings, smtpPort: e.target.value })}
                    placeholder="587"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="smtpUsername">Usuário SMTP</Label>
                  <Input
                    id="smtpUsername"
                    value={emailSettings.smtpUsername}
                    onChange={(e) => setEmailSettings({ ...emailSettings, smtpUsername: e.target.value })}
                    placeholder="usuario@exemplo.com"
                  />
                </div>
                <div>
                  <Label htmlFor="smtpPassword">Senha SMTP</Label>
                  <div className="relative">
                    <Input
                      id="smtpPassword"
                      type={showPassword ? "text" : "password"}
                      value={emailSettings.smtpPassword}
                      onChange={(e) => setEmailSettings({ ...emailSettings, smtpPassword: e.target.value })}
                      placeholder="••••••••"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="fromName">Nome do Remetente</Label>
                  <Input
                    id="fromName"
                    value={emailSettings.fromName}
                    onChange={(e) => setEmailSettings({ ...emailSettings, fromName: e.target.value })}
                    placeholder="Projeto Metanoia"
                  />
                </div>
                <div>
                  <Label htmlFor="fromEmail">Email do Remetente</Label>
                  <Input
                    id="fromEmail"
                    type="email"
                    value={emailSettings.fromEmail}
                    onChange={(e) => setEmailSettings({ ...emailSettings, fromEmail: e.target.value })}
                    placeholder="noreply@projetometanoia.org.br"
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <Button onClick={() => handleSave("email")} disabled={isLoading} className="flex items-center gap-2">
                  <Save className="h-4 w-4" />
                  {isLoading ? "Salvando..." : "Salvar Configurações"}
                </Button>
                <Button variant="outline" className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Testar Email
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5" />
                Configurações de Aparência
              </CardTitle>
              <CardDescription>Personalize a aparência do site</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="primaryColor">Cor Primária</Label>
                  <div className="flex gap-2">
                    <Input
                      id="primaryColor"
                      type="color"
                      value={themeSettings.primaryColor}
                      onChange={(e) => setThemeSettings({ ...themeSettings, primaryColor: e.target.value })}
                      className="w-16 h-10"
                    />
                    <Input
                      value={themeSettings.primaryColor}
                      onChange={(e) => setThemeSettings({ ...themeSettings, primaryColor: e.target.value })}
                      placeholder="#1e3a8a"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="secondaryColor">Cor Secundária</Label>
                  <div className="flex gap-2">
                    <Input
                      id="secondaryColor"
                      type="color"
                      value={themeSettings.secondaryColor}
                      onChange={(e) => setThemeSettings({ ...themeSettings, secondaryColor: e.target.value })}
                      className="w-16 h-10"
                    />
                    <Input
                      value={themeSettings.secondaryColor}
                      onChange={(e) => setThemeSettings({ ...themeSettings, secondaryColor: e.target.value })}
                      placeholder="#f97316"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="darkMode">Modo Escuro</Label>
                  <p className="text-sm text-gray-500">Ativar tema escuro por padrão</p>
                </div>
                <Switch
                  id="darkMode"
                  checked={themeSettings.darkMode}
                  onCheckedChange={(checked) => setThemeSettings({ ...themeSettings, darkMode: checked })}
                />
              </div>

              <div>
                <Label htmlFor="customLogo">Logo Personalizado</Label>
                <div className="mt-1 flex items-center gap-2">
                  <Input id="customLogo" type="file" accept="image/*" />
                  <Button variant="outline" size="sm">
                    <Upload className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-sm text-gray-500 mt-1">Recomendado: PNG ou SVG, máximo 2MB</p>
              </div>

              <div>
                <Label htmlFor="favicon">Favicon</Label>
                <div className="mt-1 flex items-center gap-2">
                  <Input id="favicon" type="file" accept="image/*" />
                  <Button variant="outline" size="sm">
                    <Upload className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-sm text-gray-500 mt-1">Recomendado: ICO ou PNG 32x32px</p>
              </div>

              <Button onClick={() => handleSave("aparência")} disabled={isLoading} className="flex items-center gap-2">
                <Save className="h-4 w-4" />
                {isLoading ? "Salvando..." : "Salvar Configurações"}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="system" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                Configurações do Sistema
              </CardTitle>
              <CardDescription>Backup, restauração e manutenção do sistema</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Informações do Sistema */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Versão do Sistema</Label>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">v2.1.0</Badge>
                    <Badge variant="secondary">Estável</Badge>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Última Atualização</Label>
                  <p className="text-sm text-gray-600">15 de Janeiro, 2025</p>
                </div>
                <div className="space-y-2">
                  <Label>Espaço em Disco</Label>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>Usado: 2.3 GB</span>
                      <span>Disponível: 7.7 GB</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: "23%" }}></div>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Status do Banco</Label>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-green-600">Online</span>
                  </div>
                </div>
              </div>

              {/* Ações de Sistema */}
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Button variant="outline" onClick={handleBackup} disabled={isLoading} className="h-20 flex-col gap-2">
                    <Download className="h-6 w-6" />
                    <span>Criar Backup</span>
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleRestore}
                    disabled={isLoading}
                    className="h-20 flex-col gap-2"
                  >
                    <Upload className="h-6 w-6" />
                    <span>Restaurar Backup</span>
                  </Button>
                </div>

                <div className="rounded-lg bg-red-50 p-4 border border-red-200">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
                    <div className="flex-1">
                      <h4 className="font-medium text-red-800">Zona de Perigo</h4>
                      <p className="text-sm text-red-700 mb-3">
                        As ações abaixo são irreversíveis e podem causar perda de dados.
                      </p>
                      <div className="flex gap-2">
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="destructive" size="sm" className="flex items-center gap-2">
                              <Trash2 className="h-4 w-4" />
                              Limpar Cache
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Limpar Cache do Sistema</AlertDialogTitle>
                              <AlertDialogDescription>
                                Esta ação irá limpar todo o cache do sistema. O site pode ficar temporariamente mais
                                lento até o cache ser reconstruído.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancelar</AlertDialogCancel>
                              <AlertDialogAction>Limpar Cache</AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>

                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="destructive" size="sm" className="flex items-center gap-2">
                              <Database className="h-4 w-4" />
                              Reset Database
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Resetar Banco de Dados</AlertDialogTitle>
                              <AlertDialogDescription>
                                <strong>ATENÇÃO:</strong> Esta ação irá apagar TODOS os dados do sistema, incluindo
                                usuários, eventos, mensagens e configurações. Esta ação é IRREVERSÍVEL.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancelar</AlertDialogCancel>
                              <AlertDialogAction className="bg-red-600 hover:bg-red-700">
                                Confirmar Reset
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Logs do Sistema */}
              <div>
                <Label>Logs Recentes do Sistema</Label>
                <div className="mt-2 space-y-2 max-h-40 overflow-y-auto bg-gray-50 p-3 rounded-lg">
                  <div className="text-xs text-gray-600">
                    <span className="text-green-600">[INFO]</span> 2025-01-25 14:30:15 - Sistema iniciado com sucesso
                  </div>
                  <div className="text-xs text-gray-600">
                    <span className="text-blue-600">[DEBUG]</span> 2025-01-25 14:25:10 - Backup automático criado
                  </div>
                  <div className="text-xs text-gray-600">
                    <span className="text-yellow-600">[WARN]</span> 2025-01-25 14:20:05 - Cache próximo do limite
                  </div>
                  <div className="text-xs text-gray-600">
                    <span className="text-green-600">[INFO]</span> 2025-01-25 14:15:00 - Usuário admin fez login
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
