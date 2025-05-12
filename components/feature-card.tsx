"use client"

import type React from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from "@/components/ui/card"
import { motion } from "framer-motion"

interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
  link: string
}

export default function FeatureCard({ icon, title, description, link }: FeatureCardProps) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
      }}
    >
      <Card className="group h-full overflow-hidden border-none bg-white shadow-lg transition-all duration-300 hover:shadow-xl">
        <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-orange-500/10 transition-transform duration-500 group-hover:scale-150"></div>
        <CardHeader className="relative">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 text-white shadow-md transition-transform duration-300 group-hover:scale-110">
            {icon}
          </div>
          <h3 className="text-xl font-bold text-blue-950">{title}</h3>
        </CardHeader>
        <CardContent className="relative">
          <CardDescription className="text-base text-gray-600">{description}</CardDescription>
        </CardContent>
        <CardFooter className="relative">
          <Link
            href={link}
            className="group/link flex items-center text-sm font-medium text-blue-950 transition-colors hover:text-orange-500"
          >
            Saiba mais{" "}
            <ArrowRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover/link:translate-x-1" />
          </Link>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
