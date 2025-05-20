"use client"

import { Button } from "@/components/ui/button"
import { Play, Pause, RefreshCw, Zap } from "lucide-react"

// Props do componente ControlesSimulacaoSimples
interface PropsControlesSimulacao {
  emExecucao: boolean
  aoIniciar: () => void
  aoPausar: () => void
  aoReiniciar: () => void
  tempoAtual: number
  velocidadeSimulacao: number
  aoAtualizarVelocidade: (velocidade: number) => void
}

// Componente que exibe os controles da simulação de forma simplificada
export default function ControlesSimulacaoSimples({
  emExecucao,
  aoIniciar,
  aoPausar,
  aoReiniciar,
  tempoAtual,
  velocidadeSimulacao,
  aoAtualizarVelocidade,
}: PropsControlesSimulacao) {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <div className="flex flex-wrap items-center gap-4 mb-3 justify-center">
        {emExecucao ? (
          <Button onClick={aoPausar} size="lg" variant="outline" className="flex items-center gap-2 text-lg">
            <Pause className="h-5 w-5" />
            Pausar
          </Button>
        ) : (
          <Button
            onClick={aoIniciar}
            size="lg"
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-lg"
          >
            <Play className="h-5 w-5" />
            {tempoAtual > 0 ? "Continuar" : "Iniciar"}
          </Button>
        )}

        <Button onClick={aoReiniciar} size="lg" variant="outline" className="flex items-center gap-2 text-lg">
          <RefreshCw className="h-5 w-5" />
          Reiniciar
        </Button>
      </div>

      {/* Controle de velocidade simplificado */}
      <div className="flex flex-col items-center gap-2 text-center">
        <div className="flex items-center gap-2">
          <span className="font-medium">Velocidade:</span>
          <Zap className="h-5 w-5 text-yellow-500" />
        </div>

        <div className="w-full max-w-xs flex items-center gap-2">
          <span className="text-sm">Devagar</span>
          <input
            type="range"
            min="200"
            max="2000"
            step="200"
            value={2200 - velocidadeSimulacao}
            onChange={(e) => aoAtualizarVelocidade(2200 - Number.parseInt(e.target.value))}
            className="flex-grow"
            disabled={emExecucao}
          />
          <span className="text-sm">Rápido</span>
        </div>

        <div className="text-2xl font-bold">
          Tempo: <span className="text-blue-600">{tempoAtual}</span>
        </div>
      </div>
    </div>
  )
}
