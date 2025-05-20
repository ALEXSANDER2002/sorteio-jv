"use client"

import type { Processo } from "@/types/tipos"

interface PropsEstatisticas {
  processosFinalizados: Processo[]
}

export default function Estatisticas({ processosFinalizados }: PropsEstatisticas) {
  // Se não houver processos finalizados, não calcular estatísticas
  if (processosFinalizados.length === 0) {
    return (
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <h2 className="text-lg font-semibold mb-2">Estatísticas da Simulação</h2>
        <p className="text-gray-500 text-center py-4">Nenhum processo finalizado para calcular estatísticas</p>
      </div>
    )
  }

  // Calcular estatísticas
  const tempoRetornoTotal = processosFinalizados.reduce((soma, p) => soma + p.tempoRetorno, 0)
  const tempoEsperaTotal = processosFinalizados.reduce((soma, p) => soma + p.tempoEspera, 0)
  const tempoRespostaTotal = processosFinalizados.reduce((soma, p) => soma + (p.tempoInicio - p.tempoChegada), 0)

  const tempoRetornoMedio = tempoRetornoTotal / processosFinalizados.length
  const tempoEsperaMedio = tempoEsperaTotal / processosFinalizados.length
  const tempoRespostaMedio = tempoRespostaTotal / processosFinalizados.length

  // Encontrar valores máximos e mínimos
  const tempoRetornoMax = Math.max(...processosFinalizados.map((p) => p.tempoRetorno))
  const tempoRetornoMin = Math.min(...processosFinalizados.map((p) => p.tempoRetorno))
  const tempoEsperaMax = Math.max(...processosFinalizados.map((p) => p.tempoEspera))
  const tempoEsperaMin = Math.min(...processosFinalizados.map((p) => p.tempoEspera))

  return (
    <div className="bg-white p-4 rounded-lg shadow mb-6">
      <h2 className="text-lg font-semibold mb-3">Estatísticas da Simulação</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-50 p-3 rounded-lg">
          <h3 className="text-sm font-medium text-blue-800 mb-1">Tempo de Retorno</h3>
          <div className="space-y-1">
            <p className="text-sm">
              <span className="font-medium">Médio:</span>{" "}
              <span className="font-bold">{tempoRetornoMedio.toFixed(2)}</span>
            </p>
            <p className="text-xs text-gray-600">
              <span className="font-medium">Mínimo:</span> {tempoRetornoMin} |
              <span className="font-medium ml-1">Máximo:</span> {tempoRetornoMax}
            </p>
            <p className="text-xs text-gray-500 italic">Tempo total desde a chegada até a conclusão</p>
          </div>
        </div>

        <div className="bg-green-50 p-3 rounded-lg">
          <h3 className="text-sm font-medium text-green-800 mb-1">Tempo de Espera</h3>
          <div className="space-y-1">
            <p className="text-sm">
              <span className="font-medium">Médio:</span>{" "}
              <span className="font-bold">{tempoEsperaMedio.toFixed(2)}</span>
            </p>
            <p className="text-xs text-gray-600">
              <span className="font-medium">Mínimo:</span> {tempoEsperaMin} |
              <span className="font-medium ml-1">Máximo:</span> {tempoEsperaMax}
            </p>
            <p className="text-xs text-gray-500 italic">Tempo total - tempo de CPU (tempo ocioso)</p>
          </div>
        </div>

        <div className="bg-purple-50 p-3 rounded-lg">
          <h3 className="text-sm font-medium text-purple-800 mb-1">Tempo de Resposta</h3>
          <div className="space-y-1">
            <p className="text-sm">
              <span className="font-medium">Médio:</span>{" "}
              <span className="font-bold">{tempoRespostaMedio.toFixed(2)}</span>
            </p>
            <p className="text-xs text-gray-500 italic">Tempo até a primeira execução do processo</p>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <h3 className="text-sm font-medium mb-2">Interpretação dos Resultados:</h3>
        <ul className="text-xs space-y-1 text-gray-700">
          <li>
            <span className="font-medium">Tempo de Retorno Médio:</span> Quanto menor, melhor o desempenho geral do
            algoritmo.
          </li>
          <li>
            <span className="font-medium">Tempo de Espera Médio:</span> Indica quanto tempo os processos ficam ociosos
            esperando CPU.
          </li>
          <li>
            <span className="font-medium">Tempo de Resposta Médio:</span> Importante para sistemas interativos, indica a
            responsividade.
          </li>
          <li>
            <span className="font-medium">Processos com mais bilhetes:</span> Tendem a ter menor tempo de espera e
            retorno.
          </li>
        </ul>
      </div>
    </div>
  )
}
