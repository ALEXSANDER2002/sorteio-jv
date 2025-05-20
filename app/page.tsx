'use client'

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Cpu, HardDrive, Clock, Award, BookOpen, Users, BarChart } from "lucide-react"
import Image from "next/image"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-blue-600 text-white">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[url('/circuit-pattern.png')] bg-repeat opacity-20"></div>
        </div>
        <div className="container mx-auto px-4 py-16 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Simulador de Escalonamento por Sorteio
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Uma implementação interativa do algoritmo Lottery Scheduling para visualizar como os processos são
              gerenciados em sistemas operacionais
            </p>
            <Link href="/simulador">
              <Button
                size="lg"
                className="bg-white text-blue-600 hover:bg-blue-50 text-lg px-8 py-6 rounded-full shadow-lg transition-transform hover:scale-105"
              >
                Iniciar Simulação
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Sobre o Algoritmo */}
        <section className="mb-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-blue-700 mb-2">O que é Lottery Scheduling?</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Um algoritmo de escalonamento probabilístico que utiliza bilhetes para determinar qual processo será
              executado
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl shadow-md p-6 border border-blue-100 hover:shadow-lg transition-shadow">
              <div className="bg-blue-100 text-blue-700 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Award className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Justiça Probabilística</h3>
              <p className="text-gray-600">
                Processos com mais bilhetes recebem proporcionalmente mais tempo de CPU, garantindo justiça no
                escalonamento.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 border border-blue-100 hover:shadow-lg transition-shadow">
              <div className="bg-green-100 text-green-700 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Clock className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Preempção</h3>
              <p className="text-gray-600">
                A cada unidade de tempo, um novo sorteio é realizado, permitindo que diferentes processos sejam
                executados.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 border border-blue-100 hover:shadow-lg transition-shadow">
              <div className="bg-purple-100 text-purple-700 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Cpu className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Processos de CPU</h3>
              <p className="text-gray-600">
                Processos que realizam cálculos intensivos e utilizam principalmente o processador do computador.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 border border-blue-100 hover:shadow-lg transition-shadow">
              <div className="bg-yellow-100 text-yellow-700 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <HardDrive className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Processos de I/O</h3>
              <p className="text-gray-600">
                Processos que trabalham com entrada e saída de dados, como leitura de arquivos ou comunicação em rede.
              </p>
            </div>
          </div>
        </section>

        {/* Recursos do Simulador */}
        <section className="mb-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-blue-700 mb-2">Recursos do Simulador</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Explore todas as funcionalidades interativas disponíveis no nosso simulador
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex gap-4">
              <div className="bg-blue-100 text-blue-700 w-12 h-12 rounded-full flex-shrink-0 flex items-center justify-center">
                <BarChart className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-1">Visualização em Tempo Real</h3>
                <p className="text-gray-600">
                  Observe o processo de escalonamento acontecendo em tempo real, com gráficos e animações que facilitam
                  o entendimento.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="bg-green-100 text-green-700 w-12 h-12 rounded-full flex-shrink-0 flex items-center justify-center">
                <Users className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-1">Diferenciação de Processos</h3>
                <p className="text-gray-600">
                  Visualize claramente a diferença entre processos de CPU e I/O, com cores e ícones distintos para cada
                  tipo.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="bg-purple-100 text-purple-700 w-12 h-12 rounded-full flex-shrink-0 flex items-center justify-center">
                <Clock className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-1">Controle de Velocidade</h3>
                <p className="text-gray-600">
                  Ajuste a velocidade da simulação para observar o comportamento do algoritmo em diferentes ritmos.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="bg-yellow-100 text-yellow-700 w-12 h-12 rounded-full flex-shrink-0 flex items-center justify-center">
                <BookOpen className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-1">Explicações Didáticas</h3>
                <p className="text-gray-600">
                  Entenda facilmente como funciona o algoritmo com explicações simples e visuais ao longo da simulação.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-10 text-center">
            <Link href="/simulador">
              <Button className="bg-blue-600 hover:bg-blue-700">
                Explorar o Simulador
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </section>

        {/* Preview do Simulador */}
        <section className="mb-16">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
            <div className="p-4 bg-gray-50 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-800">Prévia do Simulador</h3>
            </div>
            <div className="p-2">
              <Image
                src="/simulador-preview.png"
                alt="Prévia do Simulador"
                width={1200}
                height={675}
                className="w-full h-auto rounded-lg shadow-sm"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.src = "/lottery-scheduling-simulator.png"
                }}
              />
            </div>
          </div>
        </section>

        {/* Criadores do Projeto */}
        <section className="mb-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-blue-700 mb-2">Equipe de Desenvolvimento</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Conheça os estudantes responsáveis pelo desenvolvimento deste simulador educacional
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Alex */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-64 bg-gradient-to-br from-blue-400 to-blue-600 relative">
                <Image
                  src="/alex-foto.png"
                  alt="Alex"
                  fill
                  className="object-cover mix-blend-overlay"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.src = "/diverse-student-profiles.png"
                  }}
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">Alex</h3>
                <p className="text-gray-600">
                  Desenvolvedor Full Stack e entusiasta de sistemas operacionais
                </p>
              </div>
            </div>

            {/* Kalleb */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-64 bg-gradient-to-br from-green-400 to-green-600 relative">
                <Image
                  src="/kalleb-foto.png"
                  alt="Kalleb"
                  fill
                  className="object-cover mix-blend-overlay"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.src = "/diverse-student-profiles.png"
                  }}
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">Kalleb</h3>
                <p className="text-gray-600">
                  Especialista em UI/UX e desenvolvimento frontend
                </p>
              </div>
            </div>

            {/* Murilo */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-64 bg-gradient-to-br from-purple-400 to-purple-600 relative">
                <img
                  src="/murilo-foto.png"
                  alt="Murilo"
                  className="w-full h-full object-cover mix-blend-overlay"
                  onError={(e) => {
                    e.currentTarget.src = "/diverse-student-profiles.png"
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <h3 className="text-2xl font-bold">Murilo</h3>
                  <p className="text-purple-100">Documentação e Testes</p>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-600">
                  Responsável pela documentação, testes e garantia de qualidade do simulador.
                </p>
                <div className="mt-4 flex gap-2">
                  <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm">Documentação</span>
                  <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm">Testes</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Informações da Universidade */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-xl shadow-lg overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/3 p-8 flex items-center justify-center bg-blue-900/30">
              <img
                src="/unifesspa-logo.png"
                alt="Logo da UNIFESSPA"
                className="max-w-[200px] max-h-[200px]"
                onError={(e) => {
                  e.currentTarget.src = "/university-emblem.png"
                }}
              />
            </div>
            <div className="md:w-2/3 p-8">
              <h2 className="text-2xl font-bold mb-4">Universidade Federal do Sul e Sudeste do Pará (UNIFESSPA)</h2>
              <p className="mb-4">
                Este projeto foi desenvolvido como parte da disciplina de Sistemas Operacionais, sob orientação do Prof.
                João Victor.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <h3 className="font-bold mb-1">Disciplina</h3>
                  <p>Sistemas Operacionais - 2023/2</p>
                </div>
                <div>
                  <h3 className="font-bold mb-1">Professor</h3>
                  <p>Prof. João Victor</p>
                </div>
                <div>
                  <h3 className="font-bold mb-1">Curso</h3>
                  <p>Engenharia da Computação</p>
                </div>
                <div>
                  <h3 className="font-bold mb-1">Semestre</h3>
                  <p>2023/2</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="mb-2">© 2023 Simulador de Escalonamento por Sorteio - Todos os direitos reservados</p>
            <p className="text-gray-400 text-sm">
              Desenvolvido por Alex, Kalleb e Murilo | UNIFESSPA - Engenharia da Computação
            </p>
          </div>
        </div>
      </footer>
    </main>
  )
}
