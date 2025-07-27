import { notFound } from "next/navigation"
import { doc, getDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"
import LandingPageClient from "./landing-page-client"

interface LandingPageData {
  id: string
  titulo: string
  descricao: string
  dataEvento: string
  horario: string
  local: string
  capacidade: number
  inscricoes: number
  ativo: boolean
  campos: Array<{
    id: string
    nome: string
    tipo: "texto" | "email" | "telefone" | "textarea"
    obrigatorio: boolean
    placeholder: string
  }>
}

async function getLandingPage(slug: string): Promise<LandingPageData | null> {
  try {
    const docRef = doc(db, "landingPages", slug)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists() && docSnap.data().ativo) {
      return { id: docSnap.id, ...docSnap.data() } as LandingPageData
    }
    return null
  } catch (error) {
    console.error("Erro ao buscar landing page:", error)
    return null
  }
}

export default async function LandingPage({ params }: { params: { slug: string } }) {
  const landingPage = await getLandingPage(params.slug)

  if (!landingPage) {
    notFound()
  }

  return <LandingPageClient landingPage={landingPage} />
}
