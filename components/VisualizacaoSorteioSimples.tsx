"use client"
import type { Processo } from "@/types/tipos"
import { useState, useEffect } from "react"
import { Cpu, HardDrive } from "lucide-react"

interface PropsVisualizacaoSorteio {
  processos: Processo[]
  tempoAtual: number
  bilheteSorteado: number | null
  processoSelecionado: string | null
  emExecucao: boolean
}

export default function VisualizacaoSorteioSimples({
  processos,
  tempoAtual,
  bilheteSorteado,
  processoSelecionado,
  emExecucao,
}: PropsVisualizacaoSorteio) {
  // Filtrar processos que já chegaram, não foram finalizados, não estão bloqueados e têm tempo restante
  const processosDisponiveis = processos.filter((p) => p.estado === "pronto" && !p.finalizado && p.tempoRestante > 0)

  // Calcular o total de bilhetes
  const totalBilhetes = processosDisponiveis.reduce((soma, p) => soma + p.bilhetes, 0)

  // Estado para animação do sorteio
  const [animando, setAnimando] = useState(false)
  const [bilheteAnimado, setBilheteAnimado] = useState<number | null>(null)

  // Efeito para animar o sorteio quando um novo bilhete é sorteado
  useEffect(() => {
    if (bilheteSorteado !== null && emExecucao) {
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
  }, [bilheteSorteado, emExecucao, totalBilhetes])

  // Se não houver processos disponíveis
  if (processosDisponiveis.length === 0) {
    return (
      <div className="bg-white p-4 rounded-lg shadow mb-6 text-center">
        <h2 className="text-lg font-bold mb-2">Caixa de Bilhetes</h2>
        <p className="text-gray-500 py-4">Não tem nenhum programa pronto para sorteio!</p>
        <img src="/empty-cartoon-box.png" alt="Caixa vazia" className="mx-auto" width={100} height={100} />
      </div>
    )
  }

  // Criar representação visual dos bilhetes
  const bilhetes: { id: string; cor: string; numero: number; tipo: "CPU" | "I/O" }[] = []
  let numeroAtual = 1

  processosDisponiveis.forEach((processo, index) => {
    // Gerar cor para o processo
    const matiz = (index * 137) % 360
    const cor = `hsl(${matiz}, 70%, 60%)`

    // Adicionar bilhetes para este processo
    for (let i = 0; i < processo.bilhetes; i++) {
      bilhetes.push({
        id: processo.id,
        cor,
        numero: numeroAtual++,
        tipo: processo.tipo,
      })
    }
  })

  return (
    <div className="bg-white p-4 rounded-lg shadow mb-6">
      <h2 className="text-lg font-bold mb-2 text-center">Caixa de Bilhetes</h2>

      <div className="mb-3 text-center">
        <p className="text-lg">
          {animando ? (
            <span className="text-purple-600 font-bold">Sorteando bilhete...</span>
          ) : bilheteSorteado ? (
            <>
              Bilhete sorteado: <span className="text-blue-600 font-bold">{bilheteSorteado}</span>
            </>
          ) : (
            "Vamos sortear um bilhete!"
          )}
        </p>

        {processoSelecionado && (
          <p className="text-lg mt-1">
            Programa vencedor: <span className="text-blue-600 font-bold">{processoSelecionado}</span>{" "}
            {processos.find((p) => p.id === processoSelecionado)?.tipo === "CPU" ? (
              <Cpu className="inline h-4 w-4 text-blue-600" />
            ) : (
              <HardDrive className="inline h-4 w-4 text-green-600" />
            )}
          </p>
        )}
      </div>

      {/* Visualização dos bilhetes */}
      <div className="flex flex-wrap gap-1 justify-center mb-3">
        {bilhetes.map((bilhete) => (
          <div
            key={bilhete.numero}
            className={`w-8 h-10 rounded border flex items-center justify-center text-xs font-bold transition-all ${
              bilheteAnimado === bilhete.numero ? "transform scale-125 border-2 border-black" : "border-gray-300"
            }`}
            style={{
              backgroundColor: bilhete.cor,
              color: "white",
            }}
            title={`Bilhete ${bilhete.numero} - ${bilhete.id} (${bilhete.tipo})`}
          >
            {bilhete.tipo === "CPU" ? <Cpu className="h-3 w-3 mb-1" /> : <HardDrive className="h-3 w-3 mb-1" />}
            {bilhete.numero}
          </div>
        ))}
      </div>

      {/* Legenda */}
      <div className="flex flex-wrap gap-3 justify-center text-sm">
        {processosDisponiveis.map((processo, index) => {
          const matiz = (index * 137) % 360
          const cor = `hsl(${matiz}, 70%, 60%)`

          return (
            <div key={processo.id} className="flex items-center">
              <div className="w-4 h-4 mr-1 rounded-full" style={{ backgroundColor: cor }}></div>
              <span>
                {processo.id}: {processo.bilhetes} bilhetes
              </span>
              {processo.tipo === "CPU" ? (
                <Cpu className="h-3 w-3 ml-1 text-blue-600" />
              ) : (
                <HardDrive className="h-3 w-3 ml-1 text-green-600" />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
