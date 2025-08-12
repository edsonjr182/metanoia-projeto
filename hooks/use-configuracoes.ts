"use client"

import { useState, useEffect } from "react"
import { doc, getDoc, setDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"

interface ConfiguracoesJuridico {
  razaoSocial: string
  cnpj: string
  enderecoCompleto: string
  responsavelLegal: string
  emailJuridico: string
  telefoneJuridico: string
}

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
  juridico: ConfiguracoesJuridico
}

export function useConfiguracoes() {
  const [configuracoes, setConfiguracoes] = useState<ConfiguracoesSite>({
    contato: {
      email: "contato@projetometanoia.com.br",
      telefone: "(61) 98319-4827",
      localizacao: "Brasília, DF",
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
    juridico: {
      razaoSocial: "Projeto Metanoia: mudança de mentalidade",
      cnpj: "",
      enderecoCompleto: "Brasília, DF",
      responsavelLegal: "",
      emailJuridico: "juridico@projetometanoia.com.br",
      telefoneJuridico: "(61) 98319-4827",
    },
  })

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchConfiguracoes()
  }, [])

  const fetchConfiguracoes = async () => {
    try {
      const docRef = doc(db, "configuracoes", "site")
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        const data = docSnap.data() as ConfiguracoesSite
        setConfiguracoes(data)
      }
    } catch (error) {
      console.error("Erro ao buscar configurações:", error)
    }
  }

  const salvarConfiguracoes = async (novasConfiguracoes: ConfiguracoesSite) => {
    setLoading(true)
    try {
      await setDoc(doc(db, "configuracoes", "site"), novasConfiguracoes)
      setConfiguracoes(novasConfiguracoes)
      return true
    } catch (error) {
      console.error("Erro ao salvar configurações:", error)
      return false
    } finally {
      setLoading(false)
    }
  }

  return {
    configuracoes,
    loading,
    salvarConfiguracoes,
    fetchConfiguracoes,
  }
}
