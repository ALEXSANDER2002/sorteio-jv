"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Cpu, HardDrive, Plus } from "lucide-react"
import type { Processo } from "@/types/tipos"

interface PropsFormularioNovoProcesso {
  adicionarProcesso: (novoProcesso: Processo) => void
  tempoAtual: number
  emExecucao: boolean
}

export default function FormularioNovoProcesso({
  adicionarProcesso,
  tempoAtual,
  emExecucao,
}: PropsFormularioNovoProcesso) {
  const [mostrarFormulario, setMostrarFormulario] = useState(false)
  const [nome, setNome] = useState("")
  const [tipo, setTipo] = useState<"CPU" | "I/O">("CPU")
  const [tempoCPU, setTempoCPU] = useState(3)
  const [tempoChegada, setTempoChegada] = useState(tempoAtual)
  const [bilhetes, setBilhetes] = useState(3)
  const [tempoIO, setTempoIO] = useState(2)
  const [ciclosIO, setCiclosIO] = useState(1)

  // Lista de sugestões de nomes para cada tipo
  const sugestoesCPU = [
    "Calculadora",
    "Renderizador",
    "Compilador",
    "Jogo",
    "AnaliseDados",
    "Codificador",
    "Minerador",
    "Simulador",
    "Planilha",
    "Modelagem3D",
  ]

  const sugestoesIO = [
    "Navegador",
    "EditorTexto",
    "Impressora",
    "Download",
    "Backup",
    "Antivírus",
    "Streaming",
    "Email",
    "Scanner",
    "Atualizador",
  ]

  // Função para lidar com a submissão do formulário
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validar o nome
    if (!nome.trim()) {
      alert("Por favor, insira um nome para o processo.")
      return
    }

    // Criar o novo processo
    const novoProcesso: Processo = {
      id: nome,
      tipo,
      tempoChegada,
      tempoCPU,
      tempoRestante: tempoCPU,
      bilhetes,
      tempoInicio: -1,
      tempoFim: -1,
      tempoRetorno: -1,
      tempoEspera: -1,
      finalizado: false,
      estado: tempoChegada <= tempoAtual ? "pronto" : "novo",
      tempoIO: tipo === "I/O" ? tempoIO : undefined,
      tempoIORestante: tipo === "I/O" ? tempoIO : undefined,
      ciclosIO: tipo === "I/O" ? ciclosIO : undefined,
      ciclosIORestantes: tipo === "I/O" ? ciclosIO : undefined,
    }

    // Adicionar o processo
    adicionarProcesso(novoProcesso)

    // Limpar o formulário
    setNome("")
    setTipo("CPU")
    setTempoCPU(3)
    setTempoChegada(tempoAtual)
    setBilhetes(3)
    setTempoIO(2)
    setCiclosIO(1)

    // Fechar o formulário
    setMostrarFormulario(false)
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow mb-6">
      {!mostrarFormulario ? (
        <Button
          onClick={() => setMostrarFormulario(true)}
          className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700"
          disabled={emExecucao}
        >
          <Plus className="h-5 w-5" />
          Adicionar Novo Programa
        </Button>
      ) : (
        <div>
          <h3 className="text-lg font-bold mb-3">Adicionar Novo Programa</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Nome do processo */}
              <div>
                <label className="block text-sm font-medium mb-1">Nome do Programa</label>
                <input
                  type="text"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  className="w-full p-2 border rounded"
                  placeholder="Ex: MeuPrograma"
                  required
                />
              </div>

              {/* Tipo de processo */}
              <div>
                <label className="block text-sm font-medium mb-1">Tipo</label>
                <div className="flex gap-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="tipo"
                      checked={tipo === "CPU"}
                      onChange={() => setTipo("CPU")}
                      className="mr-2"
                    />
                    <Cpu className="h-4 w-4 mr-1 text-blue-600" />
                    <span>CPU</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="tipo"
                      checked={tipo === "I/O"}
                      onChange={() => setTipo("I/O")}
                      className="mr-2"
                    />
                    <HardDrive className="h-4 w-4 mr-1 text-green-600" />
                    <span>I/O</span>
                  </label>
                </div>
              </div>

              {/* Sugestões de nomes */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1">Sugestões de nomes:</label>
                <div className="flex flex-wrap gap-1">
                  {(tipo === "CPU" ? sugestoesCPU : sugestoesIO).map((sugestao) => (
                    <button
                      key={sugestao}
                      type="button"
                      onClick={() => setNome(sugestao)}
                      className="px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded"
                    >
                      {sugestao}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tempo de chegada */}
              <div>
                <label className="block text-sm font-medium mb-1">Tempo de Chegada</label>
                <input
                  type="number"
                  min={0}
                  value={tempoChegada}
                  onChange={(e) => setTempoChegada(Number(e.target.value))}
                  className="w-full p-2 border rounded"
                />
                <p className="text-xs text-gray-500 mt-1">Tempo atual: {tempoAtual}</p>
              </div>

              {/* Tempo de CPU */}
              <div>
                <label className="block text-sm font-medium mb-1">Tempo de CPU</label>
                <input
                  type="number"
                  min={1}
                  value={tempoCPU}
                  onChange={(e) => setTempoCPU(Number(e.target.value))}
                  className="w-full p-2 border rounded"
                />
              </div>

              {/* Bilhetes */}
              <div>
                <label className="block text-sm font-medium mb-1">Bilhetes (Prioridade)</label>
                <div className="flex items-center">
                  <input
                    type="range"
                    min={1}
                    max={10}
                    value={bilhetes}
                    onChange={(e) => setBilhetes(Number(e.target.value))}
                    className="w-full"
                  />
                  <span className="ml-2 font-bold">{bilhetes}</span>
                </div>
              </div>

              {/* Campos específicos para processos de I/O */}
              {tipo === "I/O" && (
                <>
                  <div>
                    <label className="block text-sm font-medium mb-1">Tempo de I/O</label>
                    <input
                      type="number"
                      min={1}
                      value={tempoIO}
                      onChange={(e) => setTempoIO(Number(e.target.value))}
                      className="w-full p-2 border rounded"
                    />
                    <p className="text-xs text-gray-500 mt-1">Duração de cada operação de I/O</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Ciclos de I/O</label>
                    <input
                      type="number"
                      min={1}
                      value={ciclosIO}
                      onChange={(e) => setCiclosIO(Number(e.target.value))}
                      className="w-full p-2 border rounded"
                    />
                    <p className="text-xs text-gray-500 mt-1">Número de operações de I/O</p>
                  </div>
                </>
              )}
            </div>

            <div className="flex gap-2 justify-end">
              <Button type="button" variant="outline" onClick={() => setMostrarFormulario(false)} className="px-4">
                Cancelar
              </Button>
              <Button type="submit" className="px-4 bg-green-600 hover:bg-green-700">
                Adicionar Programa
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}
