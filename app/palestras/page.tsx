"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Clock, Users } from "lucide-react"
import { collection, getDocs, query, orderBy } from "firebase/firestore"
import { db } from "@/lib/firebase"
import TopBanner from "@/components/top-banner"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

interface Palestra {
  id: string
  titulo: string
  descricao: string
  data: string
  horario: string
  local: string
  palestrante: string
  vagas: number
  categoria: string
}

export default function PalestrasPage() {
  const [palestras, setPalestras] = useState<Palestra[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPalestras = async () => {
      try {
        const q = query(collection(db, "palestras"), orderBy("data", "asc"))
        const querySnapshot = await getDocs(q)
        const palestrasData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Palestra[]
        setPalestras(palestrasData)
      } catch (error) {
        console.error("Erro ao buscar palestras:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchPalestras()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen">
        <TopBanner />
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-32">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Carregando palestras...</p>
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
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Palestras e Eventos</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Participe dos nossos eventos e palestras motivacionais. Momentos de aprendizado, inspiração e networking
            para transformar sua vida.
          </p>
        </div>

        {palestras.length === 0 ? (
          <div className="text-center py-12">
            <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">Nenhuma palestra agendada</h3>
            <p className="text-gray-500">
              Novas palestras serão divulgadas em breve. Fique atento às nossas redes sociais!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {palestras.map((palestra) => (
              <Card key={palestra.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                      {palestra.categoria}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl">{palestra.titulo}</CardTitle>
                  <CardDescription className="text-sm text-gray-600">Por: {palestra.palestrante}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4">{palestra.descricao}</p>

                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-orange-500" />
                      {new Date(palestra.data).toLocaleDateString("pt-BR")}
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-orange-500" />
                      {palestra.horario}
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2 text-orange-500" />
                      {palestra.local}
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-2 text-orange-500" />
                      {palestra.vagas} vagas disponíveis
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
