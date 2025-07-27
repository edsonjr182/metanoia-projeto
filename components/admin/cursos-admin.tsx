"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Plus, Edit, Trash2, ExternalLink } from "lucide-react"
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc, query, orderBy } from "firebase/firestore"
import { db } from "@/lib/firebase"

interface Curso {
  id: string
  nome: string
  descricao: string
  instituicao: string
  duracao: string
  modalidade: string
  categoria: string
  link?: string
  gratuito: boolean
}

export function CursosAdmin() {
  const [cursos, setCursos] = useState<Curso[]>([])
  const [loading, setLoading] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [editingCurso, setEditingCurso] = useState<Curso | null>(null)
  const [formData, setFormData] = useState({
    nome: "",
    descricao: "",
    instituicao: "",
    duracao: "",
    modalidade: "",
    categoria: "",
    link: "",
    gratuito: true,
  })

  useEffect(() => {
    fetchCursos()
  }, [])

  const fetchCursos = async () => {
    try {
      const q = query(collection(db, "cursos"), orderBy("nome", "asc"))
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
      if (editingCurso) {
        await updateDoc(doc(db, "cursos", editingCurso.id), formData)
      } else {
        await addDoc(collection(db, "cursos"), formData)
      }

      resetForm()
      fetchCursos()
    } catch (error) {
      console.error("Erro ao salvar curso:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (confirm("Tem certeza que deseja excluir este curso?")) {
      try {
        await deleteDoc(doc(db, "cursos", id))
        fetchCursos()
      } catch (error) {
        console.error("Erro ao excluir curso:", error)
      }
    }
  }

  const handleEdit = (curso: Curso) => {
    setEditingCurso(curso)
    setFormData({
      nome: curso.nome,
      descricao: curso.descricao,
      instituicao: curso.instituicao,
      duracao: curso.duracao,
      modalidade: curso.modalidade,
      categoria: curso.categoria,
      link: curso.link || "",
      gratuito: curso.gratuito,
    })
    setShowForm(true)
  }

  const resetForm = () => {
    setFormData({
      nome: "",
      descricao: "",
      instituicao: "",
      duracao: "",
      modalidade: "",
      categoria: "",
      link: "",
      gratuito: true,
    })
    setEditingCurso(null)
    setShowForm(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
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
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="nome">Nome do Curso</Label>
                  <Input id="nome" name="nome" value={formData.nome} onChange={handleChange} required />
                </div>
                <div>
                  <Label htmlFor="categoria">Categoria</Label>
                  <Input id="categoria" name="categoria" value={formData.categoria} onChange={handleChange} required />
                </div>
              </div>

              <div>
                <Label htmlFor="descricao">Descrição</Label>
                <Textarea id="descricao" name="descricao" value={formData.descricao} onChange={handleChange} required />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="instituicao">Instituição</Label>
                  <Input
                    id="instituicao"
                    name="instituicao"
                    value={formData.instituicao}
                    onChange={handleChange}
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
                    placeholder="Ex: 6 meses"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="modalidade">Modalidade</Label>
                  <Input
                    id="modalidade"
                    name="modalidade"
                    value={formData.modalidade}
                    onChange={handleChange}
                    placeholder="Ex: Presencial, Online, Híbrido"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="link">Link da Primeira Aula/Apresentação (YouTube)</Label>
                  <Input
                    id="link"
                    name="link"
                    type="url"
                    value={formData.link}
                    onChange={handleChange}
                    placeholder="https://youtube.com/watch?v=... ou https://youtu.be/..."
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Cole aqui o link do YouTube da primeira aula ou apresentação do curso
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="gratuito"
                  checked={formData.gratuito}
                  onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, gratuito: checked as boolean }))}
                />
                <Label htmlFor="gratuito">Curso gratuito</Label>
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
        {cursos.map((curso) => (
          <Card key={curso.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex gap-2">
                  <Badge variant="secondary">{curso.categoria}</Badge>
                  {curso.gratuito && <Badge className="bg-green-500 text-white">Gratuito</Badge>}
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
              <CardTitle className="text-lg">{curso.nome}</CardTitle>
              <CardDescription>{curso.instituicao}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">{curso.descricao}</p>
              <div className="space-y-2 text-sm">
                <div>
                  <strong>Duração:</strong> {curso.duracao}
                </div>
                <div>
                  <strong>Modalidade:</strong> {curso.modalidade}
                </div>
                {curso.link && (
                  <div>
                    <a
                      href={curso.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 flex items-center"
                    >
                      Ver mais detalhes
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

export default CursosAdmin
