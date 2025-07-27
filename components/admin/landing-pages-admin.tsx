"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2, QrCode, Copy, ChevronUp, ChevronDown, ExternalLink } from "lucide-react"
import { db } from "@/lib/firebase"
import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs, query, orderBy } from "firebase/firestore"

interface LandingPageSection {
  id: string
  type: "hero" | "about" | "benefits" | "testimonials" | "cta" | "custom"
  title: string
  content: string
  videoUrl?: string
  benefits?: string[]
  testimonials?: Array<{
    name: string
    text: string
    rating: number
  }>
  customHtml?: string
  order: number
}

interface LandingPageForm {
  name: string
  email: string
  phone?: string
  message?: string
}

interface LandingPage {
  id?: string
  title: string
  slug: string
  description: string
  primaryColor: string
  secondaryColor: string
  sections: LandingPageSection[]
  formFields: string[]
  thankYouMessage: string
  isActive: boolean
  createdAt: Date
  leads?: LandingPageForm[]
  views?: number
}

export function LandingPagesAdmin() {
  const [landingPages, setLandingPages] = useState<LandingPage[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingPage, setEditingPage] = useState<LandingPage | null>(null)
  const [selectedPage, setSelectedPage] = useState<LandingPage | null>(null)
  const [activeTab, setActiveTab] = useState("list")
  const [loading, setLoading] = useState(true)

  const [formData, setFormData] = useState<Partial<LandingPage>>({
    title: "",
    slug: "",
    description: "",
    primaryColor: "#3b82f6",
    secondaryColor: "#1e40af",
    sections: [],
    formFields: ["name", "email"],
    thankYouMessage: "Obrigado! Entraremos em contato em breve.",
    isActive: true,
  })

  useEffect(() => {
    loadLandingPages()
  }, [])

  const loadLandingPages = async () => {
    try {
      const q = query(collection(db, "landingPages"), orderBy("createdAt", "desc"))
      const querySnapshot = await getDocs(q)
      const pages = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date(),
      })) as LandingPage[]
      setLandingPages(pages)
    } catch (error) {
      console.error("Erro ao carregar landing pages:", error)
      alert("Erro ao carregar landing pages")
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.title || !formData.slug) {
      alert("Título e slug são obrigatórios")
      return
    }

    try {
      const pageData = {
        ...formData,
        createdAt: new Date(),
        views: 0,
        leads: [],
      }

      if (editingPage?.id) {
        await updateDoc(doc(db, "landingPages", editingPage.id), pageData)
        alert("Landing page atualizada com sucesso!")
      } else {
        await addDoc(collection(db, "landingPages"), pageData)
        alert("Landing page criada com sucesso!")
      }

      setIsDialogOpen(false)
      setEditingPage(null)
      setFormData({
        title: "",
        slug: "",
        description: "",
        primaryColor: "#3b82f6",
        secondaryColor: "#1e40af",
        sections: [],
        formFields: ["name", "email"],
        thankYouMessage: "Obrigado! Entraremos em contato em breve.",
        isActive: true,
      })
      loadLandingPages()
    } catch (error) {
      console.error("Erro ao salvar landing page:", error)
      alert("Erro ao salvar landing page")
    }
  }

  const handleEdit = (page: LandingPage) => {
    setEditingPage(page)
    setFormData(page)
    setIsDialogOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir esta landing page?")) return

    try {
      await deleteDoc(doc(db, "landingPages", id))
      alert("Landing page excluída com sucesso!")
      loadLandingPages()
    } catch (error) {
      console.error("Erro ao excluir landing page:", error)
      alert("Erro ao excluir landing page")
    }
  }

  const addSection = () => {
    const newSection: LandingPageSection = {
      id: Date.now().toString(),
      type: "hero",
      title: "Nova Seção",
      content: "",
      order: formData.sections?.length || 0,
    }
    setFormData({
      ...formData,
      sections: [...(formData.sections || []), newSection],
    })
  }

  const updateSection = (sectionId: string, updates: Partial<LandingPageSection>) => {
    setFormData({
      ...formData,
      sections:
        formData.sections?.map((section) => (section.id === sectionId ? { ...section, ...updates } : section)) || [],
    })
  }

  const removeSection = (sectionId: string) => {
    setFormData({
      ...formData,
      sections: formData.sections?.filter((section) => section.id !== sectionId) || [],
    })
  }

  const moveSection = (sectionId: string, direction: "up" | "down") => {
    const sections = [...(formData.sections || [])]
    const index = sections.findIndex((s) => s.id === sectionId)

    if (direction === "up" && index > 0) {
      ;[sections[index], sections[index - 1]] = [sections[index - 1], sections[index]]
    } else if (direction === "down" && index < sections.length - 1) {
      ;[sections[index], sections[index + 1]] = [sections[index + 1], sections[index]]
    }

    sections.forEach((section, i) => {
      section.order = i
    })

    setFormData({ ...formData, sections })
  }

  const generateQRCode = (slug: string) => {
    const url = `${window.location.origin}/${slug}`
    return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(url)}`
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    alert("Link copiado para a área de transferência!")
  }

  if (loading) {
    return <div className="flex justify-center p-8">Carregando...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Landing Pages</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Nova Landing Page
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingPage ? "Editar Landing Page" : "Nova Landing Page"}</DialogTitle>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-6">
              <Tabs defaultValue="basic" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="basic">Básico</TabsTrigger>
                  <TabsTrigger value="design">Design</TabsTrigger>
                  <TabsTrigger value="sections">Seções</TabsTrigger>
                  <TabsTrigger value="form">Formulário</TabsTrigger>
                </TabsList>

                <TabsContent value="basic" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="title">Título</Label>
                      <Input
                        id="title"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="slug">Slug (URL)</Label>
                      <Input
                        id="slug"
                        value={formData.slug}
                        onChange={(e) =>
                          setFormData({ ...formData, slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "") })
                        }
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="description">Descrição</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      id="isActive"
                      checked={formData.isActive}
                      onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
                    />
                    <Label htmlFor="isActive">Página ativa</Label>
                  </div>
                </TabsContent>

                <TabsContent value="design" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="primaryColor">Cor Primária</Label>
                      <div className="flex items-center space-x-2">
                        <Input
                          id="primaryColor"
                          type="color"
                          value={formData.primaryColor}
                          onChange={(e) => setFormData({ ...formData, primaryColor: e.target.value })}
                          className="w-16 h-10"
                        />
                        <Input
                          value={formData.primaryColor}
                          onChange={(e) => setFormData({ ...formData, primaryColor: e.target.value })}
                          placeholder="#3b82f6"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="secondaryColor">Cor Secundária</Label>
                      <div className="flex items-center space-x-2">
                        <Input
                          id="secondaryColor"
                          type="color"
                          value={formData.secondaryColor}
                          onChange={(e) => setFormData({ ...formData, secondaryColor: e.target.value })}
                          className="w-16 h-10"
                        />
                        <Input
                          value={formData.secondaryColor}
                          onChange={(e) => setFormData({ ...formData, secondaryColor: e.target.value })}
                          placeholder="#1e40af"
                        />
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="sections" className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold">Seções da Página</h3>
                    <Button type="button" onClick={addSection} variant="outline">
                      <Plus className="w-4 h-4 mr-2" />
                      Adicionar Seção
                    </Button>
                  </div>

                  <div className="space-y-4">
                    {formData.sections?.map((section, index) => (
                      <Card key={section.id}>
                        <CardHeader className="pb-3">
                          <div className="flex justify-between items-center">
                            <div className="flex items-center space-x-2">
                              <Badge variant="outline">{section.type}</Badge>
                              <span className="font-medium">{section.title}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => moveSection(section.id, "up")}
                                disabled={index === 0}
                              >
                                <ChevronUp className="w-4 h-4" />
                              </Button>
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => moveSection(section.id, "down")}
                                disabled={index === (formData.sections?.length || 0) - 1}
                              >
                                <ChevronDown className="w-4 h-4" />
                              </Button>
                              <Button type="button" variant="ghost" size="sm" onClick={() => removeSection(section.id)}>
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <Label>Tipo</Label>
                              <Select
                                value={section.type}
                                onValueChange={(value) => updateSection(section.id, { type: value as any })}
                              >
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="hero">Hero</SelectItem>
                                  <SelectItem value="about">Sobre</SelectItem>
                                  <SelectItem value="benefits">Benefícios</SelectItem>
                                  <SelectItem value="testimonials">Depoimentos</SelectItem>
                                  <SelectItem value="cta">CTA</SelectItem>
                                  <SelectItem value="custom">Personalizada</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div>
                              <Label>Título</Label>
                              <Input
                                value={section.title}
                                onChange={(e) => updateSection(section.id, { title: e.target.value })}
                              />
                            </div>
                          </div>

                          <div>
                            <Label>Conteúdo</Label>
                            <Textarea
                              value={section.content}
                              onChange={(e) => updateSection(section.id, { content: e.target.value })}
                              rows={3}
                            />
                          </div>

                          {section.type === "hero" && (
                            <div>
                              <Label>URL do Vídeo (YouTube/Vimeo)</Label>
                              <Input
                                value={section.videoUrl || ""}
                                onChange={(e) => updateSection(section.id, { videoUrl: e.target.value })}
                                placeholder="https://www.youtube.com/watch?v=..."
                              />
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="form" className="space-y-4">
                  <div>
                    <Label>Campos do Formulário</Label>
                    <div className="space-y-2 mt-2">
                      {["name", "email", "phone", "message"].map((field) => (
                        <div key={field} className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id={field}
                            checked={formData.formFields?.includes(field)}
                            onChange={(e) => {
                              const fields = formData.formFields || []
                              if (e.target.checked) {
                                setFormData({ ...formData, formFields: [...fields, field] })
                              } else {
                                setFormData({ ...formData, formFields: fields.filter((f) => f !== field) })
                              }
                            }}
                          />
                          <Label htmlFor={field} className="capitalize">
                            {field === "name"
                              ? "Nome"
                              : field === "email"
                                ? "Email"
                                : field === "phone"
                                  ? "Telefone"
                                  : "Mensagem"}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="thankYouMessage">Mensagem de Agradecimento</Label>
                    <Textarea
                      id="thankYouMessage"
                      value={formData.thankYouMessage}
                      onChange={(e) => setFormData({ ...formData, thankYouMessage: e.target.value })}
                    />
                  </div>
                </TabsContent>
              </Tabs>

              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button type="submit">{editingPage ? "Atualizar" : "Criar"} Landing Page</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="list">Lista</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="list">
          <div className="grid gap-4">
            {landingPages.map((page) => (
              <Card key={page.id}>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <h3 className="text-lg font-semibold">{page.title}</h3>
                        <Badge variant={page.isActive ? "default" : "secondary"}>
                          {page.isActive ? "Ativa" : "Inativa"}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">{page.description}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span>Slug: /{page.slug}</span>
                        <span>Visualizações: {page.views || 0}</span>
                        <span>Leads: {page.leads?.length || 0}</span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyToClipboard(`${window.location.origin}/${page.slug}`)}
                      >
                        <Copy className="w-4 h-4" />
                      </Button>

                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            <QrCode className="w-4 h-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>QR Code - {page.title}</DialogTitle>
                          </DialogHeader>
                          <div className="flex flex-col items-center space-y-4">
                            <img
                              src={generateQRCode(page.slug) || "/placeholder.svg"}
                              alt="QR Code"
                              className="border rounded"
                            />
                            <p className="text-sm text-center">
                              {window.location.origin}/{page.slug}
                            </p>
                          </div>
                        </DialogContent>
                      </Dialog>

                      <Button variant="outline" size="sm" onClick={() => window.open(`/${page.slug}`, "_blank")}>
                        <ExternalLink className="w-4 h-4" />
                      </Button>

                      <Button variant="outline" size="sm" onClick={() => handleEdit(page)}>
                        <Edit className="w-4 h-4" />
                      </Button>

                      <Button variant="outline" size="sm" onClick={() => handleDelete(page.id!)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Resumo Geral</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold">{landingPages.length}</div>
                    <div className="text-sm text-gray-600">Total de Páginas</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">
                      {landingPages.reduce((acc, page) => acc + (page.views || 0), 0)}
                    </div>
                    <div className="text-sm text-gray-600">Total de Visualizações</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">
                      {landingPages.reduce((acc, page) => acc + (page.leads?.length || 0), 0)}
                    </div>
                    <div className="text-sm text-gray-600">Total de Leads</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {landingPages.map((page) => (
              <Card key={page.id}>
                <CardHeader>
                  <CardTitle className="flex justify-between items-center">
                    {page.title}
                    <Badge variant={page.isActive ? "default" : "secondary"}>
                      {page.isActive ? "Ativa" : "Inativa"}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <div className="text-lg font-semibold">{page.views || 0}</div>
                      <div className="text-sm text-gray-600">Visualizações</div>
                    </div>
                    <div>
                      <div className="text-lg font-semibold">{page.leads?.length || 0}</div>
                      <div className="text-sm text-gray-600">Leads Capturados</div>
                    </div>
                  </div>

                  {page.leads && page.leads.length > 0 && (
                    <div>
                      <h4 className="font-semibold mb-2">Últimos Leads:</h4>
                      <div className="space-y-2">
                        {page.leads.slice(-3).map((lead, index) => (
                          <div key={index} className="text-sm bg-gray-50 p-2 rounded">
                            <div className="font-medium">{lead.name}</div>
                            <div className="text-gray-600">{lead.email}</div>
                            {lead.phone && <div className="text-gray-600">{lead.phone}</div>}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
