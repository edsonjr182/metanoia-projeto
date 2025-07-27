import { notFound } from "next/navigation"
import { db } from "@/lib/firebase"
import { collection, query, where, getDocs } from "firebase/firestore"
import LandingPageClient from "./landing-page-client"

interface LandingPageData {
  id: string
  title: string
  slug: string
  description: string
  primaryColor: string
  secondaryColor: string
  sections: any[]
  formFields: string[]
  thankYouMessage: string
  isActive: boolean
}

async function getLandingPage(slug: string): Promise<LandingPageData | null> {
  try {
    const q = query(collection(db, "landingPages"), where("slug", "==", slug), where("isActive", "==", true))

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

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const landingPage = await getLandingPage(params.slug)

  if (!landingPage) {
    return {
      title: "Página não encontrada",
    }
  }

  return {
    title: landingPage.title,
    description: landingPage.description,
    openGraph: {
      title: landingPage.title,
      description: landingPage.description,
      type: "website",
    },
  }
}

export default async function LandingPage({ params }: { params: { slug: string } }) {
  const landingPage = await getLandingPage(params.slug)

  if (!landingPage) {
    notFound()
  }

  return <LandingPageClient landingPage={landingPage} />
}
