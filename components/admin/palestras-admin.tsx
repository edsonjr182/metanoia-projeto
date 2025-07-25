"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2, Calendar, MapPin, ExternalLink } from "lucide-react"
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc, query, orderBy } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Palestra {
  id: string
  titulo: string
  descricao: string
  data: string
  horario: string
  local: string
  palestrante: string
  vagas: number
  categoria: string
  modalidade: "presencial" | "online" // Novo campo
  linkPalestra: string // Novo campo
}

export default function PalestrasAdmin() {
  const [palestras, setPalestras] = useState<Palestra[]>([])
  const [loading, setLoading] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [editingPalestra, setEditingPalestra] = useState<Palestra | null>(null)
  const [formData, setFormData] = useState({
    titulo: "",
    descricao: "",
    data: "",
    horario: "",
    local: "",
    palestrante: "",
    vagas: 0,
    categoria: "",
    modalidade: "presencial", // Novo campo
    linkPalestra: "", // Novo campo
  })

  useEffect(() => {
    fetchPalestras()
  }, [])

  const fetchPalestras = async () => {
    try {
      const q = query(collection(db, "palestras"), orderBy("data", "asc"))
      const querySnapshot = await getDocs(q)
      const palestrasData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Palestra[]
      setPalestras(palestrasData)
    } catch (error) {
      console.error("Erro ao buscar palestras:", error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (editingPalestra) {
        await updateDoc(doc(db, "palestras", editingPalestra.id), formData)
      } else {
        await addDoc(collection(db, "palestras"), formData)
      }

      resetForm()
      fetchPalestras()
    } catch (error) {
      console.error("Erro ao salvar palestra:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (confirm("Tem certeza que deseja excluir esta palestra?")) {
      try {
        await deleteDoc(doc(db, "palestras", id))
        fetchPalestras()
      } catch (error) {
        console.error("Erro ao excluir palestra:", error)
      }
    }
  }

  const handleEdit = (palestra: Palestra) => {
    setEditingPalestra(palestra)
    setFormData({
      titulo: palestra.titulo,
      descricao: palestra.descricao,
      data: palestra.data,
      horario: palestra.horario,
      local: palestra.local,
      palestrante: palestra.palestrante,
      vagas: palestra.vagas,
      categoria: palestra.categoria,
      modalidade: palestra.modalidade || "presencial", // Novo campo
      linkPalestra: palestra.linkPalestra || "", // Novo campo
    })
    setShowForm(true)
  }

  const resetForm = () => {
    setFormData({
      titulo: "",
      descricao: "",
      data: "",
      horario: "",
      local: "",
      palestrante: "",
      vagas: 0,
      categoria: "",
      modalidade: "presencial", // Novo campo
      linkPalestra: "", // Novo campo
    })
    setEditingPalestra(null)
    setShowForm(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === "vagas" ? Number.parseInt(value) || 0 : value,
    }))
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Gerenciar Palestras</h2>
        <Button onClick={() => setShowForm(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Nova Palestra
        </Button>
      </div>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>{editingPalestra ? "Editar Palestra" : "Nova Palestra"}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="titulo">Título</Label>
                  <Input id="titulo" name="titulo" value={formData.titulo} onChange={handleChange} required />
                </div>
                <div>
                  <Label htmlFor="categoria">Categoria</Label>
                  <Input id="categoria" name="categoria" value={formData.categoria} onChange={handleChange} required />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="modalidade">Modalidade</Label>
                  <Select
                    value={formData.modalidade}
                    onValueChange={(value) =>
                      setFormData((prev) => ({ ...prev, modalidade: value as "presencial" | "online" }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="presencial">Presencial</SelectItem>
                      <SelectItem value="online">Online</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="linkPalestra">Link da Palestra</Label>
                  <Input
                    id="linkPalestra"
                    name="linkPalestra"
                    type="url"
                    value={formData.linkPalestra}
                    onChange={handleChange}
                    placeholder="https://exemplo.com/palestra"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">Link da landing page ou página de acesso à palestra</p>
                </div>
              </div>

              <div>
                <Label htmlFor="descricao">Descrição</Label>
                <Textarea id="descricao" name="descricao" value={formData.descricao} onChange={handleChange} required />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="data">Data</Label>
                  <Input id="data" name="data" type="date" value={formData.data} onChange={handleChange} required />
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
                  <Label htmlFor="vagas">Vagas</Label>
                  <Input
                    id="vagas"
                    name="vagas"
                    type="number"
                    value={formData.vagas}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {formData.modalidade === "presencial" && (
                  <div>
                    <Label htmlFor="local">Local</Label>
                    <Input id="local" name="local" value={formData.local} onChange={handleChange} required />
                  </div>
                )}
                <div>
                  <Label htmlFor="palestrante">Palestrante</Label>
                  <Input
                    id="palestrante"
                    name="palestrante"
                    value={formData.palestrante}
                    onChange={handleChange}
                    required
                  />
                </div>
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
        {palestras.map((palestra) => (
          <Card key={palestra.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex gap-2">
                  <Badge variant="secondary">{palestra.categoria}</Badge>
                  <Badge
                    className={
                      palestra.modalidade === "online" ? "bg-blue-100 text-blue-800" : "bg-green-100 text-green-800"
                    }
                  >
                    {palestra.modalidade === "online" ? "Online" : "Presencial"}
                  </Badge>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => handleEdit(palestra)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => handleDelete(palestra.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <CardTitle className="text-lg">{palestra.titulo}</CardTitle>
              <CardDescription>Por: {palestra.palestrante}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">{palestra.descricao}</p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-orange-500" />
                  {new Date(palestra.data).toLocaleDateString("pt-BR")} - {palestra.horario}
                </div>
                {palestra.modalidade === "presencial" && palestra.local && (
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2 text-orange-500" />
                    {palestra.local}
                  </div>
                )}
                <div className="text-gray-600">{palestra.vagas} vagas disponíveis</div>
                {palestra.linkPalestra && (
                  <div>
                    <a
                      href={palestra.linkPalestra}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 flex items-center text-sm"
                    >
                      Acessar Palestra
                      <ExternalLink className="h-3 w-3 ml-1" />
                    </a>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
