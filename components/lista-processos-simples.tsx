"use client"

import type { Processo, EstadoProcesso } from "@/types/tipos"
import { Cpu, HardDrive, Clock, Pause, Play, CheckCircle, AlertCircle } from "lucide-react"

// Props do componente ListaProcessosSimples
interface PropsListaProcessos {
  processos: Processo[]
  tempoAtual: number
  idProcessoAtual: string
  atualizarBilhetes: (id: string, bilhetes: number) => void
  emExecucao: boolean
}

// Componente que exibe a lista de processos de forma simplificada
export default function ListaProcessosSimples({
  processos,
  tempoAtual,
  idProcessoAtual,
  atualizarBilhetes,
  emExecucao,
}: PropsListaProcessos) {
  // Função para obter o ícone e a classe de cor com base no estado do processo
  const obterIconeEstado = (estado: EstadoProcesso) => {
    switch (estado) {
      case "novo":
        return { icone: <Clock className="h-4 w-4" />, classe: "text-gray-500", texto: "Esperando" }
      case "pronto":
        return { icone: <Play className="h-4 w-4" />, classe: "text-yellow-600", texto: "Pronto" }
      case "executando":
        return { icone: <Cpu className="h-4 w-4" />, classe: "text-blue-600 font-bold", texto: "Executando" }
      case "bloqueado":
        return { icone: <Pause className="h-4 w-4" />, classe: "text-orange-600", texto: "Bloqueado (I/O)" }
      case "finalizado":
        return { icone: <CheckCircle className="h-4 w-4" />, classe: "text-green-600", texto: "Finalizado" }
      default:
        return { icone: <AlertCircle className="h-4 w-4" />, classe: "text-gray-500", texto: "Desconhecido" }
    }
  }

  // Obter descrição do tipo de processo
  const obterDescricaoTipo = (processo: Processo) => {
    if (processo.tipo === "CPU") {
      return "Intensivo em cálculos"
    } else {
      return "Entrada/Saída de dados"
    }
  }

  // Ordenar processos: primeiro os que estão executando, depois os prontos, depois os bloqueados, etc.
  const processosOrdenados = [...processos].sort((a, b) => {
    const ordemEstado: Record<EstadoProcesso, number> = {
      executando: 1,
      pronto: 2,
      bloqueado: 3,
      novo: 4,
      finalizado: 5,
    }
    return ordemEstado[a.estado] - ordemEstado[b.estado]
  })

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded-lg overflow-hidden shadow">
        <thead className="bg-blue-100">
          <tr>
            <th className="py-2 px-4 text-left">Programa</th>
            <th className="py-2 px-4 text-left">Tipo</th>
            <th className="py-2 px-4 text-left">Chegada</th>
            <th className="py-2 px-4 text-left">Trabalho</th>
            <th className="py-2 px-4 text-left">Bilhetes</th>
            <th className="py-2 px-4 text-left">Estado</th>
          </tr>
        </thead>
        <tbody>
          {processosOrdenados.map((processo) => {
            // Obter informações de ícone e classe para o estado
            const { icone, classe, texto } = obterIconeEstado(processo.estado)

            // Calcular a porcentagem de conclusão
            const porcentagemConcluida =
              processo.tempoCPU > 0 ? ((processo.tempoCPU - processo.tempoRestante) / processo.tempoCPU) * 100 : 0

            // Calcular a porcentagem de conclusão de I/O (se aplicável)
            const porcentagemIOConcluida =
              processo.tipo === "I/O" && processo.tempoIO && processo.tempoIORestante
                ? ((processo.tempoIO - processo.tempoIORestante) / processo.tempoIO) * 100
                : 0

            // Gerar cor para o processo
            const index = processos.findIndex((p) => p.id === processo.id)
            const matiz = (index * 137) % 360
            const cor = `hsl(${matiz}, 70%, 60%)`

            return (
              <tr
                key={processo.id}
                className={`border-t ${processo.id === idProcessoAtual && processo.estado === "executando" ? "bg-blue-50" : ""}`}
              >
                <td className="py-2 px-4">
                  <div className="flex items-center">
                    <div className="w-4 h-4 rounded-full mr-2" style={{ backgroundColor: cor }}></div>
                    <span className="font-bold">{processo.id}</span>
                  </div>
                </td>
                <td className="py-2 px-4">
                  <div className="flex items-center">
                    {processo.tipo === "CPU" ? (
                      <>
                        <Cpu className="h-4 w-4 mr-1 text-blue-600" />
                        <span className="text-blue-600 font-medium">CPU</span>
                      </>
                    ) : (
                      <>
                        <HardDrive className="h-4 w-4 mr-1 text-green-600" />
                        <span className="text-green-600 font-medium">I/O</span>
                      </>
                    )}
                    <span className="text-xs ml-1 text-gray-500">{obterDescricaoTipo(processo)}</span>
                  </div>
                </td>
                <td className="py-2 px-4">{processo.tempoChegada}</td>
                <td className="py-2 px-4">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center">
                      <div
                        className={`w-full max-w-[100px] rounded-full h-3 mr-2 overflow-hidden ${
                          processo.tipo === "CPU" ? "bg-blue-100" : "bg-green-100"
                        }`}
                      >
                        <div
                          className={`h-full ${processo.tipo === "CPU" ? "bg-blue-500" : "bg-green-500"}`}
                          style={{ width: `${porcentagemConcluida}%` }}
                        ></div>
                      </div>
                      <span className="text-sm">
                        CPU: {processo.tempoRestante}/{processo.tempoCPU}
                      </span>
                    </div>

                    {/* Barra de progresso de I/O para processos de I/O */}
                    {processo.tipo === "I/O" && processo.estado === "bloqueado" && (
                      <div className="flex items-center">
                        <div className="w-full max-w-[100px] rounded-full h-3 mr-2 overflow-hidden bg-orange-100">
                          <div className="h-full bg-orange-500" style={{ width: `${porcentagemIOConcluida}%` }}></div>
                        </div>
                        <span className="text-sm">
                          I/O: {processo.tempoIORestante}/{processo.tempoIO}
                        </span>
                      </div>
                    )}
                  </div>
                </td>
                <td className="py-2 px-4">
                  {/* Input para alterar o número de bilhetes */}
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={processo.bilhetes}
                    onChange={(e) => atualizarBilhetes(processo.id, Number.parseInt(e.target.value) || 1)}
                    className="w-24"
                    disabled={emExecucao || processo.estado === "finalizado" || processo.estado === "bloqueado"}
                  />
                  <span className="ml-2 font-bold">{processo.bilhetes}</span>
                </td>
                <td className={`py-2 px-4 ${classe}`}>
                  <div className="flex items-center">
                    <span className="mr-1">{icone}</span>
                    {texto}
                  </div>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
