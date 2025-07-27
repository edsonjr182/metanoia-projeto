"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2, Calendar, MapPin, Clock } from "lucide-react"
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc, query, orderBy } from "firebase/firestore"
import { db } from "@/lib/firebase"

interface Palestra {
  id: string
  titulo: string
  descricao: string
  palestrante: string
  data: string
  horario: string
  local: string
  duracao: string
  ativo: boolean
  criadoEm: string
}

export function PalestrasAdmin() {
  const [palestras, setPalestras] = useState<Palestra[]>([])
  const [loading, setLoading] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [editingPalestra, setEditingPalestra] = useState<Palestra | null>(null)
  const [formData, setFormData] = useState({
    titulo: "",
    descricao: "",
    palestrante: "",
    data: "",
    horario: "",
    local: "",
    duracao: "",
    ativo: true,
  })

  useEffect(() => {
    fetchPalestras()
  }, [])

  const fetchPalestras = async () => {
    try {
      const q = query(collection(db, "palestras"), orderBy("data", "desc"))
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
      const palestraData = {
        ...formData,
        criadoEm: editingPalestra ? editingPalestra.criadoEm : new Date().toISOString(),
      }

      if (editingPalestra) {
        await updateDoc(doc(db, "palestras", editingPalestra.id), palestraData)
      } else {
        await addDoc(collection(db, "palestras"), palestraData)
      }

      resetForm()
      fetchPalestras()
      alert("Palestra salva com sucesso!")
    } catch (error) {
      console.error("Erro ao salvar palestra:", error)
      alert("Erro ao salvar palestra. Tente novamente.")
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (confirm("Tem certeza que deseja excluir esta palestra?")) {
      try {
        await deleteDoc(doc(db, "palestras", id))
        fetchPalestras()
        alert("Palestra excluída com sucesso!")
      } catch (error) {
        console.error("Erro ao excluir palestra:", error)
        alert("Erro ao excluir palestra.")
      }
    }
  }

  const handleEdit = (palestra: Palestra) => {
    setEditingPalestra(palestra)
    setFormData({
      titulo: palestra.titulo,
      descricao: palestra.descricao,
      palestrante: palestra.palestrante,
      data: palestra.data,
      horario: palestra.horario,
      local: palestra.local,
      duracao: palestra.duracao,
      ativo: palestra.ativo,
    })
    setShowForm(true)
  }

  const resetForm = () => {
    setFormData({
      titulo: "",
      descricao: "",
      palestrante: "",
      data: "",
      horario: "",
      local: "",
      duracao: "",
      ativo: true,
    })
    setEditingPalestra(null)
    setShowForm(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
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
            <CardDescription>Crie e gerencie palestras e eventos</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="titulo">Título da Palestra</Label>
                  <Input id="titulo" name="titulo" value={formData.titulo} onChange={handleChange} required />
                </div>
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

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
                  <Label htmlFor="duracao">Duração</Label>
                  <Input
                    id="duracao"
                    name="duracao"
                    value={formData.duracao}
                    onChange={handleChange}
                    placeholder="Ex: 2 horas"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="local">Local</Label>
                  <Input id="local" name="local" value={formData.local} onChange={handleChange} required />
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
                <Badge variant={palestra.ativo ? "default" : "secondary"}>{palestra.ativo ? "Ativa" : "Inativa"}</Badge>
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
              <CardDescription className="line-clamp-2">{palestra.descricao}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <p>
                  <strong>Palestrante:</strong> {palestra.palestrante}
                </p>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-orange-500" />
                  {new Date(palestra.data).toLocaleDateString("pt-BR")}
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-orange-500" />
                  {palestra.horario} - {palestra.duracao}
                </div>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2 text-orange-500" />
                  {palestra.local}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default PalestrasAdmin
