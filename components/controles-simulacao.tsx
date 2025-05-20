"use client"

import { Button } from "@/components/ui/button"
import { Play, Pause, RefreshCw } from "lucide-react"

// Props do componente SimulationControls
interface SimulationControlsProps {
  isRunning: boolean
  onStart: () => void
  onPause: () => void
  onReset: () => void
  currentTime: number
}

// Componente que exibe os controles da simulação
export default function SimulationControls({
  isRunning,
  onStart,
  onPause,
  onReset,
  currentTime,
}: SimulationControlsProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow flex flex-wrap items-center gap-4">
      {isRunning ? (
        <Button onClick={onPause} variant="outline" className="flex items-center gap-2">
          <Pause className="h-4 w-4" />
          Pausar Simulação
        </Button>
      ) : (
        <Button onClick={onStart} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700">
          <Play className="h-4 w-4" />
          {currentTime > 0 ? "Continuar Simulação" : "Iniciar Simulação"}
        </Button>
      )}

      <Button onClick={onReset} variant="outline" className="flex items-center gap-2">
        <RefreshCw className="h-4 w-4" />
        Reiniciar
      </Button>

      <div className="ml-auto text-sm">
        <span className="font-semibold">Tempo atual:</span> {currentTime}
      </div>
    </div>
  )
}
