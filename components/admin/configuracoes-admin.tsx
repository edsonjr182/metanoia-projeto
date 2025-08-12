"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  Settings,
  Save,
  MapPin,
  Phone,
  Mail,
  Users,
  Award,
  Target,
  Instagram,
  Facebook,
  Twitter,
  Linkedin,
  Scale,
} from "lucide-react"
import { doc, getDoc, setDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"

interface ConfiguracoesSite {
  contato: {
    email: string
    telefone: string
    localizacao: string
  }
  redesSociais: {
    instagram: string
    facebook: string
    twitter: string
    linkedin: string
  }
  estatisticas: {
    jovensImpactados: string
    palestrasRealizadas: string
    parceriasAtivas: string
  }
  juridico: {
    razaoSocial: string
    cnpj: string
    enderecoCompleto: string
    responsavelLegal: string
    emailJuridico: string
    telefoneJuridico: string
  }
}

export default function ConfiguracoesAdmin() {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [configuracoes, setConfiguracoes] = useState<ConfiguracoesSite>({
    contato: {
      email: "contato@projetometanoia.com.br",
      telefone: "(61) 98319-4827",
      localizacao: "Brasília, DF",
    },
    redesSociais: {
      instagram: "#",
      facebook: "#",
      twitter: "#",
      linkedin: "#",
    },
    estatisticas: {
      jovensImpactados: "500+",
      palestrasRealizadas: "50+",
      parceriasAtivas: "20+",
    },
    juridico: {
      razaoSocial: "Projeto Metanoia: mudança de mentalidade",
      cnpj: "",
      enderecoCompleto: "Brasília, DF",
      responsavelLegal: "",
      emailJuridico: "juridico@projetometanoia.com.br",
      telefoneJuridico: "(61) 98319-4827",
    },
  })

  useEffect(() => {
    fetchConfiguracoes()
  }, [])

  const fetchConfiguracoes = async () => {
    try {
      const docRef = doc(db, "configuracoes", "site")
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        setConfiguracoes(docSnap.data() as ConfiguracoesSite)
      }
    } catch (error) {
      console.error("Erro ao buscar configurações:", error)
    }
  }

  const handleSave = async () => {
    setLoading(true)
    setSuccess(false)

    try {
      await setDoc(doc(db, "configuracoes", "site"), configuracoes)
      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    } catch (error) {
      console.error("Erro ao salvar configurações:", error)
      alert("Erro ao salvar configurações. Tente novamente.")
    } finally {
      setLoading(false)
    }
  }

  const handleContatoChange = (field: keyof ConfiguracoesSite["contato"], value: string) => {
    setConfiguracoes((prev) => ({
      ...prev,
      contato: {
        ...prev.contato,
        [field]: value,
      },
    }))
  }

  const handleRedesSociaisChange = (field: keyof ConfiguracoesSite["redesSociais"], value: string) => {
    setConfiguracoes((prev) => ({
      ...prev,
      redesSociais: {
        ...prev.redesSociais,
        [field]: value,
      },
    }))
  }

  const handleEstatisticasChange = (field: keyof ConfiguracoesSite["estatisticas"], value: string) => {
    setConfiguracoes((prev) => ({
      ...prev,
      estatisticas: {
        ...prev.estatisticas,
        [field]: value,
      },
    }))
  }

  const handleJuridicoChange = (field: keyof ConfiguracoesSite["juridico"], value: string) => {
    setConfiguracoes((prev) => ({
      ...prev,
      juridico: {
        ...prev.juridico,
        [field]: value,
      },
    }))
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold flex items-center">
            <Settings className="mr-3 h-6 w-6" />
            Configurações do Site
          </h2>
          <p className="text-gray-600 mt-1">Gerencie as informações gerais do site</p>
        </div>
        <div className="flex items-center space-x-3">
          {success && (
            <Badge className="bg-green-100 text-green-800 border-green-200">
              <Save className="mr-1 h-3 w-3" />
              Salvo com sucesso!
            </Badge>
          )}
          <Button onClick={handleSave} disabled={loading} className="bg-orange-500 hover:bg-orange-600">
            <Save className="mr-2 h-4 w-4" />
            {loading ? "Salvando..." : "Salvar Alterações"}
          </Button>
        </div>
      </div>

      <Tabs defaultValue="contato" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-gray-100 p-1 rounded-xl">
          <TabsTrigger value="contato" className="rounded-lg">
            <Mail className="mr-2 h-4 w-4" />
            Contato
          </TabsTrigger>
          <TabsTrigger value="redes" className="rounded-lg">
            <Instagram className="mr-2 h-4 w-4" />
            Redes Sociais
          </TabsTrigger>
          <TabsTrigger value="estatisticas" className="rounded-lg">
            <Users className="mr-2 h-4 w-4" />
            Estatísticas
          </TabsTrigger>
          <TabsTrigger value="juridico" className="rounded-lg">
            <Scale className="mr-2 h-4 w-4" />
            Jurídico
          </TabsTrigger>
        </TabsList>

        <TabsContent value="contato" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Mail className="mr-2 h-5 w-5 text-orange-500" />
                Informações de Contato
              </CardTitle>
              <CardDescription>Configure as informações de contato que aparecem no site</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center">
                    <Mail className="mr-2 h-4 w-4 text-orange-500" />
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={configuracoes.contato.email}
                    onChange={(e) => handleContatoChange("email", e.target.value)}
                    placeholder="contato@projetometanoia.com.br"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="telefone" className="flex items-center">
                    <Phone className="mr-2 h-4 w-4 text-green-500" />
                    Telefone
                  </Label>
                  <Input
                    id="telefone"
                    value={configuracoes.contato.telefone}
                    onChange={(e) => handleContatoChange("telefone", e.target.value)}
                    placeholder="(61) 98319-4827"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="localizacao" className="flex items-center">
                  <MapPin className="mr-2 h-4 w-4 text-blue-500" />
                  Localização
                </Label>
                <Input
                  id="localizacao"
                  value={configuracoes.contato.localizacao}
                  onChange={(e) => handleContatoChange("localizacao", e.target.value)}
                  placeholder="Brasília, DF"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="redes" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Instagram className="mr-2 h-5 w-5 text-pink-500" />
                Redes Sociais
              </CardTitle>
              <CardDescription>Configure os links das redes sociais do projeto</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="instagram" className="flex items-center">
                    <Instagram className="mr-2 h-4 w-4 text-pink-500" />
                    Instagram
                  </Label>
                  <Input
                    id="instagram"
                    type="url"
                    value={configuracoes.redesSociais.instagram}
                    onChange={(e) => handleRedesSociaisChange("instagram", e.target.value)}
                    placeholder="https://instagram.com/projetometanoia"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="facebook" className="flex items-center">
                    <Facebook className="mr-2 h-4 w-4 text-blue-600" />
                    Facebook
                  </Label>
                  <Input
                    id="facebook"
                    type="url"
                    value={configuracoes.redesSociais.facebook}
                    onChange={(e) => handleRedesSociaisChange("facebook", e.target.value)}
                    placeholder="https://facebook.com/projetometanoia"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="twitter" className="flex items-center">
                    <Twitter className="mr-2 h-4 w-4 text-blue-400" />
                    Twitter
                  </Label>
                  <Input
                    id="twitter"
                    type="url"
                    value={configuracoes.redesSociais.twitter}
                    onChange={(e) => handleRedesSociaisChange("twitter", e.target.value)}
                    placeholder="https://twitter.com/projetometanoia"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="linkedin" className="flex items-center">
                    <Linkedin className="mr-2 h-4 w-4 text-blue-700" />
                    LinkedIn
                  </Label>
                  <Input
                    id="linkedin"
                    type="url"
                    value={configuracoes.redesSociais.linkedin}
                    onChange={(e) => handleRedesSociaisChange("linkedin", e.target.value)}
                    placeholder="https://linkedin.com/company/projetometanoia"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="estatisticas" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="mr-2 h-5 w-5 text-emerald-500" />
                Números de Impacto
              </CardTitle>
              <CardDescription>Configure as estatísticas que aparecem na página inicial e sobre</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="jovensImpactados" className="flex items-center">
                    <Users className="mr-2 h-4 w-4 text-orange-500" />
                    Jovens Impactados
                  </Label>
                  <Input
                    id="jovensImpactados"
                    value={configuracoes.estatisticas.jovensImpactados}
                    onChange={(e) => handleEstatisticasChange("jovensImpactados", e.target.value)}
                    placeholder="500+"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="palestrasRealizadas" className="flex items-center">
                    <Award className="mr-2 h-4 w-4 text-emerald-500" />
                    Palestras Realizadas
                  </Label>
                  <Input
                    id="palestrasRealizadas"
                    value={configuracoes.estatisticas.palestrasRealizadas}
                    onChange={(e) => handleEstatisticasChange("palestrasRealizadas", e.target.value)}
                    placeholder="50+"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="parceriasAtivas" className="flex items-center">
                    <Target className="mr-2 h-4 w-4 text-blue-500" />
                    Parcerias Ativas
                  </Label>
                  <Input
                    id="parceriasAtivas"
                    value={configuracoes.estatisticas.parceriasAtivas}
                    onChange={(e) => handleEstatisticasChange("parceriasAtivas", e.target.value)}
                    placeholder="20+"
                  />
                </div>
              </div>

              <div className="mt-8 p-6 bg-gray-50 rounded-xl">
                <h4 className="text-lg font-semibold mb-4 text-gray-800">Preview das Estatísticas</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                    <div className="text-3xl font-bold text-orange-500 mb-2">
                      {configuracoes.estatisticas.jovensImpactados}
                    </div>
                    <div className="text-gray-600">Jovens Impactados</div>
                  </div>
                  <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                    <div className="text-3xl font-bold text-emerald-500 mb-2">
                      {configuracoes.estatisticas.palestrasRealizadas}
                    </div>
                    <div className="text-gray-600">Palestras Realizadas</div>
                  </div>
                  <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                    <div className="text-3xl font-bold text-blue-500 mb-2">
                      {configuracoes.estatisticas.parceriasAtivas}
                    </div>
                    <div className="text-gray-600">Parcerias Ativas</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="juridico" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Scale className="mr-2 h-5 w-5 text-purple-500" />
                Informações Jurídicas
              </CardTitle>
              <CardDescription>
                Configure as informações legais para Termos de Uso e Política de Privacidade
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="razaoSocial">Razão Social Completa</Label>
                  <Input
                    id="razaoSocial"
                    value={configuracoes.juridico.razaoSocial}
                    onChange={(e) => handleJuridicoChange("razaoSocial", e.target.value)}
                    placeholder="Nome completo da organização"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cnpj">CNPJ</Label>
                  <Input
                    id="cnpj"
                    value={configuracoes.juridico.cnpj}
                    onChange={(e) => handleJuridicoChange("cnpj", e.target.value)}
                    placeholder="00.000.000/0000-00"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="enderecoCompleto">Endereço Completo</Label>
                  <Input
                    id="enderecoCompleto"
                    value={configuracoes.juridico.enderecoCompleto}
                    onChange={(e) => handleJuridicoChange("enderecoCompleto", e.target.value)}
                    placeholder="Rua, número, bairro, cidade, CEP"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="responsavelLegal">Responsável Legal</Label>
                  <Input
                    id="responsavelLegal"
                    value={configuracoes.juridico.responsavelLegal}
                    onChange={(e) => handleJuridicoChange("responsavelLegal", e.target.value)}
                    placeholder="Nome do diretor/presidente"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="emailJuridico">Email Jurídico</Label>
                  <Input
                    id="emailJuridico"
                    type="email"
                    value={configuracoes.juridico.emailJuridico}
                    onChange={(e) => handleJuridicoChange("emailJuridico", e.target.value)}
                    placeholder="juridico@projetometanoia.com.br"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="telefoneJuridico">Telefone Jurídico</Label>
                  <Input
                    id="telefoneJuridico"
                    value={configuracoes.juridico.telefoneJuridico}
                    onChange={(e) => handleJuridicoChange("telefoneJuridico", e.target.value)}
                    placeholder="(61) 98319-4827"
                  />
                </div>
              </div>

              <div className="mt-8 p-6 bg-purple-50 rounded-xl">
                <h4 className="text-lg font-semibold mb-4 text-purple-800">Informações Utilizadas</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <strong>Páginas Jurídicas:</strong>
                    <ul className="mt-2 space-y-1 text-gray-600">
                      <li>• Termos de Uso (/termos)</li>
                      <li>• Política de Privacidade (/privacidade)</li>
                    </ul>
                  </div>
                  <div>
                    <strong>Conformidade:</strong>
                    <ul className="mt-2 space-y-1 text-gray-600">
                      <li>• LGPD Compliant</li>
                      <li>• Foro: Brasília/DF</li>
                      <li>• Idade mínima: 15 anos</li>
                    </ul>
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
