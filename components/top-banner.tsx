"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { X, Sparkles, ArrowRight, Heart } from "lucide-react"
import Link from "next/link"

export default function TopBanner() {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    localStorage.setItem("topBannerVisible", isVisible.toString())
    window.dispatchEvent(new CustomEvent("topBannerToggle", { detail: { visible: isVisible } }))
  }, [isVisible])

  if (!isVisible) return null

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700 text-white py-3 px-4 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-dot-pattern opacity-20"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/10 via-transparent to-red-500/10"></div>

      <div className="relative z-10 max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-4 flex-1">
          <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm px-3 py-1 text-xs font-medium rounded-full">
            <Sparkles className="mr-1 h-3 w-3" />
            Novidade
          </Badge>

          <div className="flex items-center space-x-2 text-sm font-medium">
            <Heart className="h-4 w-4 text-yellow-300" />
            <span className="hidden sm:inline">
              🎉 <strong>Novas palestras disponíveis!</strong> Confira nossa programação atualizada
            </span>
            <span className="sm:hidden">
              <strong>Novas palestras!</strong> Confira agora
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <Link href="/palestras">
            <Button
              size="sm"
              className="bg-white/20 hover:bg-white/30 text-white border border-white/30 hover:border-white/50 backdrop-blur-sm rounded-xl transition-all duration-300 text-xs font-medium px-4 py-2 group"
            >
              Ver Palestras
              <ArrowRight className="ml-1 h-3 w-3 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
          </Link>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsVisible(false)}
            className="text-white/80 hover:text-white hover:bg-white/10 rounded-lg p-1 transition-all duration-200"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
