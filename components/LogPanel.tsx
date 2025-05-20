// Props do componente LogPanel
interface LogPanelProps {
  logs: string[]
}

// Componente que exibe os logs da simulação
export default function LogPanel({ logs }: LogPanelProps) {
  return (
    <div className="bg-gray-800 text-white p-4 rounded-lg shadow h-64 overflow-y-auto">
      <h2 className="text-xl font-semibold mb-2">Log da Simulação</h2>
      {logs.length === 0 ? (
        <p className="text-gray-400">Nenhum log disponível</p>
      ) : (
        <ul className="space-y-1 text-sm">
          {logs.map((log, index) => (
            <li key={index} className="font-mono">
              {log}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
