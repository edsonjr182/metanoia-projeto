"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Plus, Edit, Trash2, ExternalLink, Users, Calendar, MapPin, Eye } from "lucide-react"
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc, query, orderBy } from "firebase/firestore"
import { db } from "@/lib/firebase"

interface Campo {
  id: string
  nome: string
  tipo: "texto" | "email" | "telefone" | "textarea"
  obrigatorio: boolean
  placeholder: string
}

interface LandingPage {
  id: string
  titulo: string
  descricao: string
  dataEvento: string
  horario: string
  local: string
  capacidade: number
  inscricoes: number
  ativo: boolean
  campos: Campo[]
}

export function LandingPagesAdmin() {
  const [landingPages, setLandingPages] = useState<LandingPage[]>([])
  const [loading, setLoading] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [editingPage, setEditingPage] = useState<LandingPage | null>(null)
  const [formData, setFormData] = useState({
    titulo: "",
    descricao: "",
    dataEvento: "",
    horario: "",
    local: "",
    capacidade: 50,
    ativo: true,
  })
  const [campos, setCampos] = useState<Campo[]>([
    { id: "nome", nome: "Nome Completo", tipo: "texto", obrigatorio: true, placeholder: "Seu nome completo" },
    { id: "email", nome: "Email", tipo: "email", obrigatorio: true, placeholder: "seu@email.com" },
    { id: "telefone", nome: "Telefone", tipo: "telefone", obrigatorio: true, placeholder: "(11) 99999-9999" },
  ])

  useEffect(() => {
    fetchLandingPages()
  }, [])

  const fetchLandingPages = async () => {
    try {
      const q = query(collection(db, "landingPages"), orderBy("dataEvento", "desc"))
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const pageData = {
        ...formData,
        campos,
        inscricoes: editingPage ? editingPage.inscricoes : 0,
      }

      if (editingPage) {
        await updateDoc(doc(db, "landingPages", editingPage.id), pageData)
      } else {
        await addDoc(collection(db, "landingPages"), pageData)
      }

      resetForm()
      fetchLandingPages()
      alert("Landing page salva com sucesso!")
    } catch (error) {
      console.error("Erro ao salvar landing page:", error)
      alert("Erro ao salvar landing page. Tente novamente.")
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (confirm("Tem certeza que deseja excluir esta landing page?")) {
      try {
        await deleteDoc(doc(db, "landingPages", id))
        fetchLandingPages()
        alert("Landing page excluída com sucesso!")
      } catch (error) {
        console.error("Erro ao excluir landing page:", error)
        alert("Erro ao excluir landing page.")
      }
    }
  }

  const handleEdit = (page: LandingPage) => {
    setEditingPage(page)
    setFormData({
      titulo: page.titulo,
      descricao: page.descricao,
      dataEvento: page.dataEvento,
      horario: page.horario,
      local: page.local,
      capacidade: page.capacidade,
      ativo: page.ativo,
    })
    setCampos(page.campos || [])
    setShowForm(true)
  }

  const resetForm = () => {
    setFormData({
      titulo: "",
      descricao: "",
      dataEvento: "",
      horario: "",
      local: "",
      capacidade: 50,
      ativo: true,
    })
    setCampos([
      { id: "nome", nome: "Nome Completo", tipo: "texto", obrigatorio: true, placeholder: "Seu nome completo" },
      { id: "email", nome: "Email", tipo: "email", obrigatorio: true, placeholder: "seu@email.com" },
      { id: "telefone", nome: "Telefone", tipo: "telefone", obrigatorio: true, placeholder: "(11) 99999-9999" },
    ])
    setEditingPage(null)
    setShowForm(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === "capacidade" ? Number.parseInt(value) || 0 : value,
    }))
  }

  const addCampo = () => {
    const newCampo: Campo = {
      id: `campo_${Date.now()}`,
      nome: "",
      tipo: "texto",
      obrigatorio: false,
      placeholder: "",
    }
    setCampos([...campos, newCampo])
  }

  const updateCampo = (index: number, field: keyof Campo, value: any) => {
    const updatedCampos = [...campos]
    updatedCampos[index] = { ...updatedCampos[index], [field]: value }
    setCampos(updatedCampos)
  }

  const removeCampo = (index: number) => {
    setCampos(campos.filter((_, i) => i !== index))
  }

  const generateQRCode = (slug: string) => {
    const url = `${window.location.origin}/${slug}`
    return `https://chart.googleapis.com/chart?chs=200x200&cht=qr&chl=${encodeURIComponent(url)}`
  }

  const generateSlug = (titulo: string) => {
    return titulo
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim()
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Gerenciar Landing Pages</h2>
        <Button onClick={() => setShowForm(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Nova Landing Page
        </Button>
      </div>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>{editingPage ? "Editar Landing Page" : "Nova Landing Page"}</CardTitle>
            <CardDescription>Crie uma página personalizada para capturar inscrições de eventos</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="titulo">Título do Evento</Label>
                  <Input id="titulo" name="titulo" value={formData.titulo} onChange={handleChange} required />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="ativo"
                    checked={formData.ativo}
                    onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, ativo: checked }))}
                  />
                  <Label htmlFor="ativo">Página ativa</Label>
                </div>
              </div>

              <div>
                <Label htmlFor="descricao">Descrição</Label>
                <Textarea
                  id="descricao"
                  name="descricao"
                  value={formData.descricao}
                  onChange={handleChange}
                  rows={3}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="dataEvento">Data do Evento</Label>
                  <Input
                    id="dataEvento"
                    name="dataEvento"
                    type="date"
                    value={formData.dataEvento}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="horario">Horário</Label>
                  <Input
                    id="horario"
                    name="horario"
                    value={formData.horario}
                    onChange={handleChange}
                    placeholder="Ex: 19:00"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="capacidade">Capacidade</Label>
                  <Input
                    id="capacidade"
                    name="capacidade"
                    type="number"
                    value={formData.capacidade}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="local">Local</Label>
                <Input id="local" name="local" value={formData.local} onChange={handleChange} required />
              </div>

              {/* Campos do Formulário */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label className="text-base font-semibold">Campos do Formulário</Label>
                  <Button type="button" variant="outline" size="sm" onClick={addCampo}>
                    <Plus className="h-4 w-4 mr-2" />
                    Adicionar Campo
                  </Button>
                </div>

                {campos.map((campo, index) => (
                  <Card key={campo.id} className="p-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div>
                        <Label>Nome do Campo</Label>
                        <Input
                          value={campo.nome}
                          onChange={(e) => updateCampo(index, "nome", e.target.value)}
                          placeholder="Ex: Nome Completo"
                        />
                      </div>
                      <div>
                        <Label>Tipo</Label>
                        <select
                          className="w-full p-2 border rounded-md"
                          value={campo.tipo}
                          onChange={(e) => updateCampo(index, "tipo", e.target.value)}
                        >
                          <option value="texto">Texto</option>
                          <option value="email">Email</option>
                          <option value="telefone">Telefone</option>
                          <option value="textarea">Texto Longo</option>
                        </select>
                      </div>
                      <div>
                        <Label>Placeholder</Label>
                        <Input
                          value={campo.placeholder}
                          onChange={(e) => updateCampo(index, "placeholder", e.target.value)}
                          placeholder="Ex: Digite seu nome"
                        />
                      </div>
                      <div className="flex items-end gap-2">
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={campo.obrigatorio}
                            onChange={(e) => updateCampo(index, "obrigatorio", e.target.checked)}
                          />
                          <Label className="text-sm">Obrigatório</Label>
                        </div>
                        <Button type="button" variant="outline" size="sm" onClick={() => removeCampo(index)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              <div className="flex gap-2">
                <Button type="submit" disabled={loading}>
                  {loading ? "Salvando..." : "Salvar"}
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
        {landingPages.map((page) => {
          const slug = generateSlug(page.titulo)
          const vagasDisponiveis = page.capacidade - page.inscricoes

          return (
            <Card key={page.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex gap-2">
                    <Badge variant={page.ativo ? "default" : "secondary"}>{page.ativo ? "Ativa" : "Inativa"}</Badge>
                    {vagasDisponiveis <= 0 && <Badge variant="destructive">Esgotado</Badge>}
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => handleEdit(page)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleDelete(page.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <CardTitle className="text-lg">{page.titulo}</CardTitle>
                <CardDescription className="line-clamp-2">{page.descricao}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-orange-500" />
                    {new Date(page.dataEvento).toLocaleDateString("pt-BR")} - {page.horario}
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2 text-orange-500" />
                    {page.local}
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-2 text-orange-500" />
                    {page.inscricoes} / {page.capacidade} inscritos
                  </div>
                </div>

                <div className="mt-4 space-y-2">
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" asChild>
                      <a href={`/${slug}`} target="_blank" rel="noopener noreferrer">
                        <Eye className="h-4 w-4 mr-1" />
                        Ver Página
                      </a>
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        const url = `${window.location.origin}/${slug}`
                        navigator.clipboard.writeText(url)
                        alert("Link copiado!")
                      }}
                    >
                      <ExternalLink className="h-4 w-4 mr-1" />
                      Copiar Link
                    </Button>
                  </div>

                  {/* QR Code */}
                  <div className="text-center">
                    <img
                      src={generateQRCode(slug) || "/placeholder.svg"}
                      alt="QR Code"
                      className="mx-auto w-24 h-24 border rounded"
                    />
                    <p className="text-xs text-gray-500 mt-1">QR Code da página</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

export default LandingPagesAdmin
