"use client"

import { useState, useEffect } from "react"
import { collection, getDocs, query } from "firebase/firestore"
import { db } from "@/lib/firebase"

interface DashboardStats {
  palestras: number
  cursos: number
  conteudos: number
  contatos: number
  landingPages: number
  usuarios: number
  leadsLandingPages: number
  loading: boolean
}

export function useDashboardStats() {
  const [stats, setStats] = useState<DashboardStats>({
    palestras: 0,
    cursos: 0,
    conteudos: 0,
    contatos: 0,
    landingPages: 0,
    usuarios: 0,
    leadsLandingPages: 0,
    loading: true,
  })

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setStats((prev) => ({ ...prev, loading: true }))

        // Buscar palestras
        const palestrasQuery = query(collection(db, "palestras"))
        const palestrasSnapshot = await getDocs(palestrasQuery)
        const palestrasCount = palestrasSnapshot.size

        // Buscar cursos
        const cursosQuery = query(collection(db, "cursos"))
        const cursosSnapshot = await getDocs(cursosQuery)
        const cursosCount = cursosSnapshot.size

        // Buscar conteúdos
        const conteudosQuery = query(collection(db, "conteudos"))
        const conteudosSnapshot = await getDocs(conteudosQuery)
        const conteudosCount = conteudosSnapshot.size

        // Buscar contatos
        const contatosQuery = query(collection(db, "contatos"))
        const contatosSnapshot = await getDocs(contatosQuery)
        const contatosCount = contatosSnapshot.size

        // Buscar landing pages
        const landingPagesQuery = query(collection(db, "landing-pages"))
        const landingPagesSnapshot = await getDocs(landingPagesQuery)
        const landingPagesCount = landingPagesSnapshot.size

        // Buscar usuários
        const usuariosQuery = query(collection(db, "usuarios"))
        const usuariosSnapshot = await getDocs(usuariosQuery)
        const usuariosCount = usuariosSnapshot.size

        // Buscar leads das landing pages
        const leadsQuery = query(collection(db, "landing-leads"))
        const leadsSnapshot = await getDocs(leadsQuery)
        const leadsCount = leadsSnapshot.size

        setStats({
          palestras: palestrasCount,
          cursos: cursosCount,
          conteudos: conteudosCount,
          contatos: contatosCount,
          landingPages: landingPagesCount,
          usuarios: usuariosCount,
          leadsLandingPages: leadsCount,
          loading: false,
        })
      } catch (error) {
        console.error("Erro ao buscar estatísticas:", error)
        setStats((prev) => ({ ...prev, loading: false }))
      }
    }

    fetchStats()
  }, [])

  return stats
}
