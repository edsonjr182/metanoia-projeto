"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Edit, Trash2, Eye, Copy, ImageIcon, Video, Users, Download } from "lucide-react"
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc, query, orderBy } from "firebase/firestore"
import { db } from "@/lib/firebase"

interface LandingPage {
  id: string
  nome: string
  slug: string
  titulo: string
  subtitulo: string
  descricao: string
  bannerTipo: "imagem" | "video"
  bannerUrl: string
  sobreTitulo: string
  sobreDescricao: string
  botaoTexto: string
  cores: {
    primaria: string
    secundaria: string
    fundo: string
    texto: string
    botao: string
  }
  ativo: boolean
  criadoEm: string
}

interface Lead {
  id: string
  landingPageId: string
  nome: string
  whatsapp: string
  email: string
  idade: number
  criadoEm: string
}

export default function LandingPagesAdmin() {
  const [landingPages, setLandingPages] = useState<LandingPage[]>([])
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [editingPage, setEditingPage] = useState<LandingPage | null>(null)
  const [activeTab, setActiveTab] = useState("paginas")
  const [selectedPageLeads, setSelectedPageLeads] = useState<string>("")

  const [formData, setFormData] = useState({
    nome: "",
    slug: "",
    titulo: "",
    subtitulo: "",
    descricao: "",
    bannerTipo: "imagem" as "imagem" | "video",
    bannerUrl: "",
    sobreTitulo: "",
    sobreDescricao: "",
    botaoTexto: "Quero Participar",
    cores: {
      primaria: "#f97316",
      secundaria: "#ea580c",
      fundo: "#ffffff",
      texto: "#1f2937",
      botao: "#f97316",
    },
    ativo: true,
  })

  useEffect(() => {
    fetchLandingPages()
    fetchLeads()
  }, [])

  const fetchLandingPages = async () => {
    try {
      const q = query(collection(db, "landing-pages"), orderBy("criadoEm", "desc"))
      const querySnapshot = await getDocs(q)
      const pagesData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as LandingPage[]
      setLandingPages(pagesData)
    } catch (error) {
      console.error("Erro ao buscar landing pages:", error)
    }
  }

  const fetchLeads = async () => {
    try {
      const q = query(collection(db, "landing-leads"), orderBy("criadoEm", "desc"))
      const querySnapshot = await getDocs(q)
      const leadsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Lead[]
      setLeads(leadsData)
    } catch (error) {
      console.error("Erro ao buscar leads:", error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const pageData = {
        ...formData,
        criadoEm: editingPage ? editingPage.criadoEm : new Date().toISOString(),
        atualizadoEm: new Date().toISOString(),
      }

      if (editingPage) {
        await updateDoc(doc(db, "landing-pages", editingPage.id), pageData)
      } else {
        await addDoc(collection(db, "landing-pages"), pageData)
      }

      resetForm()
      fetchLandingPages()
    } catch (error) {
      console.error("Erro ao salvar landing page:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (confirm("Tem certeza que deseja excluir esta landing page?")) {
      try {
        await deleteDoc(doc(db, "landing-pages", id))
        fetchLandingPages()
      } catch (error) {
        console.error("Erro ao excluir landing page:", error)
      }
    }
  }

  const handleEdit = (page: LandingPage) => {
    setEditingPage(page)
    setFormData({
      nome: page.nome,
      slug: page.slug,
      titulo: page.titulo,
      subtitulo: page.subtitulo,
      descricao: page.descricao,
      bannerTipo: page.bannerTipo,
      bannerUrl: page.bannerUrl,
      sobreTitulo: page.sobreTitulo,
      sobreDescricao: page.sobreDescricao,
      botaoTexto: page.botaoTexto,
      cores: page.cores,
      ativo: page.ativo,
    })
    setShowForm(true)
  }

  const resetForm = () => {
    setFormData({
      nome: "",
      slug: "",
      titulo: "",
      subtitulo: "",
      descricao: "",
      bannerTipo: "imagem",
      bannerUrl: "",
      sobreTitulo: "",
      sobreDescricao: "",
      botaoTexto: "Quero Participar",
      cores: {
        primaria: "#f97316",
        secundaria: "#ea580c",
        fundo: "#ffffff",
        texto: "#1f2937",
        botao: "#f97316",
      },
      ativo: true,
    })
    setEditingPage(null)
    setShowForm(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleColorChange = (colorKey: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      cores: {
        ...prev.cores,
        [colorKey]: value,
      },
    }))
  }

  const generateSlug = (nome: string) => {
    return nome
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim()
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    alert("Link copiado para a área de transferência!")
  }

  const exportLeads = (pageId?: string) => {
    const filteredLeads = pageId ? leads.filter((lead) => lead.landingPageId === pageId) : leads
    const csvContent = [
      ["Nome", "WhatsApp", "Email", "Idade", "Landing Page", "Data"],
      ...filteredLeads.map((lead) => {
        const page = landingPages.find((p) => p.id === lead.landingPageId)
        return [
          lead.nome,
          lead.whatsapp,
          lead.email,
          lead.idade.toString(),
          page?.nome || "N/A",
          new Date(lead.criadoEm).toLocaleDateString("pt-BR"),
        ]
      }),
    ]
      .map((row) => row.join(","))
      .join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `leads-${pageId ? "landing-page" : "todos"}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const getPageLeads = (pageId: string) => {
    return leads.filter((lead) => lead.landingPageId === pageId)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Landing Pages</h2>
          <p className="text-gray-600 mt-1">Crie e gerencie landing pages personalizadas</p>
        </div>
        <Button onClick={() => setShowForm(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Nova Landing Page
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="paginas">Landing Pages</TabsTrigger>
          <TabsTrigger value="leads">Leads ({leads.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="paginas" className="space-y-6">
          {showForm && (
            <Card>
              <CardHeader>
                <CardTitle>{editingPage ? "Editar Landing Page" : "Nova Landing Page"}</CardTitle>
                <CardDescription>Configure todos os aspectos da sua landing page</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <Tabs defaultValue="conteudo" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="conteudo">Conteúdo</TabsTrigger>
                      <TabsTrigger value="banner">Banner</TabsTrigger>
                      <TabsTrigger value="design">Design</TabsTrigger>
                    </TabsList>

                    <TabsContent value="conteudo" className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="nome">Nome da Landing Page</Label>
                          <Input
                            id="nome"
                            name="nome"
                            value={formData.nome}
                            onChange={(e) => {
                              handleChange(e)
                              setFormData((prev) => ({
                                ...prev,
                                slug: generateSlug(e.target.value),
                              }))
                            }}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="slug">URL (Slug)</Label>
                          <Input
                            id="slug"
                            name="slug"
                            value={formData.slug}
                            onChange={handleChange}
                            placeholder="minha-landing-page"
                            required
                          />
                          <p className="text-xs text-gray-500 mt-1">
                            URL: {window.location.origin}/lp/{formData.slug}
                          </p>
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="titulo">Título Principal</Label>
                        <Input id="titulo" name="titulo" value={formData.titulo} onChange={handleChange} required />
                      </div>

                      <div>
                        <Label htmlFor="subtitulo">Subtítulo</Label>
                        <Input id="subtitulo" name="subtitulo" value={formData.subtitulo} onChange={handleChange} />
                      </div>

                      <div>
                        <Label htmlFor="descricao">Descrição</Label>
                        <Textarea
                          id="descricao"
                          name="descricao"
                          value={formData.descricao}
                          onChange={handleChange}
                          rows={3}
                        />
                      </div>

                      <div>
                        <Label htmlFor="sobreTitulo">Título da Seção Sobre</Label>
                        <Input
                          id="sobreTitulo"
                          name="sobreTitulo"
                          value={formData.sobreTitulo}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="sobreDescricao">Descrição da Seção Sobre</Label>
                        <Textarea
                          id="sobreDescricao"
                          name="sobreDescricao"
                          value={formData.sobreDescricao}
                          onChange={handleChange}
                          rows={4}
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="botaoTexto">Texto do Botão</Label>
                        <Input
                          id="botaoTexto"
                          name="botaoTexto"
                          value={formData.botaoTexto}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </TabsContent>

                    <TabsContent value="banner" className="space-y-4">
                      <div>
                        <Label>Tipo de Banner</Label>
                        <Select
                          value={formData.bannerTipo}
                          onValueChange={(value) =>
                            setFormData((prev) => ({ ...prev, bannerTipo: value as "imagem" | "video" }))
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="imagem">
                              <div className="flex items-center">
                                <ImageIcon className="mr-2 h-4 w-4" />
                                Imagem
                              </div>
                            </SelectItem>
                            <SelectItem value="video">
                              <div className="flex items-center">
                                <Video className="mr-2 h-4 w-4" />
                                Vídeo
                              </div>
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="bannerUrl">
                          URL do {formData.bannerTipo === "imagem" ? "Imagem" : "Vídeo"}
                        </Label>
                        <Input
                          id="bannerUrl"
                          name="bannerUrl"
                          type="url"
                          value={formData.bannerUrl}
                          onChange={handleChange}
                          placeholder={
                            formData.bannerTipo === "imagem"
                              ? "https://exemplo.com/imagem.jpg"
                              : "https://exemplo.com/video.mp4"
                          }
                          required
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          {formData.bannerTipo === "imagem"
                            ? "Recomendado: 1920x1080px ou superior"
                            : "Formatos suportados: MP4, WebM"}
                        </p>
                      </div>

                      {formData.bannerUrl && (
                        <div className="mt-4">
                          <Label>Preview</Label>
                          <div className="mt-2 border rounded-lg overflow-hidden">
                            {formData.bannerTipo === "imagem" ? (
                              <img
                                src={formData.bannerUrl || "/placeholder.svg"}
                                alt="Preview"
                                className="w-full h-48 object-cover"
                                onError={(e) => {
                                  e.currentTarget.src = "/placeholder.svg?height=200&width=400&text=Erro+ao+carregar"
                                }}
                              />
                            ) : (
                              <video
                                src={formData.bannerUrl}
                                className="w-full h-48 object-cover"
                                controls
                                onError={(e) => {
                                  e.currentTarget.style.display = "none"
                                }}
                              />
                            )}
                          </div>
                        </div>
                      )}
                    </TabsContent>

                    <TabsContent value="design" className="space-y-4">
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        <div>
                          <Label htmlFor="corPrimaria">Cor Primária</Label>
                          <div className="flex items-center space-x-2">
                            <Input
                              type="color"
                              value={formData.cores.primaria}
                              onChange={(e) => handleColorChange("primaria", e.target.value)}
                              className="w-12 h-10 p-1 border rounded"
                            />
                            <Input
                              value={formData.cores.primaria}
                              onChange={(e) => handleColorChange("primaria", e.target.value)}
                              placeholder="#f97316"
                            />
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="corSecundaria">Cor Secundária</Label>
                          <div className="flex items-center space-x-2">
                            <Input
                              type="color"
                              value={formData.cores.secundaria}
                              onChange={(e) => handleColorChange("secundaria", e.target.value)}
                              className="w-12 h-10 p-1 border rounded"
                            />
                            <Input
                              value={formData.cores.secundaria}
                              onChange={(e) => handleColorChange("secundaria", e.target.value)}
                              placeholder="#ea580c"
                            />
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="corFundo">Cor de Fundo</Label>
                          <div className="flex items-center space-x-2">
                            <Input
                              type="color"
                              value={formData.cores.fundo}
                              onChange={(e) => handleColorChange("fundo", e.target.value)}
                              className="w-12 h-10 p-1 border rounded"
                            />
                            <Input
                              value={formData.cores.fundo}
                              onChange={(e) => handleColorChange("fundo", e.target.value)}
                              placeholder="#ffffff"
                            />
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="corTexto">Cor do Texto</Label>
                          <div className="flex items-center space-x-2">
                            <Input
                              type="color"
                              value={formData.cores.texto}
                              onChange={(e) => handleColorChange("texto", e.target.value)}
                              className="w-12 h-10 p-1 border rounded"
                            />
                            <Input
                              value={formData.cores.texto}
                              onChange={(e) => handleColorChange("texto", e.target.value)}
                              placeholder="#1f2937"
                            />
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="corBotao">Cor do Botão</Label>
                          <div className="flex items-center space-x-2">
                            <Input
                              type="color"
                              value={formData.cores.botao}
                              onChange={(e) => handleColorChange("botao", e.target.value)}
                              className="w-12 h-10 p-1 border rounded"
                            />
                            <Input
                              value={formData.cores.botao}
                              onChange={(e) => handleColorChange("botao", e.target.value)}
                              placeholder="#f97316"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="mt-6 p-4 border rounded-lg" style={{ backgroundColor: formData.cores.fundo }}>
                        <h4 className="font-semibold mb-2" style={{ color: formData.cores.texto }}>
                          Preview das Cores
                        </h4>
                        <p style={{ color: formData.cores.texto }} className="mb-3">
                          Este é um exemplo de como o texto aparecerá na sua landing page.
                        </p>
                        <Button
                          style={{
                            backgroundColor: formData.cores.botao,
                            borderColor: formData.cores.botao,
                            color: "#ffffff",
                          }}
                          className="hover:opacity-90"
                        >
                          {formData.botaoTexto}
                        </Button>
                      </div>
                    </TabsContent>
                  </Tabs>

                  <div className="flex gap-2 pt-4 border-t">
                    <Button type="submit" disabled={loading}>
                      {loading ? "Salvando..." : "Salvar Landing Page"}
                    </Button>
                    <Button type="button" variant="outline" onClick={resetForm}>
                      Cancelar
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {landingPages.map((page) => (
              <Card key={page.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex gap-2">
                      <Badge variant={page.ativo ? "default" : "secondary"}>{page.ativo ? "Ativo" : "Inativo"}</Badge>
                      <Badge variant="outline">
                        {page.bannerTipo === "imagem" ? (
                          <ImageIcon className="h-3 w-3 mr-1" />
                        ) : (
                          <Video className="h-3 w-3 mr-1" />
                        )}
                        {page.bannerTipo}
                      </Badge>
                    </div>
                    <div className="flex gap-1">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => window.open(`/lp/${page.slug}`, "_blank")}
                        title="Visualizar"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleEdit(page)} title="Editar">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleDelete(page.id)} title="Excluir">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <CardTitle className="text-lg">{page.nome}</CardTitle>
                  <CardDescription>/{page.slug}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">{page.titulo}</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Leads:</span>
                      <span className="font-medium">{getPageLeads(page.id).length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Criado:</span>
                      <span>{new Date(page.criadoEm).toLocaleDateString("pt-BR")}</span>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => copyToClipboard(`${window.location.origin}/lp/${page.slug}`)}
                      className="flex-1"
                    >
                      <Copy className="h-3 w-3 mr-1" />
                      Copiar Link
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => exportLeads(page.id)} title="Exportar Leads">
                      <Download className="h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="leads" className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold">Leads Capturados</h3>
              <p className="text-gray-600">Total de {leads.length} leads</p>
            </div>
            <div className="flex gap-2">
              <Select value={selectedPageLeads} onValueChange={setSelectedPageLeads}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filtrar por página" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas as páginas</SelectItem>
                  {landingPages.map((page) => (
                    <SelectItem key={page.id} value={page.id}>
                      {page.nome} ({getPageLeads(page.id).length})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button onClick={() => exportLeads(selectedPageLeads || undefined)} variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Exportar
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {leads
              .filter((lead) => selectedPageLeads === "all" || lead.landingPageId === selectedPageLeads)
              .map((lead) => {
                const page = landingPages.find((p) => p.id === lead.landingPageId)
                return (
                  <Card key={lead.id}>
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{lead.nome}</CardTitle>
                        <Badge variant="outline" className="text-xs">
                          {lead.idade} anos
                        </Badge>
                      </div>
                      <CardDescription>{page?.nome || "Página removida"}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-500">WhatsApp:</span>
                          <a
                            href={`https://wa.me/55${lead.whatsapp.replace(/\D/g, "")}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-green-600 hover:text-green-700"
                          >
                            {lead.whatsapp}
                          </a>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-500">Email:</span>
                          <a href={`mailto:${lead.email}`} className="text-blue-600 hover:text-blue-700">
                            {lead.email}
                          </a>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-500">Data:</span>
                          <span>{new Date(lead.criadoEm).toLocaleDateString("pt-BR")}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
          </div>

          {leads.filter((lead) => selectedPageLeads === "all" || lead.landingPageId === selectedPageLeads).length ===
            0 && (
            <div className="text-center py-12">
              <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">Nenhum lead encontrado</h3>
              <p className="text-gray-500">
                {selectedPageLeads !== "all"
                  ? "Esta landing page ainda não capturou nenhum lead"
                  : "Os leads aparecerão aqui conforme forem capturados"}
              </p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
