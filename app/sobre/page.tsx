import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Target, Eye, Heart } from "lucide-react"
import TopBanner from "@/components/top-banner"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function SobrePage() {
  return (
    <div className="min-h-screen">
      <TopBanner />
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-40">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Sobre o Projeto Metanoia</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Metanoia significa "mudança de mentalidade". Nosso projeto nasceu da necessidade de oferecer esperança e
            oportunidades reais para jovens de periferia.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          <Card className="text-center">
            <CardHeader>
              <Target className="h-12 w-12 text-orange-500 mx-auto mb-4" />
              <CardTitle>Nossa Missão</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                Transformar a realidade de jovens e adolescentes de periferia através da educação, capacitação
                profissional e apoio emocional, oferecendo ferramentas para que possam construir um futuro próspero.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Eye className="h-12 w-12 text-green-500 mx-auto mb-4" />
              <CardTitle>Nossa Visão</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                Ser referência na transformação social de comunidades periféricas, criando uma rede de apoio que permita
                aos jovens sonharem e realizarem seus objetivos pessoais e profissionais.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Heart className="h-12 w-12 text-red-500 mx-auto mb-4" />
              <CardTitle>Nossos Valores</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                Esperança, transformação, inclusão, educação de qualidade, apoio mútuo e desenvolvimento integral do ser
                humano. Acreditamos no potencial de cada jovem.
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        <div className="bg-gray-50 rounded-lg p-8 mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-6 text-center">Por Que Metanoia?</h2>
          <div className="prose prose-lg max-w-none text-gray-700">
            <p className="mb-4">
              A palavra "Metanoia" tem origem grega e significa uma transformação fundamental na forma de pensar e ver o
              mundo. É exatamente isso que buscamos proporcionar aos jovens: uma mudança de perspectiva que os permita
              enxergar possibilidades onde antes só viam limitações.
            </p>
            <p className="mb-4">
              Muitos jovens de periferia crescem em ambientes onde as oportunidades parecem escassas e os sonhos
              distantes. O Projeto Metanoia surge para quebrar esse ciclo, oferecendo informações, capacitação e apoio
              emocional necessários para que esses jovens possam traçar novos caminhos.
            </p>
            <p>
              Através de palestras motivacionais, informações sobre cursos técnicos, apoio psicológico e noções de
              empreendedorismo, criamos um ambiente onde a transformação pessoal e profissional se torna possível e
              tangível.
            </p>
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Nosso Impacto</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-500 mb-2">500+</div>
              <div className="text-gray-600">Jovens Impactados</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-500 mb-2">50+</div>
              <div className="text-gray-600">Palestras Realizadas</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-500 mb-2">20+</div>
              <div className="text-gray-600">Parcerias Ativas</div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
