"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2, User } from "lucide-react"
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc, query, orderBy } from "firebase/firestore"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth, db } from "@/lib/firebase"

interface Usuario {
  id: string
  nome: string
  email: string
  role: "admin" | "editor" | "viewer"
  ativo: boolean
  criadoEm: string
  ultimoLogin?: string
}

export function UsuariosAdmin() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([])
  const [loading, setLoading] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [editingUsuario, setEditingUsuario] = useState<Usuario | null>(null)
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    senha: "",
    role: "viewer" as "admin" | "editor" | "viewer",
    ativo: true,
  })

  useEffect(() => {
    fetchUsuarios()
  }, [])

  const fetchUsuarios = async () => {
    try {
      const q = query(collection(db, "usuarios"), orderBy("criadoEm", "desc"))
      const querySnapshot = await getDocs(q)
      const usuariosData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Usuario[]
      setUsuarios(usuariosData)
    } catch (error) {
      console.error("Erro ao buscar usuários:", error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (editingUsuario) {
        // Atualizar usuário existente
        const { senha, ...updateData } = formData
        await updateDoc(doc(db, "usuarios", editingUsuario.id), updateData)
      } else {
        // Criar novo usuário
        const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.senha)

        // Salvar dados do usuário no Firestore
        await addDoc(collection(db, "usuarios"), {
          nome: formData.nome,
          email: formData.email,
          role: formData.role,
          ativo: formData.ativo,
          uid: userCredential.user.uid,
          criadoEm: new Date().toISOString(),
        })
      }

      resetForm()
      fetchUsuarios()
      alert("Usuário salvo com sucesso!")
    } catch (error) {
      console.error("Erro ao salvar usuário:", error)
      alert("Erro ao salvar usuário. Tente novamente.")
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (confirm("Tem certeza que deseja excluir este usuário?")) {
      try {
        await deleteDoc(doc(db, "usuarios", id))
        fetchUsuarios()
        alert("Usuário excluído com sucesso!")
      } catch (error) {
        console.error("Erro ao excluir usuário:", error)
        alert("Erro ao excluir usuário.")
      }
    }
  }

  const handleEdit = (usuario: Usuario) => {
    setEditingUsuario(usuario)
    setFormData({
      nome: usuario.nome,
      email: usuario.email,
      senha: "",
      role: usuario.role,
      ativo: usuario.ativo,
    })
    setShowForm(true)
  }

  const resetForm = () => {
    setFormData({
      nome: "",
      email: "",
      senha: "",
      role: "viewer",
      ativo: true,
    })
    setEditingUsuario(null)
    setShowForm(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-red-100 text-red-800"
      case "editor":
        return "bg-blue-100 text-blue-800"
      case "viewer":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getRoleText = (role: string) => {
    switch (role) {
      case "admin":
        return "Administrador"
      case "editor":
        return "Editor"
      case "viewer":
        return "Visualizador"
      default:
        return "Desconhecido"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Gerenciar Usuários</h2>
        <Button onClick={() => setShowForm(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Novo Usuário
        </Button>
      </div>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>{editingUsuario ? "Editar Usuário" : "Novo Usuário"}</CardTitle>
            <CardDescription>Gerencie usuários e suas permissões</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="nome">Nome Completo</Label>
                  <Input id="nome" name="nome" value={formData.nome} onChange={handleChange} required />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={!!editingUsuario}
                    required
                  />
                </div>
              </div>

              {!editingUsuario && (
                <div>
                  <Label htmlFor="senha">Senha</Label>
                  <Input
                    id="senha"
                    name="senha"
                    type="password"
                    value={formData.senha}
                    onChange={handleChange}
                    required
                  />
                </div>
              )}

              <div>
                <Label htmlFor="role">Função</Label>
                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md"
                  required
                >
                  <option value="viewer">Visualizador</option>
                  <option value="editor">Editor</option>
                  <option value="admin">Administrador</option>
                </select>
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
        {usuarios.map((usuario) => (
          <Card key={usuario.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex gap-2">
                  <Badge variant={usuario.ativo ? "default" : "secondary"}>{usuario.ativo ? "Ativo" : "Inativo"}</Badge>
                  <Badge className={getRoleColor(usuario.role)}>{getRoleText(usuario.role)}</Badge>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => handleEdit(usuario)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => handleDelete(usuario.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <CardTitle className="text-lg flex items-center gap-2">
                <User className="h-5 w-5" />
                {usuario.nome}
              </CardTitle>
              <CardDescription>{usuario.email}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <p>
                  <strong>Criado em:</strong> {new Date(usuario.criadoEm).toLocaleDateString("pt-BR")}
                </p>
                {usuario.ultimoLogin && (
                  <p>
                    <strong>Último login:</strong> {new Date(usuario.ultimoLogin).toLocaleDateString("pt-BR")}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default UsuariosAdmin
