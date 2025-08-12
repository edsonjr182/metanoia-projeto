"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Scale, Calendar, Mail, Phone } from "lucide-react"
import Link from "next/link"
import { useConfiguracoes } from "@/hooks/use-configuracoes"

export default function TermosPage() {
  const { configuracoes } = useConfiguracoes()
  const [dataAtualizacao] = useState(new Date().toLocaleDateString("pt-BR"))

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <Link href="/">
              <Button variant="outline" className="mb-4 bg-transparent">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Voltar ao Início
              </Button>
            </Link>
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-blue-500 rounded-full">
                  <Scale className="h-8 w-8 text-white" />
                </div>
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Termos de Uso</h1>
              <p className="text-gray-600 flex items-center justify-center">
                <Calendar className="mr-2 h-4 w-4" />
                Última atualização: {dataAtualizacao}
              </p>
            </div>
          </div>

          {/* Conteúdo */}
          <Card className="shadow-lg">
            <CardHeader className="bg-blue-500 text-white">
              <CardTitle className="text-2xl">
                Termos e Condições de Uso - {configuracoes.juridico.razaoSocial}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8 space-y-8">
              {/* Seção 1 */}
              <section>
                <h2 className="text-2xl font-semibold text-blue-600 mb-4">1. Aceitação dos Termos</h2>
                <p className="text-gray-700 leading-relaxed">
                  Ao acessar e utilizar o site <strong>www.projetometanoia.com.br</strong> e seus serviços, você
                  concorda em cumprir e estar vinculado aos seguintes termos e condições de uso. Se você não concordar
                  com qualquer parte destes termos, não deve utilizar nossos serviços.
                </p>
              </section>

              {/* Seção 2 */}
              <section>
                <h2 className="text-2xl font-semibold text-blue-600 mb-4">2. Definições</h2>
                <div className="space-y-3 text-gray-700">
                  <p>
                    <strong>"Projeto Metanoia"</strong> refere-se ao {configuracoes.juridico.razaoSocial}, organização
                    dedicada à transformação social através da educação e desenvolvimento pessoal.
                  </p>
                  <p>
                    <strong>"Usuário"</strong> refere-se a qualquer pessoa que acesse ou utilize nossos serviços.
                  </p>
                  <p>
                    <strong>"Serviços"</strong> incluem palestras, cursos, eventos, landing pages e conteúdos
                    educacionais oferecidos pelo Projeto Metanoia.
                  </p>
                </div>
              </section>

              {/* Seção 3 */}
              <section>
                <h2 className="text-2xl font-semibold text-blue-600 mb-4">3. Elegibilidade</h2>
                <p className="text-gray-700 leading-relaxed">
                  Nossos serviços são destinados a pessoas com <strong>15 anos ou mais</strong>. Menores de 18 anos
                  devem ter autorização dos pais ou responsáveis legais para participar de nossos programas e fornecer
                  informações pessoais.
                </p>
              </section>

              {/* Seção 4 */}
              <section>
                <h2 className="text-2xl font-semibold text-blue-600 mb-4">4. Uso Permitido</h2>
                <div className="space-y-3 text-gray-700">
                  <p>Você pode utilizar nossos serviços para:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Participar de palestras, cursos e eventos educacionais</li>
                    <li>Acessar conteúdos educacionais e materiais de apoio</li>
                    <li>Interagir de forma respeitosa com outros participantes</li>
                    <li>Compartilhar experiências e aprendizados de forma construtiva</li>
                  </ul>
                </div>
              </section>

              {/* Seção 5 */}
              <section>
                <h2 className="text-2xl font-semibold text-blue-600 mb-4">5. Uso Proibido</h2>
                <div className="space-y-3 text-gray-700">
                  <p>É expressamente proibido:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Utilizar nossos serviços para fins ilegais ou não autorizados</li>
                    <li>Reproduzir, distribuir ou comercializar nossos conteúdos sem autorização</li>
                    <li>Interferir no funcionamento dos sistemas ou comprometer a segurança</li>
                    <li>Assediar, intimidar ou prejudicar outros usuários</li>
                    <li>Transmitir conteúdo ofensivo, discriminatório ou inadequado</li>
                  </ul>
                </div>
              </section>

              {/* Seção 6 */}
              <section>
                <h2 className="text-2xl font-semibold text-blue-600 mb-4">6. Propriedade Intelectual</h2>
                <p className="text-gray-700 leading-relaxed">
                  Todo o conteúdo disponibilizado pelo Projeto Metanoia, incluindo textos, imagens, vídeos, palestras
                  gravadas e materiais educacionais, é protegido por direitos autorais. A reprodução não autorizada é
                  estritamente proibida e pode resultar em medidas legais.
                </p>
              </section>

              {/* Seção 7 */}
              <section>
                <h2 className="text-2xl font-semibold text-blue-600 mb-4">7. Gravações e Conteúdo</h2>
                <p className="text-gray-700 leading-relaxed">
                  O Projeto Metanoia pode gravar palestras, eventos e atividades para fins educacionais e de divulgação.
                  Ao participar de nossos eventos, você consente com a possível gravação e uso dessas gravações para
                  fins institucionais, sempre respeitando sua privacidade e dignidade.
                </p>
              </section>

              {/* Seção 8 */}
              <section>
                <h2 className="text-2xl font-semibold text-blue-600 mb-4">8. Limitação de Responsabilidade</h2>
                <p className="text-gray-700 leading-relaxed">
                  O Projeto Metanoia não se responsabiliza por danos diretos, indiretos, incidentais ou consequenciais
                  decorrentes do uso de nossos serviços. Nossos programas educacionais são oferecidos com o objetivo de
                  desenvolvimento pessoal e social, mas os resultados podem variar entre os participantes.
                </p>
              </section>

              {/* Seção 9 */}
              <section>
                <h2 className="text-2xl font-semibold text-blue-600 mb-4">9. Modificações</h2>
                <p className="text-gray-700 leading-relaxed">
                  Reservamo-nos o direito de modificar estes termos a qualquer momento. As alterações entrarão em vigor
                  imediatamente após a publicação no site. É responsabilidade do usuário revisar periodicamente estes
                  termos.
                </p>
              </section>

              {/* Seção 10 */}
              <section>
                <h2 className="text-2xl font-semibold text-blue-600 mb-4">10. Lei Aplicável e Foro</h2>
                <p className="text-gray-700 leading-relaxed">
                  Estes termos são regidos pelas leis brasileiras. Qualquer disputa será resolvida no foro da comarca de{" "}
                  <strong>Brasília/DF</strong>, com exclusão de qualquer outro, por mais privilegiado que seja.
                </p>
              </section>

              {/* Contato */}
              <section className="bg-blue-50 p-6 rounded-lg">
                <h2 className="text-2xl font-semibold text-blue-600 mb-4">Contato</h2>
                <div className="space-y-2 text-gray-700">
                  <p className="flex items-center">
                    <Mail className="mr-2 h-4 w-4 text-blue-500" />
                    <strong>Email:</strong> {configuracoes.juridico.emailJuridico}
                  </p>
                  <p className="flex items-center">
                    <Phone className="mr-2 h-4 w-4 text-blue-500" />
                    <strong>Telefone:</strong> {configuracoes.juridico.telefoneJuridico}
                  </p>
                  <p>
                    <strong>Endereço:</strong> {configuracoes.juridico.enderecoCompleto}
                  </p>
                  {configuracoes.juridico.responsavelLegal && (
                    <p>
                      <strong>Responsável Legal:</strong> {configuracoes.juridico.responsavelLegal}
                    </p>
                  )}
                </div>
              </section>
            </CardContent>
          </Card>

          {/* Footer */}
          <div className="text-center mt-8">
            <Link href="/">
              <Button className="bg-blue-500 hover:bg-blue-600">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Voltar ao Início
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
