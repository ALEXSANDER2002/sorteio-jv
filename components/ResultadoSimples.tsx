"use client"

interface PropsResultadoSimples {
  programasTerminados: {
    id: string
    nome: string
    tipo: string
    cor: string
    tempoTotal: number
  }[]
}

export default function ResultadoSimples({ programasTerminados }: PropsResultadoSimples) {
  // Função para obter o emoji baseado no tipo do programa
  const obterEmoji = (tipo: string) => {
    switch (tipo) {
      case "jogo":
        return "🎮"
      case "desenho":
        return "🎨"
      case "música":
        return "🎵"
      case "foto":
        return "📷"
      default:
        return "💻"
    }
  }

  // Se não houver programas terminados
  if (programasTerminados.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[200px] text-center">
        <img
          src="/cartoon-hourglass-waiting.png"
          alt="Ampulheta esperando"
          className="w-24 h-24 mb-4"
          onError={(e) => {
            e.currentTarget.src = "/cartoon-hourglass-waiting.png"
          }}
        />
        <p className="text-xl text-gray-500">Nenhum programa terminou ainda!</p>
        <p className="text-gray-400 mt-2">Aguarde até que algum programa termine sua tarefa.</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center min-h-[200px]">
      {/* Lista de programas terminados */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
        {programasTerminados.map((programa) => (
          <div
            key={programa.id}
            className="bg-white rounded-lg shadow-md p-4 border-t-4 flex flex-col items-center h-[150px]"
            style={{ borderColor: programa.cor }}
          >
            <div className="text-4xl mb-2">{obterEmoji(programa.tipo)}</div>
            <h3 className="font-bold text-lg mb-1">{programa.nome}</h3>
            <div className="flex items-center justify-center gap-2">
              <span className="text-3xl">🏁</span>
              <span className="text-lg font-medium">Terminou!</span>
            </div>
          </div>
        ))}
      </div>

      {/* Mensagem de parabéns */}
      {programasTerminados.length > 0 && (
        <div className="mt-6 text-center">
          <h3 className="text-2xl font-bold text-yellow-600 mb-2">
            {programasTerminados.length === 1
              ? "1 programa terminou!"
              : `${programasTerminados.length} programas terminaram!`}
          </h3>
          <p className="text-lg">
            {programasTerminados.length === 4 ? (
              <span>Parabéns! Todos os programas terminaram suas tarefas! 🎉</span>
            ) : (
              <span>Continue a simulação para ver mais programas terminarem!</span>
            )}
          </p>
        </div>
      )}
    </div>
  )
}
