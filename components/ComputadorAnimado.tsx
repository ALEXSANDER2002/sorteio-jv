"use client"

import { motion } from "framer-motion"

interface PropsComputadorAnimado {
  programaAtual: {
    id: string
    nome: string
    tipo: string
    cor: string
  } | null
  rodando: boolean
}

export default function ComputadorAnimado({ programaAtual, rodando }: PropsComputadorAnimado) {
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

  return (
    <div className="flex flex-col items-center min-h-[300px]">
      {/* Computador */}
      <div className="relative mb-4">
        <img
          src="/cartoon-computer.png"
          alt="Computador"
          className="w-64 h-64 object-contain"
          onError={(e) => {
            e.currentTarget.src = "/cartoon-computer.png"
          }}
        />

        {/* Tela do computador */}
        <div className="absolute top-[25%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 w-32 h-24 bg-blue-100 rounded-lg overflow-hidden flex items-center justify-center">
          {programaAtual ? (
            <motion.div
              className="flex flex-col items-center justify-center w-full h-full"
              style={{ backgroundColor: programaAtual.cor }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <span className="text-4xl">{obterEmoji(programaAtual.tipo)}</span>
              <span className="text-xs text-white font-bold mt-1">{programaAtual.nome}</span>
            </motion.div>
          ) : (
            <motion.div
              className="text-4xl"
              animate={
                rodando
                  ? {
                      rotate: [0, 10, -10, 0],
                      scale: [1, 1.1, 1],
                    }
                  : {}
              }
              transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
            >
              {rodando ? "⏳" : "😴"}
            </motion.div>
          )}
        </div>
      </div>

      {/* Mensagem do computador */}
      <div className="bg-gray-100 p-4 rounded-lg max-w-sm text-center">
        {programaAtual ? (
          <p className="text-xl">
            Estou executando:{" "}
            <span className="font-bold" style={{ color: programaAtual.cor }}>
              {programaAtual.nome}
            </span>
          </p>
        ) : rodando ? (
          <p className="text-xl">Estou esperando para executar um programa...</p>
        ) : (
          <p className="text-xl">Clique em "Iniciar" para começar!</p>
        )}
      </div>

      {/* Animação de trabalho */}
      {programaAtual && (
        <div className="mt-4 flex gap-2">
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: programaAtual.cor }}
              animate={{ scale: [1, 1.5, 1] }}
              transition={{
                repeat: Number.POSITIVE_INFINITY,
                duration: 0.6,
                delay: i * 0.2,
              }}
            />
          ))}
        </div>
      )}
    </div>
  )
}
