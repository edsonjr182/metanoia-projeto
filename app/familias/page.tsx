import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function FamiliasPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-blue-950 py-16 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 text-4xl font-bold sm:text-5xl">Área para Famílias</h1>
            <p className="text-xl">
              Orientações e recursos para ajudar as famílias a apoiarem o desenvolvimento dos jovens.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <div className="mb-16 grid gap-8 md:grid-cols-2 md:items-center">
              <div>
                <h2 className="mb-4 text-3xl font-bold text-blue-950">O Papel da Família</h2>
                <p className="mb-4 text-gray-700">
                  A família é o primeiro e mais importante círculo de apoio na vida de um jovem. O suporte emocional e o
                  incentivo que você oferece são fundamentais para que eles desenvolvam autoconfiança e resiliência.
                </p>
                <p className="text-gray-700">
                  Nesta seção, você encontrará recursos e orientações para fortalecer os laços familiares e ajudar seu
                  filho ou filha a enfrentar os desafios da adolescência e juventude.
                </p>
              </div>
              <div className="relative h-64 w-full overflow-hidden rounded-lg md:h-80">
                <Image src="/diverse-family-supporting-teenager.png" alt="Família apoiando jovem" fill className="object-cover" />
              </div>
            </div>

            {/* Tabs Section */}
            <div className="mb-16">
              <Tabs defaultValue="comunicacao" className="w-full">
                <TabsList className="mb-8 grid w-full grid-cols-3">
                  <TabsTrigger value="comunicacao">Comunicação</TabsTrigger>
                  <TabsTrigger value="educacao">Educação</TabsTrigger>
                  <TabsTrigger value="emocional">Apoio Emocional</TabsTrigger>
                </TabsList>

                <TabsContent value="comunicacao">
                  <div className="rounded-lg bg-gray-50 p-8">
                    <h3 className="mb-6 text-2xl font-bold text-blue-950">Diálogo Aberto e Efetivo</h3>
                    <p className="mb-4 text-gray-700">
                      A comunicação é a base de qualquer relacionamento saudável. Com adolescentes, pode ser um desafio
                      ainda maior, mas é essencial manter os canais de diálogo abertos.
                    </p>

                    <h4 className="mb-3 mt-6 text-xl font-semibold text-blue-950">
                      Dicas para melhorar a comunicação:
                    </h4>
                    <ul className="mb-6 list-inside list-disc space-y-2 text-gray-700">
                      <li>Escute ativamente, sem julgar ou interromper</li>
                      <li>Escolha momentos adequados para conversas importantes</li>
                      <li>Respeite a privacidade e os limites do jovem</li>
                      <li>Evite comparações com outros jovens ou irmãos</li>
                      <li>Demonstre interesse genuíno pelas opiniões e sentimentos deles</li>
                    </ul>

                    <div className="rounded-lg bg-white p-6 shadow-sm">
                      <h4 className="mb-3 text-lg font-semibold text-blue-950">Exercício Prático</h4>
                      <p className="text-gray-700">
                        Reserve 15 minutos por dia para conversar com seu filho ou filha sobre qualquer assunto que
                        ele/ela queira, sem julgamentos ou interrupções. Apenas escute e faça perguntas para entender
                        melhor.
                      </p>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="educacao">
                  <div className="rounded-lg bg-gray-50 p-8">
                    <h3 className="mb-6 text-2xl font-bold text-blue-950">Apoiando a Jornada Educacional</h3>
                    <p className="mb-4 text-gray-700">
                      A educação é um dos principais caminhos para a transformação social. Como família, você pode ser
                      um pilar fundamental no desenvolvimento acadêmico do jovem.
                    </p>

                    <h4 className="mb-3 mt-6 text-xl font-semibold text-blue-950">Como apoiar os estudos:</h4>
                    <ul className="mb-6 list-inside list-disc space-y-2 text-gray-700">
                      <li>Crie um ambiente propício para os estudos em casa</li>
                      <li>Estabeleça uma rotina consistente</li>
                      <li>Valorize o esforço, não apenas os resultados</li>
                      <li>Conheça os professores e acompanhe o progresso escolar</li>
                      <li>Incentive a leitura e a curiosidade intelectual</li>
                    </ul>

                    <div className="rounded-lg bg-white p-6 shadow-sm">
                      <h4 className="mb-3 text-lg font-semibold text-blue-950">Recursos Educacionais</h4>
                      <p className="mb-4 text-gray-700">
                        Confira nossa lista de recursos educacionais gratuitos que podem complementar os estudos do seu
                        filho ou filha:
                      </p>
                      <Button asChild>
                        <Link href="/cursos">Ver Recursos Educacionais</Link>
                      </Button>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="emocional">
                  <div className="rounded-lg bg-gray-50 p-8">
                    <h3 className="mb-6 text-2xl font-bold text-blue-950">Saúde Mental e Bem-Estar</h3>
                    <p className="mb-4 text-gray-700">
                      A adolescência e juventude são fases de intensas mudanças emocionais. O apoio emocional da família
                      é fundamental para que os jovens desenvolvam resiliência e uma boa relação consigo mesmos.
                    </p>

                    <h4 className="mb-3 mt-6 text-xl font-semibold text-blue-950">Sinais de alerta:</h4>
                    <ul className="mb-6 list-inside list-disc space-y-2 text-gray-700">
                      <li>Mudanças bruscas de comportamento ou humor</li>
                      <li>Isolamento social prolongado</li>
                      <li>Alterações significativas nos padrões de sono ou alimentação</li>
                      <li>Queda no desempenho escolar sem motivo aparente</li>
                      <li>Perda de interesse em atividades que antes gostava</li>
                    </ul>

                    <div className="rounded-lg bg-white p-6 shadow-sm">
                      <h4 className="mb-3 text-lg font-semibold text-blue-950">Apoio Profissional</h4>
                      <p className="mb-4 text-gray-700">
                        Se você perceber sinais preocupantes, não hesite em buscar ajuda profissional. O Projeto
                        Metanoia oferece orientação psicológica gratuita para jovens e famílias.
                      </p>
                      <Button asChild>
                        <Link href="/contato">Solicitar Orientação</Link>
                      </Button>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            {/* Resources Section */}
            <div className="mb-16">
              <h2 className="mb-8 text-center text-3xl font-bold text-blue-950">Materiais para Famílias</h2>
              <div className="grid gap-8 md:grid-cols-3">
                <Card>
                  <CardHeader>
                    <CardTitle>Guia para Pais de Adolescentes</CardTitle>
                    <CardDescription>E-book gratuito</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700">
                      Um guia completo com orientações práticas para lidar com os desafios da adolescência.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">Baixar E-book</Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Webinários para Famílias</CardTitle>
                    <CardDescription>Série de vídeos</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700">
                      Palestras online com especialistas sobre temas relevantes para o desenvolvimento dos jovens.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">Assistir Webinários</Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Grupo de Apoio para Pais</CardTitle>
                    <CardDescription>Encontros mensais</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700">
                      Espaço de troca de experiências entre famílias que enfrentam desafios semelhantes.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">Participar do Grupo</Button>
                  </CardFooter>
                </Card>
              </div>
            </div>

            {/* FAQ Section */}
            <div>
              <h2 className="mb-8 text-center text-3xl font-bold text-blue-950">Perguntas Frequentes</h2>
              <div className="space-y-4">
                <div className="rounded-lg bg-gray-50 p-6">
                  <h3 className="mb-2 text-xl font-semibold text-blue-950">
                    Como lidar com a resistência do meu filho aos estudos?
                  </h3>
                  <p className="text-gray-700">
                    É importante entender as razões por trás dessa resistência. Pode haver dificuldades de aprendizado
                    não identificadas, problemas de relacionamento na escola ou falta de conexão com o método de ensino.
                    Converse abertamente, sem pressão, e considere buscar apoio pedagógico se necessário.
                  </p>
                </div>

                <div className="rounded-lg bg-gray-50 p-6">
                  <h3 className="mb-2 text-xl font-semibold text-blue-950">
                    Como ajudar meu filho a escolher uma profissão?
                  </h3>
                  <p className="text-gray-700">
                    Incentive a exploração de diferentes áreas de interesse, valorize as habilidades naturais dele e
                    evite impor suas próprias expectativas. O Projeto Metanoia oferece orientação vocacional que pode
                    ajudar nesse processo de descoberta.
                  </p>
                </div>

                <div className="rounded-lg bg-gray-50 p-6">
                  <h3 className="mb-2 text-xl font-semibold text-blue-950">
                    Como lidar com o uso excessivo de celular e redes sociais?
                  </h3>
                  <p className="text-gray-700">
                    Estabeleça limites claros e consistentes, mas também dialogue sobre os riscos e benefícios da
                    tecnologia. Crie momentos em família sem dispositivos eletrônicos e dê o exemplo, moderando seu
                    próprio uso.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
