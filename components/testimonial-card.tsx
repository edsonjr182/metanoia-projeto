import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { QuoteIcon } from "lucide-react"
import Image from "next/image"

interface TestimonialCardProps {
  quote: string
  author: string
  location: string
  image?: string
}

export default function TestimonialCard({ quote, author, location, image }: TestimonialCardProps) {
  return (
    <Card className="group h-full overflow-hidden border-none bg-white shadow-md transition-all duration-300 hover:shadow-xl">
      <CardContent className="relative pt-6">
        <div className="absolute -right-4 -top-4 h-16 w-16 rounded-full bg-orange-500/10 transition-transform duration-500 group-hover:scale-150"></div>
        <div className="relative">
          <QuoteIcon className="mb-4 h-8 w-8 text-orange-500 opacity-80" />
          <p className="mb-6 text-gray-700">{quote}</p>
        </div>
      </CardContent>
      <CardFooter className="flex items-center gap-3 border-t border-gray-100 pt-4">
        {image ? (
          <div className="relative h-12 w-12 overflow-hidden rounded-full">
            <Image src={image || "/placeholder.svg"} alt={author} fill className="object-cover" />
          </div>
        ) : (
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-800">
            {author.charAt(0)}
          </div>
        )}
        <div>
          <p className="font-semibold text-blue-950">{author}</p>
          <p className="text-sm text-gray-500">{location}</p>
        </div>
      </CardFooter>
    </Card>
  )
}
