"use client"

import { useState } from "react"
import { HelpCircle, X, ChevronRight, ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

interface PropsAjudaInterativa {
  secao: "processos" | "sorteio" | "resultados" | "linhaTempo"
}

export default function AjudaInterativa({ secao }: PropsAjudaInterativa) {
  const [mostrarAjuda, setMostrarAjuda] = useState(false)
  const [passoAtual, setPassoAtual] = useState(0)

  // Definir as dicas para cada seção
  const dicas = {
    processos: [
      {
        titulo: "Tabela de Programas",
        conteudo:
          "Esta tabela mostra todos os programas no sistema. Cada linha representa um programa diferente competindo pelo uso do processador.",
        imagem: "/ajuda-processos-1.png",
      },
      {
        titulo: "Tipos de Programas",
        conteudo:
          "Existem dois tipos: Programas de CPU (azul) que fazem cálculos intensivos e Programas de I/O (verde) que alternam entre usar a CPU e esperar por dados externos.",
        imagem: "/ajuda-processos-2.png",
      },
      {
        titulo: "Estados dos Programas",
        conteudo:
          "Os programas podem estar em diferentes estados: Esperando, Pronto, Executando, Bloqueado ou Finalizado. O estado atual é mostrado na última coluna.",
        imagem: "/ajuda-processos-3.png",
      },
      {
        titulo: "Bilhetes (Prioridade)",
        conteudo:
          "Use o controle deslizante para ajustar o número de bilhetes de cada programa. Mais bilhetes = maior chance de ser selecionado no sorteio!",
        imagem: "/ajuda-processos-4.png",
      },
    ],
    sorteio: [
      {
        titulo: "Caixa de Bilhetes",
        conteudo:
          "Esta seção mostra todos os bilhetes disponíveis para sorteio. Cada programa recebe um número de bilhetes baseado em sua prioridade.",
        imagem: "/ajuda-sorteio-1.png",
      },
      {
        titulo: "Processo de Sorteio",
        conteudo:
          "A cada unidade de tempo, um bilhete é sorteado aleatoriamente. O programa dono do bilhete ganha o direito de usar o processador.",
        imagem: "/ajuda-sorteio-2.png",
      },
      {
        titulo: "Probabilidade de Seleção",
        conteudo:
          "Programas com mais bilhetes têm maior probabilidade de serem escolhidos. Por exemplo, um programa com 5 bilhetes tem 5 vezes mais chances que um programa com 1 bilhete.",
        imagem: "/ajuda-sorteio-3.png",
      },
    ],
    resultados: [
      {
        titulo: "Tabela de Resultados",
        conteudo:
          "Esta tabela mostra os programas que já terminaram de executar. Você pode ver quando cada programa chegou, quando terminou e quanto tempo levou no total.",
        imagem: "/ajuda-resultados-1.png",
      },
      {
        titulo: "Tempo Total",
        conteudo:
          "O tempo total é calculado como (Tempo de Término - Tempo de Chegada). Representa quanto tempo o programa ficou no sistema, desde sua chegada até sua conclusão.",
        imagem: "/ajuda-resultados-2.png",
      },
      {
        titulo: "Comparação por Tipo",
        conteudo:
          "A seção inferior mostra o tempo médio para cada tipo de programa (CPU e I/O). Isso permite comparar o desempenho entre diferentes tipos de programas.",
        imagem: "/ajuda-resultados-3.png",
      },
    ],
    linhaTempo: [
      {
        titulo: "Gráfico de Linha do Tempo",
        conteudo:
          "Este gráfico mostra quando cada programa usou o processador. O eixo horizontal representa o tempo, e cada linha representa um programa diferente.",
        imagem: "/ajuda-linhaTempo-1.png",
      },
      {
        titulo: "Cores e Símbolos",
        conteudo:
          "Blocos coloridos mostram quando um programa estava executando. Blocos laranja indicam operações de I/O, e blocos cinza mostram quando a CPU estava ociosa.",
        imagem: "/ajuda-linhaTempo-2.png",
      },
      {
        titulo: "Visualização Compacta",
        conteudo:
          "Use o botão 'Visualização Compacta' para mostrar apenas os programas que apareceram no gráfico, facilitando a visualização quando há muitos programas.",
        imagem: "/ajuda-linhaTempo-3.png",
      },
      {
        titulo: "Interpretação do Gráfico",
        conteudo:
          "Observe como os programas se alternam ao longo do tempo. Programas com mais bilhetes tendem a aparecer com mais frequência no gráfico.",
        imagem: "/ajuda-linhaTempo-4.png",
      },
    ],
  }

  const dicasSecaoAtual = dicas[secao]
  const totalPassos = dicasSecaoAtual.length

  const avancarPasso = () => {
    if (passoAtual < totalPassos - 1) {
      setPassoAtual(passoAtual + 1)
    } else {
      setMostrarAjuda(false)
      setPassoAtual(0)
    }
  }

  const voltarPasso = () => {
    if (passoAtual > 0) {
      setPassoAtual(passoAtual - 1)
    }
  }

  return (
    <div>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setMostrarAjuda(true)}
        className="flex items-center gap-1 text-blue-600 hover:text-blue-800 hover:bg-blue-50"
      >
        <HelpCircle className="h-4 w-4" />
        <span className="text-xs">Ajuda</span>
      </Button>

      {mostrarAjuda && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full max-h-[80vh] flex flex-col">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-bold">
                {dicasSecaoAtual[passoAtual].titulo} ({passoAtual + 1}/{totalPassos})
              </h3>
              <Button variant="ghost" size="sm" onClick={() => setMostrarAjuda(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>

            <div className="p-4 overflow-y-auto flex-grow">
              <div className="space-y-4">
                <p>{dicasSecaoAtual[passoAtual].conteudo}</p>
                <div className="flex justify-center">
                  <img
                    src={dicasSecaoAtual[passoAtual].imagem || "/placeholder.svg"}
                    alt={`Ajuda para ${dicasSecaoAtual[passoAtual].titulo}`}
                    className="max-h-[300px] object-contain rounded border border-gray-200"
                    onError={(e) => {
                      e.currentTarget.src = "/lottery-scheduling-concept.png"
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-between p-4 border-t">
              <Button
                variant="outline"
                size="sm"
                onClick={voltarPasso}
                disabled={passoAtual === 0}
                className="flex items-center gap-1"
              >
                <ChevronLeft className="h-4 w-4" />
                Anterior
              </Button>
              <Button
                variant="default"
                size="sm"
                onClick={avancarPasso}
                className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700"
              >
                {passoAtual < totalPassos - 1 ? (
                  <>
                    Próximo
                    <ChevronRight className="h-4 w-4" />
                  </>
                ) : (
                  "Concluir"
                )}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
