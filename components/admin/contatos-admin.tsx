"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Mail, Phone, Calendar, Trash2, CheckCircle } from "lucide-react"
import { collection, getDocs, deleteDoc, doc, updateDoc, query, orderBy } from "firebase/firestore"
import { db } from "@/lib/firebase"

interface Contato {
  id: string
  nome: string
  email: string
  telefone?: string
  assunto: string
  mensagem: string
  data: string
  status: "novo" | "respondido" | "arquivado"
}

export default function ContatosAdmin() {
  const [contatos, setContatos] = useState<Contato[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchContatos()
  }, [])

  const fetchContatos = async () => {
    try {
      const q = query(collection(db, "contatos"), orderBy("data", "desc"))
      const querySnapshot = await getDocs(q)
      const contatosData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Contato[]
      setContatos(contatosData)
    } catch (error) {
      console.error("Erro ao buscar contatos:", error)
    }
  }

  const handleDelete = async (id: string) => {
    if (confirm("Tem certeza que deseja excluir este contato?")) {
      try {
        await deleteDoc(doc(db, "contatos", id))
        fetchContatos()
      } catch (error) {
        console.error("Erro ao excluir contato:", error)
      }
    }
  }

  const handleStatusChange = async (id: string, newStatus: "novo" | "respondido" | "arquivado") => {
    try {
      await updateDoc(doc(db, "contatos", id), { status: newStatus })
      fetchContatos()
    } catch (error) {
      console.error("Erro ao atualizar status:", error)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "novo":
        return "bg-blue-500"
      case "respondido":
        return "bg-green-500"
      case "arquivado":
        return "bg-gray-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "novo":
        return "Novo"
      case "respondido":
        return "Respondido"
      case "arquivado":
        return "Arquivado"
      default:
        return "Desconhecido"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Gerenciar Contatos</h2>
        <div className="text-sm text-gray-600">
          {contatos.length} mensagem{contatos.length !== 1 ? "s" : ""}
        </div>
      </div>

      {contatos.length === 0 ? (
        <div className="text-center py-12">
          <Mail className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">Nenhuma mensagem</h3>
          <p className="text-gray-500">As mensagens de contato aparecerão aqui.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {contatos.map((contato) => (
            <Card key={contato.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{contato.nome}</CardTitle>
                    <CardDescription className="flex items-center gap-4 mt-2">
                      <span className="flex items-center">
                        <Mail className="h-4 w-4 mr-1" />
                        {contato.email}
                      </span>
                      {contato.telefone && (
                        <span className="flex items-center">
                          <Phone className="h-4 w-4 mr-1" />
                          {contato.telefone}
                        </span>
                      )}
                      <span className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {new Date(contato.data).toLocaleDateString("pt-BR")}
                      </span>
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={`${getStatusColor(contato.status)} text-white`}>
                      {getStatusLabel(contato.status)}
                    </Badge>
                    <div className="flex gap-1">
                      {contato.status === "novo" && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleStatusChange(contato.id, "respondido")}
                          title="Marcar como respondido"
                        >
                          <CheckCircle className="h-4 w-4" />
                        </Button>
                      )}
                      <Button size="sm" variant="outline" onClick={() => handleDelete(contato.id)} title="Excluir">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="mb-3">
                  <h4 className="font-semibold text-sm text-gray-700 mb-1">Assunto:</h4>
                  <p className="text-sm">{contato.assunto}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-gray-700 mb-1">Mensagem:</h4>
                  <p className="text-sm text-gray-600 whitespace-pre-line">{contato.mensagem}</p>
                </div>

                {contato.status === "novo" && (
                  <div className="mt-4 flex gap-2">
                    <Button size="sm" onClick={() => handleStatusChange(contato.id, "respondido")}>
                      Marcar como Respondido
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleStatusChange(contato.id, "arquivado")}>
                      Arquivar
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
