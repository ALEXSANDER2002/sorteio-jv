"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

interface PropsSorteioVisual {
  programas: {
    id: string
    nome: string
    tipo: string
    cor: string
    bilhetes: number
    estado: string
    terminou: boolean
  }[]
  bilheteSorteado: number | null
  programaAtual: string | null
  rodando: boolean
}

export default function SorteioVisual({ programas, bilheteSorteado, programaAtual, rodando }: PropsSorteioVisual) {
  // Estado para animação do sorteio
  const [animando, setAnimando] = useState(false)
  const [bilheteAnimado, setBilheteAnimado] = useState<number | null>(null)

  // Filtrar programas prontos
  const programasProntos = programas.filter((p) => p.estado === "pronto" && !p.terminou)

  // Calcular o total de bilhetes
  const totalBilhetes = programasProntos.reduce((soma, p) => soma + p.bilhetes, 0)

  // Criar representação visual dos bilhetes
  const bilhetes: { id: string; cor: string; numero: number; nome: string }[] = []
  let numeroAtual = 1

  programasProntos.forEach((programa) => {
    // Adicionar bilhetes para este programa
    for (let i = 0; i < programa.bilhetes; i++) {
      bilhetes.push({
        id: programa.id,
        cor: programa.cor,
        numero: numeroAtual++,
        nome: programa.nome,
      })
    }
  })

  // Efeito para animar o sorteio quando um novo bilhete é sorteado
  useEffect(() => {
    if (bilheteSorteado !== null && rodando) {
      setAnimando(true)

      // Simular animação de sorteio
      const intervalo = setInterval(() => {
        setBilheteAnimado(Math.floor(Math.random() * totalBilhetes) + 1)
      }, 100)

      // Parar a animação após 1 segundo
      setTimeout(() => {
        clearInterval(intervalo)
        setBilheteAnimado(bilheteSorteado)
        setAnimando(false)
      }, 1000)
    }
  }, [bilheteSorteado, rodando, totalBilhetes])

  // Se não houver programas prontos
  if (programasProntos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[300px] text-center">
        <img
          src="/empty-cartoon-box.png"
          alt="Caixa vazia"
          className="w-32 h-32 mb-4"
          onError={(e) => {
            e.currentTarget.src = "/empty-cartoon-box.png"
          }}
        />
        <p className="text-xl text-gray-500">Não tem nenhum programa pronto para o sorteio!</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center min-h-[300px]">
      {/* Caixa de bilhetes */}
      <div className="relative mb-6">
        <img
          src="/cartoon-lottery-box.png"
          alt="Caixa de sorteio"
          className="w-64 h-64 object-contain"
          onError={(e) => {
            e.currentTarget.src = "/cartoon-lottery-box.png"
          }}
        />

        {/* Número sorteado */}
        {bilheteSorteado && (
          <motion.div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg"
            initial={{ scale: 0 }}
            animate={{ scale: 1, rotate: [0, 10, -10, 0] }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-2xl font-bold">{bilheteSorteado}</span>
          </motion.div>
        )}
      </div>

      {/* Mensagem do sorteio */}
      <div className="text-center mb-6">
        {animando ? (
          <p className="text-2xl font-bold text-purple-600">Sorteando bilhete...</p>
        ) : bilheteSorteado ? (
          <p className="text-2xl">
            Bilhete sorteado: <span className="font-bold text-purple-600">{bilheteSorteado}</span>
          </p>
        ) : (
          <p className="text-2xl">Vamos sortear um bilhete!</p>
        )}

        {programaAtual && (
          <p className="text-xl mt-2">
            Programa vencedor:{" "}
            <span className="font-bold" style={{ color: programas.find((p) => p.id === programaAtual)?.cor }}>
              {programas.find((p) => p.id === programaAtual)?.nome}
            </span>
          </p>
        )}
      </div>

      {/* Visualização dos bilhetes */}
      <div className="flex flex-wrap gap-2 justify-center max-w-md">
        {bilhetes.map((bilhete) => (
          <motion.div
            key={bilhete.numero}
            className="w-12 h-16 rounded-lg flex flex-col items-center justify-center text-white font-bold shadow-md"
            style={{ backgroundColor: bilhete.cor }}
            animate={
              bilheteAnimado === bilhete.numero
                ? {
                    scale: [1, 1.2, 1],
                    y: [0, -10, 0],
                    boxShadow: "0px 0px 8px rgba(0,0,0,0.5)",
                  }
                : {}
            }
            transition={{ duration: 0.5 }}
          >
            <span className="text-xs">{bilhete.nome.split(" ")[0]}</span>
            <span className="text-lg">{bilhete.numero}</span>
          </motion.div>
        ))}
      </div>

      {/* Legenda */}
      <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-2 w-full">
        {programasProntos.map((programa) => (
          <div key={programa.id} className="flex items-center">
            <div className="w-4 h-4 rounded-full mr-2" style={{ backgroundColor: programa.cor }}></div>
            <span className="text-sm truncate">
              {programa.nome}: {programa.bilhetes} bilhetes
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
