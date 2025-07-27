"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2, Users, Calendar } from "lucide-react"
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc, query, orderBy } from "firebase/firestore"
import { db } from "@/lib/firebase"

interface Curso {
  id: string
  titulo: string
  descricao: string
  instrutor: string
  duracao: string
  preco: number
  dataInicio: string
  vagas: number
  inscricoes: number
  ativo: boolean
  criadoEm: string
}

export function CursosAdmin() {
  const [cursos, setCursos] = useState<Curso[]>([])
  const [loading, setLoading] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [editingCurso, setEditingCurso] = useState<Curso | null>(null)
  const [formData, setFormData] = useState({
    titulo: "",
    descricao: "",
    instrutor: "",
    duracao: "",
    preco: 0,
    dataInicio: "",
    vagas: 20,
    ativo: true,
  })

  useEffect(() => {
    fetchCursos()
  }, [])

  const fetchCursos = async () => {
    try {
      const q = query(collection(db, "cursos"), orderBy("dataInicio", "desc"))
      const querySnapshot = await getDocs(q)
      const cursosData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Curso[]
      setCursos(cursosData)
    } catch (error) {
      console.error("Erro ao buscar cursos:", error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const cursoData = {
        ...formData,
        inscricoes: editingCurso ? editingCurso.inscricoes : 0,
        criadoEm: editingCurso ? editingCurso.criadoEm : new Date().toISOString(),
      }

      if (editingCurso) {
        await updateDoc(doc(db, "cursos", editingCurso.id), cursoData)
      } else {
        await addDoc(collection(db, "cursos"), cursoData)
      }

      resetForm()
      fetchCursos()
      alert("Curso salvo com sucesso!")
    } catch (error) {
      console.error("Erro ao salvar curso:", error)
      alert("Erro ao salvar curso. Tente novamente.")
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (confirm("Tem certeza que deseja excluir este curso?")) {
      try {
        await deleteDoc(doc(db, "cursos", id))
        fetchCursos()
        alert("Curso excluído com sucesso!")
      } catch (error) {
        console.error("Erro ao excluir curso:", error)
        alert("Erro ao excluir curso.")
      }
    }
  }

  const handleEdit = (curso: Curso) => {
    setEditingCurso(curso)
    setFormData({
      titulo: curso.titulo,
      descricao: curso.descricao,
      instrutor: curso.instrutor,
      duracao: curso.duracao,
      preco: curso.preco,
      dataInicio: curso.dataInicio,
      vagas: curso.vagas,
      ativo: curso.ativo,
    })
    setShowForm(true)
  }

  const resetForm = () => {
    setFormData({
      titulo: "",
      descricao: "",
      instrutor: "",
      duracao: "",
      preco: 0,
      dataInicio: "",
      vagas: 20,
      ativo: true,
    })
    setEditingCurso(null)
    setShowForm(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === "preco" || name === "vagas" ? Number.parseInt(value) || 0 : value,
    }))
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Gerenciar Cursos</h2>
        <Button onClick={() => setShowForm(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Novo Curso
        </Button>
      </div>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>{editingCurso ? "Editar Curso" : "Novo Curso"}</CardTitle>
            <CardDescription>Crie e gerencie cursos oferecidos</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="titulo">Título do Curso</Label>
                  <Input id="titulo" name="titulo" value={formData.titulo} onChange={handleChange} required />
                </div>
                <div>
                  <Label htmlFor="instrutor">Instrutor</Label>
                  <Input id="instrutor" name="instrutor" value={formData.instrutor} onChange={handleChange} required />
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
                  <Label htmlFor="duracao">Duração</Label>
                  <Input
                    id="duracao"
                    name="duracao"
                    value={formData.duracao}
                    onChange={handleChange}
                    placeholder="Ex: 8 semanas"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="preco">Preço (R$)</Label>
                  <Input
                    id="preco"
                    name="preco"
                    type="number"
                    value={formData.preco}
                    onChange={handleChange}
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
                <div>
                  <Label htmlFor="dataInicio">Data de Início</Label>
                  <Input
                    id="dataInicio"
                    name="dataInicio"
                    type="date"
                    value={formData.dataInicio}
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
        {cursos.map((curso) => {
          const vagasDisponiveis = curso.vagas - curso.inscricoes

          return (
            <Card key={curso.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex gap-2">
                    <Badge variant={curso.ativo ? "default" : "secondary"}>{curso.ativo ? "Ativo" : "Inativo"}</Badge>
                    {vagasDisponiveis <= 0 && <Badge variant="destructive">Esgotado</Badge>}
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => handleEdit(curso)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleDelete(curso.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <CardTitle className="text-lg">{curso.titulo}</CardTitle>
                <CardDescription className="line-clamp-2">{curso.descricao}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <p>
                    <strong>Instrutor:</strong> {curso.instrutor}
                  </p>
                  <p>
                    <strong>Duração:</strong> {curso.duracao}
                  </p>
                  <p>
                    <strong>Preço:</strong> R$ {curso.preco.toFixed(2)}
                  </p>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-orange-500" />
                    {new Date(curso.dataInicio).toLocaleDateString("pt-BR")}
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-2 text-orange-500" />
                    {curso.inscricoes} / {curso.vagas} inscritos
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

export default CursosAdmin
