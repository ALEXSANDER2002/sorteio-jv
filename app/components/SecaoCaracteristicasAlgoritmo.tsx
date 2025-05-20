import { Award, Clock, Cpu, HardDrive } from "lucide-react"
import type { Feature } from "../tipos.d"

export default function SecaoCaracteristicasAlgoritmo() {
  const caracteristicas: Feature[] = [
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
        {caracteristicas.map((caracteristica, index) => (
          <div key={index} className="bg-white rounded-xl shadow-md p-6 border border-blue-100 hover:shadow-lg transition-shadow">
            <div className={`bg-${caracteristica.color}-100 text-${caracteristica.color}-700 w-12 h-12 rounded-full flex items-center justify-center mb-4`}>
              <caracteristica.icon className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">{caracteristica.title}</h3>
            <p className="text-gray-600">{caracteristica.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
} 