import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "@/contexts/auth-context"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import TopBanner from "@/components/top-banner"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Projeto Metanoia - Transformando Vidas",
  description:
    "Transformando vidas através da educação, esperança e oportunidades. Juntos construímos um futuro melhor para nossa juventude.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <AuthProvider>
          <TopBanner />
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  )
}
