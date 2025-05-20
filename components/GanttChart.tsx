import type { Process, ExecutionLog } from "@/types/types"
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, Cell } from "recharts"

// Props do componente GanttChart
interface GanttChartProps {
  executionHistory: ExecutionLog[]
  processes: Process[]
}

// Componente que exibe o gráfico de Gantt
export default function GanttChart({ executionHistory, processes }: GanttChartProps) {
  // Se não houver histórico de execução, exibir mensagem
  if (executionHistory.length === 0) {
    return (
      <div className="bg-white p-4 rounded-lg shadow text-center">
        <p className="text-gray-500">Inicie a simulação para visualizar o gráfico</p>
      </div>
    )
  }

  // Preparar dados para o gráfico
  const chartData = executionHistory.map((log, index) => ({
    time: log.time,
    process: log.processId,
  }))

  // Gerar cores para cada processo
  const processColors: Record<string, string> = {}
  processes.forEach((process, index) => {
    // Gerar cores diferentes para cada processo
    const hue = (index * 137) % 360 // Distribuição de cores usando número áureo
    processColors[process.id] = `hsl(${hue}, 70%, 60%)`
  })
  // Adicionar cor para CPU ociosa
  processColors["idle"] = "#d1d5db" // Cinza claro

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData} layout="vertical" barCategoryGap={0} barGap={0}>
          <XAxis
            type="number"
            domain={[0, "dataMax"]}
            label={{ value: "Tempo", position: "insideBottom", offset: -5 }}
          />
          <YAxis
            type="category"
            dataKey="time"
            label={{ value: "Unidade de Tempo", angle: -90, position: "insideLeft" }}
          />
          <Tooltip
            formatter={(value, name) => [`Processo: ${value}`, "Execução"]}
            labelFormatter={(value) => `Tempo: ${value}`}
          />
          <Legend />
          <Bar dataKey="process" name="Processo" isAnimationActive={false}>
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={processColors[entry.process] || "#8884d8"} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      {/* Legenda de cores */}
      <div className="mt-4 flex flex-wrap gap-2">
        {Object.entries(processColors).map(([processId, color]) => (
          <div key={processId} className="flex items-center">
            <div className="w-4 h-4 mr-1" style={{ backgroundColor: color }}></div>
            <span>{processId === "idle" ? "Ocioso" : processId}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
