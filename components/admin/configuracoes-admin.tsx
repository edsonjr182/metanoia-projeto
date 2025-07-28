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
}

export default function ConfiguracoesAdmin() {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [configuracoes, setConfiguracoes] = useState<ConfiguracoesSite>({
    contato: {
      email: "contato@projetometanoia.org",
      telefone: "(11) 99999-9999",
      localizacao: "São Paulo, SP",
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
        <TabsList className="grid w-full grid-cols-3 bg-gray-100 p-1 rounded-xl">
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
                    placeholder="contato@projetometanoia.org"
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
                    placeholder="(11) 99999-9999"
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
                  placeholder="São Paulo, SP"
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

              {/* Preview das estatísticas */}
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
      </Tabs>
    </div>
  )
}
