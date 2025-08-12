"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { X, Scale, Shield, CheckCircle, AlertCircle } from "lucide-react"
import { useConfiguracoes } from "@/hooks/use-configuracoes"

interface LegalPopupProps {
  isOpen: boolean
  onClose: () => void
  onAccept: () => void
}

export function LegalPopup({ isOpen, onClose, onAccept }: LegalPopupProps) {
  const { configuracoes } = useConfiguracoes()
  const [activeTab, setActiveTab] = useState("termos")
  const [termosScrolled, setTermosScrolled] = useState(false)
  const [privacidadeScrolled, setPrivacidadeScrolled] = useState(false)
  const [canAccept, setCanAccept] = useState(false)
  const termosScrollRef = useRef<HTMLDivElement>(null)
  const privacidadeScrollRef = useRef<HTMLDivElement>(null)

  // Reset states when popup opens
  useEffect(() => {
    if (isOpen) {
      setTermosScrolled(false)
      setPrivacidadeScrolled(false)
      setCanAccept(false)
      setActiveTab("termos")
    }
  }, [isOpen])

  // Check if both documents have been scrolled
  useEffect(() => {
    setCanAccept(termosScrolled && privacidadeScrolled)
  }, [termosScrolled, privacidadeScrolled])

  const handleScroll = (type: "termos" | "privacidade") => {
    const scrollRef = type === "termos" ? termosScrollRef : privacidadeScrollRef
    if (!scrollRef.current) return

    const { scrollTop, scrollHeight, clientHeight } = scrollRef.current
    const scrollPercentage = (scrollTop + clientHeight) / scrollHeight

    // Consider scrolled if user reached 95% of the content
    if (scrollPercentage >= 0.95) {
      if (type === "termos") {
        setTermosScrolled(true)
      } else {
        setPrivacidadeScrolled(true)
      }
    }
  }

  const handleAccept = () => {
    if (canAccept) {
      onAccept()
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <Card className="w-full max-w-4xl max-h-[90vh] mx-4 shadow-2xl">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 border-b">
          <CardTitle className="text-2xl font-bold">Termos de Uso e Política de Privacidade</CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>

        <CardContent className="p-0">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="px-6 pt-4">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="termos" className="flex items-center gap-2">
                  <Scale className="h-4 w-4" />
                  Termos de Uso
                  {termosScrolled && <CheckCircle className="h-4 w-4 text-green-500" />}
                </TabsTrigger>
                <TabsTrigger value="privacidade" className="flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  Política de Privacidade
                  {privacidadeScrolled && <CheckCircle className="h-4 w-4 text-green-500" />}
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="termos" className="mt-0">
              <ScrollArea
                className="h-[60vh] px-6"
                ref={termosScrollRef}
                onScrollCapture={() => handleScroll("termos")}
              >
                <div className="py-4 space-y-6">
                  <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold text-blue-600 mb-2">Termos de Uso</h2>
                    <p className="text-gray-600">
                      {configuracoes?.juridico?.razaoSocial || "Projeto Metanoia: mudança de mentalidade"}
                    </p>
                  </div>

                  {/* Seção 1: Aceitação */}
                  <section>
                    <h3 className="text-lg font-semibold text-blue-600 mb-3">1. Aceitação dos Termos</h3>
                    <p className="text-gray-700 leading-relaxed mb-4">
                      Ao utilizar os serviços do{" "}
                      <strong>
                        {configuracoes?.juridico?.razaoSocial || "Projeto Metanoia: mudança de mentalidade"}
                      </strong>
                      , você concorda em cumprir estes Termos de Uso. Se não concordar, não deve utilizar nossos
                      serviços.
                    </p>
                  </section>

                  {/* Seção 2: Idade Mínima */}
                  <section>
                    <h3 className="text-lg font-semibold text-blue-600 mb-3">2. Idade Mínima</h3>
                    <div className="bg-orange-50 border border-orange-200 p-4 rounded-lg mb-4">
                      <p className="text-orange-800 font-semibold">
                        ⚠️ Idade mínima para participação: <strong>15 anos</strong>
                      </p>
                      <p className="text-orange-700 text-sm mt-2">
                        Menores entre 15-18 anos devem ter autorização dos pais ou responsáveis legais.
                      </p>
                    </div>
                  </section>

                  {/* Seção 3: Usos Permitidos */}
                  <section>
                    <h3 className="text-lg font-semibold text-blue-600 mb-3">3. Usos Permitidos</h3>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <p className="text-gray-700 mb-2">Você pode:</p>
                      <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm">
                        <li>Participar de palestras, cursos e eventos</li>
                        <li>Acessar materiais educacionais</li>
                        <li>Interagir respeitosamente com outros participantes</li>
                        <li>Compartilhar experiências construtivas</li>
                      </ul>
                    </div>
                  </section>

                  {/* Seção 4: Usos Proibidos */}
                  <section>
                    <h3 className="text-lg font-semibold text-blue-600 mb-3">4. Usos Proibidos</h3>
                    <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
                      <p className="text-red-800 font-semibold mb-2">🚫 É expressamente proibido:</p>
                      <ul className="list-disc list-inside space-y-1 text-red-700 text-sm">
                        <li>Utilizar para fins ilegais ou não autorizados</li>
                        <li>Reproduzir ou distribuir conteúdos sem autorização</li>
                        <li>Transmitir conteúdo ofensivo ou discriminatório</li>
                        <li>Interferir no funcionamento dos sistemas</li>
                        <li>Assediar ou intimidar outros usuários</li>
                      </ul>
                    </div>
                  </section>

                  {/* Seção 5: Propriedade Intelectual */}
                  <section>
                    <h3 className="text-lg font-semibold text-blue-600 mb-3">5. Propriedade Intelectual</h3>
                    <div className="bg-purple-50 border border-purple-200 p-4 rounded-lg">
                      <p className="text-purple-800 font-semibold mb-2">🎬 Proteção de Gravações</p>
                      <p className="text-purple-700 text-sm">
                        Todas as gravações de palestras e eventos são propriedade exclusiva do Projeto Metanoia. É
                        proibida a reprodução, distribuição ou uso comercial sem autorização expressa.
                      </p>
                    </div>
                  </section>

                  {/* Seção 6: Responsabilidades */}
                  <section>
                    <h3 className="text-lg font-semibold text-blue-600 mb-3">6. Responsabilidades do Usuário</h3>
                    <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm">
                      <li>Manter confidencialidade das credenciais de acesso</li>
                      <li>Fornecer informações verdadeiras e atualizadas</li>
                      <li>Respeitar outros participantes e organizadores</li>
                      <li>Cumprir horários e compromissos assumidos</li>
                    </ul>
                  </section>

                  {/* Seção 7: Limitação de Responsabilidade */}
                  <section>
                    <h3 className="text-lg font-semibold text-blue-600 mb-3">7. Limitação de Responsabilidade</h3>
                    <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                      <p className="text-yellow-800 text-sm">
                        O Projeto Metanoia não se responsabiliza por danos indiretos, lucros cessantes ou consequências
                        de decisões pessoais baseadas em nossos conteúdos educacionais.
                      </p>
                    </div>
                  </section>

                  {/* Seção 8: Foro */}
                  <section>
                    <h3 className="text-lg font-semibold text-blue-600 mb-3">8. Foro e Lei Aplicável</h3>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <p className="text-blue-700 text-sm">
                        <strong>🏛️ Foro:</strong> Brasília, Distrito Federal
                        <br />
                        <strong>⚖️ Lei Aplicável:</strong> Legislação brasileira
                      </p>
                    </div>
                  </section>

                  {/* Seção 9: Contato */}
                  <section>
                    <h3 className="text-lg font-semibold text-blue-600 mb-3">9. Contato</h3>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-gray-700 text-sm">
                        <strong>Email:</strong> {configuracoes?.contato?.email || "contato@projetometanoia.com.br"}
                        <br />
                        <strong>Telefone:</strong> {configuracoes?.contato?.telefone || "(61) 98319-4827"}
                      </p>
                    </div>
                  </section>

                  {!termosScrolled && (
                    <div className="text-center py-4">
                      <div className="flex items-center justify-center text-orange-600">
                        <AlertCircle className="h-4 w-4 mr-2" />
                        <span className="text-sm">Role até o final para continuar</span>
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="privacidade" className="mt-0">
              <ScrollArea
                className="h-[60vh] px-6"
                ref={privacidadeScrollRef}
                onScrollCapture={() => handleScroll("privacidade")}
              >
                <div className="py-4 space-y-6">
                  <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold text-green-600 mb-2">Política de Privacidade</h2>
                    <p className="text-gray-600">Proteção de Dados - LGPD</p>
                  </div>

                  {/* Seção 1: Introdução */}
                  <section>
                    <h3 className="text-lg font-semibold text-green-600 mb-3">1. Introdução</h3>
                    <p className="text-gray-700 leading-relaxed text-sm">
                      O <strong>{configuracoes?.juridico?.razaoSocial || "Projeto Metanoia"}</strong> está comprometido
                      com a proteção da privacidade e dos dados pessoais, em conformidade com a{" "}
                      <strong>Lei Geral de Proteção de Dados (LGPD - Lei 13.709/2018)</strong>.
                    </p>
                  </section>

                  {/* Seção 2: Dados Coletados */}
                  <section>
                    <h3 className="text-lg font-semibold text-green-600 mb-3">2. Dados Coletados</h3>
                    <div className="space-y-3">
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <h4 className="font-semibold text-blue-600 text-sm mb-2">Dados Fornecidos por Você:</h4>
                        <ul className="list-disc list-inside space-y-1 text-gray-700 text-xs">
                          <li>Nome completo</li>
                          <li>Endereço de email</li>
                          <li>Número de telefone/WhatsApp</li>
                          <li>Idade</li>
                        </ul>
                      </div>
                      <div className="bg-purple-50 p-3 rounded-lg">
                        <h4 className="font-semibold text-purple-600 text-sm mb-2">Dados Coletados Automaticamente:</h4>
                        <ul className="list-disc list-inside space-y-1 text-gray-700 text-xs">
                          <li>Endereço IP</li>
                          <li>Informações do navegador</li>
                          <li>Cookies e tecnologias similares</li>
                        </ul>
                      </div>
                    </div>
                  </section>

                  {/* Seção 3: Finalidades */}
                  <section>
                    <h3 className="text-lg font-semibold text-green-600 mb-3">3. Como Usamos Seus Dados</h3>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <p className="text-green-800 font-semibold text-sm mb-2">Utilizamos seus dados para:</p>
                      <ul className="list-disc list-inside space-y-1 text-green-700 text-xs">
                        <li>Fornecer informações sobre palestras e eventos</li>
                        <li>Processar inscrições em atividades</li>
                        <li>Enviar newsletters educacionais</li>
                        <li>Melhorar nossos serviços</li>
                        <li>Cumprir obrigações legais</li>
                      </ul>
                    </div>
                  </section>

                  {/* Seção 4: Base Legal */}
                  <section>
                    <h3 className="text-lg font-semibold text-green-600 mb-3">4. Base Legal (LGPD)</h3>
                    <div className="space-y-2">
                      <div className="bg-gray-50 p-3 rounded">
                        <p className="text-gray-700 text-xs">
                          <strong>Consentimento:</strong> Para newsletters e comunicações promocionais
                        </p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded">
                        <p className="text-gray-700 text-xs">
                          <strong>Execução de contrato:</strong> Para prestação de serviços educacionais
                        </p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded">
                        <p className="text-gray-700 text-xs">
                          <strong>Legítimo interesse:</strong> Para melhorias e análises estatísticas
                        </p>
                      </div>
                    </div>
                  </section>

                  {/* Seção 5: Compartilhamento */}
                  <section>
                    <h3 className="text-lg font-semibold text-green-600 mb-3">5. Compartilhamento de Dados</h3>
                    <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
                      <p className="text-red-800 font-semibold text-sm mb-2">🚫 Política de Não Compartilhamento</p>
                      <p className="text-red-700 text-xs">
                        <strong>NÃO compartilhamos</strong> seus dados pessoais com terceiros para fins comerciais. Seus
                        dados são utilizados exclusivamente para os fins do Projeto Metanoia.
                      </p>
                    </div>
                  </section>

                  {/* Seção 6: Segurança */}
                  <section>
                    <h3 className="text-lg font-semibold text-green-600 mb-3">6. Segurança dos Dados</h3>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <p className="text-blue-800 font-semibold text-sm mb-2">🔒 Medidas de Proteção:</p>
                      <ul className="list-disc list-inside space-y-1 text-blue-700 text-xs">
                        <li>Criptografia de dados</li>
                        <li>Controles de acesso rigorosos</li>
                        <li>Monitoramento de segurança</li>
                        <li>Backups seguros</li>
                      </ul>
                    </div>
                  </section>

                  {/* Seção 7: Seus Direitos */}
                  <section>
                    <h3 className="text-lg font-semibold text-green-600 mb-3">7. Seus Direitos (LGPD)</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="bg-green-50 p-3 rounded-lg">
                        <h4 className="font-semibold text-green-600 text-sm mb-2">Direitos de Acesso</h4>
                        <ul className="text-xs space-y-1 text-green-700">
                          <li>• Confirmação de tratamento</li>
                          <li>• Acesso aos dados</li>
                          <li>• Correção de dados</li>
                        </ul>
                      </div>
                      <div className="bg-green-50 p-3 rounded-lg">
                        <h4 className="font-semibold text-green-600 text-sm mb-2">Direitos de Controle</h4>
                        <ul className="text-xs space-y-1 text-green-700">
                          <li>• Eliminação de dados</li>
                          <li>• Portabilidade</li>
                          <li>• Revogação do consentimento</li>
                        </ul>
                      </div>
                    </div>
                  </section>

                  {/* Seção 8: Cookies */}
                  <section>
                    <h3 className="text-lg font-semibold text-green-600 mb-3">8. Cookies</h3>
                    <p className="text-gray-700 text-sm">
                      Utilizamos cookies para melhorar a funcionalidade do site, analisar tráfego e personalizar
                      conteúdo. Você pode gerenciar cookies através das configurações do navegador.
                    </p>
                  </section>

                  {/* Seção 9: Contato */}
                  <section>
                    <h3 className="text-lg font-semibold text-green-600 mb-3">9. Exercer Seus Direitos</h3>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-gray-700 text-sm mb-2">
                        <strong>Para exercer seus direitos LGPD:</strong>
                      </p>
                      <p className="text-gray-700 text-xs">
                        <strong>Email:</strong>{" "}
                        {configuracoes?.juridico?.emailJuridico || "juridico@projetometanoia.com.br"}
                        <br />
                        <strong>Telefone:</strong> {configuracoes?.juridico?.telefoneJuridico || "(61) 98319-4827"}
                        <br />
                        <strong>Prazo de resposta:</strong> Até 15 dias úteis
                      </p>
                    </div>
                  </section>

                  {!privacidadeScrolled && (
                    <div className="text-center py-4">
                      <div className="flex items-center justify-center text-orange-600">
                        <AlertCircle className="h-4 w-4 mr-2" />
                        <span className="text-sm">Role até o final para continuar</span>
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>

          {/* Status e Botões */}
          <div className="px-6 py-4 border-t bg-gray-50">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center">
                  {termosScrolled ? (
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  ) : (
                    <AlertCircle className="h-4 w-4 text-orange-500 mr-2" />
                  )}
                  <span className={termosScrolled ? "text-green-600" : "text-orange-600"}>
                    Termos de Uso {termosScrolled ? "✓" : "- Role até o final"}
                  </span>
                </div>
                <div className="flex items-center">
                  {privacidadeScrolled ? (
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  ) : (
                    <AlertCircle className="h-4 w-4 text-orange-500 mr-2" />
                  )}
                  <span className={privacidadeScrolled ? "text-green-600" : "text-orange-600"}>
                    Política de Privacidade {privacidadeScrolled ? "✓" : "- Role até o final"}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <Button variant="outline" onClick={onClose}>
                Cancelar
              </Button>
              <Button
                onClick={handleAccept}
                disabled={!canAccept}
                className={`${
                  canAccept
                    ? "bg-green-600 hover:bg-green-700 text-white"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                {canAccept ? (
                  <>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Aceito os Termos e Políticas
                  </>
                ) : (
                  "Leia ambos os documentos completamente"
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
