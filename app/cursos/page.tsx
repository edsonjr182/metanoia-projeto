import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ExternalLink, Clock, Calendar, MapPin } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Dados simulados de cursos
const cursosTecnicos = [
  {
    id: 1,
    titulo: "Desenvolvimento Web",
    instituicao: "SENAI",
    duracao: "6 meses",
    modalidade: "Presencial",
    local: "SENAI Informática - Santa Cecília",
    inscricoes: "Abertas até 30/06/2025",
    descricao: "Aprenda a criar sites e aplicações web com HTML, CSS, JavaScript e frameworks modernos.",
    link: "https://www.sp.senai.br",
    imagem: "web-development",
  },
  {
    id: 2,
    titulo: "Técnico em Administração",
    instituicao: "ETEC",
    duracao: "18 meses",
    modalidade: "Presencial",
    local: "ETEC Parque da Juventude",
    inscricoes: "Próximo vestibulinho em Julho/2025",
    descricao: "Curso técnico completo em administração de empresas, com foco em gestão e empreendedorismo.",
    link: "https://www.cps.sp.gov.br",
    imagem: "business-administration",
  },
  {
    id: 3,
    titulo: "Design Gráfico",
    instituicao: "SENAC",
    duracao: "4 meses",
    modalidade: "Híbrido",
    local: "SENAC Lapa Scipião",
    inscricoes: "Abertas até 15/07/2025",
    descricao: "Aprenda a criar peças gráficas, identidades visuais e materiais para mídias sociais.",
    link: "https://www.sp.senac.br",
    imagem: "graphic-design",
  },
  {
    id: 4,
    titulo: "Técnico em Enfermagem",
    instituicao: "ETEC",
    duracao: "24 meses",
    modalidade: "Presencial",
    local: "ETEC Carlos de Campos",
    inscricoes: "Próximo vestibulinho em Julho/2025",
    descricao: "Formação técnica completa em enfermagem, com estágios em hospitais parceiros.",
    link: "https://www.cps.sp.gov.br",
    imagem: "nursing",
  },
]

const cursosOnline = [
  {
    id: 1,
    titulo: "Programação Básica",
    plataforma: "Alura",
    duracao: "40 horas",
    certificado: "Sim",
    descricao: "Introdução à lógica de programação e primeiros passos com JavaScript.",
    link: "https://www.alura.com.br",
    imagem: "programming",
  },
  {
    id: 2,
    titulo: "Marketing Digital",
    plataforma: "Coursera",
    duracao: "30 horas",
    certificado: "Sim",
    descricao: "Aprenda estratégias de marketing digital para redes sociais e outras plataformas.",
    link: "https://www.coursera.org",
    imagem: "digital-marketing",
  },
  {
    id: 3,
    titulo: "Excel Avançado",
    plataforma: "Fundação Bradesco",
    duracao: "20 horas",
    certificado: "Sim",
    descricao: "Domine fórmulas avançadas, tabelas dinâmicas e automação com macros.",
    link: "https://www.ev.org.br",
    imagem: "excel",
  },
  {
    id: 4,
    titulo: "Inglês para Iniciantes",
    plataforma: "Kultivi",
    duracao: "60 horas",
    certificado: "Sim",
    descricao: "Curso completo de inglês para quem está começando do zero.",
    link: "https://www.kultivi.com",
    imagem: "english",
  },
]

export default function CursosPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-blue-950 py-16 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 text-4xl font-bold sm:text-5xl">Cursos Técnicos e Capacitação</h1>
            <p className="text-xl">
              Descubra oportunidades de formação profissional gratuitas ou acessíveis para impulsionar sua carreira.
            </p>
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <Tabs defaultValue="tecnicos" className="w-full">
              <TabsList className="mb-8 grid w-full grid-cols-2">
                <TabsTrigger value="tecnicos">Cursos Técnicos</TabsTrigger>
                <TabsTrigger value="online">Cursos Online</TabsTrigger>
              </TabsList>

              <TabsContent value="tecnicos">
                <div className="grid gap-8 md:grid-cols-2">
                  {cursosTecnicos.map((curso) => (
                    <Card key={curso.id} className="overflow-hidden">
                      <div className="relative h-48 w-full">
                        <Image
                          src={`/abstract-geometric-shapes.png?height=400&width=800&query=${curso.imagem}`}
                          alt={curso.titulo}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <CardHeader>
                        <CardTitle>{curso.titulo}</CardTitle>
                        <CardDescription>{curso.instituicao}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="mb-4 text-gray-700">{curso.descricao}</p>
                        <div className="space-y-2 text-sm text-gray-500">
                          <div className="flex items-center">
                            <Clock className="mr-2 h-4 w-4" />
                            Duração: {curso.duracao}
                          </div>
                          <div className="flex items-center">
                            <MapPin className="mr-2 h-4 w-4" />
                            {curso.modalidade} - {curso.local}
                          </div>
                          <div className="flex items-center">
                            <Calendar className="mr-2 h-4 w-4" />
                            {curso.inscricoes}
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button asChild className="w-full bg-orange-500 hover:bg-orange-600">
                          <a
                            href={curso.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center"
                          >
                            Visitar Site <ExternalLink className="ml-2 h-4 w-4" />
                          </a>
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="online">
                <div className="grid gap-8 md:grid-cols-2">
                  {cursosOnline.map((curso) => (
                    <Card key={curso.id} className="overflow-hidden">
                      <div className="relative h-48 w-full">
                        <Image
                          src={`/abstract-geometric-shapes.png?height=400&width=800&query=${curso.imagem}`}
                          alt={curso.titulo}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <CardHeader>
                        <CardTitle>{curso.titulo}</CardTitle>
                        <CardDescription>{curso.plataforma}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="mb-4 text-gray-700">{curso.descricao}</p>
                        <div className="space-y-2 text-sm text-gray-500">
                          <div className="flex items-center">
                            <Clock className="mr-2 h-4 w-4" />
                            Duração estimada: {curso.duracao}
                          </div>
                          <div className="flex items-center">
                            <Calendar className="mr-2 h-4 w-4" />
                            Certificado: {curso.certificado}
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button asChild className="w-full bg-orange-500 hover:bg-orange-600">
                          <a
                            href={curso.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center"
                          >
                            Acessar Curso <ExternalLink className="ml-2 h-4 w-4" />
                          </a>
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>

            <div className="mt-16">
              <h2 className="mb-6 text-center text-3xl font-bold text-blue-950">Orientação Vocacional</h2>
              <div className="rounded-lg bg-gray-50 p-8">
                <p className="mb-6 text-gray-700">
                  Não sabe qual curso escolher? O Projeto Metanoia oferece orientação vocacional gratuita para ajudar
                  você a descobrir seus talentos e interesses.
                </p>
                <p className="mb-6 text-gray-700">
                  Nossos orientadores podem ajudar você a entender melhor suas habilidades e conectá-las com
                  oportunidades de formação e carreira.
                </p>
                <div className="text-center">
                  <Button asChild className="bg-blue-950 hover:bg-blue-900">
                    <Link href="/contato">Agendar Orientação</Link>
                  </Button>
                </div>
              </div>
            </div>

            <div className="mt-16">
              <h2 className="mb-6 text-center text-3xl font-bold text-blue-950">Parcerias Institucionais</h2>
              <p className="mb-8 text-center text-gray-700">
                O Projeto Metanoia trabalha em parceria com diversas instituições de ensino para facilitar o acesso dos
                jovens a cursos de qualidade.
              </p>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                <div className="flex h-24 items-center justify-center rounded-lg bg-gray-100 p-4">
                  <span className="font-semibold text-gray-700">SENAI</span>
                </div>
                <div className="flex h-24 items-center justify-center rounded-lg bg-gray-100 p-4">
                  <span className="font-semibold text-gray-700">SENAC</span>
                </div>
                <div className="flex h-24 items-center justify-center rounded-lg bg-gray-100 p-4">
                  <span className="font-semibold text-gray-700">ETEC</span>
                </div>
                <div className="flex h-24 items-center justify-center rounded-lg bg-gray-100 p-4">
                  <span className="font-semibold text-gray-700">Fundação Bradesco</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
