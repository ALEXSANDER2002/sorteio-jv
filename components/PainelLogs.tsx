// Props do componente PainelLogs
interface PropsPainelLogs {
  logs: string[]
}

// Componente que exibe os logs da simulação
export default function PainelLogs({ logs }: PropsPainelLogs) {
  return (
    <div className="bg-gray-800 text-white p-4 rounded-lg shadow h-[400px] overflow-y-auto">
      <h2 className="text-xl font-semibold mb-2">Log da Simulação</h2>
      <p className="text-xs text-gray-400 mb-2">
        Acompanhe os eventos da simulação em tempo real, incluindo sorteios de bilhetes e conclusão de processos.
      </p>
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
