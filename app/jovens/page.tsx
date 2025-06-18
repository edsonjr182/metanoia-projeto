"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Heart, Play, BookOpen, Star, ExternalLink } from "lucide-react"
import { collection, getDocs, query, orderBy } from "firebase/firestore"
import { db } from "@/lib/firebase"
import TopBanner from "@/components/top-banner"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

interface Conteudo {
  id: string
  titulo: string
  descricao: string
  tipo: "video" | "texto"
  categoria: string
  url?: string
  conteudo?: string
  destaque: boolean
}

export default function JovensPage() {
  const [conteudos, setConteudos] = useState<Conteudo[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchConteudos = async () => {
      try {
        const q = query(collection(db, "conteudos-jovens"), orderBy("destaque", "desc"))
        const querySnapshot = await getDocs(q)
        const conteudosData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Conteudo[]
        setConteudos(conteudosData)
      } catch (error) {
        console.error("Erro ao buscar conteúdos:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchConteudos()
  }, [])

  const getYouTubeEmbedUrl = (url: string) => {
    const videoId = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/)
    return videoId ? `https://www.youtube.com/embed/${videoId[1]}` : url
  }

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
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Área para Jovens</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Conteúdos motivacionais, dicas de carreira e inspiração para você que quer transformar sua vida e alcançar
            seus sonhos.
          </p>
        </div>

        {conteudos.length === 0 ? (
          <div className="text-center py-12">
            <Heart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">Nenhum conteúdo disponível</h3>
            <p className="text-gray-500">Novos conteúdos motivacionais serão adicionados em breve!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {conteudos.map((conteudo) => (
              <Card key={conteudo.id} className="hover:shadow-lg transition-shadow overflow-hidden">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                      {conteudo.categoria}
                    </Badge>
                    {conteudo.destaque && (
                      <Badge className="bg-yellow-500 text-white">
                        <Star className="h-3 w-3 mr-1" />
                        Destaque
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-xl flex items-center">
                    {conteudo.tipo === "video" ? (
                      <Play className="h-5 w-5 mr-2 text-red-500" />
                    ) : (
                      <BookOpen className="h-5 w-5 mr-2 text-blue-500" />
                    )}
                    {conteudo.titulo}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-700 mb-4">{conteudo.descricao}</CardDescription>

                  {conteudo.tipo === "video" && conteudo.url ? (
                    <div className="mb-4">
                      <div className="aspect-video rounded-lg overflow-hidden bg-gray-100">
                        <iframe
                          src={getYouTubeEmbedUrl(conteudo.url)}
                          title={conteudo.titulo}
                          className="w-full h-full"
                          allowFullScreen
                        />
                      </div>
                    </div>
                  ) : (
                    conteudo.conteudo && (
                      <div className="mb-4">
                        <div className="prose prose-sm max-w-none">
                          <div className="text-gray-700 whitespace-pre-line">
                            {conteudo.conteudo.length > 200
                              ? `${conteudo.conteudo.substring(0, 200)}...`
                              : conteudo.conteudo}
                          </div>
                        </div>
                        {conteudo.conteudo.length > 200 && (
                          <Button variant="outline" size="sm" className="mt-2">
                            Ler mais
                          </Button>
                        )}
                      </div>
                    )
                  )}

                  {conteudo.url && conteudo.tipo === "video" && (
                    <Button asChild className="w-full">
                      <a href={conteudo.url} target="_blank" rel="noopener noreferrer">
                        Assistir no YouTube
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  )}
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
