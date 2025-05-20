"use client"
import type { Processo } from "@/types/tipos"

interface PropsVisualizacaoSorteio {
  processos: Processo[]
  tempoAtual: number
  bilheteSorteado: number | null
  processoSelecionado: string | null
  emExecucao: boolean
}

export default function VisualizacaoSorteio({
  processos,
  tempoAtual,
  bilheteSorteado,
  processoSelecionado,
  emExecucao,
}: PropsVisualizacaoSorteio) {
  // Filtrar processos que já chegaram e não foram finalizados
  const processosDisponiveis = processos.filter(
    (p) => p.tempoChegada <= tempoAtual && !p.finalizado && p.tempoRestante > 0,
  )

  // Calcular o total de bilhetes
  const totalBilhetes = processosDisponiveis.reduce((soma, p) => soma + p.bilhetes, 0)

  // Gerar a distribuição de bilhetes
  const distribuicaoBilhetes: { processo: Processo; inicio: number; fim: number }[] = []
  let bilheteAtual = 1

  processosDisponiveis.forEach((processo) => {
    const inicio = bilheteAtual
    const fim = bilheteAtual + processo.bilhetes - 1
    distribuicaoBilhetes.push({ processo, inicio, fim })
    bilheteAtual = fim + 1
  })

  return (
    <div className="bg-white p-4 rounded-lg shadow mb-6">
      <h2 className="text-lg font-semibold mb-2">Visualização do Sorteio de Bilhetes</h2>

      {processosDisponiveis.length === 0 ? (
        <p className="text-gray-500 text-center py-4">Nenhum processo disponível para sorteio no momento</p>
      ) : (
        <>
          <div className="mb-3">
            <p className="text-sm mb-1">
              <span className="font-medium">Total de bilhetes:</span> {totalBilhetes}
              {bilheteSorteado && (
                <span className="ml-2">
                  <span className="font-medium">Bilhete sorteado:</span>{" "}
                  <span className="text-blue-600 font-bold">{bilheteSorteado}</span>
                </span>
              )}
            </p>

            <div className="text-sm mb-2">
              <span className="font-medium">Processo selecionado:</span>{" "}
              {processoSelecionado ? (
                <span className="text-blue-600 font-bold">{processoSelecionado}</span>
              ) : (
                <span className="text-gray-500">Nenhum</span>
              )}
            </div>
          </div>

          {/* Visualização da distribuição de bilhetes */}
          <div className="relative h-10 bg-gray-100 rounded-lg overflow-hidden mb-2">
            {distribuicaoBilhetes.map(({ processo, inicio, fim }, index) => {
              // Calcular a posição e largura da barra
              const posicaoInicio = ((inicio - 1) / totalBilhetes) * 100
              const largura = ((fim - inicio + 1) / totalBilhetes) * 100

              // Gerar uma cor para o processo
              const matiz = (index * 137) % 360
              const cor = `hsl(${matiz}, 70%, 60%)`

              return (
                <div
                  key={processo.id}
                  className="absolute top-0 h-full flex items-center justify-center text-xs font-bold text-white"
                  style={{
                    left: `${posicaoInicio}%`,
                    width: `${largura}%`,
                    backgroundColor: cor,
                  }}
                  title={`${processo.id}: Bilhetes ${inicio}-${fim}`}
                >
                  {largura > 10 ? processo.id : ""}
                </div>
              )
            })}

            {/* Marcador do bilhete sorteado */}
            {bilheteSorteado && (
              <div
                className="absolute top-0 h-full w-1 bg-black z-10"
                style={{
                  left: `${((bilheteSorteado - 0.5) / totalBilhetes) * 100}%`,
                }}
              ></div>
            )}
          </div>

          {/* Legenda */}
          <div className="flex flex-wrap gap-2 text-xs">
            {distribuicaoBilhetes.map(({ processo, inicio, fim }, index) => {
              const matiz = (index * 137) % 360
              const cor = `hsl(${matiz}, 70%, 60%)`

              return (
                <div key={processo.id} className="flex items-center">
                  <div className="w-3 h-3 mr-1" style={{ backgroundColor: cor }}></div>
                  <span>
                    {processo.id}: {inicio}-{fim} ({processo.bilhetes} bilhetes)
                  </span>
                </div>
              )
            })}
          </div>
        </>
      )}
    </div>
  )
}
