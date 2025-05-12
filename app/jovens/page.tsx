import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Play } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

// Dados simulados de conteúdos
const videos = [
  {
    id: 1,
    titulo: "Como Descobrir Sua Vocação",
    autor: "Carla Mendes",
    duracao: "15 minutos",
    descricao: "Dicas práticas para identificar seus talentos e paixões e transformá-los em uma carreira.",
    imagem: "career-guidance",
  },
  {
    id: 2,
    titulo: "Superando a Ansiedade nos Estudos",
    autor: "Dr. Paulo Silva",
    duracao: "12 minutos",
    descricao: "Técnicas para lidar com a ansiedade e melhorar seu desempenho nos estudos e provas.",
    imagem: "anxiety-management",
  },
  {
    id: 3,
    titulo: "Primeiros Passos no Mercado de Trabalho",
    autor: "Amanda Oliveira",
    duracao: "18 minutos",
    descricao: "Como preparar seu currículo, se comportar em entrevistas e iniciar sua carreira profissional.",
    imagem: "job-interview",
  },
]

const artigos = [
  {
    id: 1,
    titulo: "5 Hábitos para Melhorar seus Estudos",
    autor: "Ricardo Gomes",
    tempo: "5 min de leitura",
    descricao: "Técnicas de estudo eficientes que podem transformar seu aprendizado e resultados acadêmicos.",
    imagem: "study-habits",
  },
  {
    id: 2,
    titulo: "Como Lidar com a Pressão Social",
    autor: "Dra. Juliana Costa",
    tempo: "7 min de leitura",
    descricao:
      "Estratégias para manter sua autenticidade e saúde mental diante das pressões dos amigos e redes sociais.",
    imagem: "social-pressure",
  },
  {
    id: 3,
    titulo: "Educação Financeira para Jovens",
    autor: "Fernando Alves",
    tempo: "6 min de leitura",
    descricao: "Aprenda a organizar suas finanças desde cedo e criar hábitos saudáveis para o futuro.",
    imagem: "financial-education",
  },
]

export default function JovensPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-blue-950 py-16 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 text-4xl font-bold sm:text-5xl">Área para Jovens</h1>
            <p className="text-xl">
              Conteúdos exclusivos para inspirar, motivar e ajudar você a desenvolver todo o seu potencial.
            </p>
          </div>
        </div>
      </section>

      {/* Motivational Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <div className="mb-16 overflow-hidden rounded-lg bg-orange-50 p-8">
              <div className="grid gap-8 md:grid-cols-2 md:items-center">
                <div>
                  <h2 className="mb-4 text-3xl font-bold text-blue-950">Seu Futuro Começa Agora</h2>
                  <p className="mb-4 text-gray-700">
                    Acreditamos no seu potencial e na sua capacidade de transformar sua realidade. Não importa de onde
                    você vem, mas para onde você quer ir.
                  </p>
                  <p className="mb-6 text-gray-700">
                    Aqui você encontrará recursos, inspiração e apoio para dar os primeiros passos em direção aos seus
                    sonhos.
                  </p>
                  <Button className="bg-orange-500 hover:bg-orange-600">Comece Sua Jornada</Button>
                </div>
                <div className="relative h-64 w-full overflow-hidden rounded-lg md:h-80">
                  <Image src="/diverse-students-studying.png" alt="Jovens estudando" fill className="object-cover" />
                </div>
              </div>
            </div>

            {/* Videos Section */}
            <div className="mb-16">
              <h2 className="mb-8 text-center text-3xl font-bold text-blue-950">Vídeos Motivacionais</h2>
              <div className="grid gap-8 md:grid-cols-3">
                {videos.map((video) => (
                  <Card key={video.id} className="overflow-hidden">
                    <div className="group relative h-48 w-full">
                      <Image
                        src={`/abstract-geometric-shapes.png?height=400&width=600&query=${video.imagem}`}
                        alt={video.titulo}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/80 text-blue-950 transition-transform duration-300 group-hover:scale-110">
                          <Play className="h-6 w-6" />
                        </div>
                      </div>
                    </div>
                    <CardHeader>
                      <CardTitle className="line-clamp-1">{video.titulo}</CardTitle>
                      <CardDescription>
                        {video.autor} • {video.duracao}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="line-clamp-2 text-gray-700">{video.descricao}</p>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full">
                        Assistir Agora
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
              <div className="mt-8 text-center">
                <Button variant="outline">Ver Mais Vídeos</Button>
              </div>
            </div>

            {/* Articles Section */}
            <div className="mb-16">
              <h2 className="mb-8 text-center text-3xl font-bold text-blue-950">Artigos e Dicas</h2>
              <div className="grid gap-8 md:grid-cols-3">
                {artigos.map((artigo) => (
                  <Card key={artigo.id} className="overflow-hidden">
                    <div className="relative h-48 w-full">
                      <Image
                        src={`/abstract-geometric-shapes.png?height=400&width=600&query=${artigo.imagem}`}
                        alt={artigo.titulo}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <CardHeader>
                      <CardTitle className="line-clamp-1">{artigo.titulo}</CardTitle>
                      <CardDescription>
                        {artigo.autor} • {artigo.tempo}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="line-clamp-2 text-gray-700">{artigo.descricao}</p>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full">
                        Ler Artigo
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
              <div className="mt-8 text-center">
                <Button variant="outline">Ver Mais Artigos</Button>
              </div>
            </div>

            {/* Resources Section */}
            <div className="mb-16">
              <h2 className="mb-8 text-center text-3xl font-bold text-blue-950">Recursos Úteis</h2>
              <div className="grid gap-6 md:grid-cols-2">
                <a href="#" className="group rounded-lg bg-gray-50 p-6 transition-colors hover:bg-gray-100">
                  <h3 className="mb-2 text-xl font-semibold text-blue-950 group-hover:text-orange-500">
                    Guia de Profissões
                  </h3>
                  <p className="text-gray-700">Conheça diferentes carreiras, requisitos e perspectivas de mercado.</p>
                </a>
                <a href="#" className="group rounded-lg bg-gray-50 p-6 transition-colors hover:bg-gray-100">
                  <h3 className="mb-2 text-xl font-semibold text-blue-950 group-hover:text-orange-500">
                    Técnicas de Estudo
                  </h3>
                  <p className="text-gray-700">Métodos eficientes para melhorar sua concentração e aprendizado.</p>
                </a>
                <a href="#" className="group rounded-lg bg-gray-50 p-6 transition-colors hover:bg-gray-100">
                  <h3 className="mb-2 text-xl font-semibold text-blue-950 group-hover:text-orange-500">
                    Preparação para Vestibular
                  </h3>
                  <p className="text-gray-700">Dicas e materiais para se preparar para os principais vestibulares.</p>
                </a>
                <a href="#" className="group rounded-lg bg-gray-50 p-6 transition-colors hover:bg-gray-100">
                  <h3 className="mb-2 text-xl font-semibold text-blue-950 group-hover:text-orange-500">
                    Bolsas de Estudo
                  </h3>
                  <p className="text-gray-700">Informações sobre programas de bolsas e financiamento estudantil.</p>
                </a>
              </div>
            </div>

            {/* Community Section */}
            <div>
              <h2 className="mb-8 text-center text-3xl font-bold text-blue-950">Comunidade Metanoia</h2>
              <div className="rounded-lg bg-blue-950 p-8 text-white">
                <div className="grid gap-8 md:grid-cols-2 md:items-center">
                  <div>
                    <h3 className="mb-4 text-2xl font-bold">Conecte-se com outros jovens</h3>
                    <p className="mb-6">
                      Faça parte da nossa comunidade e conheça outros jovens com histórias e objetivos semelhantes aos
                      seus. Juntos somos mais fortes!
                    </p>
                    <Button className="bg-orange-500 hover:bg-orange-600">Participar da Comunidade</Button>
                  </div>
                  <div className="relative h-64 w-full overflow-hidden rounded-lg md:h-80">
                    <Image src="/placeholder.svg?key=vi3is" alt="Comunidade de jovens" fill className="object-cover" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
