import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, BarChart3, LineChart, PieChart, Settings } from "lucide-react"
import type { Feature } from "../tipos.d"

export default function SecaoRecursosSimulador() {
  const recursos: Feature[] = [
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
        {recursos.map((recurso, index) => (
          <div key={index} className="flex gap-4">
            <div className={`bg-${recurso.color}-100 text-${recurso.color}-700 w-12 h-12 rounded-full flex-shrink-0 flex items-center justify-center`}>
              <recurso.icon className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-1">{recurso.title}</h3>
              <p className="text-gray-600">{recurso.description}</p>
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