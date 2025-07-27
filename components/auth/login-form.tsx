"use client"

import type React from "react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  Mail,
  Eye,
  EyeOff,
  AlertCircle,
  CheckCircle,
  Heart,
  Sparkles,
  Shield,
  User,
  Lock,
  ArrowRight,
} from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

export default function LoginForm() {
  const { signInWithGoogle, signInWithEmail, signUpWithEmail, resetPassword } = useAuth()
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [activeTab, setActiveTab] = useState("login")

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  })

  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const [resetEmail, setResetEmail] = useState("")

  const router = useRouter()

  const handleGoogleLogin = async () => {
    try {
      setLoading(true)
      setError("")
      await signInWithGoogle()
      router.push("/admin")
    } catch (error: any) {
      setError(getErrorMessage(error.code))
    } finally {
      setLoading(false)
    }
  }

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      await signInWithEmail(loginData.email, loginData.password)
      router.push("/admin")
    } catch (error: any) {
      setError(getErrorMessage(error.code))
    } finally {
      setLoading(false)
    }
  }

  const handleEmailSignup = async (e: React.FormEvent) => {
    e.preventDefault()

    if (signupData.password !== signupData.confirmPassword) {
      setError("As senhas não coincidem")
      return
    }

    if (signupData.password.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres")
      return
    }

    try {
      setLoading(true)
      setError("")
      await signUpWithEmail(signupData.email, signupData.password, signupData.name)
    } catch (error: any) {
      setError(getErrorMessage(error.code))
    } finally {
      setLoading(false)
    }
  }

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setLoading(true)
      setError("")
      setSuccess("")
      await resetPassword(resetEmail)
      setSuccess("Email de recuperação enviado! Verifique sua caixa de entrada.")
      setResetEmail("")
    } catch (error: any) {
      setError(getErrorMessage(error.code))
    } finally {
      setLoading(false)
    }
  }

  const getErrorMessage = (errorCode: string) => {
    switch (errorCode) {
      case "auth/user-not-found":
        return "Usuário não encontrado"
      case "auth/wrong-password":
        return "Senha incorreta"
      case "auth/email-already-in-use":
        return "Este email já está em uso"
      case "auth/weak-password":
        return "A senha é muito fraca"
      case "auth/invalid-email":
        return "Email inválido"
      case "auth/too-many-requests":
        return "Muitas tentativas. Tente novamente mais tarde"
      default:
        return "Erro ao fazer login. Tente novamente."
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-gray-50 to-orange-50 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Enhanced Background */}
      <div className="absolute inset-0 bg-mesh-gradient opacity-30"></div>
      <div className="absolute inset-0 bg-dot-pattern opacity-20"></div>

      {/* Floating elements with better animations */}
      <div className="absolute top-20 left-20 w-24 h-24 bg-orange-200/40 rounded-full blur-2xl animate-float"></div>
      <div
        className="absolute bottom-20 right-20 w-36 h-36 bg-blue-200/40 rounded-full blur-2xl animate-float"
        style={{ animationDelay: "2s" }}
      ></div>
      <div
        className="absolute top-1/2 left-10 w-20 h-20 bg-emerald-200/40 rounded-full blur-2xl animate-float"
        style={{ animationDelay: "4s" }}
      ></div>

      <div className="relative z-10 w-full max-w-lg animate-scale-in">
        <Card className="shadow-strong border-0 bg-white/90 backdrop-blur-xl overflow-hidden">
          {/* Enhanced Header */}
          <CardHeader className="text-center pb-8 pt-10 bg-gradient-to-br from-orange-50 to-white relative">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-100/50 to-transparent"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-center mb-6">
                <div className="relative">
                  <div className="absolute -inset-3 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full opacity-20 blur animate-pulse"></div>
                  <Heart className="h-16 w-16 text-orange-500 relative z-10" />
                </div>
              </div>
              <CardTitle className="text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent mb-3">
                Projeto Metanoia
              </CardTitle>
              <CardDescription className="text-gray-600 mb-4">
                <Badge className="px-4 py-2 bg-orange-100 text-orange-700 border-orange-200 shadow-soft">
                  <Shield className="mr-2 h-4 w-4" />
                  Painel Administrativo
                </Badge>
              </CardDescription>
              <p className="text-sm text-gray-500 max-w-sm mx-auto leading-relaxed">
                Acesse o sistema de gerenciamento de conteúdo e acompanhe o impacto do projeto na comunidade.
              </p>
            </div>
          </CardHeader>

          <CardContent className="px-10 pb-10">
            {error && (
              <Alert variant="destructive" className="mb-6 border-red-200 bg-red-50 animate-slide-in rounded-xl">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription className="text-red-800 font-medium">{error}</AlertDescription>
              </Alert>
            )}

            {success && (
              <Alert className="mb-6 border-emerald-200 bg-emerald-50 animate-slide-in rounded-xl">
                <CheckCircle className="h-4 w-4 text-emerald-600" />
                <AlertDescription className="text-emerald-800 font-medium">{success}</AlertDescription>
              </Alert>
            )}

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-8 bg-gray-100/80 p-1.5 rounded-2xl h-auto">
                <TabsTrigger
                  value="login"
                  className="rounded-xl font-medium py-3 data-[state=active]:bg-white data-[state=active]:shadow-soft transition-all duration-300"
                >
                  Entrar
                </TabsTrigger>
                <TabsTrigger
                  value="signup"
                  className="rounded-xl font-medium py-3 data-[state=active]:bg-white data-[state=active]:shadow-soft transition-all duration-300"
                >
                  Cadastrar
                </TabsTrigger>
                <TabsTrigger
                  value="reset"
                  className="rounded-xl font-medium py-3 data-[state=active]:bg-white data-[state=active]:shadow-soft transition-all duration-300"
                >
                  Recuperar
                </TabsTrigger>
              </TabsList>

              <TabsContent value="login" className="space-y-6 animate-fade-in">
                <form onSubmit={handleEmailLogin} className="space-y-6">
                  <div className="space-y-3">
                    <Label htmlFor="login-email" className="text-sm font-semibold text-gray-700 flex items-center">
                      <Mail className="mr-2 h-4 w-4 text-orange-500" />
                      Email
                    </Label>
                    <Input
                      id="login-email"
                      type="email"
                      value={loginData.email}
                      onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                      className="h-14 rounded-2xl border-gray-200 focus:border-orange-400 focus:ring-orange-400/20 transition-all duration-300 text-base"
                      placeholder="seu@email.com"
                      required
                    />
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="login-password" className="text-sm font-semibold text-gray-700 flex items-center">
                      <Lock className="mr-2 h-4 w-4 text-orange-500" />
                      Senha
                    </Label>
                    <div className="relative">
                      <Input
                        id="login-password"
                        type={showPassword ? "text" : "password"}
                        value={loginData.password}
                        onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                        className="h-14 rounded-2xl border-gray-200 focus:border-orange-400 focus:ring-orange-400/20 transition-all duration-300 pr-14 text-base"
                        placeholder="••••••••"
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-14 px-4 hover:bg-transparent rounded-r-2xl"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />
                        ) : (
                          <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />
                        )}
                      </Button>
                    </div>
                  </div>
                  <Button
                    type="submit"
                    className="w-full h-14 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold rounded-2xl shadow-medium hover:shadow-strong transition-all duration-500 group relative overflow-hidden"
                    disabled={loading}
                  >
                    <span className="relative z-10 flex items-center justify-center">
                      {loading ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                          Entrando...
                        </>
                      ) : (
                        <>
                          Entrar
                          <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                        </>
                      )}
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </Button>
                </form>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <Separator className="w-full bg-gray-200" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white px-6 text-gray-500 font-medium">Ou continue com</span>
                  </div>
                </div>

                <Button
                  onClick={handleGoogleLogin}
                  variant="outline"
                  className="w-full h-14 border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 rounded-2xl font-semibold transition-all duration-300 group relative overflow-hidden bg-transparent"
                  disabled={loading}
                >
                  <span className="relative z-10 flex items-center justify-center">
                    <svg
                      className="mr-4 h-6 w-6 group-hover:scale-110 transition-transform duration-300"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                    Entrar com Google
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-50 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </Button>
              </TabsContent>

              <TabsContent value="signup" className="space-y-6 animate-fade-in">
                <form onSubmit={handleEmailSignup} className="space-y-6">
                  <div className="space-y-3">
                    <Label htmlFor="signup-name" className="text-sm font-semibold text-gray-700 flex items-center">
                      <User className="mr-2 h-4 w-4 text-emerald-500" />
                      Nome completo
                    </Label>
                    <Input
                      id="signup-name"
                      type="text"
                      value={signupData.name}
                      onChange={(e) => setSignupData({ ...signupData, name: e.target.value })}
                      className="h-14 rounded-2xl border-gray-200 focus:border-emerald-400 focus:ring-emerald-400/20 transition-all duration-300 text-base"
                      placeholder="Seu nome completo"
                      required
                    />
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="signup-email" className="text-sm font-semibold text-gray-700 flex items-center">
                      <Mail className="mr-2 h-4 w-4 text-emerald-500" />
                      Email
                    </Label>
                    <Input
                      id="signup-email"
                      type="email"
                      value={signupData.email}
                      onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                      className="h-14 rounded-2xl border-gray-200 focus:border-emerald-400 focus:ring-emerald-400/20 transition-all duration-300 text-base"
                      placeholder="seu@email.com"
                      required
                    />
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="signup-password" className="text-sm font-semibold text-gray-700 flex items-center">
                      <Lock className="mr-2 h-4 w-4 text-emerald-500" />
                      Senha
                    </Label>
                    <Input
                      id="signup-password"
                      type="password"
                      value={signupData.password}
                      onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                      className="h-14 rounded-2xl border-gray-200 focus:border-emerald-400 focus:ring-emerald-400/20 transition-all duration-300 text-base"
                      placeholder="••••••••"
                      required
                      minLength={6}
                    />
                    <p className="text-xs text-gray-500 flex items-center mt-2">
                      <Sparkles className="mr-1 h-3 w-3" />
                      Mínimo de 6 caracteres para maior segurança
                    </p>
                  </div>
                  <div className="space-y-3">
                    <Label
                      htmlFor="signup-confirm-password"
                      className="text-sm font-semibold text-gray-700 flex items-center"
                    >
                      <Lock className="mr-2 h-4 w-4 text-emerald-500" />
                      Confirmar senha
                    </Label>
                    <Input
                      id="signup-confirm-password"
                      type="password"
                      value={signupData.confirmPassword}
                      onChange={(e) => setSignupData({ ...signupData, confirmPassword: e.target.value })}
                      className="h-14 rounded-2xl border-gray-200 focus:border-emerald-400 focus:ring-emerald-400/20 transition-all duration-300 text-base"
                      placeholder="••••••••"
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full h-14 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-semibold rounded-2xl shadow-medium hover:shadow-strong transition-all duration-500 group relative overflow-hidden"
                    disabled={loading}
                  >
                    <span className="relative z-10 flex items-center justify-center">
                      {loading ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                          Criando conta...
                        </>
                      ) : (
                        <>
                          Criar conta
                          <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                        </>
                      )}
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="reset" className="space-y-6 animate-fade-in">
                <form onSubmit={handlePasswordReset} className="space-y-6">
                  <div className="space-y-3">
                    <Label htmlFor="reset-email" className="text-sm font-semibold text-gray-700 flex items-center">
                      <Mail className="mr-2 h-4 w-4 text-blue-500" />
                      Email
                    </Label>
                    <Input
                      id="reset-email"
                      type="email"
                      value={resetEmail}
                      onChange={(e) => setResetEmail(e.target.value)}
                      className="h-14 rounded-2xl border-gray-200 focus:border-blue-400 focus:ring-blue-400/20 transition-all duration-300 text-base"
                      placeholder="Digite seu email"
                      required
                    />
                    <p className="text-xs text-gray-500 flex items-center mt-2">
                      <Sparkles className="mr-1 h-3 w-3" />
                      Enviaremos um link seguro para redefinir sua senha
                    </p>
                  </div>
                  <Button
                    type="submit"
                    className="w-full h-14 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold rounded-2xl shadow-medium hover:shadow-strong transition-all duration-500 group relative overflow-hidden"
                    disabled={loading}
                  >
                    <span className="relative z-10 flex items-center justify-center">
                      <Mail className="mr-3 h-5 w-5" />
                      {loading ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                          Enviando...
                        </>
                      ) : (
                        <>
                          Enviar link de recuperação
                          <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                        </>
                      )}
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Additional info */}
        <div className="mt-8 text-center animate-fade-in" style={{ animationDelay: "300ms" }}>
          <p className="text-sm text-gray-500">
            Problemas para acessar?{" "}
            <a
              href="/contato"
              className="text-orange-600 hover:text-orange-700 font-medium transition-colors duration-200"
            >
              Entre em contato conosco
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
