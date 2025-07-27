import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "@/contexts/auth-context"
import TopBanner from "@/components/top-banner"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Projeto Metanoia",
  description: "Transformando vidas através da educação e desenvolvimento pessoal",
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
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
