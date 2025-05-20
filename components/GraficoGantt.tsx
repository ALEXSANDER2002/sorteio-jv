"use client"

import type { Processo, RegistroExecucao } from "@/types/tipos"
import { useState, useEffect } from "react"

// Props do componente GraficoGantt
interface PropsGraficoGantt {
  historicoExecucao: RegistroExecucao[]
  processos: Processo[]
}

// Componente que exibe o gráfico de Gantt
export default function GraficoGantt({ historicoExecucao, processos }: PropsGraficoGantt) {
  // Estado para armazenar os dados processados para o gráfico
  const [dadosGrafico, setDadosGrafico] = useState<{ tempo: number; idProcesso: string; cor: string }[]>([])

  // Efeito para processar os dados do histórico de execução
  useEffect(() => {
    if (historicoExecucao.length === 0) return

    // Gerar cores para cada processo
    const coresProcessos: Record<string, string> = {}
    processos.forEach((processo, index) => {
      // Gerar cores diferentes para cada processo
      const matiz = (index * 137) % 360 // Distribuição de cores usando número áureo
      coresProcessos[processo.id] = `hsl(${matiz}, 70%, 60%)`
    })
    // Adicionar cor para CPU ociosa
    coresProcessos["ocioso"] = "#d1d5db" // Cinza claro

    // Processar os dados do histórico
    const dados = historicoExecucao.map((registro) => ({
      tempo: registro.tempo,
      idProcesso: registro.idProcesso,
      cor: coresProcessos[registro.idProcesso] || "#8884d8",
    }))

    setDadosGrafico(dados)
  }, [historicoExecucao, processos])

  // Se não houver histórico de execução, exibir mensagem
  if (historicoExecucao.length === 0) {
    return (
      <div className="bg-white p-4 rounded-lg shadow text-center">
        <p className="text-gray-500">Inicie a simulação para visualizar o gráfico</p>
      </div>
    )
  }

  // Encontrar o tempo máximo para definir a largura do gráfico
  const tempoMaximo = Math.max(...historicoExecucao.map((log) => log.tempo)) + 1

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <div className="mb-2">
        <h3 className="text-sm font-medium text-gray-700 mb-1">Legenda:</h3>
        <div className="flex flex-wrap gap-2">
          {processos.map((processo, index) => {
            const matiz = (index * 137) % 360
            const cor = `hsl(${matiz}, 70%, 60%)`
            return (
              <div key={processo.id} className="flex items-center">
                <div className="w-4 h-4 mr-1" style={{ backgroundColor: cor }}></div>
                <span className="text-sm">{processo.id}</span>
              </div>
            )
          })}
          <div className="flex items-center">
            <div className="w-4 h-4 mr-1 bg-gray-300"></div>
            <span className="text-sm">Ocioso</span>
          </div>
        </div>
      </div>

      <div className="relative overflow-x-auto">
        {/* Cabeçalho do gráfico - Escala de tempo */}
        <div className="flex border-b border-gray-200 mb-1">
          <div className="w-20 flex-shrink-0 text-sm font-medium text-gray-700">Tempo</div>
          <div className="flex-grow flex">
            {Array.from({ length: tempoMaximo }).map((_, index) => (
              <div
                key={index}
                className="flex-shrink-0 text-center text-xs font-medium text-gray-600"
                style={{ width: "30px" }}
              >
                {index}
              </div>
            ))}
          </div>
        </div>

        {/* Corpo do gráfico - Barras de execução */}
        <div className="flex flex-col">
          {/* Linha para cada unidade de tempo */}
          {Array.from({ length: tempoMaximo }).map((_, tempo) => {
            const execucao = dadosGrafico.find((d) => d.tempo === tempo)
            return (
              <div key={tempo} className="flex items-center h-8 border-b border-gray-100">
                <div className="w-20 flex-shrink-0 text-sm font-medium text-gray-700">Tempo {tempo}</div>
                <div className="flex-grow flex">
                  {Array.from({ length: tempoMaximo }).map((_, index) => {
                    // Destacar a célula atual do tempo
                    const isCurrentTime = index === tempo
                    const execucaoAtual = dadosGrafico.find((d) => d.tempo === index)
                    const corFundo = isCurrentTime && execucaoAtual ? execucaoAtual.cor : "transparent"
                    const textoProcesso = isCurrentTime && execucaoAtual ? execucaoAtual.idProcesso : ""

                    return (
                      <div
                        key={index}
                        className="flex-shrink-0 flex items-center justify-center border-r border-gray-100"
                        style={{
                          width: "30px",
                          height: "30px",
                          backgroundColor: corFundo,
                          color: isCurrentTime && execucaoAtual ? "white" : "transparent",
                        }}
                      >
                        <span className="text-xs font-bold">{textoProcesso !== "ocioso" ? textoProcesso : ""}</span>
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Gráfico de barras horizontais para visualização geral */}
      <div className="mt-6">
        <h3 className="text-sm font-medium text-gray-700 mb-2">Visão Geral da Execução:</h3>
        <div className="relative h-12 bg-gray-100 rounded overflow-hidden">
          {dadosGrafico.map((dado, index) => (
            <div
              key={index}
              className="absolute top-0 h-full"
              style={{
                left: `${(dado.tempo / tempoMaximo) * 100}%`,
                width: `${(1 / tempoMaximo) * 100}%`,
                backgroundColor: dado.cor,
              }}
              title={`Tempo ${dado.tempo}: ${dado.idProcesso}`}
            ></div>
          ))}
        </div>
        <div className="flex justify-between mt-1 text-xs text-gray-500">
          <span>0</span>
          <span>{Math.floor(tempoMaximo / 4)}</span>
          <span>{Math.floor(tempoMaximo / 2)}</span>
          <span>{Math.floor((tempoMaximo / 4) * 3)}</span>
          <span>{tempoMaximo - 1}</span>
        </div>
      </div>
    </div>
  )
}
