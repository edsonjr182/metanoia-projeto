import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Calendar, MapPin, Clock, User } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

// Dados simulados de palestras
const palestras = [
  {
    id: 1,
    titulo: "Tecnologia como Ferramenta de Transformação",
    palestrante: "Ricardo Oliveira",
    data: "15 de Junho, 2025",
    horario: "19:00",
    local: "Centro Cultural da Juventude",
    endereco: "Av. Dep. Emílio Carlos, 3641 - Vila Nova Cachoeirinha",
    descricao: "Como a tecnologia pode abrir portas para jovens de comunidades periféricas e transformar realidades.",
    imagem: "tech-talk",
  },
  {
    id: 2,
    titulo: "Educação Financeira para Jovens",
    palestrante: "Amanda Santos",
    data: "22 de Junho, 2025",
    horario: "15:00",
    local: "Biblioteca Municipal",
    endereco: "Rua da Consolação, 1024 - Consolação",
    descricao:
      "Aprenda conceitos básicos de finanças pessoais e como fazer seu dinheiro trabalhar para você desde cedo.",
    imagem: "finance-talk",
  },
  {
    id: 3,
    titulo: "Saúde Mental e Autoconhecimento",
    palestrante: "Dr. Paulo Mendes",
    data: "30 de Junho, 2025",
    horario: "18:30",
    local: "Casa de Cultura M'Boi Mirim",
    endereco: "Av. Inácio Dias da Silva, 1100 - Jd. São Luís",
    descricao:
      "A importância do cuidado com a saúde mental e como o autoconhecimento pode ajudar no desenvolvimento pessoal.",
    imagem: "mental-health-talk",
  },
  {
    id: 4,
    titulo: "Empreendedorismo Social",
    palestrante: "Carla Rodrigues",
    data: "10 de Julho, 2025",
    horario: "19:00",
    local: "Centro Cultural da Penha",
    endereco: "Largo do Rosário, 20 - Penha de França",
    descricao: "Como criar negócios que geram impacto positivo na comunidade e transformam realidades sociais.",
    imagem: "entrepreneurship-talk",
  },
]

export default function PalestrasPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-blue-950 py-16 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 text-4xl font-bold sm:text-5xl">Palestras e Eventos</h1>
            <p className="text-xl">
              Confira nossa agenda de palestras inspiradoras e eventos que podem transformar sua perspectiva e abrir
              novos caminhos.
            </p>
          </div>
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-8 text-center text-3xl font-bold text-blue-950">Próximas Palestras</h2>

            <div className="grid gap-8 md:grid-cols-2">
              {palestras.map((palestra) => (
                <Card key={palestra.id} className="overflow-hidden">
                  <div className="relative h-48 w-full">
                    <Image
                      src={`/abstract-geometric-shapes.png?height=400&width=800&query=${palestra.imagem}`}
                      alt={palestra.titulo}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle>{palestra.titulo}</CardTitle>
                    <CardDescription className="flex items-center">
                      <User className="mr-1 h-4 w-4" /> {palestra.palestrante}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4 text-gray-700">{palestra.descricao}</p>
                    <div className="space-y-2 text-sm text-gray-500">
                      <div className="flex items-center">
                        <Calendar className="mr-2 h-4 w-4" />
                        {palestra.data}
                      </div>
                      <div className="flex items-center">
                        <Clock className="mr-2 h-4 w-4" />
                        {palestra.horario}
                      </div>
                      <div className="flex items-center">
                        <MapPin className="mr-2 h-4 w-4" />
                        {palestra.local} - {palestra.endereco}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full bg-orange-500 hover:bg-orange-600">Inscrever-se</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>

            <div className="mt-12 text-center">
              <h3 className="mb-4 text-2xl font-bold text-blue-950">Quer sugerir um tema ou palestrante?</h3>
              <p className="mb-6 text-gray-700">
                Estamos sempre abertos a sugestões de temas relevantes para nossa comunidade. Se você conhece alguém que
                poderia compartilhar conhecimentos valiosos com nossos jovens, entre em contato conosco!
              </p>
              <Button asChild className="bg-blue-950 hover:bg-blue-900">
                <Link href="/contato">Enviar Sugestão</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Past Events Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-8 text-center text-3xl font-bold text-blue-950">Palestras Anteriores</h2>

            <div className="grid gap-6">
              <div className="rounded-lg bg-white p-6 shadow-sm">
                <h3 className="mb-2 text-xl font-semibold text-blue-950">Carreiras do Futuro</h3>
                <p className="mb-2 text-gray-500">Maio 2025 | Ana Luiza Martins</p>
                <p className="text-gray-700">
                  Palestra sobre as profissões em alta no mercado e como se preparar para elas.
                </p>
              </div>

              <div className="rounded-lg bg-white p-6 shadow-sm">
                <h3 className="mb-2 text-xl font-semibold text-blue-950">Comunicação e Oratória</h3>
                <p className="mb-2 text-gray-500">Abril 2025 | Carlos Eduardo Silva</p>
                <p className="text-gray-700">
                  Como desenvolver habilidades de comunicação eficaz e perder o medo de falar em público.
                </p>
              </div>

              <div className="rounded-lg bg-white p-6 shadow-sm">
                <h3 className="mb-2 text-xl font-semibold text-blue-950">Criatividade e Inovação</h3>
                <p className="mb-2 text-gray-500">Março 2025 | Fernanda Costa</p>
                <p className="text-gray-700">
                  Como despertar seu potencial criativo e aplicá-lo em soluções inovadoras.
                </p>
              </div>
            </div>

            <div className="mt-8 text-center">
              <Button variant="outline">Ver Todas as Palestras Anteriores</Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
