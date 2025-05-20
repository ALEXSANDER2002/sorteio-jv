"use client"

import type { Process } from "@/types/types"

// Props do componente ProcessList
interface ProcessListProps {
  processes: Process[]
  currentTime: number
  currentProcessId: string
  updateTickets: (id: string, tickets: number) => void
  isRunning: boolean
}

// Componente que exibe a lista de processos
export default function ProcessList({
  processes,
  currentTime,
  currentProcessId,
  updateTickets,
  isRunning,
}: ProcessListProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded-lg overflow-hidden shadow">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-2 px-4 text-left">ID</th>
            <th className="py-2 px-4 text-left">Chegada</th>
            <th className="py-2 px-4 text-left">Burst</th>
            <th className="py-2 px-4 text-left">Restante</th>
            <th className="py-2 px-4 text-left">Bilhetes</th>
            <th className="py-2 px-4 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {processes.map((process) => {
            // Determinar o status do processo
            let status = "Não chegou"
            let statusClass = "text-gray-500"

            if (process.isFinished) {
              status = "Finalizado"
              statusClass = "text-green-600"
            } else if (process.arrivalTime <= currentTime) {
              if (process.id === currentProcessId) {
                status = "Executando"
                statusClass = "text-blue-600 font-bold"
              } else {
                status = "Pronto"
                statusClass = "text-yellow-600"
              }
            }

            return (
              <tr key={process.id} className={`border-t ${process.id === currentProcessId ? "bg-blue-50" : ""}`}>
                <td className="py-2 px-4">{process.id}</td>
                <td className="py-2 px-4">{process.arrivalTime}</td>
                <td className="py-2 px-4">{process.burstTime}</td>
                <td className="py-2 px-4">{process.remainingTime}</td>
                <td className="py-2 px-4">
                  {/* Input para alterar o número de bilhetes */}
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={process.tickets}
                    onChange={(e) => updateTickets(process.id, Number.parseInt(e.target.value) || 1)}
                    className="w-16 p-1 border rounded"
                    disabled={isRunning}
                  />
                </td>
                <td className={`py-2 px-4 ${statusClass}`}>{status}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
