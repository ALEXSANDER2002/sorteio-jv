"use client"

// Hooks do React
import { useState, useEffect } from "react"

// Componentes do Next.js
import Link from "next/link"

// Componentes da UI
import { Button } from "@/components/ui/button"

// Ícones
import { Home, BookOpen } from "lucide-react"

// Componentes do simulador
import ListaProcessosSimples from "@/components/lista-processos-simples"
import GraficoGanttSimples from "@/components/grafico-gantt-simples"
import ControlesSimulacaoSimples from "@/components/controles-simulacao-simples"
import ExplicacaoSimples from "@/components/explicacao-simples"
import VisualizacaoSorteioSimples from "@/components/visualizacao-sorteio-simples"
import ResultadosSimples from "@/components/resultados-simples"
import FormularioNovoProcesso from "@/components/formulario-novo-processo"
import ExplicacaoProcessos from "@/components/explicacao-processos"
import ExplicacaoResultados from "@/components/explicacao-resultados"
import ExplicacaoLinhaTempo from "@/components/explicacao-linha-tempo"
import AjudaInterativa from "@/components/ajuda-interativa"

// Tipos
import type { Processo, RegistroExecucao } from "@/app/tipos"

export default function Simulador() {
  // Estado para armazenar a lista de processos
  const [processos, setProcessos] = useState<Processo[]>([])

  // Estado para controlar se a simulação está em execução
  const [emExecucao, setEmExecucao] = useState(false)

  // Estado para armazenar o tempo atual da simulação
  const [tempoAtual, setTempoAtual] = useState(0)

  // Estado para armazenar o processo atualmente em execução
  const [processoAtual, setProcessoAtual] = useState<Processo | null>(null)

  // Estado para armazenar o histórico de execução para o gráfico Gantt
  const [historicoExecucao, setHistoricoExecucao] = useState<RegistroExecucao[]>([])

  // Estado para armazenar os logs da simulação
  const [logs, setLogs] = useState<string[]>([])

  // Estado para armazenar os processos finalizados
  const [processosFinalizados, setProcessosFinalizados] = useState<Processo[]>([])

  // Estado para armazenar o bilhete sorteado
  const [bilheteSorteado, setBilheteSorteado] = useState<number | null>(null)

  // Estado para controlar a velocidade da simulação (em ms)
  const [velocidadeSimulacao, setVelocidadeSimulacao] = useState(1000)

  // Estado para controlar a exibição das explicações
  const [mostrarExplicacoes, setMostrarExplicacoes] = useState(true)

  // Função para gerar processos aleatórios
  const gerarProcessos = () => {
    const novosProcessos: Processo[] = []

    // Lista de nomes de processos reais
    const processosCPU = [
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
      "Compressor",
      "Criptografia",
    ]

    const processosIO = [
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
      "Sincronizador",
      "Instalador",
    ]

    // Gerar processos de CPU e I/O (10 no total, 5 de cada tipo)
    for (let i = 1; i <= 10; i++) {
      const tempoChegada = Math.floor(Math.random() * 5) // 0-4
      const tempoCPU = Math.floor(Math.random() * 5) + 2 // 2-6
      const bilhetes = Math.floor(Math.random() * 5) + 1 // 1-5

      // Alternar entre processos de CPU e I/O
      const tipo = i % 2 === 0 ? "CPU" : "I/O"

      // Escolher um nome aleatório da lista correspondente
      const listaNomes = tipo === "CPU" ? processosCPU : processosIO
      const indiceNome = Math.floor(Math.random() * listaNomes.length)
      const nome = listaNomes[indiceNome]

      // Configurações específicas para processos de I/O
      const tempoIO = tipo === "I/O" ? Math.floor(Math.random() * 3) + 1 : undefined // 1-3 unidades de tempo para I/O
      const ciclosIO = tipo === "I/O" ? Math.floor(Math.random() * 2) + 1 : undefined // 1-2 ciclos de I/O

      novosProcessos.push({
        id: nome, // Usar nome real em vez de P1, P2, etc.
        tempoChegada,
        tempoCPU,
        tempoRestante: tempoCPU,
        bilhetes,
        tempoInicio: -1,
        tempoFim: -1,
        tempoRetorno: -1,
        tempoEspera: -1,
        finalizado: false,
        tipo,
        estado: "novo", // Todos os processos começam no estado "novo"
        tempoIO,
        tempoIORestante: tempoIO,
        ciclosIO,
        ciclosIORestantes: ciclosIO,
      })

      // Remover o nome usado para evitar duplicatas
      if (tipo === "CPU") {
        processosCPU.splice(indiceNome, 1)
      } else {
        processosIO.splice(indiceNome, 1)
      }
    }

    setProcessos(novosProcessos)
    adicionarLog("Processos gerados aleatoriamente")
  }

  // Função para adicionar um novo processo
  const adicionarNovoProcesso = (novoProcesso: Processo) => {
    // Verificar se já existe um processo com o mesmo nome
    if (processos.some((p) => p.id === novoProcesso.id) || processosFinalizados.some((p) => p.id === novoProcesso.id)) {
      alert(`Já existe um processo com o nome "${novoProcesso.id}". Por favor, escolha outro nome.`)
      return
    }

    setProcessos((processosAnteriores) => [...processosAnteriores, novoProcesso])
    adicionarLog(`Novo processo "${novoProcesso.id}" (${novoProcesso.tipo}) adicionado manualmente`)
  }

  // Função para adicionar um log
  const adicionarLog = (mensagem: string) => {
    setLogs((logsAnteriores) => [...logsAnteriores, `[Tempo ${tempoAtual}] ${mensagem}`])
  }

  // Função para iniciar a simulação
  const iniciarSimulacao = () => {
    if (processos.length === 0) {
      gerarProcessos()
    }
    setEmExecucao(true)
    adicionarLog("Simulação iniciada")
  }

  // Função para pausar a simulação
  const pausarSimulacao = () => {
    setEmExecucao(false)
    adicionarLog("Simulação pausada")
  }

  // Função para reiniciar a simulação
  const reiniciarSimulacao = () => {
    setEmExecucao(false)
    setTempoAtual(0)
    setProcessoAtual(null)
    setHistoricoExecucao([])
    setLogs([])
    setProcessosFinalizados([])
    setBilheteSorteado(null)

    // Limpar processos e gerar novos
    setProcessos([])
    gerarProcessos()

    adicionarLog("Simulação reiniciada")
  }

  // Função para atualizar os bilhetes de um processo
  const atualizarBilhetesProcesso = (id: string, bilhetes: number) => {
    setProcessos((processosAnteriores) =>
      processosAnteriores.map((processo) => (processo.id === id ? { ...processo, bilhetes } : processo)),
    )
  }

  // Função para atualizar a velocidade da simulação
  const atualizarVelocidade = (velocidade: number) => {
    setVelocidadeSimulacao(velocidade)
    adicionarLog(`Velocidade da simulação alterada para ${velocidade}ms`)
  }

  // Efeito para executar a simulação a cada intervalo de tempo
  useEffect(() => {
    if (!emExecucao) return

    const temporizador = setTimeout(() => {
      // Incrementar o tempo atual
      setTempoAtual((tempoAnterior) => tempoAnterior + 1)

      // Atualizar o estado dos processos com base no tempo atual
      setProcessos((processosAnteriores) => {
        return processosAnteriores.map((processo) => {
          // Se o processo ainda não chegou, verificar se chegou agora
          if (processo.estado === "novo" && processo.tempoChegada <= tempoAtual) {
            adicionarLog(`Processo ${processo.id} (${processo.tipo}) chegou ao sistema`)
            return { ...processo, estado: "pronto" }
          }

          // Se o processo está bloqueado (em I/O), atualizar o tempo de I/O restante
          if (processo.estado === "bloqueado" && processo.tempoIORestante !== undefined) {
            const novoTempoIORestante = processo.tempoIORestante - 1

            // Registrar no histórico de execução que o processo está em I/O
            setHistoricoExecucao((anterior) => [
              ...anterior,
              {
                tempo: tempoAtual,
                idProcesso: processo.id,
                tipo: processo.tipo,
                estado: "bloqueado",
              },
            ])

            // Se o I/O terminou
            if (novoTempoIORestante <= 0) {
              const novosCiclosIORestantes = (processo.ciclosIORestantes || 0) - 1

              // Se ainda há ciclos de I/O a serem realizados
              if (novosCiclosIORestantes > 0) {
                adicionarLog(
                  `Processo ${processo.id} completou uma operação de I/O, mas ainda tem ${novosCiclosIORestantes} ciclos restantes`,
                )
                return {
                  ...processo,
                  estado: "pronto", // Volta para o estado pronto
                  tempoIORestante: processo.tempoIO, // Reseta o tempo de I/O
                  ciclosIORestantes: novosCiclosIORestantes,
                }
              } else {
                // Se não há mais ciclos de I/O, verificar se o processo terminou
                if (processo.tempoRestante <= 0) {
                  const tempoFim = tempoAtual + 1
                  const tempoRetorno = tempoFim - processo.tempoChegada
                  const tempoEspera = tempoRetorno - processo.tempoCPU

                  adicionarLog(
                    `Processo ${processo.id} (${processo.tipo}) concluído (tempo de retorno: ${tempoRetorno})`,
                  )

                  // Adicionar aos processos finalizados
                  setProcessosFinalizados((anterior) => [
                    ...anterior,
                    {
                      ...processo,
                      tempoRestante: 0,
                      tempoFim,
                      tempoRetorno,
                      tempoEspera,
                      finalizado: true,
                      estado: "finalizado",
                    },
                  ])

                  return {
                    ...processo,
                    tempoRestante: 0,
                    tempoInicio: processo.tempoInicio === -1 ? tempoAtual : processo.tempoInicio,
                    tempoFim,
                    tempoRetorno,
                    tempoEspera,
                    finalizado: true,
                    estado: "finalizado",
                  }
                } else {
                  // Se ainda tem tempo de CPU restante, volta para o estado pronto
                  adicionarLog(
                    `Processo ${processo.id} completou todas as operações de I/O e voltou para a fila de prontos`,
                  )
                  return {
                    ...processo,
                    estado: "pronto",
                  }
                }
              }
            }

            // Continua em I/O
            return {
              ...processo,
              tempoIORestante: novoTempoIORestante,
            }
          }

          return processo
        })
      })

      // Verificar quais processos estão prontos para executar
      const processosDisponiveis = processos.filter(
        (p) => p.estado === "pronto" && !p.finalizado && p.tempoRestante > 0,
      )

      if (processosDisponiveis.length === 0) {
        // Se não há processos disponíveis, a CPU fica ociosa
        setProcessoAtual(null)
        setBilheteSorteado(null)
        adicionarLog("CPU ociosa - nenhum processo disponível")

        // Adicionar ao histórico de execução (CPU ociosa)
        setHistoricoExecucao((anterior) => [...anterior, { tempo: tempoAtual, idProcesso: "ocioso" }])

        // Verificar se todos os processos foram concluídos
        const todosConcluidos = processos.every(
          (p) => p.finalizado || (p.tempoChegada > tempoAtual && p.estado === "novo"),
        )
        const algunsRestantes = processos.some((p) => p.tempoChegada > tempoAtual && p.estado === "novo")
        const algunsBloqueados = processos.some((p) => p.estado === "bloqueado")

        if (todosConcluidos && !algunsRestantes && !algunsBloqueados) {
          setEmExecucao(false)
          adicionarLog("Simulação concluída - todos os processos foram finalizados")
        }
      } else {
        // Implementação do algoritmo Lottery Scheduling

        // Calcular o total de bilhetes
        const totalBilhetes = processosDisponiveis.reduce((soma, p) => soma + p.bilhetes, 0)

        // Sortear um número aleatório entre 1 e o total de bilhetes
        const novoSorteio = Math.floor(Math.random() * totalBilhetes) + 1
        setBilheteSorteado(novoSorteio)

        // Determinar qual processo ganhou o sorteio
        let somaBilhetes = 0
        let processoSelecionado = processosDisponiveis[0] // Valor padrão

        for (const processo of processosDisponiveis) {
          somaBilhetes += processo.bilhetes
          if (novoSorteio <= somaBilhetes) {
            processoSelecionado = processo
            break
          }
        }

        // Atualizar o processo selecionado
        setProcessoAtual(processoSelecionado)
        adicionarLog(
          `Processo ${processoSelecionado.id} (${processoSelecionado.tipo}) selecionado (bilhete sorteado: ${novoSorteio}/${totalBilhetes})`,
        )

        // Adicionar ao histórico de execução
        setHistoricoExecucao((anterior) => [
          ...anterior,
          {
            tempo: tempoAtual,
            idProcesso: processoSelecionado.id,
            tipo: processoSelecionado.tipo,
            estado: "executando",
          },
        ])

        // Atualizar o estado dos processos
        setProcessos((processosAnteriores) =>
          processosAnteriores.map((processo) => {
            if (processo.id === processoSelecionado.id) {
              // Atualizar o tempo de início do processo se for a primeira vez
              const novoTempoInicio = processo.tempoInicio === -1 ? tempoAtual : processo.tempoInicio

              // Decrementar o tempo restante
              const novoTempoRestante = processo.tempoRestante - 1

              // Verificar se o processo terminou seu tempo de CPU
              if (novoTempoRestante <= 0) {
                // Para processos de CPU, finalizar
                if (processo.tipo === "CPU") {
                  const tempoFim = tempoAtual + 1
                  const tempoRetorno = tempoFim - processo.tempoChegada
                  const tempoEspera = tempoRetorno - processo.tempoCPU

                  adicionarLog(`Processo ${processo.id} (CPU) concluído (tempo de retorno: ${tempoRetorno})`)

                  // Adicionar aos processos finalizados
                  setProcessosFinalizados((anterior) => [
                    ...anterior,
                    {
                      ...processo,
                      tempoRestante: 0,
                      tempoFim,
                      tempoRetorno,
                      tempoEspera,
                      finalizado: true,
                      estado: "finalizado",
                    },
                  ])

                  return {
                    ...processo,
                    tempoRestante: 0,
                    tempoInicio: novoTempoInicio,
                    tempoFim,
                    tempoRetorno,
                    tempoEspera,
                    finalizado: true,
                    estado: "finalizado",
                  }
                }
                // Para processos de I/O, iniciar operação de I/O
                else {
                  adicionarLog(`Processo ${processo.id} (I/O) iniciando operação de I/O`)

                  return {
                    ...processo,
                    tempoRestante: 0,
                    tempoInicio: novoTempoInicio,
                    estado: "bloqueado", // Muda para o estado bloqueado
                  }
                }
              }

              // Se o processo é de I/O, tem uma chance de entrar em operação de I/O a cada unidade de tempo
              if (processo.tipo === "I/O" && processo.tempoRestante > 0) {
                // Chance de 30% de entrar em operação de I/O a cada unidade de tempo
                if (Math.random() < 0.3) {
                  adicionarLog(`Processo ${processo.id} (I/O) solicitou operação de I/O`)

                  return {
                    ...processo,
                    tempoRestante: novoTempoRestante,
                    tempoInicio: novoTempoInicio,
                    estado: "bloqueado", // Muda para o estado bloqueado
                  }
                }
              }

              // Continua executando
              return {
                ...processo,
                tempoRestante: novoTempoRestante,
                tempoInicio: novoTempoInicio,
                estado: "executando", // Atualiza o estado para executando
              }
            }
            // Outros processos que estavam executando voltam para o estado pronto
            else if (processo.estado === "executando") {
              return {
                ...processo,
                estado: "pronto",
              }
            }

            return processo
          }),
        )
      }
    }, velocidadeSimulacao) // Executa de acordo com a velocidade configurada

    return () => clearTimeout(temporizador)
  }, [emExecucao, tempoAtual, processos, velocidadeSimulacao])

  // Efeito para gerar processos iniciais
  useEffect(() => {
    if (processos.length === 0) {
      gerarProcessos()
    }
  }, [processos.length])

  return (
    <main className="container mx-auto p-4">
      {/* Botão para voltar à página inicial */}
      <div className="mb-4 flex justify-between items-center">
        <Link href="/">
          <Button variant="outline" className="flex items-center gap-2">
            <Home className="h-4 w-4" />
            Voltar à Página Inicial
          </Button>
        </Link>

        <Button
          variant="outline"
          className="flex items-center gap-2"
          onClick={() => setMostrarExplicacoes(!mostrarExplicacoes)}
        >
          <BookOpen className="h-4 w-4" />
          {mostrarExplicacoes ? "Ocultar Explicações" : "Mostrar Explicações"}
        </Button>
      </div>

      <h1 className="text-3xl font-bold text-center mb-6 text-blue-700">Simulador de Sorteio de Processos</h1>

      {/* Explicação simples do algoritmo */}
      <ExplicacaoSimples />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div>
          <ControlesSimulacaoSimples
            emExecucao={emExecucao}
            aoIniciar={iniciarSimulacao}
            aoPausar={pausarSimulacao}
            aoReiniciar={reiniciarSimulacao}
            tempoAtual={tempoAtual}
            velocidadeSimulacao={velocidadeSimulacao}
            aoAtualizarVelocidade={atualizarVelocidade}
          />
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl font-bold text-blue-700">Caixa de Bilhetes</h2>
            <AjudaInterativa secao="sorteio" />
          </div>
          <VisualizacaoSorteioSimples
            processos={processos}
            tempoAtual={tempoAtual}
            bilheteSorteado={bilheteSorteado}
            processoSelecionado={processoAtual?.id || null}
            emExecucao={emExecucao}
          />
        </div>
      </div>

      {/* Formulário para adicionar novo processo */}
      <div className="mb-6">
        <FormularioNovoProcesso
          adicionarProcesso={adicionarNovoProcesso}
          tempoAtual={tempoAtual}
          emExecucao={emExecucao}
        />
      </div>

      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-2xl font-bold text-blue-700">Programas no Sistema</h2>
          <AjudaInterativa secao="processos" />
        </div>

        {mostrarExplicacoes && <ExplicacaoProcessos />}

        <div className="bg-yellow-50 p-3 rounded-lg mb-3 text-center">
          <p className="text-lg">
            Mova os controles para dar <strong>mais bilhetes</strong> aos processos mais importantes!
          </p>
        </div>
        <ListaProcessosSimples
          processos={processos}
          tempoAtual={tempoAtual}
          idProcessoAtual={processoAtual?.id || ""}
          atualizarBilhetes={atualizarBilhetesProcesso}
          emExecucao={emExecucao}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div>
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-2xl font-bold text-green-700">Resultados</h2>
            <AjudaInterativa secao="resultados" />
          </div>

          {mostrarExplicacoes && <ExplicacaoResultados />}

          <ResultadosSimples processosFinalizados={processosFinalizados} />
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-2xl font-bold text-purple-700">Linha do Tempo</h2>
            <AjudaInterativa secao="linhaTempo" />
          </div>

          {mostrarExplicacoes && <ExplicacaoLinhaTempo />}

          <GraficoGanttSimples historicoExecucao={historicoExecucao} processos={processos} />
        </div>
      </div>

      {/* Seção de dicas e observações */}
      <div className="bg-blue-50 p-4 rounded-lg shadow mb-6">
        <h2 className="text-xl font-bold mb-3 text-center text-blue-700">Dicas para Observar na Simulação</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-3 rounded-lg shadow-sm">
            <h3 className="font-bold text-lg mb-2 text-blue-600">O que observar:</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <div className="w-5 h-5 rounded-full bg-blue-100 flex-shrink-0 flex items-center justify-center mr-2 text-xs font-bold text-blue-600">
                  1
                </div>
                <span>
                  <strong>Efeito dos bilhetes:</strong> Programas com mais bilhetes são escolhidos com mais frequência
                </span>
              </li>
              <li className="flex items-start">
                <div className="w-5 h-5 rounded-full bg-blue-100 flex-shrink-0 flex items-center justify-center mr-2 text-xs font-bold text-blue-600">
                  2
                </div>
                <span>
                  <strong>Comportamento de I/O:</strong> Observe como programas de I/O alternam entre usar a CPU e
                  realizar operações de I/O
                </span>
              </li>
              <li className="flex items-start">
                <div className="w-5 h-5 rounded-full bg-blue-100 flex-shrink-0 flex items-center justify-center mr-2 text-xs font-bold text-blue-600">
                  3
                </div>
                <span>
                  <strong>Justiça do algoritmo:</strong> Mesmo programas com poucos bilhetes eventualmente são
                  executados
                </span>
              </li>
              <li className="flex items-start">
                <div className="w-5 h-5 rounded-full bg-blue-100 flex-shrink-0 flex items-center justify-center mr-2 text-xs font-bold text-blue-600">
                  4
                </div>
                <span>
                  <strong>Tempo de conclusão:</strong> Compare o tempo total que diferentes programas levam para
                  terminar
                </span>
              </li>
            </ul>
          </div>

          <div className="bg-white p-3 rounded-lg shadow-sm">
            <h3 className="font-bold text-lg mb-2 text-green-600">Experimentos para tentar:</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <div className="w-5 h-5 rounded-full bg-green-100 flex-shrink-0 flex items-center justify-center mr-2 text-xs font-bold text-green-600">
                  1
                </div>
                <span>
                  <strong>Prioridade extrema:</strong> Dê 10 bilhetes para um programa e apenas 1 para os outros
                </span>
              </li>
              <li className="flex items-start">
                <div className="w-5 h-5 rounded-full bg-green-100 flex-shrink-0 flex items-center justify-center mr-2 text-xs font-bold text-green-600">
                  2
                </div>
                <span>
                  <strong>Distribuição equilibrada:</strong> Dê o mesmo número de bilhetes para todos os programas
                </span>
              </li>
              <li className="flex items-start">
                <div className="w-5 h-5 rounded-full bg-green-100 flex-shrink-0 flex items-center justify-center mr-2 text-xs font-bold text-green-600">
                  3
                </div>
                <span>
                  <strong>Prioridade por tipo:</strong> Dê mais bilhetes para programas de CPU ou de I/O e observe a
                  diferença
                </span>
              </li>
              <li className="flex items-start">
                <div className="w-5 h-5 rounded-full bg-green-100 flex-shrink-0 flex items-center justify-center mr-2 text-xs font-bold text-green-600">
                  4
                </div>
                <span>
                  <strong>Adicione novos programas:</strong> Crie programas personalizados durante a simulação
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  )
}
