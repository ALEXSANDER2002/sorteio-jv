"use client"

import type { Processo } from "@/types/tipos"
import { Cpu, HardDrive, Clock } from "lucide-react"

interface PropsResultados {
  processosFinalizados: Processo[]
}

export default function ResultadosSimples({ processosFinalizados }: PropsResultados) {
  // Se não houver processos finalizados, exibir mensagem
  if (processosFinalizados.length === 0) {
    return (
      <div className="bg-white p-4 rounded-lg shadow text-center">
        <p className="text-gray-500">Nenhum programa terminou ainda!</p>
        <img
          src="/cartoon-hourglass-waiting.png"
          alt="Ampulheta esperando"
          className="mx-auto mt-2"
          width={100}
          height={100}
        />
        <p className="text-sm text-gray-400 mt-2">
          Aguarde até que algum programa complete sua execução para ver os resultados.
        </p>
      </div>
    )
  }

  // Separar processos por tipo
  const processosCPU = processosFinalizados.filter((p) => p.tipo === "CPU")
  const processosIO = processosFinalizados.filter((p) => p.tipo === "I/O")

  // Calcular médias
  const tempoRetornoMedioCPU =
    processosCPU.length > 0 ? processosCPU.reduce((soma, p) => soma + p.tempoRetorno, 0) / processosCPU.length : 0

  const tempoRetornoMedioIO =
    processosIO.length > 0 ? processosIO.reduce((soma, p) => soma + p.tempoRetorno, 0) / processosIO.length : 0

  // Calcular tempos mínimos e máximos
  const tempoMinCPU = processosCPU.length > 0 ? Math.min(...processosCPU.map((p) => p.tempoRetorno)) : 0
  const tempoMaxCPU = processosCPU.length > 0 ? Math.max(...processosCPU.map((p) => p.tempoRetorno)) : 0
  const tempoMinIO = processosIO.length > 0 ? Math.min(...processosIO.map((p) => p.tempoRetorno)) : 0
  const tempoMaxIO = processosIO.length > 0 ? Math.max(...processosIO.map((p) => p.tempoRetorno)) : 0

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-bold">Programas que terminaram</h3>
        <div className="flex items-center text-sm text-gray-500">
          <Clock className="h-4 w-4 mr-1" />
          <span>Total: {processosFinalizados.length}</span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg overflow-hidden">
          <thead className="bg-green-100">
            <tr>
              <th className="py-2 px-4 text-left">Programa</th>
              <th className="py-2 px-4 text-left">Tipo</th>
              <th className="py-2 px-4 text-left">Chegou</th>
              <th className="py-2 px-4 text-left">Terminou</th>
              <th className="py-2 px-4 text-left">Tempo Total</th>
            </tr>
          </thead>
          <tbody>
            {processosFinalizados.map((processo, index) => {
              // Gerar cor para o processo
              const matiz = (index * 137) % 360
              const cor = `hsl(${matiz}, 70%, 60%)`

              // Criar um ID único para o processo
              const idUnico = `${processo.id}-${index}`

              return (
                <tr key={idUnico} className="border-t hover:bg-gray-50">
                  <td className="py-2 px-4">
                    <div className="flex items-center">
                      <div className="w-4 h-4 rounded-full mr-2" style={{ backgroundColor: cor }}></div>
                      <span className="font-bold">{processo.id}</span>
                    </div>
                  </td>
                  <td className="py-2 px-4">
                    {processo.tipo === "CPU" ? (
                      <div className="flex items-center">
                        <Cpu className="h-4 w-4 mr-1 text-blue-600" />
                        <span className="text-blue-600">CPU</span>
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <HardDrive className="h-4 w-4 mr-1 text-green-600" />
                        <span className="text-green-600">I/O</span>
                      </div>
                    )}
                  </td>
                  <td className="py-2 px-4">{processo.tempoChegada}</td>
                  <td className="py-2 px-4">{processo.tempoFim}</td>
                  <td className="py-2 px-4">
                    <div className="flex items-center">
                      <span className="font-bold mr-2">{processo.tempoRetorno}</span>
                      <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${processo.tipo === "CPU" ? "bg-blue-500" : "bg-green-500"}`}
                          style={{
                            width: `${(processo.tempoRetorno / Math.max(tempoMaxCPU, tempoMaxIO)) * 100}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Resumo por tipo de processo */}
      {(processosCPU.length > 0 || processosIO.length > 0) && (
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
          {processosCPU.length > 0 && (
            <div className="bg-blue-50 p-3 rounded-lg">
              <div className="flex items-center mb-2">
                <Cpu className="h-5 w-5 mr-2 text-blue-600" />
                <span className="font-bold text-blue-800">Programas de CPU</span>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Tempo médio:</span>
                  <span className="font-bold text-blue-700">{tempoRetornoMedioCPU.toFixed(1)} unidades</span>
                </div>
                <div className="flex justify-between items-center text-xs text-gray-600">
                  <span>Mínimo: {tempoMinCPU}</span>
                  <span>Máximo: {tempoMaxCPU}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Total de programas:</span>
                  <span className="font-bold">{processosCPU.length}</span>
                </div>
              </div>
            </div>
          )}

          {processosIO.length > 0 && (
            <div className="bg-green-50 p-3 rounded-lg">
              <div className="flex items-center mb-2">
                <HardDrive className="h-5 w-5 mr-2 text-green-600" />
                <span className="font-bold text-green-800">Programas de I/O</span>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Tempo médio:</span>
                  <span className="font-bold text-green-700">{tempoRetornoMedioIO.toFixed(1)} unidades</span>
                </div>
                <div className="flex justify-between items-center text-xs text-gray-600">
                  <span>Mínimo: {tempoMinIO}</span>
                  <span>Máximo: {tempoMaxIO}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Total de programas:</span>
                  <span className="font-bold">{processosIO.length}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Comparação entre tipos */}
      {processosCPU.length > 0 && processosIO.length > 0 && (
        <div className="mt-3 p-3 bg-yellow-50 rounded-lg">
          <h4 className="font-medium text-yellow-800 mb-2">Comparação entre tipos de programas:</h4>
          <div className="flex items-center">
            <div className="flex-grow h-6 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-500 flex items-center justify-end px-2"
                style={{ width: `${(tempoRetornoMedioCPU / (tempoRetornoMedioCPU + tempoRetornoMedioIO)) * 100}%` }}
              >
                <span className="text-xs text-white font-bold">CPU</span>
              </div>
            </div>
            <div className="mx-2 text-xs font-bold">vs</div>
            <div className="flex-grow h-6 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-green-500 flex items-center px-2"
                style={{ width: `${(tempoRetornoMedioIO / (tempoRetornoMedioCPU + tempoRetornoMedioIO)) * 100}%` }}
              >
                <span className="text-xs text-white font-bold">I/O</span>
              </div>
            </div>
          </div>
          <p className="text-xs text-gray-600 mt-2">
            Esta barra mostra a proporção relativa do tempo médio entre programas de CPU e I/O.
          </p>
        </div>
      )}
    </div>
  )
}
