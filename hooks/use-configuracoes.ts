"use client"

import { useState, useEffect } from "react"
import { doc, getDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"

interface ConfiguracoesSite {
  contato: {
    email: string
    telefone: string
    localizacao: string
  }
  redesSociais: {
    instagram: string
    facebook: string
    twitter: string
    linkedin: string
  }
  estatisticas: {
    jovensImpactados: string
    palestrasRealizadas: string
    parceriasAtivas: string
  }
}

const defaultConfiguracoes: ConfiguracoesSite = {
  contato: {
    email: "contato@projetometanoia.org",
    telefone: "(11) 99999-9999",
    localizacao: "São Paulo, SP",
  },
  redesSociais: {
    instagram: "#",
    facebook: "#",
    twitter: "#",
    linkedin: "#",
  },
  estatisticas: {
    jovensImpactados: "500+",
    palestrasRealizadas: "50+",
    parceriasAtivas: "20+",
  },
}

export function useConfiguracoes() {
  const [configuracoes, setConfiguracoes] = useState<ConfiguracoesSite>(defaultConfiguracoes)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchConfiguracoes = async () => {
      try {
        const docRef = doc(db, "configuracoes", "site")
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {
          setConfiguracoes(docSnap.data() as ConfiguracoesSite)
        }
      } catch (error) {
        console.error("Erro ao buscar configurações:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchConfiguracoes()
  }, [])

  return { configuracoes, loading }
}
