"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Home, Play, Pause, RefreshCw } from "lucide-react"
import ProgramaPersonagem from "@/components/ProgramaPersonagem"
import SorteioVisual from "@/components/SorteioVisual"
import ComputadorAnimado from "@/components/ComputadorAnimado"
import ResultadoSimples from "@/components/ResultadoSimples"

// Tipos de programas para crianças
type TipoPrograma = "jogo" | "desenho" | "música" | "foto"
type EstadoPrograma = "esperando" | "pronto" | "usando" | "descansando" | "terminou"

// Interface simplificada de programa
interface Programa {
  id: string
  nome: string
  tipo: TipoPrograma
  cor: string
  bilhetes: number
  tempoTotal: number
  tempoRestante: number
  estado: EstadoPrograma
  terminou: boolean
}

export default function SimuladorCriancas() {
  // Estado para armazenar os programas
  const [programas, setProgramas] = useState<Programa[]>([])

  // Estado para controlar se a simulação está rodando
  const [rodando, setRodando] = useState(false)

  // Estado para armazenar o tempo atual
  const [tempo, setTempo] = useState(0)

  // Estado para armazenar o programa atual usando o computador
  const [programaAtual, setProgramaAtual] = useState<Programa | null>(null)

  // Estado para armazenar o bilhete sorteado
  const [bilheteSorteado, setBilheteSorteado] = useState<number | null>(null)

  // Estado para armazenar os programas que terminaram
  const [programasTerminados, setProgramasTerminados] = useState<Programa[]>([])

  // Função para criar programas iniciais
  const criarProgramasIniciais = () => {
    const novosProgramas: Programa[] = [
      {
        id: "p1",
        nome: "Jogo Divertido",
        tipo: "jogo",
        cor: "#FF6B6B",
        bilhetes: 3,
        tempoTotal: 5,
        tempoRestante: 5,
        estado: "pronto",
        terminou: false,
      },
      {
        id: "p2",
        nome: "Desenho Animado",
        tipo: "desenho",
        cor: "#4ECDC4",
        bilhetes: 2,
        tempoTotal: 3,
        tempoRestante: 3,
        estado: "pronto",
        terminou: false,
      },
      {
        id: "p3",
        nome: "Música Legal",
        tipo: "música",
        cor: "#FFD166",
        bilhetes: 1,
        tempoTotal: 2,
        tempoRestante: 2,
        estado: "pronto",
        terminou: false,
      },
      {
        id: "p4",
        nome: "Fotos de Férias",
        tipo: "foto",
        cor: "#6A0572",
        bilhetes: 2,
        tempoTotal: 4,
        tempoRestante: 4,
        estado: "pronto",
        terminou: false,
      },
    ]

    setProgramas(novosProgramas)
  }

  // Função para iniciar a simulação
  const iniciarSimulacao = () => {
    if (programas.length === 0) {
      criarProgramasIniciais()
    }
    setRodando(true)
  }

  // Função para pausar a simulação
  const pausarSimulacao = () => {
    setRodando(false)
  }

  // Função para reiniciar a simulação
  const reiniciarSimulacao = () => {
    setRodando(false)
    setTempo(0)
    setProgramaAtual(null)
    setBilheteSorteado(null)
    setProgramasTerminados([])
    setProgramas([])
    criarProgramasIniciais()
  }

  // Função para atualizar os bilhetes de um programa
  const atualizarBilhetes = (id: string, bilhetes: number) => {
    setProgramas((programasAnteriores) =>
      programasAnteriores.map((programa) => (programa.id === id ? { ...programa, bilhetes } : programa)),
    )
  }

  // Efeito para executar a simulação a cada intervalo de tempo
  useEffect(() => {
    if (!rodando) return

    const temporizador = setTimeout(() => {
      // Incrementar o tempo
      setTempo((tempoAnterior) => tempoAnterior + 1)

      // Verificar quais programas estão prontos
      const programasProntos = programas.filter((p) => p.estado === "pronto" && !p.terminou)

      if (programasProntos.length === 0) {
        // Se não há programas prontos, o computador fica livre
        setProgramaAtual(null)
        setBilheteSorteado(null)

        // Verificar se todos os programas terminaram
        if (programas.every((p) => p.terminou)) {
          setRodando(false)
        }
      } else {
        // Implementação do sorteio de bilhetes

        // Calcular o total de bilhetes
        const totalBilhetes = programasProntos.reduce((soma, p) => soma + p.bilhetes, 0)

        // Sortear um bilhete aleatório
        const novoSorteio = Math.floor(Math.random() * totalBilhetes) + 1
        setBilheteSorteado(novoSorteio)

        // Determinar qual programa ganhou o sorteio
        let somaBilhetes = 0
        let programaSelecionado = programasProntos[0]

        for (const programa of programasProntos) {
          somaBilhetes += programa.bilhetes
          if (novoSorteio <= somaBilhetes) {
            programaSelecionado = programa
            break
          }
        }

        // Atualizar o programa selecionado
        setProgramaAtual(programaSelecionado)

        // Atualizar o estado dos programas
        setProgramas((programasAnteriores) =>
          programasAnteriores.map((programa) => {
            if (programa.id === programaSelecionado.id) {
              // Decrementar o tempo restante
              const novoTempoRestante = programa.tempoRestante - 1

              // Verificar se o programa terminou
              if (novoTempoRestante <= 0) {
                // Adicionar aos programas terminados
                setProgramasTerminados((anteriores) => [
                  ...anteriores,
                  {
                    ...programa,
                    tempoRestante: 0,
                    estado: "terminou",
                    terminou: true,
                  },
                ])

                return {
                  ...programa,
                  tempoRestante: 0,
                  estado: "terminou",
                  terminou: true,
                }
              }

              // Continua usando o computador
              return {
                ...programa,
                tempoRestante: novoTempoRestante,
                estado: "usando",
              }
            }
            // Outros programas que estavam usando voltam para o estado pronto
            else if (programa.estado === "usando") {
              return {
                ...programa,
                estado: "pronto",
              }
            }

            return programa
          }),
        )
      }
    }, 1000) // Executa a cada 1 segundo

    return () => clearTimeout(temporizador)
  }, [rodando, tempo, programas])

  // Efeito para criar programas iniciais
  useEffect(() => {
    if (programas.length === 0) {
      criarProgramasIniciais()
    }
  }, [programas.length])

  return (
    <main className="container mx-auto p-4 bg-gradient-to-b from-blue-50 to-purple-50 min-h-screen">
      {/* Botão para voltar à página inicial */}
      <div className="mb-4">
        <Link href="/">
          <Button variant="outline" className="flex items-center gap-2">
            <Home className="h-4 w-4" />
            Voltar para o Início
          </Button>
        </Link>
      </div>

      <h1 className="text-4xl font-bold text-center mb-6 text-purple-700">Sorteio de Programas no Computador</h1>

      {/* Explicação simples */}
      <div className="bg-white p-6 rounded-xl shadow-lg mb-8 text-center">
        <h2 className="text-2xl font-bold mb-4 text-blue-600">Como funciona?</h2>
        <p className="text-xl mb-4">Imagine que vários programas querem usar o computador ao mesmo tempo!</p>
        <p className="text-xl mb-4">
          Cada programa ganha <span className="font-bold text-purple-600">bilhetes</span> para um sorteio.
        </p>
        <p className="text-xl mb-4">A cada momento, sorteamos um bilhete e o programa vencedor usa o computador!</p>
        <p className="text-xl font-bold text-green-600">Programas com mais bilhetes têm mais chances de ganhar!</p>
      </div>

      {/* Controles da simulação */}
      <div className="bg-white p-6 rounded-xl shadow-lg mb-8">
        <div className="flex flex-wrap justify-center gap-4 mb-4">
          {rodando ? (
            <Button onClick={pausarSimulacao} size="lg" variant="outline" className="text-xl px-8 py-6 h-auto">
              <Pause className="h-6 w-6 mr-2" />
              Pausar
            </Button>
          ) : (
            <Button
              onClick={iniciarSimulacao}
              size="lg"
              className="bg-green-600 hover:bg-green-700 text-xl px-8 py-6 h-auto"
            >
              <Play className="h-6 w-6 mr-2" />
              Iniciar
            </Button>
          )}

          <Button onClick={reiniciarSimulacao} size="lg" variant="outline" className="text-xl px-8 py-6 h-auto">
            <RefreshCw className="h-6 w-6 mr-2" />
            Reiniciar
          </Button>
        </div>

        <div className="text-center">
          <div className="text-3xl font-bold">
            Tempo: <span className="text-blue-600">{tempo}</span>
          </div>
        </div>
      </div>

      {/* Área principal da simulação */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Sorteio visual */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold mb-4 text-center text-purple-700">Sorteio de Bilhetes</h2>
          <SorteioVisual
            programas={programas}
            bilheteSorteado={bilheteSorteado}
            programaAtual={programaAtual?.id || null}
            rodando={rodando}
          />
        </div>

        {/* Computador animado */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold mb-4 text-center text-blue-700">Computador</h2>
          <ComputadorAnimado programaAtual={programaAtual} rodando={rodando} />
        </div>
      </div>

      {/* Lista de programas */}
      <div className="bg-white p-6 rounded-xl shadow-lg mb-8">
        <h2 className="text-2xl font-bold mb-4 text-center text-green-700">Programas</h2>
        <p className="text-center text-lg mb-6">
          Arraste para dar mais bilhetes aos programas que você acha mais importantes!
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 min-h-[300px]">
          {programas.map((programa) => (
            <ProgramaPersonagem
              key={programa.id}
              programa={programa}
              atualizarBilhetes={atualizarBilhetes}
              rodando={rodando}
              programaAtualId={programaAtual?.id || ""}
            />
          ))}
        </div>
      </div>

      {/* Resultados */}
      <div className="bg-white p-6 rounded-xl shadow-lg mb-8">
        <h2 className="text-2xl font-bold mb-4 text-center text-yellow-600">Programas que Terminaram</h2>
        <ResultadoSimples programasTerminados={programasTerminados} />
      </div>
    </main>
  )
}
