"use client"

import { useState } from "react"

// Interface para o programa
interface Programa {
  id: string
  nome: string
  tipo: "jogo" | "desenho" | "música" | "foto"
  cor: string
  bilhetes: number
  tempoTotal: number
  tempoRestante: number
  estado: "esperando" | "pronto" | "usando" | "descansando" | "terminou"
  terminou: boolean
}

interface PropsProgramaPersonagem {
  programa: Programa
  atualizarBilhetes: (id: string, bilhetes: number) => void
  rodando: boolean
  programaAtualId: string
}

export default function ProgramaPersonagem({
  programa,
  atualizarBilhetes,
  rodando,
  programaAtualId,
}: PropsProgramaPersonagem) {
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

  // Função para obter a mensagem baseada no estado do programa
  const obterMensagem = (estado: string) => {
    switch (estado) {
      case "esperando":
        return "Esperando minha vez..."
      case "pronto":
        return "Estou pronto!"
      case "usando":
        return "Estou usando o computador!"
      case "descansando":
        return "Estou descansando um pouco..."
      case "terminou":
        return "Terminei! 🎉"
      default:
        return "Olá!"
    }
  }

  // Calcular a porcentagem de conclusão
  const porcentagemConcluida =
    programa.tempoTotal > 0 ? ((programa.tempoTotal - programa.tempoRestante) / programa.tempoTotal) * 100 : 0

  // Estado para animação de hover
  const [hover, setHover] = useState(false)

  return (
    <div
      className={`rounded-xl overflow-hidden shadow-lg transition-all duration-300 h-[280px] ${
        programa.estado === "usando" ? "ring-4 ring-yellow-400" : programa.terminou ? "opacity-70" : ""
      } ${hover ? "transform scale-105" : ""}`}
      style={{ backgroundColor: programa.cor }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="p-4">
        {/* Cabeçalho com emoji e nome */}
        <div className="flex items-center justify-between mb-3">
          <div className="text-4xl">{obterEmoji(programa.tipo)}</div>
          <h3 className="text-xl font-bold text-white">{programa.nome}</h3>
        </div>

        {/* Mensagem do personagem */}
        <div className="bg-white bg-opacity-90 rounded-lg p-3 mb-3 h-[60px] flex items-center justify-center">
          <p className="text-center font-medium">{obterMensagem(programa.estado)}</p>
        </div>

        {/* Barra de progresso */}
        <div className="mb-3">
          <div className="text-sm text-white mb-1 flex justify-between">
            <span>Progresso:</span>
            <span>{Math.round(porcentagemConcluida)}%</span>
          </div>
          <div className="w-full h-4 bg-white bg-opacity-30 rounded-full overflow-hidden">
            <div className="h-full bg-white" style={{ width: `${porcentagemConcluida}%` }}></div>
          </div>
        </div>

        {/* Controle de bilhetes */}
        <div className="mb-2">
          <div className="text-sm text-white mb-1 flex justify-between">
            <span>Bilhetes:</span>
            <span className="font-bold">{programa.bilhetes}</span>
          </div>
          <input
            type="range"
            min="1"
            max="5"
            value={programa.bilhetes}
            onChange={(e) => atualizarBilhetes(programa.id, Number.parseInt(e.target.value))}
            className="w-full"
            disabled={rodando || programa.terminou}
          />
        </div>

        {/* Tempo restante */}
        <div className="text-center text-white text-sm">
          {programa.terminou
            ? "Terminado!"
            : `Falta: ${programa.tempoRestante} ${programa.tempoRestante === 1 ? "segundo" : "segundos"}`}
        </div>
      </div>
    </div>
  )
}
