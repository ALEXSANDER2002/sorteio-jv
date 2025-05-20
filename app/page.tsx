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
import type { Feature } from './types'
import { SyntheticEvent } from 'react'
import SecaoHeroi from "./components/SecaoHeroi"
import SecaoCaracteristicasAlgoritmo from "./components/SecaoCaracteristicasAlgoritmo"
import SecaoRecursosSimulador from "./components/SecaoRecursosSimulador"
import Rodape from "./components/Rodape"

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

// Componente principal da página
export default function PaginaInicial() {
  return (
    <main className="min-h-screen bg-gray-50">
      <SecaoHeroi />
      <SecaoCaracteristicasAlgoritmo />
      <SecaoRecursosSimulador />
      <Rodape />
    </main>
  )
}
