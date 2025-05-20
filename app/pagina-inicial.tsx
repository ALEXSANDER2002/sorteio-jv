'use client'

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { 
  ArrowRight, 
  Cpu, 
  HardDrive, 
  Clock, 
  Award, 
  BookOpen, 
  Users, 
  BarChart,
  LucideIcon,
  BarChart3,
  LineChart,
  PieChart,
  Settings,
  GraduationCap,
  Building2,
  Github,
  Linkedin,
  Mail,
} from "lucide-react"
import type { Feature, TeamMember } from './types'
import { SyntheticEvent } from 'react'

// Componente para o cabeçalho da página
function HeroSection() {
  return (
    <div className="relative overflow-hidden bg-blue-600 text-white">
      {/* Fundo com padrão de circuitos */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[url('/circuit-pattern.png')] bg-repeat opacity-20"></div>
      </div>

      {/* Conteúdo principal do cabeçalho */}
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

      {/* Gradiente na parte inferior */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent"></div>
    </div>
  )
}

// Componente para a seção de características do algoritmo
function AlgorithmFeatures() {
  const features: Feature[] = [
    {
      icon: Award,
      title: "Justiça Probabilística",
      description: "Processos com mais bilhetes recebem proporcionalmente mais tempo de CPU, garantindo justiça no escalonamento.",
      color: "blue"
    },
    {
      icon: Clock,
      title: "Preempção",
      description: "A cada unidade de tempo, um novo sorteio é realizado, permitindo que diferentes processos sejam executados.",
      color: "green"
    },
    {
      icon: Cpu,
      title: "Processos de CPU",
      description: "Processos que realizam cálculos intensivos e utilizam principalmente o processador do computador.",
      color: "purple"
    },
    {
      icon: HardDrive,
      title: "Processos de I/O",
      description: "Processos que trabalham com entrada e saída de dados, como leitura de arquivos ou comunicação em rede.",
      color: "yellow"
    }
  ]

  return (
    <section className="mb-16">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-blue-700 mb-2">O que é Lottery Scheduling?</h2>
        <p className="text-gray-600 max-w-3xl mx-auto">
          Um algoritmo de escalonamento probabilístico que utiliza bilhetes para determinar qual processo será executado
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, index) => (
          <div key={index} className="bg-white rounded-xl shadow-md p-6 border border-blue-100 hover:shadow-lg transition-shadow">
            <div className={`bg-${feature.color}-100 text-${feature.color}-700 w-12 h-12 rounded-full flex items-center justify-center mb-4`}>
              <feature.icon className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

// Componente para a seção de recursos do simulador
function SimulatorFeatures() {
  const features: Feature[] = [
    {
      icon: BarChart3,
      title: "Análise de Desempenho",
      description: "Visualize métricas detalhadas de desempenho do algoritmo em diferentes cenários.",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: LineChart,
      title: "Comparação de Algoritmos",
      description: "Compare o desempenho do Lottery Scheduling com outros algoritmos de escalonamento.",
      color: "from-green-500 to-green-600",
    },
    {
      icon: PieChart,
      title: "Distribuição de Recursos",
      description: "Analise como os recursos são distribuídos entre os processos ao longo do tempo.",
      color: "from-purple-500 to-purple-600",
    },
    {
      icon: Settings,
      title: "Configurações Flexíveis",
      description: "Ajuste parâmetros como quantum, prioridades e políticas de escalonamento.",
      color: "from-orange-500 to-orange-600",
    },
  ]

  return (
    <section className="mb-16">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-blue-700 mb-2">Recursos do Simulador</h2>
        <p className="text-gray-600 max-w-3xl mx-auto">
          Explore todas as funcionalidades interativas disponíveis no nosso simulador
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {features.map((feature, index) => (
          <div key={index} className="flex gap-4">
            <div className={`bg-${feature.color}-100 text-${feature.color}-700 w-12 h-12 rounded-full flex-shrink-0 flex items-center justify-center`}>
              <feature.icon className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-1">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          </div>
        ))}
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
  )
}

// Componente para a seção de preview do simulador
function SimulatorPreview() {
  return (
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
            onError={(e: SyntheticEvent<HTMLImageElement>) => {
              const target = e.target as HTMLImageElement
              target.src = "/lottery-scheduling-simulator.png"
            }}
          />
        </div>
      </div>
    </section>
  )
}

// Componente para a seção da equipe
function TeamSection() {
  const team: TeamMember[] = [
    {
      name: "Alexsander",
      role: "Desenvolvedor Full Stack",
      image: "/team/alexsander.jpg",
      gradient: "from-blue-500 to-blue-600",
    },
    {
      name: "João",
      role: "Desenvolvedor Backend",
      image: "/team/joao.jpg",
      gradient: "from-green-500 to-green-600",
    },
    {
      name: "Maria",
      role: "Desenvolvedora Frontend",
      image: "/team/maria.jpg",
      gradient: "from-purple-500 to-purple-600",
    },
  ]

  return (
    <section className="mb-16">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-blue-700 mb-2">Equipe de Desenvolvimento</h2>
        <p className="text-gray-600 max-w-3xl mx-auto">
          Conheça os estudantes responsáveis pelo desenvolvimento deste simulador educacional
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {team.map((member, index) => (
          <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className={`h-64 bg-gradient-to-br ${member.gradient} relative`}>
              <Image
                src={member.image}
                alt={member.name}
                fill
                className="object-cover mix-blend-overlay"
                onError={(e: SyntheticEvent<HTMLImageElement>) => {
                  const target = e.target as HTMLImageElement
                  target.src = "/placeholder.png"
                }}
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-2">{member.name}</h3>
              <p className="text-gray-600">{member.role}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

// Componente para a seção da universidade
function UniversitySection() {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-xl shadow-lg overflow-hidden">
      <div className="md:flex">
        <div className="md:w-1/3 p-8 flex items-center justify-center bg-blue-900/30">
          <Image
            src="/unifesspa-logo.png"
            alt="Logo da UNIFESSPA"
            width={200}
            height={200}
            className="max-w-[200px] max-h-[200px]"
            onError={(e: SyntheticEvent<HTMLImageElement>) => {
              const target = e.target as HTMLImageElement
              target.src = "/university-emblem.png"
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
  )
}

// Componente para o rodapé
function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <p className="mb-2">© 2023 Simulador de Escalonamento por Sorteio - Todos os direitos reservados</p>
          <p className="text-gray-400 text-sm">
            Desenvolvido por Alex e Kalleb | UNIFESSPA - Engenharia da Computação
          </p>
        </div>
      </div>
    </footer>
  )
}

// Componente principal da página
export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-50">
      <HeroSection />
      <div className="container mx-auto px-4 py-12">
        <AlgorithmFeatures />
        <SimulatorFeatures />
        <SimulatorPreview />
        <TeamSection />
        <UniversitySection />
      </div>
      <Footer />
    </main>
  )
}
