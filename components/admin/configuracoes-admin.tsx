"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Save, Mail, Scale, FileText } from "lucide-react"
import { useConfiguracoes } from "@/hooks/use-configuracoes"

export default function ConfiguracoesAdmin() {
  const { configuracoes, loading, updateConfiguracoes } = useConfiguracoes()
  const [saving, setSaving] = useState(false)
  const [activeTab, setActiveTab] = useState("contato")

  const [formData, setFormData] = useState({
    contato: {
      email: configuracoes.contato.email,
      telefone: configuracoes.contato.telefone,
      endereco: configuracoes.contato.endereco,
    },
    juridico: {
      razaoSocial: configuracoes.juridico.razaoSocial,
      cnpj: configuracoes.juridico.cnpj,
      enderecoCompleto: configuracoes.juridico.enderecoCompleto,
      responsavelLegal: configuracoes.juridico.responsavelLegal,
      emailJuridico: configuracoes.juridico.emailJuridico,
      telefoneJuridico: configuracoes.juridico.telefoneJuridico,
    },
    redes: {
      facebook: configuracoes.redes.facebook,
      instagram: configuracoes.redes.instagram,
      youtube: configuracoes.redes.youtube,
      whatsapp: configuracoes.redes.whatsapp,
      telegram: configuracoes.redes.telegram,
      discord: configuracoes.redes.discord,
      linkCustom1: {
        nome: configuracoes.redes.linkCustom1.nome,
        url: configuracoes.redes.linkCustom1.url,
      },
      linkCustom2: {
        nome: configuracoes.redes.linkCustom2.nome,
        url: configuracoes.redes.linkCustom2.url,
      },
    },
  })

  // Atualizar formData quando configuracoes mudar
  useState(() => {
    if (!loading) {
      setFormData({
        contato: {
          email: configuracoes.contato.email,
          telefone: configuracoes.contato.telefone,
          endereco: configuracoes.contato.endereco,
        },
        juridico: {
          razaoSocial: configuracoes.juridico.razaoSocial,
          cnpj: configuracoes.juridico.cnpj,
          enderecoCompleto: configuracoes.juridico.enderecoCompleto,
          responsavelLegal: configuracoes.juridico.responsavelLegal,
          emailJuridico: configuracoes.juridico.emailJuridico,
          telefoneJuridico: configuracoes.juridico.telefoneJuridico,
        },
        redes: {
          facebook: configuracoes.redes.facebook,
          instagram: configuracoes.redes.instagram,
          youtube: configuracoes.redes.youtube,
          whatsapp: configuracoes.redes.whatsapp,
          telegram: configuracoes.redes.telegram,
          discord: configuracoes.redes.discord,
          linkCustom1: {
            nome: configuracoes.redes.linkCustom1.nome,
            url: configuracoes.redes.linkCustom1.url,
          },
          linkCustom2: {
            nome: configuracoes.redes.linkCustom2.nome,
            url: configuracoes.redes.linkCustom2.url,
          },
        },
      })
    }
  })

  const handleSave = async () => {
    setSaving(true)
    try {
      const success = await updateConfiguracoes(formData)
      if (success) {
        alert("Configurações salvas com sucesso!")
      } else {
        alert("Erro ao salvar configurações. Tente novamente.")
      }
    } catch (error) {
      console.error("Erro ao salvar:", error)
      alert("Erro ao salvar configurações. Tente novamente.")
    } finally {
      setSaving(false)
    }
  }

  const handleChange = (section: string, field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [field]: value,
      },
    }))
  }

  const handleNestedChange = (section: string, nested: string, field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [nested]: {
          ...(prev[section as keyof typeof prev] as any)[nested],
          [field]: value,
        },
      },
    }))
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Configurações</h2>
          <p className="text-gray-600 mt-1">Gerencie as configurações gerais do sistema</p>
        </div>
        <Button onClick={handleSave} disabled={saving}>
          <Save className="h-4 w-4 mr-2" />
          {saving ? "Salvando..." : "Salvar Alterações"}
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="contato">Contato</TabsTrigger>
          <TabsTrigger value="juridico">Jurídico</TabsTrigger>
          <TabsTrigger value="redes">Redes Sociais</TabsTrigger>
        </TabsList>

        <TabsContent value="contato" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Mail className="h-5 w-5 mr-2" />
                Informações de Contato
              </CardTitle>
              <CardDescription>Configure as informações de contato da organização</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="email">Email Principal</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.contato.email}
                  onChange={(e) => handleChange("contato", "email", e.target.value)}
                  placeholder="contato@projetometanoia.com.br"
                />
              </div>

              <div>
                <Label htmlFor="telefone">Telefone</Label>
                <Input
                  id="telefone"
                  value={formData.contato.telefone}
                  onChange={(e) => handleChange("contato", "telefone", e.target.value)}
                  placeholder="(61) 98319-4827"
                />
              </div>

              <div>
                <Label htmlFor="endereco">Endereço</Label>
                <Textarea
                  id="endereco"
                  value={formData.contato.endereco}
                  onChange={(e) => handleChange("contato", "endereco", e.target.value)}
                  placeholder="Brasília, DF"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="juridico" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Scale className="h-5 w-5 mr-2" />
                Informações Jurídicas
              </CardTitle>
              <CardDescription>
                Configure os dados jurídicos para Termos de Uso e Política de Privacidade
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="razaoSocial">Razão Social / Nome da Organização</Label>
                  <Input
                    id="razaoSocial"
                    value={formData.juridico.razaoSocial}
                    onChange={(e) => handleChange("juridico", "razaoSocial", e.target.value)}
                    placeholder="Projeto Metanoia: mudança de mentalidade"
                  />
                </div>

                <div>
                  <Label htmlFor="cnpj">CNPJ (opcional)</Label>
                  <Input
                    id="cnpj"
                    value={formData.juridico.cnpj}
                    onChange={(e) => handleChange("juridico", "cnpj", e.target.value)}
                    placeholder="00.000.000/0000-00"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="enderecoCompleto">Endereço Completo</Label>
                <Textarea
                  id="enderecoCompleto"
                  value={formData.juridico.enderecoCompleto}
                  onChange={(e) => handleChange("juridico", "enderecoCompleto", e.target.value)}
                  placeholder="Rua, número, bairro, cidade, estado, CEP"
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="responsavelLegal">Responsável Legal (opcional)</Label>
                <Input
                  id="responsavelLegal"
                  value={formData.juridico.responsavelLegal}
                  onChange={(e) => handleChange("juridico", "responsavelLegal", e.target.value)}
                  placeholder="Nome do responsável legal"
                />
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-3 flex items-center">
                  <FileText className="h-4 w-4 mr-2" />
                  Contatos para Questões Jurídicas
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="emailJuridico">Email Jurídico</Label>
                    <Input
                      id="emailJuridico"
                      type="email"
                      value={formData.juridico.emailJuridico}
                      onChange={(e) => handleChange("juridico", "emailJuridico", e.target.value)}
                      placeholder="juridico@projetometanoia.com.br"
                    />
                    <p className="text-xs text-blue-600 mt-1">Para exercer direitos LGPD</p>
                  </div>

                  <div>
                    <Label htmlFor="telefoneJuridico">Telefone Jurídico</Label>
                    <Input
                      id="telefoneJuridico"
                      value={formData.juridico.telefoneJuridico}
                      onChange={(e) => handleChange("juridico", "telefoneJuridico", e.target.value)}
                      placeholder="(61) 98319-4827"
                    />
                    <p className="text-xs text-blue-600 mt-1">Para questões de privacidade</p>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-2">ℹ️ Como estes dados são usados:</h4>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>
                    • <strong>Razão Social:</strong> Aparece nos Termos de Uso e Política de Privacidade
                  </li>
                  <li>
                    • <strong>Endereço:</strong> Usado nas páginas jurídicas para identificação da organização
                  </li>
                  <li>
                    • <strong>Contatos Jurídicos:</strong> Para usuários exercerem direitos da LGPD
                  </li>
                  <li>
                    • <strong>Responsável Legal:</strong> Identificação do responsável pelo tratamento de dados
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="redes" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Redes Sociais</CardTitle>
              <CardDescription>Configure os links das redes sociais da organização</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="facebook">Facebook</Label>
                  <Input
                    id="facebook"
                    type="url"
                    value={formData.redes.facebook}
                    onChange={(e) => handleChange("redes", "facebook", e.target.value)}
                    placeholder="https://facebook.com/projetometanoia"
                  />
                </div>

                <div>
                  <Label htmlFor="instagram">Instagram</Label>
                  <Input
                    id="instagram"
                    type="url"
                    value={formData.redes.instagram}
                    onChange={(e) => handleChange("redes", "instagram", e.target.value)}
                    placeholder="https://instagram.com/projetometanoia"
                  />
                </div>

                <div>
                  <Label htmlFor="youtube">YouTube</Label>
                  <Input
                    id="youtube"
                    type="url"
                    value={formData.redes.youtube}
                    onChange={(e) => handleChange("redes", "youtube", e.target.value)}
                    placeholder="https://youtube.com/@projetometanoia"
                  />
                </div>

                <div>
                  <Label htmlFor="whatsapp">WhatsApp</Label>
                  <Input
                    id="whatsapp"
                    value={formData.redes.whatsapp}
                    onChange={(e) => handleChange("redes", "whatsapp", e.target.value)}
                    placeholder="(61) 98319-4827"
                  />
                </div>

                <div>
                  <Label htmlFor="telegram">Telegram</Label>
                  <Input
                    id="telegram"
                    type="url"
                    value={formData.redes.telegram}
                    onChange={(e) => handleChange("redes", "telegram", e.target.value)}
                    placeholder="https://t.me/projetometanoia"
                  />
                </div>

                <div>
                  <Label htmlFor="discord">Discord</Label>
                  <Input
                    id="discord"
                    type="url"
                    value={formData.redes.discord}
                    onChange={(e) => handleChange("redes", "discord", e.target.value)}
                    placeholder="https://discord.gg/projetometanoia"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold">Links Personalizados</h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="linkCustom1Nome">Nome do Link 1</Label>
                    <Input
                      id="linkCustom1Nome"
                      value={formData.redes.linkCustom1.nome}
                      onChange={(e) => handleNestedChange("redes", "linkCustom1", "nome", e.target.value)}
                      placeholder="Ex: Site Oficial"
                    />
                  </div>
                  <div>
                    <Label htmlFor="linkCustom1Url">URL do Link 1</Label>
                    <Input
                      id="linkCustom1Url"
                      type="url"
                      value={formData.redes.linkCustom1.url}
                      onChange={(e) => handleNestedChange("redes", "linkCustom1", "url", e.target.value)}
                      placeholder="https://exemplo.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="linkCustom2Nome">Nome do Link 2</Label>
                    <Input
                      id="linkCustom2Nome"
                      value={formData.redes.linkCustom2.nome}
                      onChange={(e) => handleNestedChange("redes", "linkCustom2", "nome", e.target.value)}
                      placeholder="Ex: Blog"
                    />
                  </div>
                  <div>
                    <Label htmlFor="linkCustom2Url">URL do Link 2</Label>
                    <Input
                      id="linkCustom2Url"
                      type="url"
                      value={formData.redes.linkCustom2.url}
                      onChange={(e) => handleNestedChange("redes", "linkCustom2", "url", e.target.value)}
                      placeholder="https://blog.exemplo.com"
                    />
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
