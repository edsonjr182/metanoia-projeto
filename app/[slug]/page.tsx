import { notFound } from "next/navigation"
import { collection, query, where, getDocs } from "firebase/firestore"
import { db } from "@/lib/firebase"
import LandingPageClient from "./landing-page-client"

interface LandingPageData {
  id: string
  title: string
  slug: string
  videoUrl: string
  description: string
  createdAt: any
}

async function getLandingPage(slug: string): Promise<LandingPageData | null> {
  try {
    const q = query(collection(db, "landingPages"), where("slug", "==", slug))
    const querySnapshot = await getDocs(q)

    if (querySnapshot.empty) {
      return null
    }

    const doc = querySnapshot.docs[0]
    return {
      id: doc.id,
      ...doc.data(),
    } as LandingPageData
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

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const landingPage = await getLandingPage(params.slug)

  if (!landingPage) {
    return {
      title: "Página não encontrada - Projeto Metanoia",
    }
  }

  return {
    title: `${landingPage.title} - Projeto Metanoia`,
    description: landingPage.description,
  }
}
