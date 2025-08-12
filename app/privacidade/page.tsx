"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Shield, Calendar, Mail, Phone, Lock, Eye, UserCheck } from "lucide-react"
import Link from "next/link"
import { useConfiguracoes } from "@/hooks/use-configuracoes"

export default function PrivacidadePage() {
  const { configuracoes, loading } = useConfiguracoes()
  const [dataAtualizacao] = useState(new Date().toLocaleDateString("pt-BR"))

  // Adicionar loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
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
                <div className="p-3 bg-green-500 rounded-full">
                  <Shield className="h-8 w-8 text-white" />
                </div>
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Política de Privacidade</h1>
              <p className="text-gray-600 flex items-center justify-center">
                <Calendar className="mr-2 h-4 w-4" />
                Última atualização: {dataAtualizacao}
              </p>
            </div>
          </div>

          {/* Conteúdo */}
          <Card className="shadow-lg">
            <CardHeader className="bg-green-500 text-white">
              <CardTitle className="text-2xl">
                Política de Privacidade - {configuracoes?.juridico?.razaoSocial || "Projeto Metanoia"}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8 space-y-8">
              {/* Introdução */}
              <section>
                <h2 className="text-2xl font-semibold text-green-600 mb-4 flex items-center">
                  <Shield className="mr-2 h-6 w-6" />
                  1. Introdução
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  O{" "}
                  <strong>{configuracoes?.juridico?.razaoSocial || "Projeto Metanoia: mudança de mentalidade"}</strong>{" "}
                  está comprometido com a proteção da privacidade e dos dados pessoais de nossos usuários. Esta Política
                  de Privacidade descreve como coletamos, usamos, armazenamos e protegemos suas informações pessoais, em
                  total conformidade com a <strong>Lei Geral de Proteção de Dados (LGPD - Lei 13.709/2018)</strong>.
                </p>
              </section>

              {/* Dados Coletados */}
              <section>
                <h2 className="text-2xl font-semibold text-green-600 mb-4 flex items-center">
                  <Eye className="mr-2 h-6 w-6" />
                  2. Dados Coletados
                </h2>
                <div className="space-y-4 text-gray-700">
                  <div>
                    <h3 className="text-lg font-semibold text-green-500 mb-2">2.1 Dados Fornecidos Voluntariamente</h3>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>Nome completo</li>
                      <li>Endereço de email</li>
                      <li>Número de telefone</li>
                      <li>Idade (para verificação de elegibilidade)</li>
                      <li>Informações de interesse em cursos e palestras</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-green-500 mb-2">2.2 Dados Coletados Automaticamente</h3>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>Endereço IP</li>
                      <li>Informações do navegador e dispositivo</li>
                      <li>Páginas visitadas e tempo de permanência</li>
                      <li>Cookies e tecnologias similares</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Finalidades */}
              <section>
                <h2 className="text-2xl font-semibold text-green-600 mb-4 flex items-center">
                  <UserCheck className="mr-2 h-6 w-6" />
                  3. Finalidades do Tratamento
                </h2>
                <div className="space-y-3 text-gray-700">
                  <p>Utilizamos seus dados pessoais para:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Fornecer informações sobre palestras, cursos e eventos</li>
                    <li>Processar inscrições e participações em atividades</li>
                    <li>Enviar newsletters e comunicações educacionais</li>
                    <li>Melhorar nossos serviços e experiência do usuário</li>
                    <li>Realizar análises estatísticas e pesquisas</li>
                    <li>Cumprir obrigações legais e regulamentares</li>
                    <li>Exercer direitos em processos judiciais</li>
                  </ul>
                </div>
              </section>

              {/* Base Legal */}
              <section>
                <h2 className="text-2xl font-semibold text-green-600 mb-4">4. Base Legal</h2>
                <div className="space-y-3 text-gray-700">
                  <p>O tratamento de seus dados pessoais é fundamentado nas seguintes bases legais da LGPD:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>
                      <strong>Consentimento:</strong> Para envio de newsletters e comunicações promocionais
                    </li>
                    <li>
                      <strong>Execução de contrato:</strong> Para prestação de serviços educacionais
                    </li>
                    <li>
                      <strong>Legítimo interesse:</strong> Para melhorias dos serviços e análises estatísticas
                    </li>
                    <li>
                      <strong>Cumprimento de obrigação legal:</strong> Quando exigido por lei
                    </li>
                  </ul>
                </div>
              </section>

              {/* Compartilhamento */}
              <section>
                <h2 className="text-2xl font-semibold text-green-600 mb-4">5. Compartilhamento de Dados</h2>
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="text-gray-700 leading-relaxed">
                    <strong>Política de Não Compartilhamento:</strong> O Projeto Metanoia{" "}
                    <strong>NÃO compartilha</strong> seus dados pessoais com terceiros para fins comerciais. Seus dados
                    são utilizados exclusivamente para os fins do Projeto Metanoia ou outros projetos educacionais sob
                    nossa responsabilidade.
                  </p>
                </div>
                <div className="mt-4 space-y-2 text-gray-700">
                  <p>Podemos compartilhar dados apenas nas seguintes situações:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Com seu consentimento expresso</li>
                    <li>Para cumprimento de obrigações legais</li>
                    <li>Para proteção de direitos e segurança</li>
                    <li>Com prestadores de serviços técnicos (sob contrato de confidencialidade)</li>
                  </ul>
                </div>
              </section>

              {/* Cookies */}
              <section>
                <h2 className="text-2xl font-semibold text-green-600 mb-4">6. Cookies e Tecnologias</h2>
                <div className="space-y-3 text-gray-700">
                  <p>Utilizamos cookies e tecnologias similares para:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Melhorar a funcionalidade do site</li>
                    <li>Analisar o tráfego e comportamento dos usuários</li>
                    <li>Personalizar conteúdo e publicidade</li>
                    <li>Realizar remarketing e publicidade direcionada</li>
                  </ul>
                  <p className="mt-3">
                    Você pode gerenciar suas preferências de cookies através das configurações do seu navegador.
                  </p>
                </div>
              </section>

              {/* Segurança */}
              <section>
                <h2 className="text-2xl font-semibold text-green-600 mb-4 flex items-center">
                  <Lock className="mr-2 h-6 w-6" />
                  7. Segurança dos Dados
                </h2>
                <div className="space-y-3 text-gray-700">
                  <p>Implementamos medidas técnicas e organizacionais para proteger seus dados:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Criptografia de dados em trânsito e em repouso</li>
                    <li>Controles de acesso rigorosos</li>
                    <li>Monitoramento contínuo de segurança</li>
                    <li>Treinamento regular da equipe</li>
                    <li>Backups seguros e regulares</li>
                    <li>Auditorias periódicas de segurança</li>
                  </ul>
                </div>
              </section>

              {/* Retenção */}
              <section>
                <h2 className="text-2xl font-semibold text-green-600 mb-4">8. Retenção de Dados</h2>
                <p className="text-gray-700 leading-relaxed">
                  Mantemos seus dados pessoais apenas pelo tempo necessário para cumprir as finalidades descritas nesta
                  política, respeitando os prazos legais aplicáveis. Dados de participantes em eventos podem ser
                  mantidos por até 5 anos para fins históricos e educacionais.
                </p>
              </section>

              {/* Direitos do Titular */}
              <section>
                <h2 className="text-2xl font-semibold text-green-600 mb-4">9. Seus Direitos (LGPD)</h2>
                <div className="space-y-3 text-gray-700">
                  <p>Você tem os seguintes direitos sobre seus dados pessoais:</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div className="bg-green-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-green-600 mb-2">Direitos de Acesso</h4>
                      <ul className="text-sm space-y-1">
                        <li>• Confirmação da existência de tratamento</li>
                        <li>• Acesso aos dados</li>
                        <li>• Correção de dados incompletos/inexatos</li>
                      </ul>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-green-600 mb-2">Direitos de Controle</h4>
                      <ul className="text-sm space-y-1">
                        <li>• Eliminação de dados desnecessários</li>
                        <li>• Portabilidade dos dados</li>
                        <li>• Revogação do consentimento</li>
                      </ul>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-green-600 mb-2">Direitos de Oposição</h4>
                      <ul className="text-sm space-y-1">
                        <li>• Oposição ao tratamento</li>
                        <li>• Informações sobre compartilhamento</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              {/* Menores */}
              <section>
                <h2 className="text-2xl font-semibold text-green-600 mb-4">10. Dados de Menores</h2>
                <p className="text-gray-700 leading-relaxed">
                  Para participantes entre 15 e 18 anos, exigimos autorização dos pais ou responsáveis legais. Dados de
                  menores recebem proteção especial e são tratados com cuidado adicional, conforme determina a LGPD.
                </p>
              </section>

              {/* Alterações */}
              <section>
                <h2 className="text-2xl font-semibold text-green-600 mb-4">11. Alterações na Política</h2>
                <p className="text-gray-700 leading-relaxed">
                  Esta Política de Privacidade pode ser atualizada periodicamente. Notificaremos sobre alterações
                  significativas através do email cadastrado ou aviso no site. A versão mais recente estará sempre
                  disponível em nosso site.
                </p>
              </section>

              {/* Contato e DPO */}
              <section className="bg-green-50 p-6 rounded-lg">
                <h2 className="text-2xl font-semibold text-green-600 mb-4">12. Contato e Exercício de Direitos</h2>
                <div className="space-y-3 text-gray-700">
                  <p className="font-semibold">Para exercer seus direitos ou esclarecer dúvidas sobre esta política:</p>
                  <div className="space-y-2">
                    <p className="flex items-center">
                      <Mail className="mr-2 h-4 w-4 text-green-500" />
                      <strong>Email para questões de privacidade:</strong>{" "}
                      {configuracoes?.juridico?.emailJuridico || "juridico@projetometanoia.com.br"}
                    </p>
                    <p className="flex items-center">
                      <Phone className="mr-2 h-4 w-4 text-green-500" />
                      <strong>Telefone:</strong> {configuracoes?.juridico?.telefoneJuridico || "(61) 98319-4827"}
                    </p>
                    <p>
                      <strong>Endereço:</strong> {configuracoes?.juridico?.enderecoCompleto || "Brasília, DF"}
                    </p>
                    {configuracoes?.juridico?.responsavelLegal && (
                      <p>
                        <strong>Responsável pelo tratamento:</strong> {configuracoes.juridico.responsavelLegal}
                      </p>
                    )}
                  </div>
                  <div className="mt-4 p-4 bg-white rounded border-l-4 border-green-500">
                    <p className="text-sm">
                      <strong>Prazo de resposta:</strong> Responderemos às suas solicitações em até 15 dias, conforme
                      estabelecido pela LGPD.
                    </p>
                  </div>
                </div>
              </section>
            </CardContent>
          </Card>

          {/* Footer */}
          <div className="text-center mt-8">
            <Link href="/">
              <Button className="bg-green-500 hover:bg-green-600">
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
