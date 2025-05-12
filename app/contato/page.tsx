import Image from "next/image"
import { Button } from "@/components/ui/button"
import ContactForm from "@/components/contact-form"
import { Mail, Phone, MapPin, Clock } from "lucide-react"

export default function ContatoPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-blue-950 py-16 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 text-4xl font-bold sm:text-5xl">Entre em Contato</h1>
            <p className="text-xl">
              Estamos aqui para responder suas dúvidas, receber sugestões ou estabelecer parcerias.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <div className="mb-16 grid gap-8 md:grid-cols-2">
              <div>
                <h2 className="mb-6 text-3xl font-bold text-blue-950">Fale Conosco</h2>
                <p className="mb-8 text-gray-700">
                  Tem dúvidas sobre o Projeto Metanoia? Quer participar das nossas atividades ou se tornar um parceiro?
                  Entre em contato conosco pelos canais abaixo ou preencha o formulário.
                </p>

                <div className="space-y-6">
                  <div className="flex items-start">
                    <Mail className="mr-4 h-6 w-6 text-orange-500" />
                    <div>
                      <h3 className="text-lg font-semibold text-blue-950">Email</h3>
                      <p className="text-gray-700">contato@projetometanoia.org.br</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Phone className="mr-4 h-6 w-6 text-orange-500" />
                    <div>
                      <h3 className="text-lg font-semibold text-blue-950">Telefone</h3>
                      <p className="text-gray-700">(11) 99999-9999</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <MapPin className="mr-4 h-6 w-6 text-orange-500" />
                    <div>
                      <h3 className="text-lg font-semibold text-blue-950">Endereço</h3>
                      <p className="text-gray-700">
                        Rua Exemplo, 123 - Bairro
                        <br />
                        São Paulo, SP - CEP 00000-000
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Clock className="mr-4 h-6 w-6 text-orange-500" />
                    <div>
                      <h3 className="text-lg font-semibold text-blue-950">Horário de Atendimento</h3>
                      <p className="text-gray-700">
                        Segunda a Sexta: 9h às 18h
                        <br />
                        Sábados: 9h às 13h
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-lg bg-gray-50 p-6 shadow-sm">
                <h2 className="mb-6 text-2xl font-bold text-blue-950">Envie uma Mensagem</h2>
                <ContactForm />
              </div>
            </div>

            {/* Map Section */}
            <div className="mb-16">
              <h2 className="mb-6 text-center text-3xl font-bold text-blue-950">Nossa Localização</h2>
              <div className="relative h-96 w-full overflow-hidden rounded-lg">
                <Image src="/sao-paulo-map.png" alt="Mapa de localização" fill className="object-cover" />
              </div>
            </div>

            {/* Partnership Section */}
            <div>
              <h2 className="mb-8 text-center text-3xl font-bold text-blue-950">Seja um Parceiro</h2>
              <div className="rounded-lg bg-orange-50 p-8">
                <div className="grid gap-8 md:grid-cols-2 md:items-center">
                  <div>
                    <h3 className="mb-4 text-2xl font-bold text-blue-950">Como Apoiar o Projeto</h3>
                    <p className="mb-4 text-gray-700">
                      O Projeto Metanoia conta com o apoio de empresas, instituições e voluntários para ampliar seu
                      impacto e transformar a vida de mais jovens.
                    </p>
                    <p className="mb-6 text-gray-700">Existem diversas formas de contribuir:</p>
                    <ul className="mb-6 list-inside list-disc space-y-2 text-gray-700">
                      <li>Patrocínio financeiro para atividades e eventos</li>
                      <li>Doação de materiais e equipamentos</li>
                      <li>Cessão de espaços para atividades</li>
                      <li>Voluntariado corporativo</li>
                      <li>Mentoria para jovens</li>
                      <li>Oferta de vagas de estágio ou emprego</li>
                    </ul>
                    <Button className="bg-blue-950 hover:bg-blue-900">Quero Ser Parceiro</Button>
                  </div>
                  <div className="relative h-64 w-full overflow-hidden rounded-lg md:h-80">
                    <Image src="/business-partnership-handshake.png" alt="Parceria empresarial" fill className="object-cover" />
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
