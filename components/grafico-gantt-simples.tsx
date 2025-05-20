"use client"

import type { Processo, RegistroExecucao } from "@/types/tipos"
import { Cpu, HardDrive, Pause } from "lucide-react"
import { useState } from "react"

// Props do componente GraficoGanttSimples
interface PropsGraficoGantt {
  historicoExecucao: RegistroExecucao[]
  processos: Processo[]
}

// Componente que exibe o gráfico de Gantt de forma simplificada
export default function GraficoGanttSimples({ historicoExecucao, processos }: PropsGraficoGantt) {
  // Estado para controlar a visualização compacta
  const [visualizacaoCompacta, setVisualizacaoCompacta] = useState(false)

  // Se não houver histórico de execução, exibir mensagem
  if (historicoExecucao.length === 0) {
    return (
      <div className="bg-white p-4 rounded-lg shadow text-center">
        <p className="text-gray-500 mb-2">Clique em "Iniciar" para ver o computador trabalhando!</p>
        <img
          src="/cartoon-computer-sleeping.png"
          alt="Computador esperando"
          className="mx-auto"
          width={200}
          height={100}
        />
      </div>
    )
  }

  // Encontrar o tempo máximo para definir a largura do gráfico
  const tempoMaximo = Math.max(...historicoExecucao.map((log) => log.tempo)) + 1

  // Gerar cores para cada processo
  const coresProcessos: Record<string, string> = {}
  processos.forEach((processo, index) => {
    // Gerar cores diferentes para cada processo
    const matiz = (index * 137) % 360 // Distribuição de cores usando número áureo
    coresProcessos[processo.id] = `hsl(${matiz}, 70%, 60%)`
  })
  // Adicionar cor para CPU ociosa
  coresProcessos["ocioso"] = "#d1d5db" // Cinza claro

  // Filtrar processos para visualização compacta (apenas os que aparecem no histórico)
  const processosNoHistorico = visualizacaoCompacta
    ? processos.filter((p) => historicoExecucao.some((h) => h.idProcesso === p.id))
    : processos

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-bold text-center">Quem usou o computador e quando?</h3>
        <button
          onClick={() => setVisualizacaoCompacta(!visualizacaoCompacta)}
          className="text-xs px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded"
        >
          {visualizacaoCompacta ? "Mostrar Todos" : "Visualização Compacta"}
        </button>
      </div>

      <div className="overflow-x-auto">
        <div className="min-w-[500px]">
          {/* Linha do tempo */}
          <div className="flex mb-2">
            <div className="w-28 flex-shrink-0"></div>
            <div className="flex-grow flex">
              {Array.from({ length: tempoMaximo }).map((_, index) => (
                <div key={index} className="flex-shrink-0 text-center font-bold" style={{ width: "40px" }}>
                  {index}
                </div>
              ))}
            </div>
          </div>

          {/* Barra de tempo para cada processo */}
          {processosNoHistorico.map((processo) => {
            const cor = coresProcessos[processo.id]

            return (
              <div key={processo.id} className="flex items-center mb-3">
                <div className="w-28 flex-shrink-0 font-bold flex items-center truncate">
                  <span className="truncate mr-1" title={processo.id}>
                    {processo.id}
                  </span>
                  {processo.tipo === "CPU" ? (
                    <Cpu className="h-4 w-4 ml-1 text-blue-600 flex-shrink-0" />
                  ) : (
                    <HardDrive className="h-4 w-4 ml-1 text-green-600 flex-shrink-0" />
                  )}
                </div>
                <div className="flex-grow flex h-8 bg-gray-100 rounded-lg overflow-hidden">
                  {Array.from({ length: tempoMaximo }).map((_, tempo) => {
                    const execucao = historicoExecucao.find((h) => h.tempo === tempo && h.idProcesso === processo.id)

                    // Determinar o estilo com base no estado do processo
                    let estilo = {}
                    let icone = null

                    if (execucao) {
                      if (execucao.estado === "executando") {
                        estilo = { backgroundColor: cor }
                        icone = <span className="text-white font-bold text-xs">✓</span>
                      } else if (execucao.estado === "bloqueado") {
                        estilo = { backgroundColor: "#FB923C" } // Laranja para I/O
                        icone = <Pause className="h-3 w-3 text-white" />
                      }
                    }

                    return (
                      <div
                        key={tempo}
                        className="flex-shrink-0 flex items-center justify-center transition-all"
                        style={{
                          width: "40px",
                          ...estilo,
                        }}
                      >
                        {icone}
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}

          {/* Linha para CPU ociosa */}
          <div className="flex items-center mb-2">
            <div className="w-28 flex-shrink-0 font-bold text-gray-500">Ocioso</div>
            <div className="flex-grow flex h-8 bg-gray-100 rounded-lg overflow-hidden">
              {Array.from({ length: tempoMaximo }).map((_, tempo) => {
                const execucao = historicoExecucao.find((h) => h.tempo === tempo && h.idProcesso === "ocioso")

                return (
                  <div
                    key={tempo}
                    className="flex-shrink-0 flex items-center justify-center"
                    style={{
                      width: "40px",
                      backgroundColor: execucao ? coresProcessos["ocioso"] : "transparent",
                    }}
                  >
                    {execucao && <span className="text-gray-700 font-bold text-xs">💤</span>}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-3 text-center text-sm">
        <div className="flex justify-center gap-4 flex-wrap">
          <div className="flex items-center">
            <Cpu className="h-4 w-4 mr-1 text-blue-600" />
            <span>Programas de CPU</span>
          </div>
          <div className="flex items-center">
            <HardDrive className="h-4 w-4 mr-1 text-green-600" />
            <span>Programas de I/O</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-orange-500 mr-1 rounded-sm"></div>
            <span>Operação de I/O</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-gray-300 mr-1 rounded-sm"></div>
            <span>CPU Ociosa</span>
          </div>
        </div>
      </div>
    </div>
  )
}
