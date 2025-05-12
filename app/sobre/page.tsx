import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function SobrePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-blue-950 py-16 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 text-4xl font-bold sm:text-5xl">Sobre o Projeto Metanoia</h1>
            <p className="text-xl">
              Conheça nossa história, missão e como trabalhamos para transformar a vida de jovens em comunidades
              periféricas.
            </p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <div className="mb-16 grid gap-8 md:grid-cols-2 md:items-center">
              <div>
                <h2 className="mb-4 text-3xl font-bold text-blue-950">Nossa História</h2>
                <p className="mb-4 text-gray-700">
                  O Projeto Metanoia nasceu em 2020, durante a pandemia, quando percebemos que muitos jovens de
                  comunidades periféricas estavam perdendo a esperança no futuro devido às dificuldades socioeconômicas
                  agravadas pela crise.
                </p>
                <p className="text-gray-700">
                  Um grupo de educadores, psicólogos e empreendedores sociais se uniu com o objetivo de criar um espaço
                  de acolhimento, orientação e capacitação para esses jovens, ajudando-os a redescobrir seus sonhos e
                  potenciais.
                </p>
              </div>
              <div className="relative h-64 w-full overflow-hidden rounded-lg md:h-80">
                <Image
                  src="/diverse-classroom.png"
                  alt="Fundadores do Projeto Metanoia"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            <div className="mb-16">
              <h2 className="mb-6 text-center text-3xl font-bold text-blue-950">Nossa Missão e Valores</h2>
              <div className="grid gap-8 md:grid-cols-3">
                <div className="rounded-lg bg-gray-50 p-6 text-center">
                  <h3 className="mb-3 text-xl font-semibold text-blue-950">Missão</h3>
                  <p className="text-gray-700">
                    Transformar a mentalidade de jovens de periferia, incentivando-os a sonhar e construir um futuro
                    melhor através da educação e do desenvolvimento pessoal.
                  </p>
                </div>
                <div className="rounded-lg bg-gray-50 p-6 text-center">
                  <h3 className="mb-3 text-xl font-semibold text-blue-950">Visão</h3>
                  <p className="text-gray-700">
                    Ser referência em projetos de transformação social, criando uma rede de apoio que alcance jovens em
                    todas as comunidades periféricas do Brasil.
                  </p>
                </div>
                <div className="rounded-lg bg-gray-50 p-6 text-center">
                  <h3 className="mb-3 text-xl font-semibold text-blue-950">Valores</h3>
                  <p className="text-gray-700">
                    Empatia, Respeito, Educação, Colaboração, Inovação, Inclusão e Transformação Social.
                  </p>
                </div>
              </div>
            </div>

            <div className="mb-16">
              <h2 className="mb-6 text-center text-3xl font-bold text-blue-950">Como Atuamos</h2>
              <div className="grid gap-8 md:grid-cols-2">
                <div className="flex flex-col items-start">
                  <h3 className="mb-3 text-xl font-semibold text-blue-950">Educação e Capacitação</h3>
                  <p className="mb-4 text-gray-700">
                    Conectamos jovens a oportunidades de cursos técnicos gratuitos e oferecemos orientação vocacional
                    para ajudá-los a descobrir seus talentos e interesses.
                  </p>
                  <Button asChild variant="outline" className="mt-auto">
                    <Link href="/cursos">Conhecer cursos</Link>
                  </Button>
                </div>
                <div className="flex flex-col items-start">
                  <h3 className="mb-3 text-xl font-semibold text-blue-950">Palestras e Workshops</h3>
                  <p className="mb-4 text-gray-700">
                    Organizamos eventos com profissionais de diversas áreas que compartilham suas trajetórias e
                    conhecimentos, inspirando os jovens a perseguirem seus objetivos.
                  </p>
                  <Button asChild variant="outline" className="mt-auto">
                    <Link href="/palestras">Ver agenda</Link>
                  </Button>
                </div>
                <div className="flex flex-col items-start">
                  <h3 className="mb-3 text-xl font-semibold text-blue-950">Apoio Emocional</h3>
                  <p className="mb-4 text-gray-700">
                    Oferecemos suporte psicológico e emocional para jovens e suas famílias, ajudando-os a lidar com os
                    desafios e a desenvolver resiliência.
                  </p>
                  <Button asChild variant="outline" className="mt-auto">
                    <Link href="/familias">Saiba mais</Link>
                  </Button>
                </div>
                <div className="flex flex-col items-start">
                  <h3 className="mb-3 text-xl font-semibold text-blue-950">Empreendedorismo</h3>
                  <p className="mb-4 text-gray-700">
                    Incentivamos o desenvolvimento de habilidades empreendedoras, estimulando a criatividade e a
                    inovação como caminhos para a transformação pessoal e comunitária.
                  </p>
                  <Button asChild variant="outline" className="mt-auto">
                    <Link href="/empreendedorismo">Conheça iniciativas</Link>
                  </Button>
                </div>
              </div>
            </div>

            <div className="text-center">
              <h2 className="mb-6 text-3xl font-bold text-blue-950">Faça Parte dessa Transformação</h2>
              <p className="mb-8 text-lg text-gray-700">
                O Projeto Metanoia acredita que a transformação social acontece quando cada um faz sua parte. Junte-se a
                nós nessa missão de transformar vidas e construir um futuro melhor para nossa juventude.
              </p>
              <Button asChild size="lg" className="bg-orange-500 hover:bg-orange-600">
                <Link href="/contato">Seja um Parceiro</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
