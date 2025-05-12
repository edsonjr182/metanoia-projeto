"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Calendar, BookOpen, Users, Heart, Briefcase, ChevronRight } from "lucide-react"
import FeatureCard from "@/components/feature-card"
import TestimonialCard from "@/components/testimonial-card"
import ContactForm from "@/components/contact-form"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import CountUp from "@/components/count-up"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Home() {
  const [heroRef, heroInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [statsRef, statsInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [featuresRef, featuresInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-950 to-blue-900 text-white">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-blue-950/70"></div>
          <Image src="/diverse-youth-collaboration.png" alt="" fill className="object-cover" priority />
        </div>
        <div
          className="absolute inset-0 z-0 bg-gradient-to-r from-blue-950/90 via-blue-900/80 to-transparent"
          style={{
            maskImage: "radial-gradient(circle at center, transparent 0%, black 100%)",
            WebkitMaskImage: "radial-gradient(circle at center, transparent 0%, black 100%)",
          }}
        ></div>
        <div className="container relative z-10 mx-auto px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
          <motion.div
            ref={heroRef}
            initial="hidden"
            animate={heroInView ? "show" : "hidden"}
            variants={container}
            className="max-w-3xl"
          >
            <motion.div
              variants={item}
              className="mb-2 inline-block rounded-full bg-orange-500/20 px-4 py-1 text-sm font-medium text-orange-300"
            >
              Transformando vidas e comunidades
            </motion.div>
            <motion.h1 variants={item} className="mb-6 text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">
              Projeto <span className="text-orange-400">Metanoia</span>
            </motion.h1>
            <motion.p variants={item} className="mb-8 text-xl leading-relaxed text-blue-50">
              Transformando mentalidades e ajudando jovens de periferia a construírem um futuro melhor através de
              educação, apoio e oportunidades.
            </motion.p>
            <motion.div variants={item} className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="bg-orange-500 hover:bg-orange-600">
                <Link href="/sobre">Conheça o Projeto</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white/30 bg-white/5 text-white backdrop-blur-sm hover:bg-white/10"
              >
                <Link href="/contato">Seja um Parceiro</Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            ref={statsRef}
            initial={{ opacity: 0, y: 20 }}
            animate={statsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="mx-auto grid max-w-5xl grid-cols-2 gap-8 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100/50 p-6 shadow-lg md:grid-cols-4 md:p-8"
          >
            <div className="flex flex-col items-center justify-center text-center">
              <span className="text-3xl font-bold text-blue-950 md:text-4xl">
                {statsInView && <CountUp end={500} duration={2} />}+
              </span>
              <span className="mt-2 text-sm text-blue-700">Jovens Impactados</span>
            </div>
            <div className="flex flex-col items-center justify-center text-center">
              <span className="text-3xl font-bold text-blue-950 md:text-4xl">
                {statsInView && <CountUp end={30} duration={2} />}+
              </span>
              <span className="mt-2 text-sm text-blue-700">Palestras Realizadas</span>
            </div>
            <div className="flex flex-col items-center justify-center text-center">
              <span className="text-3xl font-bold text-blue-950 md:text-4xl">
                {statsInView && <CountUp end={15} duration={2} />}+
              </span>
              <span className="mt-2 text-sm text-blue-700">Parcerias</span>
            </div>
            <div className="flex flex-col items-center justify-center text-center">
              <span className="text-3xl font-bold text-blue-950 md:text-4xl">
                {statsInView && <CountUp end={5} duration={2} />}
              </span>
              <span className="mt-2 text-sm text-blue-700">Comunidades</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <span className="mb-2 inline-block rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800">
              Nossa Missão
            </span>
            <h2 className="mb-6 text-3xl font-bold text-blue-950 sm:text-4xl">
              Transformando Mentalidades, Construindo Futuros
            </h2>
            <p className="mb-8 text-lg leading-relaxed text-gray-700">
              O Projeto Metanoia nasceu da necessidade de oferecer novas perspectivas para jovens e adolescentes de
              comunidades periféricas, incentivando-os a sonhar e construir um futuro melhor através de educação, apoio
              emocional e desenvolvimento de habilidades.
            </p>
            <Button asChild className="group bg-blue-950 transition-all duration-300 hover:bg-blue-900">
              <Link href="/sobre">
                Saiba mais sobre nossa história
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gradient-to-b from-white to-blue-50 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <span className="mb-2 inline-block rounded-full bg-orange-100 px-3 py-1 text-sm font-medium text-orange-800">
              O que oferecemos
            </span>
            <h2 className="text-3xl font-bold text-blue-950 sm:text-4xl">Nossos Programas</h2>
          </div>
          <motion.div
            ref={featuresRef}
            initial="hidden"
            animate={featuresInView ? "show" : "hidden"}
            variants={container}
            className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
          >
            <FeatureCard
              icon={<Calendar className="h-10 w-10 text-orange-500" />}
              title="Palestras"
              description="Eventos inspiradores com profissionais de diversas áreas compartilhando experiências e conhecimentos."
              link="/palestras"
            />
            <FeatureCard
              icon={<BookOpen className="h-10 w-10 text-orange-500" />}
              title="Cursos Técnicos"
              description="Informações sobre cursos gratuitos e oportunidades de capacitação profissional."
              link="/cursos"
            />
            <FeatureCard
              icon={<Users className="h-10 w-10 text-orange-500" />}
              title="Área para Jovens"
              description="Conteúdo motivacional, dicas de desenvolvimento pessoal e orientação vocacional."
              link="/jovens"
            />
            <FeatureCard
              icon={<Heart className="h-10 w-10 text-orange-500" />}
              title="Apoio às Famílias"
              description="Orientações e recursos para famílias apoiarem o desenvolvimento dos jovens."
              link="/familias"
            />
            <FeatureCard
              icon={<Briefcase className="h-10 w-10 text-orange-500" />}
              title="Empreendedorismo"
              description="Noções básicas de empreendedorismo e desenvolvimento de projetos."
              link="/empreendedorismo"
            />
            <FeatureCard
              icon={<Users className="h-10 w-10 text-orange-500" />}
              title="Parcerias"
              description="Oportunidades para empresas e profissionais contribuírem com o projeto."
              link="/contato"
            />
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-blue-50 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <span className="mb-2 inline-block rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800">
              Depoimentos
            </span>
            <h2 className="text-3xl font-bold text-blue-950 sm:text-4xl">Histórias de Transformação</h2>
          </div>
          <Tabs defaultValue="jovens" className="mx-auto max-w-4xl">
            <TabsList className="mb-8 grid w-full grid-cols-3">
              <TabsTrigger value="jovens">Jovens</TabsTrigger>
              <TabsTrigger value="familias">Famílias</TabsTrigger>
              <TabsTrigger value="parceiros">Parceiros</TabsTrigger>
            </TabsList>
            <TabsContent value="jovens">
              <div className="grid gap-8 md:grid-cols-3">
                <TestimonialCard
                  quote="O Projeto Metanoia mudou minha perspectiva sobre o futuro. Hoje estou cursando técnico em informática e tenho planos para a faculdade."
                  author="Carlos, 17 anos"
                  location="Zona Leste"
                  image="/testimonial-1.png"
                />
                <TestimonialCard
                  quote="As palestras me inspiraram a buscar novos caminhos. Consegui uma bolsa de estudos e agora ajudo outros jovens da minha comunidade."
                  author="Juliana, 19 anos"
                  location="Zona Sul"
                  image="/testimonial-2.png"
                />
                <TestimonialCard
                  quote="Aprendi que minha origem não define meu destino. Com o apoio do projeto, estou desenvolvendo meu próprio negócio digital."
                  author="Mateus, 18 anos"
                  location="Zona Norte"
                  image="/testimonial-3.png"
                />
              </div>
            </TabsContent>
            <TabsContent value="familias">
              <div className="grid gap-8 md:grid-cols-3">
                <TestimonialCard
                  quote="Como mãe, o apoio do projeto foi fundamental para entender melhor meu filho adolescente e ajudá-lo a encontrar seu caminho."
                  author="Márcia, mãe de participante"
                  location="Zona Norte"
                  image="/testimonial-4.png"
                />
                <TestimonialCard
                  quote="O projeto nos ajudou a criar um ambiente mais saudável em casa para apoiar os sonhos do nosso filho."
                  author="Roberto, pai de participante"
                  location="Zona Oeste"
                  image="/testimonial-5.png"
                />
                <TestimonialCard
                  quote="As orientações que recebemos transformaram nossa relação familiar e a forma como apoiamos a educação dos nossos filhos."
                  author="Ana, mãe de participante"
                  location="Zona Sul"
                  image="/testimonial-6.png"
                />
              </div>
            </TabsContent>
            <TabsContent value="parceiros">
              <div className="grid gap-8 md:grid-cols-3">
                <TestimonialCard
                  quote="Apoiar o Projeto Metanoia tem sido uma experiência transformadora também para nossa empresa e colaboradores."
                  author="Empresa ABC"
                  location="Parceiro desde 2022"
                  image="/testimonial-7.png"
                />
                <TestimonialCard
                  quote="Ver o impacto direto que nosso apoio tem na vida desses jovens é extremamente gratificante."
                  author="Instituto XYZ"
                  location="Parceiro desde 2021"
                  image="/testimonial-8.png"
                />
                <TestimonialCard
                  quote="A seriedade e o compromisso do Projeto Metanoia com a transformação social nos inspiram a continuar apoiando."
                  author="Fundação ABC"
                  location="Parceiro desde 2023"
                  image="/testimonial-9.png"
                />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-900 to-blue-950 py-20 text-white">
        <div className="absolute inset-0 z-0 opacity-10">
          <Image src="/pattern-bg.png" alt="" fill className="object-cover" />
        </div>
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="mb-6 text-3xl font-bold sm:text-4xl">Faça Parte dessa Transformação</h2>
            <p className="mb-8 text-lg text-blue-100">
              Junte-se a nós nessa missão de transformar vidas e construir um futuro melhor para nossa juventude.
              Existem diversas formas de contribuir.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" className="bg-orange-500 hover:bg-orange-600">
                <Link href="/contato">Seja um Parceiro</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white/30 bg-white/5 text-white backdrop-blur-sm hover:bg-white/10"
              >
                <Link href="/sobre">Saiba Mais</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Events Preview */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 flex flex-col items-center justify-between gap-4 md:flex-row">
            <div>
              <span className="mb-2 inline-block rounded-full bg-orange-100 px-3 py-1 text-sm font-medium text-orange-800">
                Agenda
              </span>
              <h2 className="text-3xl font-bold text-blue-950 sm:text-4xl">Próximos Eventos</h2>
            </div>
            <Button asChild variant="outline" className="group">
              <Link href="/palestras" className="flex items-center">
                Ver todos os eventos
                <ChevronRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="group relative overflow-hidden rounded-xl bg-white shadow-md transition-all duration-300 hover:shadow-xl">
              <div className="relative h-48 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-blue-950/80 to-transparent"></div>
                <Image
                  src="/tech-event.png"
                  alt="Tecnologia como Ferramenta de Transformação"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute bottom-4 left-4 rounded-lg bg-orange-500 px-3 py-1 text-sm font-medium text-white">
                  15 Jun
                </div>
              </div>
              <div className="p-6">
                <h3 className="mb-2 text-xl font-bold text-blue-950">Tecnologia como Ferramenta de Transformação</h3>
                <p className="mb-4 text-gray-600">
                  Como a tecnologia pode abrir portas para jovens de comunidades periféricas e transformar realidades.
                </p>
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar className="mr-2 h-4 w-4 text-orange-500" />
                  <span>15 de Junho, 2025 • 19:00</span>
                </div>
                <Button asChild className="mt-4 w-full bg-blue-950 hover:bg-blue-900">
                  <Link href="/palestras">Inscrever-se</Link>
                </Button>
              </div>
            </div>
            <div className="group relative overflow-hidden rounded-xl bg-white shadow-md transition-all duration-300 hover:shadow-xl">
              <div className="relative h-48 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-blue-950/80 to-transparent"></div>
                <Image
                  src="/finance-event.png"
                  alt="Educação Financeira para Jovens"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute bottom-4 left-4 rounded-lg bg-orange-500 px-3 py-1 text-sm font-medium text-white">
                  22 Jun
                </div>
              </div>
              <div className="p-6">
                <h3 className="mb-2 text-xl font-bold text-blue-950">Educação Financeira para Jovens</h3>
                <p className="mb-4 text-gray-600">
                  Aprenda conceitos básicos de finanças pessoais e como fazer seu dinheiro trabalhar para você desde
                  cedo.
                </p>
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar className="mr-2 h-4 w-4 text-orange-500" />
                  <span>22 de Junho, 2025 • 15:00</span>
                </div>
                <Button asChild className="mt-4 w-full bg-blue-950 hover:bg-blue-900">
                  <Link href="/palestras">Inscrever-se</Link>
                </Button>
              </div>
            </div>
            <div className="group relative overflow-hidden rounded-xl bg-white shadow-md transition-all duration-300 hover:shadow-xl">
              <div className="relative h-48 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-blue-950/80 to-transparent"></div>
                <Image
                  src="/mental-health-event.png"
                  alt="Saúde Mental e Autoconhecimento"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute bottom-4 left-4 rounded-lg bg-orange-500 px-3 py-1 text-sm font-medium text-white">
                  30 Jun
                </div>
              </div>
              <div className="p-6">
                <h3 className="mb-2 text-xl font-bold text-blue-950">Saúde Mental e Autoconhecimento</h3>
                <p className="mb-4 text-gray-600">
                  A importância do cuidado com a saúde mental e como o autoconhecimento pode ajudar no desenvolvimento
                  pessoal.
                </p>
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar className="mr-2 h-4 w-4 text-orange-500" />
                  <span>30 de Junho, 2025 • 18:30</span>
                </div>
                <Button asChild className="mt-4 w-full bg-blue-950 hover:bg-blue-900">
                  <Link href="/palestras">Inscrever-se</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-gradient-to-br from-blue-50 to-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <div className="rounded-2xl bg-white p-8 shadow-xl lg:p-12">
              <div className="mb-8 text-center">
                <span className="mb-2 inline-block rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800">
                  Contato
                </span>
                <h2 className="text-3xl font-bold text-blue-950 sm:text-4xl">Entre em Contato</h2>
                <p className="mt-2 text-gray-600">
                  Tem dúvidas, sugestões ou quer participar do Projeto Metanoia? Fale conosco.
                </p>
              </div>
              <div className="grid gap-8 md:grid-cols-2">
                <div>
                  <h3 className="mb-4 text-xl font-semibold text-blue-950">Fale Conosco</h3>
                  <p className="mb-6 text-gray-600">
                    Preencha o formulário ao lado ou entre em contato pelos nossos canais.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100 text-orange-500">
                        <span className="text-lg">📧</span>
                      </div>
                      <span className="ml-3 text-gray-700">contato@projetometanoia.org.br</span>
                    </div>
                    <div className="flex items-center">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100 text-orange-500">
                        <span className="text-lg">📱</span>
                      </div>
                      <span className="ml-3 text-gray-700">(11) 99999-9999</span>
                    </div>
                    <div className="flex items-center">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100 text-orange-500">
                        <span className="text-lg">📍</span>
                      </div>
                      <span className="ml-3 text-gray-700">São Paulo, SP</span>
                    </div>
                  </div>
                </div>
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
