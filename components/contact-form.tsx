"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { Send } from "lucide-react"

export default function ContactForm() {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000))

    toast({
      title: "Mensagem enviada!",
      description: "Agradecemos seu contato. Retornaremos em breve.",
    })

    setIsSubmitting(false)
    e.currentTarget.reset()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name" className="text-blue-950">
          Nome
        </Label>
        <Input
          id="name"
          name="name"
          required
          className="mt-1 border-gray-300 focus:border-orange-500 focus:ring-orange-500"
          placeholder="Seu nome completo"
        />
      </div>
      <div>
        <Label htmlFor="email" className="text-blue-950">
          Email
        </Label>
        <Input
          id="email"
          name="email"
          type="email"
          required
          className="mt-1 border-gray-300 focus:border-orange-500 focus:ring-orange-500"
          placeholder="seu@email.com"
        />
      </div>
      <div>
        <Label htmlFor="phone" className="text-blue-950">
          Telefone
        </Label>
        <Input
          id="phone"
          name="phone"
          className="mt-1 border-gray-300 focus:border-orange-500 focus:ring-orange-500"
          placeholder="(00) 00000-0000"
        />
      </div>
      <div>
        <Label htmlFor="message" className="text-blue-950">
          Mensagem
        </Label>
        <Textarea
          id="message"
          name="message"
          required
          rows={4}
          className="mt-1 border-gray-300 focus:border-orange-500 focus:ring-orange-500"
          placeholder="Como podemos ajudar?"
        />
      </div>
      <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600" disabled={isSubmitting}>
        {isSubmitting ? (
          "Enviando..."
        ) : (
          <>
            Enviar Mensagem <Send className="ml-2 h-4 w-4" />
          </>
        )}
      </Button>
    </form>
  )
}
