"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2 } from "lucide-react"
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc, query, orderBy } from "firebase/firestore"
import { db } from "@/lib/firebase"

interface Conteudo {
  id: string
  titulo: string
  descricao: string
  conteudo: string
  categoria: string
  ativo: boolean
  criadoEm: string
}

export function ConteudosAdmin() {
  const [conteudos, setConteudos] = useState<Conteudo[]>([])
  const [loading, setLoading] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [editingConteudo, setEditingConteudo] = useState<Conteudo | null>(null)
  const [formData, setFormData] = useState({
    titulo: "",
    descricao: "",
    conteudo: "",
    categoria: "",
    ativo: true,
  })

  useEffect(() => {
    fetchConteudos()
  }, [])

  const fetchConteudos = async () => {
    try {
      const q = query(collection(db, "conteudos"), orderBy("criadoEm", "desc"))
      const querySnapshot = await getDocs(q)
      const conteudosData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Conteudo[]
      setConteudos(conteudosData)
    } catch (error) {
      console.error("Erro ao buscar conteúdos:", error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const conteudoData = {
        ...formData,
        criadoEm: editingConteudo ? editingConteudo.criadoEm : new Date().toISOString(),
      }

      if (editingConteudo) {
        await updateDoc(doc(db, "conteudos", editingConteudo.id), conteudoData)
      } else {
        await addDoc(collection(db, "conteudos"), conteudoData)
      }

      resetForm()
      fetchConteudos()
      alert("Conteúdo salvo com sucesso!")
    } catch (error) {
      console.error("Erro ao salvar conteúdo:", error)
      alert("Erro ao salvar conteúdo. Tente novamente.")
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (confirm("Tem certeza que deseja excluir este conteúdo?")) {
      try {
        await deleteDoc(doc(db, "conteudos", id))
        fetchConteudos()
        alert("Conteúdo excluído com sucesso!")
      } catch (error) {
        console.error("Erro ao excluir conteúdo:", error)
        alert("Erro ao excluir conteúdo.")
      }
    }
  }

  const handleEdit = (conteudo: Conteudo) => {
    setEditingConteudo(conteudo)
    setFormData({
      titulo: conteudo.titulo,
      descricao: conteudo.descricao,
      conteudo: conteudo.conteudo,
      categoria: conteudo.categoria,
      ativo: conteudo.ativo,
    })
    setShowForm(true)
  }

  const resetForm = () => {
    setFormData({
      titulo: "",
      descricao: "",
      conteudo: "",
      categoria: "",
      ativo: true,
    })
    setEditingConteudo(null)
    setShowForm(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Gerenciar Conteúdos</h2>
        <Button onClick={() => setShowForm(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Novo Conteúdo
        </Button>
      </div>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>{editingConteudo ? "Editar Conteúdo" : "Novo Conteúdo"}</CardTitle>
            <CardDescription>Crie e gerencie conteúdos para o site</CardDescription>
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

              <div>
                <Label htmlFor="conteudo">Conteúdo</Label>
                <Textarea
                  id="conteudo"
                  name="conteudo"
                  value={formData.conteudo}
                  onChange={handleChange}
                  rows={10}
                  required
                />
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
        {conteudos.map((conteudo) => (
          <Card key={conteudo.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <Badge variant={conteudo.ativo ? "default" : "secondary"}>{conteudo.ativo ? "Ativo" : "Inativo"}</Badge>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => handleEdit(conteudo)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => handleDelete(conteudo.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <CardTitle className="text-lg">{conteudo.titulo}</CardTitle>
              <CardDescription>{conteudo.descricao}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <p>
                  <strong>Categoria:</strong> {conteudo.categoria}
                </p>
                <p>
                  <strong>Criado em:</strong> {new Date(conteudo.criadoEm).toLocaleDateString("pt-BR")}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default ConteudosAdmin
