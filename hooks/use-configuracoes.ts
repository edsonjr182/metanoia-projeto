"use client"

import { useState, useEffect } from "react"
import { doc, getDoc, setDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"

interface Configuracoes {
  contato: {
    email: string
    telefone: string
    endereco: string
  }
  juridico: {
    razaoSocial: string
    cnpj: string
    enderecoCompleto: string
    responsavelLegal: string
    emailJuridico: string
    telefoneJuridico: string
  }
  redes: {
    facebook: string
    instagram: string
    youtube: string
    whatsapp: string
    telegram: string
    discord: string
    linkCustom1: {
      nome: string
      url: string
    }
    linkCustom2: {
      nome: string
      url: string
    }
  }
}

const defaultConfiguracoes: Configuracoes = {
  contato: {
    email: "contato@projetometanoia.com.br",
    telefone: "(61) 98319-4827",
    endereco: "Brasília, DF",
  },
  juridico: {
    razaoSocial: "Projeto Metanoia: mudança de mentalidade",
    cnpj: "",
    enderecoCompleto: "Brasília, DF",
    responsavelLegal: "",
    emailJuridico: "juridico@projetometanoia.com.br",
    telefoneJuridico: "(61) 98319-4827",
  },
  redes: {
    facebook: "",
    instagram: "",
    youtube: "",
    whatsapp: "",
    telegram: "",
    discord: "",
    linkCustom1: {
      nome: "",
      url: "",
    },
    linkCustom2: {
      nome: "",
      url: "",
    },
  },
}

export function useConfiguracoes() {
  const [configuracoes, setConfiguracoes] = useState<Configuracoes>(defaultConfiguracoes)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchConfiguracoes()
  }, [])

  const fetchConfiguracoes = async () => {
    try {
      const docRef = doc(db, "configuracoes", "geral")
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        const data = docSnap.data() as Configuracoes
        setConfiguracoes({ ...defaultConfiguracoes, ...data })
      } else {
        // Se não existe, criar com valores padrão
        await setDoc(docRef, defaultConfiguracoes)
        setConfiguracoes(defaultConfiguracoes)
      }
    } catch (error) {
      console.error("Erro ao buscar configurações:", error)
      setConfiguracoes(defaultConfiguracoes)
    } finally {
      setLoading(false)
    }
  }

  const updateConfiguracoes = async (novasConfiguracoes: Partial<Configuracoes>) => {
    try {
      const docRef = doc(db, "configuracoes", "geral")
      const configuracoesAtualizadas = { ...configuracoes, ...novasConfiguracoes }

      await setDoc(docRef, configuracoesAtualizadas, { merge: true })
      setConfiguracoes(configuracoesAtualizadas)

      return true
    } catch (error) {
      console.error("Erro ao atualizar configurações:", error)
      return false
    }
  }

  return {
    configuracoes,
    loading,
    updateConfiguracoes,
    fetchConfiguracoes,
  }
}
