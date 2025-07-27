"use client"
import { useState, useEffect } from "react"
import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Plus, QrCode, Users, ExternalLink, Trash2, Edit } from "lucide-react"

interface LandingPage {
  id: string
  title: string
  slug: string
  videoUrl: string
  description: string
  createdAt: any
  submissionsCount?: number
}

interface Submission {
  id: string
  landingPageId: string
  name: string
  whatsapp: string
  email: string
  age: string
  createdAt: any
}

export default function LandingPagesAdmin() {
  const [landingPages, setLandingPages] = useState<LandingPage[]>([])
  const [submissions, setSubmissions] = useState<Submission[]>([])
  const [selectedLandingPage, setSelectedLandingPage] = useState<string>("")
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [editingLandingPage, setEditingLandingPage] = useState<LandingPage | null>(null)
  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    videoUrl: "",
    description: "",
  })

  useEffect(() => {
    fetchLandingPages()
    fetchSubmissions()
  }, [])

  const fetchLandingPages = async () => {
    try {
      const { db } = await import("@/lib/firebase")
      const { collection, getDocs, query, orderBy, where } = await import("firebase/firestore")

      const q = query(collection(db, "landingPages"), orderBy("createdAt", "desc"))
      const querySnapshot = await getDocs(q)
      const pages = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as LandingPage[]

      // Count submissions for each landing page
      for (const page of pages) {
        const submissionsQuery = query(collection(db, "landingPageSubmissions"), where("landingPageId", "==", page.id))
        const submissionsSnapshot = await getDocs(submissionsQuery)
        page.submissionsCount = submissionsSnapshot.size
      }

      setLandingPages(pages)
    } catch (error) {
      console.error("Erro ao buscar landing pages:", error)
    }
  }

  const fetchSubmissions = async () => {
    try {
      const { db } = await import("@/lib/firebase")
      const { collection, getDocs, query, orderBy } = await import("firebase/firestore")

      const q = query(collection(db, "landingPageSubmissions"), orderBy("createdAt", "desc"))
      const querySnapshot = await getDocs(q)
      const subs = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Submission[]
      setSubmissions(subs)
    } catch (error) {
      console.error("Erro ao buscar inscrições:", error)
    }
  }

  const createSlug = (title: string) => {
    return title
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim()
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { db } = await import("@/lib/firebase")
      const { collection, addDoc, getDocs, query, where } = await import("firebase/firestore")

      // Check if slug already exists
      const existingQuery = query(collection(db, "landingPages"), where("slug", "==", formData.slug))
      const existingSnapshot = await getDocs(existingQuery)

      if (!existingSnapshot.empty) {
        alert("Esta URL já está em uso. Escolha outra.")
        setLoading(false)
        return
      }

      await addDoc(collection(db, "landingPages"), {
        ...formData,
        createdAt: new Date(),
      })

      alert("Landing page criada com sucesso!")
      setFormData({ title: "", slug: "", videoUrl: "", description: "" })
      setIsCreateModalOpen(false)
      fetchLandingPages()
    } catch (error) {
      console.error("Erro ao criar landing page:", error)
      alert("Erro ao criar landing page")
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingLandingPage) return

    setLoading(true)

    try {
      const { db } = await import("@/lib/firebase")
      const { doc, updateDoc } = await import("firebase/firestore")

      await updateDoc(doc(db, "landingPages", editingLandingPage.id), {
        title: formData.title,
        slug: formData.slug,
        videoUrl: formData.videoUrl,
        description: formData.description,
      })

      alert("Landing page atualizada com sucesso!")
      setIsEditModalOpen(false)
      setEditingLandingPage(null)
      setFormData({ title: "", slug: "", videoUrl: "", description: "" })
      fetchLandingPages()
    } catch (error) {
      console.error("Erro ao atualizar landing page:", error)
      alert("Erro ao atualizar landing page")
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir esta landing page?")) return

    try {
      const { db } = await import("@/lib/firebase")
      const { doc, deleteDoc } = await import("firebase/firestore")

      await deleteDoc(doc(db, "landingPages", id))
      alert("Landing page excluída com sucesso!")
      fetchLandingPages()
    } catch (error) {
      console.error("Erro ao excluir landing page:", error)
      alert("Erro ao excluir landing page")
    }
  }

  const generateQRCodeUrl = (slug: string) => {
    const url = `${window.location.origin}/${slug}`
    // Using Google Charts API for QR Code generation (no external dependency)
    return `https://chart.googleapis.com/chart?chs=400x400&cht=qr&chl=${encodeURIComponent(url)}`
  }

  const downloadQRCode = async (slug: string, title: string) => {
    try {
      const qrUrl = generateQRCodeUrl(slug)
      const link = document.createElement("a")
      link.download = `qrcode-${slug}.png`
      link.href = qrUrl
      link.target = "_blank"
      link.click()
      alert("QR Code aberto em nova aba!")
    } catch (error) {
      console.error("Erro ao gerar QR Code:", error)
      alert("Erro ao gerar QR Code")
    }
  }

  const openEditModal = (landingPage: LandingPage) => {
    setEditingLandingPage(landingPage)
    setFormData({
      title: landingPage.title,
      slug: landingPage.slug,
      videoUrl: landingPage.videoUrl,
      description: landingPage.description,
    })
    setIsEditModalOpen(true)
  }

  const filteredSubmissions = selectedLandingPage
    ? submissions.filter((sub) => sub.landingPageId === selectedLandingPage)
    : submissions

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Landing Pages</h2>
          <p className="text-gray-600 mt-2">Gerencie suas landing pages e acompanhe as inscrições</p>
        </div>

        <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700">
              <Plus className="h-4 w-4 mr-2" />
              Nova Landing Page
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Criar Nova Landing Page</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">Título</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => {
                      const title = e.target.value
                      setFormData((prev) => ({
                        ...prev,
                        title,
                        slug: createSlug(title),
                      }))
                    }}
                    placeholder="Ex: Palestra sobre Mindset"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="slug">URL Personalizada</Label>
                  <Input
                    id="slug"
                    value={formData.slug}
                    onChange={(e) => setFormData((prev) => ({ ...prev, slug: e.target.value }))}
                    placeholder="palestra-mindset"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">Será acessível em: /{formData.slug}</p>
                </div>
              </div>

              <div>
                <Label htmlFor="videoUrl">URL do Vídeo</Label>
                <Input
                  id="videoUrl"
                  value={formData.videoUrl}
                  onChange={(e) => setFormData((prev) => ({ ...prev, videoUrl: e.target.value }))}
                  placeholder="https://www.youtube.com/embed/..."
                  required
                />
              </div>

              <div>
                <Label htmlFor="description">Descrição</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                  placeholder="Descreva o conteúdo da sua landing page..."
                  rows={4}
                  required
                />
              </div>

              <div className="flex justify-end space-x-4">
                <Button type="button" variant="outline" onClick={() => setIsCreateModalOpen(false)}>
                  Cancelar
                </Button>
                <Button type="submit" disabled={loading}>
                  {loading ? "Criando..." : "Criar Landing Page"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="pages" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="pages">Landing Pages ({landingPages.length})</TabsTrigger>
          <TabsTrigger value="submissions">Inscrições ({submissions.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="pages" className="space-y-6">
          <div className="grid gap-6">
            {landingPages.map((page) => (
              <Card key={page.id} className="border-0 shadow-soft">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl">{page.title}</CardTitle>
                      <div className="flex items-center space-x-4 mt-2">
                        <Badge variant="outline" className="text-purple-600 border-purple-200">
                          /{page.slug}
                        </Badge>
                        <Badge variant="outline" className="text-blue-600 border-blue-200">
                          <Users className="h-3 w-3 mr-1" />
                          {page.submissionsCount || 0} inscrições
                        </Badge>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" onClick={() => window.open(`/${page.slug}`, "_blank")}>
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => openEditModal(page)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(page.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{page.description}</p>

                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-500">
                      Criado em: {page.createdAt?.toDate?.()?.toLocaleDateString("pt-BR") || "Data não disponível"}
                    </div>

                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" onClick={() => downloadQRCode(page.slug, page.title)}>
                        <QrCode className="h-4 w-4 mr-2" />
                        Ver QR Code
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {landingPages.length === 0 && (
              <Card className="border-0 shadow-soft">
                <CardContent className="text-center py-12">
                  <QrCode className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhuma landing page criada</h3>
                  <p className="text-gray-600 mb-4">Crie sua primeira landing page para começar a capturar leads</p>
                  <Button onClick={() => setIsCreateModalOpen(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Criar Landing Page
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="submissions" className="space-y-6">
          <div className="flex items-center space-x-4">
            <Label htmlFor="landingPageFilter">Filtrar por Landing Page:</Label>
            <select
              id="landingPageFilter"
              value={selectedLandingPage}
              onChange={(e) => setSelectedLandingPage(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="">Todas as landing pages</option>
              {landingPages.map((page) => (
                <option key={page.id} value={page.id}>
                  {page.title}
                </option>
              ))}
            </select>
          </div>

          <Card className="border-0 shadow-soft">
            <CardHeader>
              <CardTitle>
                Inscrições {selectedLandingPage && `- ${landingPages.find((p) => p.id === selectedLandingPage)?.title}`}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>WhatsApp</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Idade</TableHead>
                    <TableHead>Landing Page</TableHead>
                    <TableHead>Data</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredSubmissions.map((submission) => {
                    const landingPage = landingPages.find((p) => p.id === submission.landingPageId)
                    return (
                      <TableRow key={submission.id}>
                        <TableCell className="font-medium">{submission.name}</TableCell>
                        <TableCell>{submission.whatsapp}</TableCell>
                        <TableCell>{submission.email}</TableCell>
                        <TableCell>{submission.age}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{landingPage?.title || "Landing page removida"}</Badge>
                        </TableCell>
                        <TableCell>
                          {submission.createdAt?.toDate?.()?.toLocaleDateString("pt-BR") || "Data não disponível"}
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>

              {filteredSubmissions.length === 0 && (
                <div className="text-center py-8">
                  <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhuma inscrição encontrada</h3>
                  <p className="text-gray-600">
                    As inscrições aparecerão aqui quando os usuários preencherem os formulários
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Edit Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Editar Landing Page</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleEdit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-title">Título</Label>
                <Input
                  id="edit-title"
                  value={formData.title}
                  onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                  required
                />
              </div>
              <div>
                <Label htmlFor="edit-slug">URL Personalizada</Label>
                <Input
                  id="edit-slug"
                  value={formData.slug}
                  onChange={(e) => setFormData((prev) => ({ ...prev, slug: e.target.value }))}
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="edit-videoUrl">URL do Vídeo</Label>
              <Input
                id="edit-videoUrl"
                value={formData.videoUrl}
                onChange={(e) => setFormData((prev) => ({ ...prev, videoUrl: e.target.value }))}
                required
              />
            </div>

            <div>
              <Label htmlFor="edit-description">Descrição</Label>
              <Textarea
                id="edit-description"
                value={formData.description}
                onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                rows={4}
                required
              />
            </div>

            <div className="flex justify-end space-x-4">
              <Button type="button" variant="outline" onClick={() => setIsEditModalOpen(false)}>
                Cancelar
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? "Salvando..." : "Salvar Alterações"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
