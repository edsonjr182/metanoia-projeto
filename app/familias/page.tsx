"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, Users } from "lucide-react"
import { collection, getDocs, query, orderBy } from "firebase/firestore"
import { db } from "@/lib/firebase"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import TopBanner from "@/components/top-banner"

interface ConteudoFamilia {
  id: string
  titulo: string
  descricao: string
  categoria: string
  conteudo: string
  autor?: string
}

export default function FamiliasPage() {
  const [conteudos, setConteudos] = useState<ConteudoFamilia[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchConteudos = async () => {
      try {
        const q = query(collection(db, "conteudos-familias"), orderBy("titulo", "asc"))
        const querySnapshot = await getDocs(q)
        const conteudosData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as ConteudoFamilia[]
        setConteudos(conteudosData)
      } catch (error) {
        console.error("Erro ao buscar conteúdos:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchConteudos()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen">
        <TopBanner />
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-40">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Carregando conteúdos...</p>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <TopBanner />
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-40">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Área para Famílias</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Orientações e apoio emocional para famílias. Juntos podemos criar um ambiente mais saudável e propício ao
            desenvolvimento dos nossos jovens.
          </p>
        </div>

        {conteudos.length === 0 ? (
          <div className="text-center py-12">
            <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">Nenhum conteúdo disponível</h3>
            <p className="text-gray-500">Novos conteúdos para famílias serão adicionados em breve!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {conteudos.map((conteudo) => (
              <Card key={conteudo.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      {conteudo.categoria}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl flex items-center">
                    <Heart className="h-5 w-5 mr-2 text-red-500" />
                    {conteudo.titulo}
                  </CardTitle>
                  {conteudo.autor && (
                    <CardDescription className="text-sm text-gray-600">Por: {conteudo.autor}</CardDescription>
                  )}
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-700 mb-4">{conteudo.descricao}</CardDescription>

                  <div className="prose prose-sm max-w-none">
                    <div className="text-gray-700 whitespace-pre-line">
                      {conteudo.conteudo.length > 300 ? `${conteudo.conteudo.substring(0, 300)}...` : conteudo.conteudo}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}
