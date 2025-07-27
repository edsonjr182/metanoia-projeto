"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trash2, Mail, Phone, MessageSquare, Eye } from "lucide-react"
import { collection, getDocs, deleteDoc, doc, updateDoc, query, orderBy } from "firebase/firestore"
import { db } from "@/lib/firebase"

interface Contato {
  id: string
  nome: string
  email: string
  telefone?: string
  assunto: string
  mensagem: string
  status: "novo" | "lido" | "respondido"
  dataEnvio: string
}

export function ContatosAdmin() {
  const [contatos, setContatos] = useState<Contato[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedContato, setSelectedContato] = useState<Contato | null>(null)

  useEffect(() => {
    fetchContatos()
  }, [])

  const fetchContatos = async () => {
    try {
      const q = query(collection(db, "contatos"), orderBy("dataEnvio", "desc"))
      const querySnapshot = await getDocs(q)
      const contatosData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Contato[]
      setContatos(contatosData)
    } catch (error) {
      console.error("Erro ao buscar contatos:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (confirm("Tem certeza que deseja excluir este contato?")) {
      try {
        await deleteDoc(doc(db, "contatos", id))
        fetchContatos()
        alert("Contato excluído com sucesso!")
      } catch (error) {
        console.error("Erro ao excluir contato:", error)
        alert("Erro ao excluir contato.")
      }
    }
  }

  const updateStatus = async (id: string, status: "novo" | "lido" | "respondido") => {
    try {
      await updateDoc(doc(db, "contatos", id), { status })
      fetchContatos()
    } catch (error) {
      console.error("Erro ao atualizar status:", error)
    }
  }

  const handleViewContato = (contato: Contato) => {
    setSelectedContato(contato)
    if (contato.status === "novo") {
      updateStatus(contato.id, "lido")
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "novo":
        return "bg-red-100 text-red-800"
      case "lido":
        return "bg-yellow-100 text-yellow-800"
      case "respondido":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "novo":
        return "Novo"
      case "lido":
        return "Lido"
      case "respondido":
        return "Respondido"
      default:
        return "Desconhecido"
    }
  }

  if (loading) {
    return <div className="flex justify-center p-8">Carregando...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Mensagens de Contato</h2>
        <div className="flex gap-2">
          <Badge variant="outline" className="bg-red-50">
            {contatos.filter((c) => c.status === "novo").length} Novos
          </Badge>
          <Badge variant="outline" className="bg-yellow-50">
            {contatos.filter((c) => c.status === "lido").length} Lidos
          </Badge>
          <Badge variant="outline" className="bg-green-50">
            {contatos.filter((c) => c.status === "respondido").length} Respondidos
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Lista de Contatos */}
        <div className="lg:col-span-2 space-y-4">
          {contatos.map((contato) => (
            <Card
              key={contato.id}
              className={`cursor-pointer hover:shadow-md transition-shadow ${
                selectedContato?.id === contato.id ? "ring-2 ring-blue-500" : ""
              }`}
              onClick={() => handleViewContato(contato)}
            >
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className={getStatusColor(contato.status)}>{getStatusText(contato.status)}</Badge>
                      <span className="text-sm text-gray-500">
                        {new Date(contato.dataEnvio).toLocaleDateString("pt-BR")}
                      </span>
                    </div>
                    <CardTitle className="text-lg">{contato.nome}</CardTitle>
                    <CardDescription>{contato.assunto}</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleViewContato(contato)
                      }}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleDelete(contato.id)
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Mail className="h-4 w-4" />
                    {contato.email}
                  </div>
                  {contato.telefone && (
                    <div className="flex items-center gap-1">
                      <Phone className="h-4 w-4" />
                      {contato.telefone}
                    </div>
                  )}
                </div>
                <p className="mt-2 text-sm text-gray-700 line-clamp-2">{contato.mensagem}</p>
              </CardContent>
            </Card>
          ))}

          {contatos.length === 0 && (
            <div className="text-center py-8 text-gray-500">Nenhuma mensagem de contato encontrada.</div>
          )}
        </div>

        {/* Detalhes do Contato */}
        <div className="lg:col-span-1">
          {selectedContato ? (
            <Card className="sticky top-4">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{selectedContato.nome}</CardTitle>
                    <CardDescription>{selectedContato.assunto}</CardDescription>
                  </div>
                  <Badge className={getStatusColor(selectedContato.status)}>
                    {getStatusText(selectedContato.status)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-sm font-medium text-gray-600">Email</Label>
                  <p className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    <a href={`mailto:${selectedContato.email}`} className="text-blue-600 hover:underline">
                      {selectedContato.email}
                    </a>
                  </p>
                </div>

                {selectedContato.telefone && (
                  <div>
                    <Label className="text-sm font-medium text-gray-600">Telefone</Label>
                    <p className="flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      <a href={`tel:${selectedContato.telefone}`} className="text-blue-600 hover:underline">
                        {selectedContato.telefone}
                      </a>
                    </p>
                  </div>
                )}

                <div>
                  <Label className="text-sm font-medium text-gray-600">Data de Envio</Label>
                  <p>{new Date(selectedContato.dataEnvio).toLocaleString("pt-BR")}</p>
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-600">Mensagem</Label>
                  <div className="bg-gray-50 p-3 rounded-md mt-1">
                    <p className="whitespace-pre-wrap">{selectedContato.mensagem}</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => updateStatus(selectedContato.id, "respondido")}
                    disabled={selectedContato.status === "respondido"}
                  >
                    Marcar como Respondido
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="flex items-center justify-center h-64 text-gray-500">
                <div className="text-center">
                  <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Selecione uma mensagem para ver os detalhes</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}

function Label({ children, className }: { children: React.ReactNode; className?: string }) {
  return <label className={className}>{children}</label>
}

export default ContatosAdmin
