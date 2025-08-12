"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Scale, Calendar, Mail, Phone, AlertTriangle, Users, Shield } from "lucide-react"
import Link from "next/link"
import { useConfiguracoes } from "@/hooks/use-configuracoes"

export default function TermosPage() {
  const { configuracoes, loading } = useConfiguracoes()
  const [dataAtualizacao] = useState(new Date().toLocaleDateString("pt-BR"))

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

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
                Termos de Uso - {configuracoes?.juridico?.razaoSocial || "Projeto Metanoia"}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8 space-y-8">
              {/* Aceitação */}
              <section>
                <h2 className="text-2xl font-semibold text-blue-600 mb-4 flex items-center">
                  <Scale className="mr-2 h-6 w-6" />
                  1. Aceitação dos Termos
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Ao acessar e utilizar os serviços do{" "}
                  <strong>{configuracoes?.juridico?.razaoSocial || "Projeto Metanoia: mudança de mentalidade"}</strong>,
                  você concorda em cumprir e estar vinculado a estes Termos de Uso. Se você não concordar com qualquer
                  parte destes termos, não deve utilizar nossos serviços.
                </p>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-blue-800 font-semibold">
                    ⚖️ Estes termos constituem um acordo legal entre você e o Projeto Metanoia.
                  </p>
                </div>
              </section>

              {/* Definições */}
              <section>
                <h2 className="text-2xl font-semibold text-blue-600 mb-4">2. Definições</h2>
                <div className="space-y-3 text-gray-700">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-600 mb-2">Para fins destes termos:</h4>
                    <ul className="space-y-2">
                      <li>
                        <strong>"Projeto Metanoia" ou "nós":</strong> Refere-se ao{" "}
                        {configuracoes?.juridico?.razaoSocial || "Projeto Metanoia: mudança de mentalidade"}
                      </li>
                      <li>
                        <strong>"Usuário" ou "você":</strong> Qualquer pessoa que acesse ou utilize nossos serviços
                      </li>
                      <li>
                        <strong>"Serviços":</strong> Palestras, cursos, eventos, conteúdos educacionais e plataforma
                        online
                      </li>
                      <li>
                        <strong>"Conteúdo":</strong> Textos, imagens, vídeos, áudios e materiais educacionais
                      </li>
                      <li>
                        <strong>"Plataforma":</strong> Website, aplicações e sistemas online do Projeto Metanoia
                      </li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Idade Mínima */}
              <section>
                <h2 className="text-2xl font-semibold text-blue-600 mb-4 flex items-center">
                  <Users className="mr-2 h-6 w-6" />
                  3. Idade Mínima e Elegibilidade
                </h2>
                <div className="space-y-4">
                  <div className="bg-orange-50 border border-orange-200 p-4 rounded-lg">
                    <h4 className="font-semibold text-orange-800 mb-2 flex items-center">
                      <AlertTriangle className="mr-2 h-5 w-5" />
                      Idade Mínima: 15 Anos
                    </h4>
                    <p className="text-orange-700">
                      Nossos serviços são destinados a pessoas com <strong>15 anos ou mais</strong>. Menores entre 15 e
                      18 anos devem ter autorização dos pais ou responsáveis legais.
                    </p>
                  </div>
                  <div className="text-gray-700 space-y-2">
                    <p>
                      <strong>Para menores de 15 anos:</strong> Não é permitido o uso direto da plataforma
                    </p>
                    <p>
                      <strong>Para menores entre 15-18 anos:</strong> Necessária autorização parental
                    </p>
                    <p>
                      <strong>Para maiores de 18 anos:</strong> Uso livre mediante aceitação destes termos
                    </p>
                  </div>
                </div>
              </section>

              {/* Usos Permitidos */}
              <section>
                <h2 className="text-2xl font-semibold text-blue-600 mb-4">4. Usos Permitidos</h2>
                <div className="space-y-4 text-gray-700">
                  <p>Você pode utilizar nossos serviços para:</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-green-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-green-600 mb-2">✅ Atividades Permitidas</h4>
                      <ul className="text-sm space-y-1">
                        <li>• Participar de palestras e eventos</li>
                        <li>• Inscrever-se em cursos oferecidos</li>
                        <li>• Acessar materiais educacionais</li>
                        <li>• Interagir respeitosamente com outros participantes</li>
                        <li>• Compartilhar experiências construtivas</li>
                        <li>• Fazer perguntas durante eventos</li>
                        <li>• Solicitar informações sobre atividades</li>
                      </ul>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-blue-600 mb-2">📚 Uso Educacional</h4>
                      <ul className="text-sm space-y-1">
                        <li>• Aplicar conhecimentos adquiridos</li>
                        <li>• Desenvolver habilidades pessoais</li>
                        <li>• Participar de discussões construtivas</li>
                        <li>• Buscar crescimento pessoal</li>
                        <li>• Contribuir positivamente com a comunidade</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              {/* Usos Proibidos */}
              <section>
                <h2 className="text-2xl font-semibold text-blue-600 mb-4">5. Usos Proibidos</h2>
                <div className="space-y-4">
                  <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
                    <h4 className="font-semibold text-red-800 mb-3 flex items-center">
                      <AlertTriangle className="mr-2 h-5 w-5" />
                      Atividades Estritamente Proibidas
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <h5 className="font-semibold text-red-700 mb-2">🚫 Conteúdo Inadequado</h5>
                        <ul className="space-y-1 text-red-600">
                          <li>• Linguagem ofensiva ou discriminatória</li>
                          <li>• Conteúdo violento ou ameaçador</li>
                          <li>• Material sexualmente explícito</li>
                          <li>• Discurso de ódio ou preconceituoso</li>
                          <li>• Spam ou conteúdo irrelevante</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold text-red-700 mb-2">⚖️ Atividades Ilegais</h5>
                        <ul className="space-y-1 text-red-600">
                          <li>• Violação de direitos autorais</li>
                          <li>• Uso comercial não autorizado</li>
                          <li>• Tentativas de hacking ou invasão</li>
                          <li>• Distribuição de malware</li>
                          <li>• Falsificação de identidade</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-700">
                    <strong>Consequências:</strong> O descumprimento destas regras pode resultar em suspensão ou
                    banimento permanente dos nossos serviços, além de possíveis ações legais.
                  </p>
                </div>
              </section>

              {/* Propriedade Intelectual */}
              <section>
                <h2 className="text-2xl font-semibold text-blue-600 mb-4 flex items-center">
                  <Shield className="mr-2 h-6 w-6" />
                  6. Propriedade Intelectual e Gravações
                </h2>
                <div className="space-y-4">
                  <div className="bg-purple-50 border border-purple-200 p-4 rounded-lg">
                    <h4 className="font-semibold text-purple-800 mb-3">🎬 Proteção de Gravações e Conteúdo</h4>
                    <div className="text-purple-700 space-y-2">
                      <p>
                        <strong>Gravações de Palestras:</strong> Todas as gravações de palestras, eventos e cursos são
                        propriedade exclusiva do Projeto Metanoia.
                      </p>
                      <p>
                        <strong>Uso Restrito:</strong> É proibida a reprodução, distribuição ou uso comercial de
                        qualquer gravação sem autorização expressa por escrito.
                      </p>
                      <p>
                        <strong>Materiais Educacionais:</strong> Slides, apostilas e outros materiais são protegidos por
                        direitos autorais.
                      </p>
                    </div>
                  </div>
                  <div className="text-gray-700 space-y-3">
                    <h4 className="font-semibold">Direitos do Usuário:</h4>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Assistir às gravações para fins educacionais pessoais</li>
                      <li>Fazer anotações durante palestras e eventos</li>
                      <li>Aplicar conhecimentos adquiridos em sua vida pessoal</li>
                    </ul>
                    <h4 className="font-semibold">Restrições:</h4>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Não é permitido gravar, fotografar ou filmar eventos sem autorização</li>
                      <li>Proibida a redistribuição de materiais educacionais</li>
                      <li>Vedado o uso comercial de qualquer conteúdo</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Responsabilidades */}
              <section>
                <h2 className="text-2xl font-semibold text-blue-600 mb-4">7. Responsabilidades do Usuário</h2>
                <div className="space-y-4 text-gray-700">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-600 mb-2">Você é responsável por:</h4>
                    <ul className="space-y-2">
                      <li>• Manter a confidencialidade de suas credenciais de acesso</li>
                      <li>• Fornecer informações verdadeiras e atualizadas</li>
                      <li>• Respeitar outros participantes e organizadores</li>
                      <li>• Cumprir horários e compromissos assumidos</li>
                      <li>• Notificar sobre qualquer uso não autorizado de sua conta</li>
                      <li>• Seguir as orientações durante eventos e atividades</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Privacidade */}
              <section>
                <h2 className="text-2xl font-semibold text-blue-600 mb-4">8. Privacidade e Proteção de Dados</h2>
                <div className="space-y-3 text-gray-700">
                  <p>
                    O tratamento de seus dados pessoais é regido por nossa{" "}
                    <Link href="/privacidade" className="text-blue-600 hover:underline font-semibold">
                      Política de Privacidade
                    </Link>
                    , que está em total conformidade com a LGPD.
                  </p>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-600 mb-2">🔒 Compromissos de Privacidade</h4>
                    <ul className="text-green-700 space-y-1">
                      <li>• Não compartilhamos seus dados com terceiros para fins comerciais</li>
                      <li>• Utilizamos seus dados apenas para fins educacionais do Projeto Metanoia</li>
                      <li>• Você pode exercer todos os direitos previstos na LGPD</li>
                      <li>• Implementamos medidas de segurança adequadas</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Limitação de Responsabilidade */}
              <section>
                <h2 className="text-2xl font-semibold text-blue-600 mb-4">9. Limitação de Responsabilidade</h2>
                <div className="space-y-4">
                  <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                    <h4 className="font-semibold text-yellow-800 mb-3">⚠️ Limitações Importantes</h4>
                    <div className="text-yellow-700 space-y-2 text-sm">
                      <p>
                        <strong>Conteúdo Educacional:</strong> Os conteúdos são fornecidos para fins educacionais e de
                        desenvolvimento pessoal, sem garantias de resultados específicos.
                      </p>
                      <p>
                        <strong>Disponibilidade:</strong> Não garantimos disponibilidade ininterrupta dos serviços
                        devido a manutenções, atualizações ou fatores técnicos.
                      </p>
                      <p>
                        <strong>Decisões Pessoais:</strong> Você é responsável pelas decisões tomadas com base nos
                        conhecimentos adquiridos.
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-700">
                    O Projeto Metanoia não se responsabiliza por danos indiretos, lucros cessantes ou consequências de
                    decisões pessoais baseadas em nossos conteúdos educacionais.
                  </p>
                </div>
              </section>

              {/* Foro */}
              <section>
                <h2 className="text-2xl font-semibold text-blue-600 mb-4">10. Foro e Lei Aplicável</h2>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="text-blue-700 space-y-2">
                    <p>
                      <strong>🏛️ Foro Competente:</strong> Brasília, Distrito Federal
                    </p>
                    <p>
                      <strong>⚖️ Lei Aplicável:</strong> Legislação brasileira
                    </p>
                    <p>
                      <strong>📍 Jurisdição:</strong> Tribunais do Distrito Federal
                    </p>
                  </div>
                </div>
                <p className="text-gray-700 mt-3">
                  Estes termos são regidos pelas leis brasileiras, e qualquer disputa será resolvida exclusivamente
                  pelos tribunais competentes de Brasília/DF.
                </p>
              </section>

              {/* Alterações */}
              <section>
                <h2 className="text-2xl font-semibold text-blue-600 mb-4">11. Alterações nos Termos</h2>
                <div className="space-y-3 text-gray-700">
                  <p>
                    Reservamo-nos o direito de modificar estes Termos de Uso a qualquer momento. Alterações
                    significativas serão comunicadas através de:
                  </p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Email para usuários cadastrados</li>
                    <li>Aviso destacado em nosso website</li>
                    <li>Notificação durante eventos</li>
                  </ul>
                  <p>O uso continuado dos serviços após as alterações constitui aceitação dos novos termos.</p>
                </div>
              </section>

              {/* Contato */}
              <section className="bg-blue-50 p-6 rounded-lg">
                <h2 className="text-2xl font-semibold text-blue-600 mb-4">12. Contato e Suporte</h2>
                <div className="space-y-3 text-gray-700">
                  <p className="font-semibold">Para dúvidas sobre estes Termos de Uso ou nossos serviços:</p>
                  <div className="space-y-2">
                    <p className="flex items-center">
                      <Mail className="mr-2 h-4 w-4 text-blue-500" />
                      <strong>Email:</strong> {configuracoes?.contato?.email || "contato@projetometanoia.com.br"}
                    </p>
                    <p className="flex items-center">
                      <Phone className="mr-2 h-4 w-4 text-blue-500" />
                      <strong>Telefone:</strong> {configuracoes?.contato?.telefone || "(61) 98319-4827"}
                    </p>
                    <p>
                      <strong>Endereço:</strong> {configuracoes?.juridico?.enderecoCompleto || "Brasília, DF"}
                    </p>
                    {configuracoes?.juridico?.responsavelLegal && (
                      <p>
                        <strong>Responsável:</strong> {configuracoes.juridico.responsavelLegal}
                      </p>
                    )}
                  </div>
                  <div className="mt-4 p-3 bg-white rounded border-l-4 border-blue-500">
                    <p className="text-sm">
                      <strong>Horário de atendimento:</strong> Segunda a sexta, das 9h às 18h (horário de Brasília)
                    </p>
                  </div>
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
