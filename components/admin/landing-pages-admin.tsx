"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  Copy,
  QrCode,
  Users,
  TrendingUp,
  ExternalLink,
  Type,
  Star,
  MessageSquare,
  Target,
  GripVertical,
  ArrowUp,
  ArrowDown,
} from "lucide-react"
import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs, query, orderBy } from "firebase/firestore"
import { db } from "@/lib/firebase"

interface LandingPageSection {
  id: string
  type: "hero" | "about" | "benefits" | "testimonials" | "cta" | "custom"
  title: string
  content: string
  videoUrl?: string
  imageUrl?: string
  benefits?: string[]
  testimonials?: Array<{
    name: string
    text: string
    rating: number
    image?: string
  }>
  customHtml?: string
  backgroundColor?: string
  textColor?: string
  order: number
}

interface LandingPage {
  id?: string
  title: string
  slug: string
  description: string
  primaryColor: string
  secondaryColor: string
  sections: LandingPageSection[]
  formFields: Array<{
    name: string
    label: string
    type: string
    required: boolean
  }>
  thankYouMessage: string
  active: boolean
  createdAt?: any
  updatedAt?: any
}

interface Lead {
  id: string
  landingPageId: string
  landingPageTitle: string
  data: Record<string, any>
  createdAt: any
}

const defaultSections: LandingPageSection[] = [
  {
    id: "1",
    type: "hero",
    title: "Transforme Sua Vida Hoje",
    content: "Descubra como alcançar seus objetivos e realizar seus sonhos com nosso método comprovado.",
    order: 1,
  },
  {
    id: "2",
    type: "about",
    title: "Sobre Este Programa",
    content: "Um programa completo desenvolvido para pessoas que querem mudanças reais em suas vidas.",
    order: 2,
  },
  {
    id: "3",
    type: "benefits",
    title: "Benefícios Exclusivos",
    content: "Veja o que você vai conquistar",
    benefits: ["Metodologia comprovada", "Suporte personalizado", "Resultados garantidos", "Comunidade exclusiva"],
    order: 3,
  },
  {
    id: "4",
    type: "cta",
    title: "Comece Sua Transformação Agora",
    content: "Não perca esta oportunidade única de mudar sua vida.",
    order: 4,
  },
]

const defaultFormFields = [
  { name: "nome", label: "Nome completo", type: "text", required: true },
  { name: "email", label: "E-mail", type: "email", required: true },
  { name: "telefone", label: "Telefone", type: "tel", required: false },
]

export default function LandingPagesAdmin() {
  const [landingPages, setLandingPages] = useState<LandingPage[]>([])
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingPage, setEditingPage] = useState<LandingPage | null>(null)
  const [selectedPageLeads, setSelectedPageLeads] = useState<Lead[]>([])
  const [activeTab, setActiveTab] = useState("pages")

  const [formData, setFormData] = useState<LandingPage>({
    title: "",
    slug: "",
    description: "",
    primaryColor: "#3B82F6",
    secondaryColor: "#10B981",
    sections: defaultSections,
    formFields: defaultFormFields,
    thankYouMessage: "Obrigado! Entraremos em contato em breve.",
    active: true,
  })

  useEffect(() => {
    loadLandingPages()
    loadLeads()
  }, [])

  const loadLandingPages = async () => {
    try {
      const q = query(collection(db, "landingPages"), orderBy("createdAt", "desc"))
      const querySnapshot = await getDocs(q)
      const pages = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as LandingPage[]
      setLandingPages(pages)
    } catch (error) {
      console.error("Erro ao carregar landing pages:", error)
      setError("Erro ao carregar landing pages")
    } finally {
      setLoading(false)
    }
  }

  const loadLeads = async () => {
    try {
      const q = query(collection(db, "leads"), orderBy("createdAt", "desc"))
      const querySnapshot = await getDocs(q)
      const leadsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Lead[]
      setLeads(leadsData)
    } catch (error) {
      console.error("Erro ao carregar leads:", error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setSuccess("")

    try {
      if (editingPage) {
        await updateDoc(doc(db, "landingPages", editingPage.id!), {
          ...formData,
          updatedAt: new Date(),
        })
        setSuccess("Landing page atualizada com sucesso!")
      } else {
        await addDoc(collection(db, "landingPages"), {
          ...formData,
          createdAt: new Date(),
          updatedAt: new Date(),
        })
        setSuccess("Landing page criada com sucesso!")
      }

      setIsDialogOpen(false)
      setEditingPage(null)
      resetForm()
      loadLandingPages()
    } catch (error) {
      console.error("Erro ao salvar landing page:", error)
      setError("Erro ao salvar landing page")
    } finally {
      setLoading(false)
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
      setSuccess("Landing page excluída com sucesso!")
      loadLandingPages()
    } catch (error) {
      console.error("Erro ao excluir landing page:", error)
      setError("Erro ao excluir landing page")
    }
  }

  const resetForm = () => {
    setFormData({
      title: "",
      slug: "",
      description: "",
      primaryColor: "#3B82F6",
      secondaryColor: "#10B981",
      sections: defaultSections,
      formFields: defaultFormFields,
      thankYouMessage: "Obrigado! Entraremos em contato em breve.",
      active: true,
    })
  }

  const generateSlug = (title: string) => {
    return title
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
    setSuccess("Link copiado para a área de transferência!")
  }

  const generateQRCode = (url: string) => {
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(url)}`
    window.open(qrUrl, "_blank")
  }

  const addSection = () => {
    const newSection: LandingPageSection = {
      id: Date.now().toString(),
      type: "custom",
      title: "Nova Seção",
      content: "Conteúdo da seção",
      order: formData.sections.length + 1,
    }
    setFormData({
      ...formData,
      sections: [...formData.sections, newSection],
    })
  }

  const updateSection = (sectionId: string, updates: Partial<LandingPageSection>) => {
    setFormData({
      ...formData,
      sections: formData.sections.map((section) => (section.id === sectionId ? { ...section, ...updates } : section)),
    })
  }

  const removeSection = (sectionId: string) => {
    setFormData({
      ...formData,
      sections: formData.sections.filter((section) => section.id !== sectionId),
    })
  }

  const moveSection = (sectionId: string, direction: "up" | "down") => {
    const sections = [...formData.sections]
    const index = sections.findIndex((s) => s.id === sectionId)

    if (direction === "up" && index > 0) {
      ;[sections[index], sections[index - 1]] = [sections[index - 1], sections[index]]
    } else if (direction === "down" && index < sections.length - 1) {
      ;[sections[index], sections[index + 1]] = [sections[index + 1], sections[index]]
    }

    // Reorder
    sections.forEach((section, idx) => {
      section.order = idx + 1
    })

    setFormData({ ...formData, sections })
  }

  const addFormField = () => {
    setFormData({
      ...formData,
      formFields: [...formData.formFields, { name: "", label: "", type: "text", required: false }],
    })
  }

  const updateFormField = (index: number, field: Partial<(typeof formData.formFields)[0]>) => {
    const newFields = [...formData.formFields]
    newFields[index] = { ...newFields[index], ...field }
    setFormData({ ...formData, formFields: newFields })
  }

  const removeFormField = (index: number) => {
    setFormData({
      ...formData,
      formFields: formData.formFields.filter((_, i) => i !== index),
    })
  }

  const getPageLeads = (pageId: string) => {
    return leads.filter((lead) => lead.landingPageId === pageId)
  }

  const getSectionIcon = (type: string) => {
    switch (type) {
      case "hero":
        return <Type className="h-4 w-4" />
      case "about":
        return <MessageSquare className="h-4 w-4" />
      case "benefits":
        return <Star className="h-4 w-4" />
      case "testimonials":
        return <Users className="h-4 w-4" />
      case "cta":
        return <Target className="h-4 w-4" />
      default:
        return <Type className="h-4 w-4" />
    }
  }

  if (loading && landingPages.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Carregando landing pages...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Landing Pages</h2>
          <p className="text-gray-600">Gerencie suas páginas de captura de leads</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={() => {
                resetForm()
                setEditingPage(null)
              }}
            >
              <Plus className="h-4 w-4 mr-2" />
              Nova Landing Page
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingPage ? "Editar Landing Page" : "Nova Landing Page"}</DialogTitle>
              <DialogDescription>
                Crie páginas profissionais para capturar leads e converter visitantes
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-6">
              <Tabs defaultValue="basic" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="basic">Básico</TabsTrigger>
                  <TabsTrigger value="sections">Seções</TabsTrigger>
                  <TabsTrigger value="form">Formulário</TabsTrigger>
                  <TabsTrigger value="design">Design</TabsTrigger>
                </TabsList>

                <TabsContent value="basic" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="title">Título da Landing Page</Label>
                      <Input
                        id="title"
                        value={formData.title}
                        onChange={(e) => {
                          const title = e.target.value
                          setFormData({
                            ...formData,
                            title,
                            slug: generateSlug(title),
                          })
                        }}
                        placeholder="Ex: Curso de Transformação Pessoal"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="slug">URL (Slug)</Label>
                      <Input
                        id="slug"
                        value={formData.slug}
                        onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                        placeholder="curso-transformacao-pessoal"
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
                      placeholder="Descrição da landing page para SEO"
                      rows={3}
                    />
                  </div>

                  <div>
                    <Label htmlFor="thankYouMessage">Mensagem de Agradecimento</Label>
                    <Textarea
                      id="thankYouMessage"
                      value={formData.thankYouMessage}
                      onChange={(e) => setFormData({ ...formData, thankYouMessage: e.target.value })}
                      placeholder="Mensagem exibida após o envio do formulário"
                      rows={2}
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      id="active"
                      checked={formData.active}
                      onCheckedChange={(checked) => setFormData({ ...formData, active: checked })}
                    />
                    <Label htmlFor="active">Landing page ativa</Label>
                  </div>
                </TabsContent>

                <TabsContent value="sections" className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Seções da Página</h3>
                    <Button type="button" onClick={addSection} size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Adicionar Seção
                    </Button>
                  </div>

                  <div className="space-y-4">
                    {formData.sections.map((section, index) => (
                      <Card key={section.id}>
                        <CardHeader className="pb-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <GripVertical className="h-4 w-4 text-gray-400" />
                              {getSectionIcon(section.type)}
                              <span className="font-medium">{section.title}</span>
                              <Badge variant="outline">{section.type}</Badge>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => moveSection(section.id, "up")}
                                disabled={index === 0}
                              >
                                <ArrowUp className="h-4 w-4" />
                              </Button>
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => moveSection(section.id, "down")}
                                disabled={index === formData.sections.length - 1}
                              >
                                <ArrowDown className="h-4 w-4" />
                              </Button>
                              <Button type="button" variant="ghost" size="sm" onClick={() => removeSection(section.id)}>
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <Label>Tipo de Seção</Label>
                              <Select
                                value={section.type}
                                onValueChange={(value) => updateSection(section.id, { type: value as any })}
                              >
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="hero">Hero (Principal)</SelectItem>
                                  <SelectItem value="about">Sobre</SelectItem>
                                  <SelectItem value="benefits">Benefícios</SelectItem>
                                  <SelectItem value="testimonials">Depoimentos</SelectItem>
                                  <SelectItem value="cta">Call to Action</SelectItem>
                                  <SelectItem value="custom">Personalizada</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div>
                              <Label>Título da Seção</Label>
                              <Input
                                value={section.title}
                                onChange={(e) => updateSection(section.id, { title: e.target.value })}
                                placeholder="Título da seção"
                              />
                            </div>
                          </div>

                          <div>
                            <Label>Conteúdo</Label>
                            <Textarea
                              value={section.content}
                              onChange={(e) => updateSection(section.id, { content: e.target.value })}
                              placeholder="Conteúdo da seção"
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

                          {section.type === "benefits" && (
                            <div>
                              <Label>Benefícios (um por linha)</Label>
                              <Textarea
                                value={section.benefits?.join("\n") || ""}
                                onChange={(e) =>
                                  updateSection(section.id, {
                                    benefits: e.target.value.split("\n").filter((b) => b.trim()),
                                  })
                                }
                                placeholder="Benefício 1&#10;Benefício 2&#10;Benefício 3"
                                rows={4}
                              />
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="form" className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Campos do Formulário</h3>
                    <Button type="button" onClick={addFormField} size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Adicionar Campo
                    </Button>
                  </div>

                  <div className="space-y-4">
                    {formData.formFields.map((field, index) => (
                      <Card key={index}>
                        <CardContent className="pt-4">
                          <div className="grid grid-cols-4 gap-3">
                            <div>
                              <Label>Nome do Campo</Label>
                              <Input
                                value={field.name}
                                onChange={(e) => updateFormField(index, { name: e.target.value })}
                                placeholder="nome"
                              />
                            </div>
                            <div>
                              <Label>Rótulo</Label>
                              <Input
                                value={field.label}
                                onChange={(e) => updateFormField(index, { label: e.target.value })}
                                placeholder="Nome completo"
                              />
                            </div>
                            <div>
                              <Label>Tipo</Label>
                              <Select
                                value={field.type}
                                onValueChange={(value) => updateFormField(index, { type: value })}
                              >
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="text">Texto</SelectItem>
                                  <SelectItem value="email">E-mail</SelectItem>
                                  <SelectItem value="tel">Telefone</SelectItem>
                                  <SelectItem value="number">Número</SelectItem>
                                  <SelectItem value="textarea">Texto longo</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="flex items-end space-x-2">
                              <div className="flex items-center space-x-2">
                                <Switch
                                  checked={field.required}
                                  onCheckedChange={(checked) => updateFormField(index, { required: checked })}
                                />
                                <Label className="text-sm">Obrigatório</Label>
                              </div>
                              <Button type="button" variant="ghost" size="sm" onClick={() => removeFormField(index)}>
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
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
                          placeholder="#3B82F6"
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
                          placeholder="#10B981"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="p-4 border rounded-lg bg-gray-50">
                    <h4 className="font-medium mb-2">Preview das Cores</h4>
                    <div className="flex space-x-4">
                      <div
                        className="w-16 h-16 rounded-lg border"
                        style={{ backgroundColor: formData.primaryColor }}
                      ></div>
                      <div
                        className="w-16 h-16 rounded-lg border"
                        style={{ backgroundColor: formData.secondaryColor }}
                      ></div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>

              <div className="flex justify-end space-x-2 pt-4 border-t">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button type="submit" disabled={loading}>
                  {loading ? "Salvando..." : editingPage ? "Atualizar" : "Criar"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert className="border-green-200 bg-green-50">
          <AlertDescription className="text-green-800">{success}</AlertDescription>
        </Alert>
      )}

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="pages">Landing Pages</TabsTrigger>
          <TabsTrigger value="leads">Leads Capturados</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="pages">
          <div className="grid gap-6">
            {landingPages.map((page) => (
              <Card key={page.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center space-x-2">
                        <span>{page.title}</span>
                        {!page.active && <Badge variant="secondary">Inativa</Badge>}
                      </CardTitle>
                      <CardDescription>
                        /{page.slug} • {getPageLeads(page.id!).length} leads capturados
                      </CardDescription>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm" onClick={() => window.open(`/${page.slug}`, "_blank")}>
                        <Eye className="h-4 w-4 mr-1" />
                        Visualizar
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyToClipboard(`${window.location.origin}/${page.slug}`)}
                      >
                        <Copy className="h-4 w-4 mr-1" />
                        Copiar Link
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => generateQRCode(`${window.location.origin}/${page.slug}`)}
                      >
                        <QrCode className="h-4 w-4 mr-1" />
                        QR Code
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleEdit(page)}>
                        <Edit className="h-4 w-4 mr-1" />
                        Editar
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleDelete(page.id!)}>
                        <Trash2 className="h-4 w-4 mr-1" />
                        Excluir
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-blue-500" />
                      <span className="text-sm text-gray-600">{getPageLeads(page.id!).length} leads</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Type className="h-4 w-4 text-green-500" />
                      <span className="text-sm text-gray-600">{page.sections.length} seções</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <ExternalLink className="h-4 w-4 text-purple-500" />
                      <span className="text-sm text-gray-600">{page.formFields.length} campos no formulário</span>
                    </div>
                  </div>

                  {page.description && <p className="text-sm text-gray-600 mt-2">{page.description}</p>}
                </CardContent>
              </Card>
            ))}

            {landingPages.length === 0 && (
              <Card>
                <CardContent className="text-center py-8">
                  <Type className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Nenhuma landing page criada</h3>
                  <p className="text-gray-600 mb-4">Crie sua primeira landing page para começar a capturar leads</p>
                  <Button onClick={() => setIsDialogOpen(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Criar Landing Page
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="leads">
          <div className="space-y-4">
            {landingPages.map((page) => {
              const pageLeads = getPageLeads(page.id!)
              if (pageLeads.length === 0) return null

              return (
                <Card key={page.id}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>{page.title}</span>
                      <Badge>{pageLeads.length} leads</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {pageLeads.map((lead) => (
                        <div key={lead.id} className="p-3 border rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium">{lead.data.nome || lead.data.email}</span>
                            <span className="text-sm text-gray-500">
                              {new Date(lead.createdAt.toDate()).toLocaleDateString("pt-BR")}
                            </span>
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                            {Object.entries(lead.data).map(([key, value]) => (
                              <div key={key}>
                                <strong>{key}:</strong> {value as string}
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )
            })}

            {leads.length === 0 && (
              <Card>
                <CardContent className="text-center py-8">
                  <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Nenhum lead capturado ainda</h3>
                  <p className="text-gray-600">Os leads capturados pelas suas landing pages aparecerão aqui</p>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="analytics">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total de Landing Pages</CardTitle>
                <Type className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{landingPages.length}</div>
                <p className="text-xs text-muted-foreground">{landingPages.filter((p) => p.active).length} ativas</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total de Leads</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{leads.length}</div>
                <p className="text-xs text-muted-foreground">Todos os leads capturados</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Média por Página</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {landingPages.length > 0 ? Math.round(leads.length / landingPages.length) : 0}
                </div>
                <p className="text-xs text-muted-foreground">Leads por landing page</p>
              </CardContent>
            </Card>
          </div>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Performance por Landing Page</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {landingPages.map((page) => {
                  const pageLeads = getPageLeads(page.id!)
                  return (
                    <div key={page.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <h4 className="font-medium">{page.title}</h4>
                        <p className="text-sm text-gray-600">/{page.slug}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold">{pageLeads.length}</div>
                        <div className="text-sm text-gray-600">leads</div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
