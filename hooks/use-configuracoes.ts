"use client"

import { useState, useEffect } from "react"
import { doc, getDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"

interface Configuracoes {
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
  sobre: {
    titulo: string
    descricao: string
    missao: string
    visao: string
    valores: string[]
  }
}

const defaultConfiguracoes: Configuracoes = {
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
  sobre: {
    titulo: "Projeto Metanoia",
    descricao: "Transformando vidas através da educação, esperança e oportunidades.",
    missao: "Nossa missão é transformar vidas através da educação e oportunidades.",
    visao: "Ser referência em transformação social através da educação.",
    valores: ["Educação", "Esperança", "Transformação", "Comunidade"],
  },
}

export function useConfiguracoes() {
  const [configuracoes, setConfiguracoes] = useState<Configuracoes>(defaultConfiguracoes)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchConfiguracoes = async () => {
      try {
        const docRef = doc(db, "configuracoes", "geral")
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {
          setConfiguracoes({ ...defaultConfiguracoes, ...docSnap.data() })
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
