"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, BookOpen, Clock, Award } from "lucide-react"
import { collection, getDocs, query, orderBy } from "firebase/firestore"
import { db } from "@/lib/firebase"
import TopBanner from "@/components/top-banner"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

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

export default function CursosPage() {
  const [cursos, setCursos] = useState<Curso[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
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
      } finally {
        setLoading(false)
      }
    }

    fetchCursos()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen">
        <TopBanner />
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-40">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Carregando cursos...</p>
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
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Cursos Técnicos</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Descubra oportunidades de capacitação profissional gratuita. Invista no seu futuro com cursos técnicos de
            qualidade.
          </p>
        </div>

        {cursos.length === 0 ? (
          <div className="text-center py-12">
            <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">Nenhum curso cadastrado</h3>
            <p className="text-gray-500">Novos cursos serão adicionados em breve. Fique atento!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cursos.map((curso) => (
              <Card key={curso.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                      {curso.categoria}
                    </Badge>
                    {curso.gratuito && <Badge className="bg-green-500 text-white">Gratuito</Badge>}
                  </div>
                  <CardTitle className="text-xl">{curso.nome}</CardTitle>
                  <CardDescription className="text-sm text-gray-600">{curso.instituicao}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4">{curso.descricao}</p>

                  <div className="space-y-2 text-sm text-gray-600 mb-4">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-blue-500" />
                      Duração: {curso.duracao}
                    </div>
                    <div className="flex items-center">
                      <Award className="h-4 w-4 mr-2 text-blue-500" />
                      Modalidade: {curso.modalidade}
                    </div>
                  </div>

                  {curso.link && (
                    <Button asChild className="w-full">
                      <a href={curso.link} target="_blank" rel="noopener noreferrer">
                        Saiba Mais
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
