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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Edit, Trash2, Play, BookOpen, Star } from "lucide-react"
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc, query, orderBy } from "firebase/firestore"
import { db } from "@/lib/firebase"

interface Conteudo {
  id: string
  titulo: string
  descricao: string
  tipo: "video" | "texto"
  categoria: string
  url?: string
  conteudo?: string
  destaque: boolean
  autor?: string
}

export default function ConteudosAdmin() {
  const [conteudosJovens, setConteudosJovens] = useState<Conteudo[]>([])
  const [conteudosFamilias, setConteudosFamilias] = useState<Conteudo[]>([])
  const [loading, setLoading] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [editingConteudo, setEditingConteudo] = useState<Conteudo | null>(null)
  const [activeTab, setActiveTab] = useState<"jovens" | "familias">("jovens")
  const [formData, setFormData] = useState({
    titulo: "",
    descricao: "",
    tipo: "texto" as "video" | "texto",
    categoria: "",
    url: "",
    conteudo: "",
    destaque: false,
    autor: "",
  })

  useEffect(() => {
    fetchConteudos()
  }, [])

  const fetchConteudos = async () => {
    try {
      // Buscar conteúdos para jovens
      const qJovens = query(collection(db, "conteudos-jovens"), orderBy("destaque", "desc"))
      const querySnapshotJovens = await getDocs(qJovens)
      const conteudosJovensData = querySnapshotJovens.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Conteudo[]
      setConteudosJovens(conteudosJovensData)

      // Buscar conteúdos para famílias
      const qFamilias = query(collection(db, "conteudos-familias"), orderBy("titulo", "asc"))
      const querySnapshotFamilias = await getDocs(qFamilias)
      const conteudosFamiliasData = querySnapshotFamilias.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Conteudo[]
      setConteudosFamilias(conteudosFamiliasData)
    } catch (error) {
      console.error("Erro ao buscar conteúdos:", error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const collection_name = activeTab === "jovens" ? "conteudos-jovens" : "conteudos-familias"

      if (editingConteudo) {
        await updateDoc(doc(db, collection_name, editingConteudo.id), formData)
      } else {
        await addDoc(collection(db, collection_name), formData)
      }

      resetForm()
      fetchConteudos()
    } catch (error) {
      console.error("Erro ao salvar conteúdo:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (confirm("Tem certeza que deseja excluir este conteúdo?")) {
      try {
        const collection_name = activeTab === "jovens" ? "conteudos-jovens" : "conteudos-familias"
        await deleteDoc(doc(db, collection_name, id))
        fetchConteudos()
      } catch (error) {
        console.error("Erro ao excluir conteúdo:", error)
      }
    }
  }

  const handleEdit = (conteudo: Conteudo) => {
    setEditingConteudo(conteudo)
    setFormData({
      titulo: conteudo.titulo,
      descricao: conteudo.descricao,
      tipo: conteudo.tipo,
      categoria: conteudo.categoria,
      url: conteudo.url || "",
      conteudo: conteudo.conteudo || "",
      destaque: conteudo.destaque,
      autor: conteudo.autor || "",
    })
    setShowForm(true)
  }

  const resetForm = () => {
    setFormData({
      titulo: "",
      descricao: "",
      tipo: "texto",
      categoria: "",
      url: "",
      conteudo: "",
      destaque: false,
      autor: "",
    })
    setEditingConteudo(null)
    setShowForm(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const currentConteudos = activeTab === "jovens" ? conteudosJovens : conteudosFamilias

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Gerenciar Conteúdos</h2>
        <Button onClick={() => setShowForm(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Novo Conteúdo
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "jovens" | "familias")}>
        <TabsList>
          <TabsTrigger value="jovens">Conteúdos para Jovens</TabsTrigger>
          <TabsTrigger value="familias">Conteúdos para Famílias</TabsTrigger>
        </TabsList>

        {showForm && (
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>{editingConteudo ? "Editar Conteúdo" : "Novo Conteúdo"}</CardTitle>
              <CardDescription>Criando conteúdo para: {activeTab === "jovens" ? "Jovens" : "Famílias"}</CardDescription>
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
                    <Input
                      id="categoria"
                      name="categoria"
                      value={formData.categoria}
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
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="tipo">Tipo de Conteúdo</Label>
                    <Select
                      value={formData.tipo}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, tipo: value as "video" | "texto" }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="texto">Texto</SelectItem>
                        <SelectItem value="video">Vídeo</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  {activeTab === "familias" && (
                    <div>
                      <Label htmlFor="autor">Autor (opcional)</Label>
                      <Input id="autor" name="autor" value={formData.autor} onChange={handleChange} />
                    </div>
                  )}
                </div>

                {formData.tipo === "video" ? (
                  <div>
                    <Label htmlFor="url">URL do Vídeo</Label>
                    <Input
                      id="url"
                      name="url"
                      type="url"
                      value={formData.url}
                      onChange={handleChange}
                      placeholder="https://youtube.com/watch?v=..."
                      required
                    />
                  </div>
                ) : (
                  <div>
                    <Label htmlFor="conteudo">Conteúdo</Label>
                    <Textarea
                      id="conteudo"
                      name="conteudo"
                      value={formData.conteudo}
                      onChange={handleChange}
                      rows={6}
                      required
                    />
                  </div>
                )}

                {activeTab === "jovens" && (
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="destaque"
                      checked={formData.destaque}
                      onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, destaque: checked as boolean }))}
                    />
                    <Label htmlFor="destaque">Marcar como destaque</Label>
                  </div>
                )}

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

        <TabsContent value="jovens" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {conteudosJovens.map((conteudo) => (
              <Card key={conteudo.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex gap-2">
                      <Badge variant="secondary">{conteudo.categoria}</Badge>
                      {conteudo.destaque && (
                        <Badge className="bg-yellow-500 text-white">
                          <Star className="h-3 w-3 mr-1" />
                          Destaque
                        </Badge>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => handleEdit(conteudo)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleDelete(conteudo.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <CardTitle className="text-lg flex items-center">
                    {conteudo.tipo === "video" ? (
                      <Play className="h-5 w-5 mr-2 text-red-500" />
                    ) : (
                      <BookOpen className="h-5 w-5 mr-2 text-blue-500" />
                    )}
                    {conteudo.titulo}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">{conteudo.descricao}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="familias" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {conteudosFamilias.map((conteudo) => (
              <Card key={conteudo.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <Badge variant="secondary">{conteudo.categoria}</Badge>
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
                  {conteudo.autor && <CardDescription>Por: {conteudo.autor}</CardDescription>}
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-2">{conteudo.descricao}</p>
                  {conteudo.conteudo && (
                    <p className="text-xs text-gray-500 line-clamp-3">{conteudo.conteudo.substring(0, 150)}...</p>
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
