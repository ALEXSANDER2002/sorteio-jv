"use client"

import type { Processo } from "@/types/tipos"
import { Info } from "lucide-react"

// Props do componente ListaProcessos
interface PropsListaProcessos {
  processos: Processo[]
  tempoAtual: number
  idProcessoAtual: string
  atualizarBilhetes: (id: string, bilhetes: number) => void
  emExecucao: boolean
}

// Componente que exibe a lista de processos
export default function ListaProcessos({
  processos,
  tempoAtual,
  idProcessoAtual,
  atualizarBilhetes,
  emExecucao,
}: PropsListaProcessos) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded-lg overflow-hidden shadow">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-2 px-4 text-left">ID</th>
            <th className="py-2 px-4 text-left">
              <div className="flex items-center">
                Chegada
                <span className="ml-1 group relative">
                  <Info className="h-3 w-3 text-gray-400" />
                  <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 bg-black text-white text-xs p-1 rounded opacity-0 group-hover:opacity-100 w-32 pointer-events-none">
                    Momento em que o processo entra no sistema
                  </span>
                </span>
              </div>
            </th>
            <th className="py-2 px-4 text-left">
              <div className="flex items-center">
                CPU
                <span className="ml-1 group relative">
                  <Info className="h-3 w-3 text-gray-400" />
                  <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 bg-black text-white text-xs p-1 rounded opacity-0 group-hover:opacity-100 w-32 pointer-events-none">
                    Tempo total de CPU necessário
                  </span>
                </span>
              </div>
            </th>
            <th className="py-2 px-4 text-left">
              <div className="flex items-center">
                Restante
                <span className="ml-1 group relative">
                  <Info className="h-3 w-3 text-gray-400" />
                  <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 bg-black text-white text-xs p-1 rounded opacity-0 group-hover:opacity-100 w-32 pointer-events-none">
                    Tempo de CPU ainda necessário
                  </span>
                </span>
              </div>
            </th>
            <th className="py-2 px-4 text-left">
              <div className="flex items-center">
                Bilhetes
                <span className="ml-1 group relative">
                  <Info className="h-3 w-3 text-gray-400" />
                  <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 bg-black text-white text-xs p-1 rounded opacity-0 group-hover:opacity-100 w-40 pointer-events-none">
                    Número de bilhetes (prioridade). Mais bilhetes = maior chance de ser selecionado
                  </span>
                </span>
              </div>
            </th>
            <th className="py-2 px-4 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {processos.map((processo) => {
            // Determinar o status do processo
            let status = "Não chegou"
            let classeStatus = "text-gray-500"

            if (processo.finalizado) {
              status = "Finalizado"
              classeStatus = "text-green-600"
            } else if (processo.tempoChegada <= tempoAtual) {
              if (processo.id === idProcessoAtual) {
                status = "Executando"
                classeStatus = "text-blue-600 font-bold"
              } else {
                status = "Pronto"
                classeStatus = "text-yellow-600"
              }
            }

            // Calcular a porcentagem de conclusão
            const porcentagemConcluida =
              processo.tempoCPU > 0 ? ((processo.tempoCPU - processo.tempoRestante) / processo.tempoCPU) * 100 : 0

            return (
              <tr key={processo.id} className={`border-t ${processo.id === idProcessoAtual ? "bg-blue-50" : ""}`}>
                <td className="py-2 px-4">{processo.id}</td>
                <td className="py-2 px-4">{processo.tempoChegada}</td>
                <td className="py-2 px-4">{processo.tempoCPU}</td>
                <td className="py-2 px-4">
                  <div className="flex items-center">
                    <span className="mr-2">{processo.tempoRestante}</span>
                    {/* Barra de progresso */}
                    <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500" style={{ width: `${porcentagemConcluida}%` }}></div>
                    </div>
                  </div>
                </td>
                <td className="py-2 px-4">
                  {/* Input para alterar o número de bilhetes */}
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={processo.bilhetes}
                    onChange={(e) => atualizarBilhetes(processo.id, Number.parseInt(e.target.value) || 1)}
                    className="w-16 p-1 border rounded"
                    disabled={emExecucao}
                    title="Número de bilhetes (prioridade)"
                  />
                </td>
                <td className={`py-2 px-4 ${classeStatus}`}>{status}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
