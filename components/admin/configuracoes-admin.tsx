"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Save, Settings, Palette, Mail, Shield } from "lucide-react"
import { doc, getDoc, setDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"

interface Configuracoes {
  site: {
    nome: string
    descricao: string
    logo: string
    favicon: string
    manutencao: boolean
  }
  contato: {
    email: string
    telefone: string
    endereco: string
    horarioFuncionamento: string
  }
  redes: {
    facebook: string
    instagram: string
    youtube: string
    linkedin: string
  }
  email: {
    smtp: {
      host: string
      port: number
      usuario: string
      senha: string
      ssl: boolean
    }
    templates: {
      boas_vindas: string
      confirmacao: string
      recuperacao_senha: string
    }
  }
  tema: {
    corPrimaria: string
    corSecundaria: string
    corTexto: string
    corFundo: string
  }
}

export function ConfiguracoesAdmin() {
  const [configuracoes, setConfiguracoes] = useState<Configuracoes>({
    site: {
      nome: "Projeto Metanoia",
      descricao: "Transformando vidas através da educação e desenvolvimento pessoal",
      logo: "",
      favicon: "",
      manutencao: false,
    },
    contato: {
      email: "contato@projetometanoia.com",
      telefone: "(11) 99999-9999",
      endereco: "São Paulo, SP",
      horarioFuncionamento: "Segunda a Sexta: 9h às 18h",
    },
    redes: {
      facebook: "",
      instagram: "",
      youtube: "",
      linkedin: "",
    },
    email: {
      smtp: {
        host: "",
        port: 587,
        usuario: "",
        senha: "",
        ssl: true,
      },
      templates: {
        boas_vindas: "",
        confirmacao: "",
        recuperacao_senha: "",
      },
    },
    tema: {
      corPrimaria: "#3B82F6",
      corSecundaria: "#10B981",
      corTexto: "#1F2937",
      corFundo: "#FFFFFF",
    },
  })
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("site")

  useEffect(() => {
    fetchConfiguracoes()
  }, [])

  const fetchConfiguracoes = async () => {
    try {
      const docRef = doc(db, "configuracoes", "geral")
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        setConfiguracoes({ ...configuracoes, ...docSnap.data() })
      }
    } catch (error) {
      console.error("Erro ao buscar configurações:", error)
    }
  }

  const handleSave = async () => {
    setLoading(true)
    try {
      await setDoc(doc(db, "configuracoes", "geral"), configuracoes)
      alert("Configurações salvas com sucesso!")
    } catch (error) {
      console.error("Erro ao salvar configurações:", error)
      alert("Erro ao salvar configurações. Tente novamente.")
    } finally {
      setLoading(false)
    }
  }

  const updateConfig = (section: keyof Configuracoes, field: string, value: any) => {
    setConfiguracoes((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }))
  }

  const updateNestedConfig = (section: keyof Configuracoes, subsection: string, field: string, value: any) => {
    setConfiguracoes((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [subsection]: {
          ...(prev[section] as any)[subsection],
          [field]: value,
        },
      },
    }))
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Configurações do Sistema</h2>
        <Button onClick={handleSave} disabled={loading}>
          <Save className="h-4 w-4 mr-2" />
          {loading ? "Salvando..." : "Salvar Alterações"}
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="site">Site</TabsTrigger>
          <TabsTrigger value="contato">Contato</TabsTrigger>
          <TabsTrigger value="email">Email</TabsTrigger>
          <TabsTrigger value="tema">Tema</TabsTrigger>
          <TabsTrigger value="avancado">Avançado</TabsTrigger>
        </TabsList>

        <TabsContent value="site">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Configurações do Site
              </CardTitle>
              <CardDescription>Configure as informações básicas do site</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="nome">Nome do Site</Label>
                  <Input
                    id="nome"
                    value={configuracoes.site.nome}
                    onChange={(e) => updateConfig("site", "nome", e.target.value)}
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="manutencao"
                    checked={configuracoes.site.manutencao}
                    onCheckedChange={(checked) => updateConfig("site", "manutencao", checked)}
                  />
                  <Label htmlFor="manutencao">Modo Manutenção</Label>
                </div>
              </div>

              <div>
                <Label htmlFor="descricao">Descrição</Label>
                <Textarea
                  id="descricao"
                  value={configuracoes.site.descricao}
                  onChange={(e) => updateConfig("site", "descricao", e.target.value)}
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="logo">URL do Logo</Label>
                  <Input
                    id="logo"
                    value={configuracoes.site.logo}
                    onChange={(e) => updateConfig("site", "logo", e.target.value)}
                    placeholder="https://exemplo.com/logo.png"
                  />
                </div>
                <div>
                  <Label htmlFor="favicon">URL do Favicon</Label>
                  <Input
                    id="favicon"
                    value={configuracoes.site.favicon}
                    onChange={(e) => updateConfig("site", "favicon", e.target.value)}
                    placeholder="https://exemplo.com/favicon.ico"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contato">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Informações de Contato
              </CardTitle>
              <CardDescription>Configure as informações de contato e redes sociais</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={configuracoes.contato.email}
                    onChange={(e) => updateConfig("contato", "email", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="telefone">Telefone</Label>
                  <Input
                    id="telefone"
                    value={configuracoes.contato.telefone}
                    onChange={(e) => updateConfig("contato", "telefone", e.target.value)}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="endereco">Endereço</Label>
                <Input
                  id="endereco"
                  value={configuracoes.contato.endereco}
                  onChange={(e) => updateConfig("contato", "endereco", e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="horario">Horário de Funcionamento</Label>
                <Input
                  id="horario"
                  value={configuracoes.contato.horarioFuncionamento}
                  onChange={(e) => updateConfig("contato", "horarioFuncionamento", e.target.value)}
                />
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Redes Sociais</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="facebook">Facebook</Label>
                    <Input
                      id="facebook"
                      value={configuracoes.redes.facebook}
                      onChange={(e) => updateConfig("redes", "facebook", e.target.value)}
                      placeholder="https://facebook.com/seu-perfil"
                    />
                  </div>
                  <div>
                    <Label htmlFor="instagram">Instagram</Label>
                    <Input
                      id="instagram"
                      value={configuracoes.redes.instagram}
                      onChange={(e) => updateConfig("redes", "instagram", e.target.value)}
                      placeholder="https://instagram.com/seu-perfil"
                    />
                  </div>
                  <div>
                    <Label htmlFor="youtube">YouTube</Label>
                    <Input
                      id="youtube"
                      value={configuracoes.redes.youtube}
                      onChange={(e) => updateConfig("redes", "youtube", e.target.value)}
                      placeholder="https://youtube.com/seu-canal"
                    />
                  </div>
                  <div>
                    <Label htmlFor="linkedin">LinkedIn</Label>
                    <Input
                      id="linkedin"
                      value={configuracoes.redes.linkedin}
                      onChange={(e) => updateConfig("redes", "linkedin", e.target.value)}
                      placeholder="https://linkedin.com/company/sua-empresa"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="email">
          <Card>
            <CardHeader>
              <CardTitle>Configurações de Email</CardTitle>
              <CardDescription>Configure o servidor SMTP e templates de email</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Servidor SMTP</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="smtp-host">Host</Label>
                    <Input
                      id="smtp-host"
                      value={configuracoes.email.smtp.host}
                      onChange={(e) => updateNestedConfig("email", "smtp", "host", e.target.value)}
                      placeholder="smtp.gmail.com"
                    />
                  </div>
                  <div>
                    <Label htmlFor="smtp-port">Porta</Label>
                    <Input
                      id="smtp-port"
                      type="number"
                      value={configuracoes.email.smtp.port}
                      onChange={(e) => updateNestedConfig("email", "smtp", "port", Number.parseInt(e.target.value))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="smtp-usuario">Usuário</Label>
                    <Input
                      id="smtp-usuario"
                      value={configuracoes.email.smtp.usuario}
                      onChange={(e) => updateNestedConfig("email", "smtp", "usuario", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="smtp-senha">Senha</Label>
                    <Input
                      id="smtp-senha"
                      type="password"
                      value={configuracoes.email.smtp.senha}
                      onChange={(e) => updateNestedConfig("email", "smtp", "senha", e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="smtp-ssl"
                    checked={configuracoes.email.smtp.ssl}
                    onCheckedChange={(checked) => updateNestedConfig("email", "smtp", "ssl", checked)}
                  />
                  <Label htmlFor="smtp-ssl">Usar SSL</Label>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tema">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5" />
                Personalização do Tema
              </CardTitle>
              <CardDescription>Customize as cores e aparência do site</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <Label htmlFor="cor-primaria">Cor Primária</Label>
                  <div className="flex gap-2">
                    <Input
                      id="cor-primaria"
                      type="color"
                      value={configuracoes.tema.corPrimaria}
                      onChange={(e) => updateConfig("tema", "corPrimaria", e.target.value)}
                      className="w-16 h-10"
                    />
                    <Input
                      value={configuracoes.tema.corPrimaria}
                      onChange={(e) => updateConfig("tema", "corPrimaria", e.target.value)}
                      className="flex-1"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="cor-secundaria">Cor Secundária</Label>
                  <div className="flex gap-2">
                    <Input
                      id="cor-secundaria"
                      type="color"
                      value={configuracoes.tema.corSecundaria}
                      onChange={(e) => updateConfig("tema", "corSecundaria", e.target.value)}
                      className="w-16 h-10"
                    />
                    <Input
                      value={configuracoes.tema.corSecundaria}
                      onChange={(e) => updateConfig("tema", "corSecundaria", e.target.value)}
                      className="flex-1"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="cor-texto">Cor do Texto</Label>
                  <div className="flex gap-2">
                    <Input
                      id="cor-texto"
                      type="color"
                      value={configuracoes.tema.corTexto}
                      onChange={(e) => updateConfig("tema", "corTexto", e.target.value)}
                      className="w-16 h-10"
                    />
                    <Input
                      value={configuracoes.tema.corTexto}
                      onChange={(e) => updateConfig("tema", "corTexto", e.target.value)}
                      className="flex-1"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="cor-fundo">Cor de Fundo</Label>
                  <div className="flex gap-2">
                    <Input
                      id="cor-fundo"
                      type="color"
                      value={configuracoes.tema.corFundo}
                      onChange={(e) => updateConfig("tema", "corFundo", e.target.value)}
                      className="w-16 h-10"
                    />
                    <Input
                      value={configuracoes.tema.corFundo}
                      onChange={(e) => updateConfig("tema", "corFundo", e.target.value)}
                      className="flex-1"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 border rounded-lg">
                <h4 className="font-semibold mb-2">Pré-visualização</h4>
                <div
                  className="p-4 rounded"
                  style={{
                    backgroundColor: configuracoes.tema.corFundo,
                    color: configuracoes.tema.corTexto,
                  }}
                >
                  <h3 style={{ color: configuracoes.tema.corPrimaria }}>Título Principal</h3>
                  <p>Este é um exemplo de texto normal no site.</p>
                  <button
                    className="px-4 py-2 rounded mt-2"
                    style={{
                      backgroundColor: configuracoes.tema.corPrimaria,
                      color: configuracoes.tema.corFundo,
                    }}
                  >
                    Botão Primário
                  </button>
                  <button
                    className="px-4 py-2 rounded mt-2 ml-2"
                    style={{
                      backgroundColor: configuracoes.tema.corSecundaria,
                      color: configuracoes.tema.corFundo,
                    }}
                  >
                    Botão Secundário
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="avancado">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Configurações Avançadas
              </CardTitle>
              <CardDescription>Configurações técnicas e de segurança</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <h4 className="font-semibold text-yellow-800 mb-2">⚠️ Atenção</h4>
                  <p className="text-yellow-700 text-sm">
                    As configurações desta seção são técnicas e podem afetar o funcionamento do site. Altere apenas se
                    souber o que está fazendo.
                  </p>
                </div>

                <div className="text-center py-8 text-gray-500">
                  <Shield className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Configurações avançadas serão implementadas em versões futuras.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default ConfiguracoesAdmin
