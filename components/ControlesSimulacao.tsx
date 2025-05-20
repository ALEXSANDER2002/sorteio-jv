"use client"

import { Button } from "@/components/ui/button"
import { Play, Pause, RefreshCw, FastForward, Clock } from "lucide-react"

// Props do componente ControlesSimulacao
interface PropsControlesSimulacao {
  emExecucao: boolean
  aoIniciar: () => void
  aoPausar: () => void
  aoReiniciar: () => void
  tempoAtual: number
  velocidadeSimulacao: number
  aoAtualizarVelocidade: (velocidade: number) => void
}

// Componente que exibe os controles da simulação
export default function ControlesSimulacao({
  emExecucao,
  aoIniciar,
  aoPausar,
  aoReiniciar,
  tempoAtual,
  velocidadeSimulacao,
  aoAtualizarVelocidade,
}: PropsControlesSimulacao) {
  // Opções de velocidade em milissegundos
  const opcoesVelocidade = [
    { valor: 2000, rotulo: "Lenta (2s)" },
    { valor: 1000, rotulo: "Normal (1s)" },
    { valor: 500, rotulo: "Rápida (0.5s)" },
    { valor: 200, rotulo: "Muito Rápida (0.2s)" },
  ]

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <div className="flex flex-wrap items-center gap-4 mb-3">
        {emExecucao ? (
          <Button onClick={aoPausar} variant="outline" className="flex items-center gap-2">
            <Pause className="h-4 w-4" />
            Pausar Simulação
          </Button>
        ) : (
          <Button onClick={aoIniciar} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700">
            <Play className="h-4 w-4" />
            {tempoAtual > 0 ? "Continuar Simulação" : "Iniciar Simulação"}
          </Button>
        )}

        <Button onClick={aoReiniciar} variant="outline" className="flex items-center gap-2">
          <RefreshCw className="h-4 w-4" />
          Reiniciar
        </Button>

        <div className="ml-auto text-sm flex items-center">
          <Clock className="h-4 w-4 mr-1 text-gray-500" />
          <span className="font-semibold">Tempo atual:</span> {tempoAtual}
        </div>
      </div>

      {/* Controle de velocidade */}
      <div className="flex flex-wrap items-center gap-2 text-sm">
        <span className="font-medium flex items-center">
          <FastForward className="h-4 w-4 mr-1 text-gray-500" />
          Velocidade:
        </span>

        <div className="flex flex-wrap gap-1">
          {opcoesVelocidade.map((opcao) => (
            <button
              key={opcao.valor}
              onClick={() => aoAtualizarVelocidade(opcao.valor)}
              className={`px-2 py-1 rounded text-xs ${
                velocidadeSimulacao === opcao.valor ? "bg-blue-600 text-white" : "bg-gray-100 hover:bg-gray-200"
              }`}
              disabled={emExecucao}
            >
              {opcao.rotulo}
            </button>
          ))}
        </div>

        {emExecucao && (
          <span className="text-xs text-gray-500 ml-2">(Pause a simulação para alterar a velocidade)</span>
        )}
      </div>
    </div>
  )
}
