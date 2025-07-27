"use client"

import { useState, useEffect } from "react"
import { X, Megaphone } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function TopBanner() {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const bannerState = localStorage.getItem("topBannerVisible")
    if (bannerState !== null) {
      setIsVisible(bannerState === "true")
    }
  }, [])

  const handleClose = () => {
    setIsVisible(false)
    localStorage.setItem("topBannerVisible", "false")

    // Disparar evento customizado para notificar outros componentes
    window.dispatchEvent(
      new CustomEvent("topBannerToggle", {
        detail: { visible: false },
      }),
    )
  }

  if (!isVisible) return null

  return (
    <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 px-4 relative z-50">
      <div className="content-width container-padding">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Megaphone className="h-5 w-5 animate-pulse" />
            <p className="text-sm font-medium">
              🎉 Novas inscrições abertas para os cursos técnicos!
              <span className="ml-2 font-semibold underline cursor-pointer hover:text-orange-100">Saiba mais</span>
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClose}
            className="text-white hover:bg-white/20 h-8 w-8 p-0 rounded-full"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
