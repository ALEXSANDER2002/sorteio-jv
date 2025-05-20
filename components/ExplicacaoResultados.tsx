import { Clock, CheckCircle, BarChart, Info } from "lucide-react"

export default function ExplicacaoResultados() {
  return (
    <div className="bg-green-50 p-4 rounded-lg shadow mb-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-bold text-green-700">Entendendo os Resultados</h3>
        <CheckCircle className="h-5 w-5 text-green-500" />
      </div>

      <div className="space-y-3">
        <p className="text-sm">
          Esta seção mostra os programas que já terminaram de executar e quanto tempo cada um levou para completar sua
          tarefa.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="bg-white p-3 rounded border border-green-200">
            <h4 className="font-medium text-green-800 mb-1 flex items-center">
              <span className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mr-2">
                <Clock className="h-4 w-4 text-green-600" />
              </span>
              Tempos Importantes
            </h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center">
                <div className="w-4 h-4 rounded-full bg-blue-100 flex items-center justify-center mr-2 text-xs font-bold text-blue-600">
                  1
                </div>
                <span className="font-medium">Tempo de Chegada</span>
                <span className="text-gray-500 text-xs ml-2">Quando o programa entrou no sistema</span>
              </div>

              <div className="flex items-center">
                <div className="w-4 h-4 rounded-full bg-blue-100 flex items-center justify-center mr-2 text-xs font-bold text-blue-600">
                  2
                </div>
                <span className="font-medium">Tempo de Término</span>
                <span className="text-gray-500 text-xs ml-2">Quando o programa completou sua tarefa</span>
              </div>

              <div className="flex items-center">
                <div className="w-4 h-4 rounded-full bg-blue-100 flex items-center justify-center mr-2 text-xs font-bold text-blue-600">
                  3
                </div>
                <span className="font-medium">Tempo Total</span>
                <span className="text-gray-500 text-xs ml-2">Quanto tempo o programa ficou no sistema</span>
              </div>

              <div className="mt-2 bg-gray-50 p-2 rounded text-xs">
                <strong>Exemplo:</strong> Se um programa chegou no tempo 2 e terminou no tempo 10, seu tempo total é 8
                unidades.
              </div>
            </div>
          </div>

          <div className="bg-white p-3 rounded border border-green-200">
            <h4 className="font-medium text-green-800 mb-1 flex items-center">
              <span className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mr-2">
                <BarChart className="h-4 w-4 text-green-600" />
              </span>
              Comparação de Desempenho
            </h4>
            <div className="space-y-2 text-sm">
              <p>A tabela de resultados permite comparar o desempenho de diferentes tipos de programas:</p>

              <div className="flex items-center">
                <div className="w-4 h-4 rounded-full bg-blue-500 mr-2"></div>
                <span className="font-medium">Programas de CPU</span>
                <span className="text-gray-500 text-xs ml-2">Geralmente mais rápidos e previsíveis</span>
              </div>

              <div className="flex items-center">
                <div className="w-4 h-4 rounded-full bg-green-500 mr-2"></div>
                <span className="font-medium">Programas de I/O</span>
                <span className="text-gray-500 text-xs ml-2">Podem levar mais tempo devido às operações de I/O</span>
              </div>

              <div className="mt-2 bg-gray-50 p-2 rounded text-xs">
                <strong>Dica:</strong> Programas com mais bilhetes geralmente terminam mais rápido porque são escolhidos
                com mais frequência!
              </div>
            </div>
          </div>
        </div>

        <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200">
          <h4 className="font-medium text-yellow-800 mb-1 flex items-center">
            <span className="w-6 h-6 rounded-full bg-yellow-100 flex items-center justify-center mr-2">
              <Info className="h-4 w-4 text-yellow-600" />
            </span>
            O que observar nos resultados
          </h4>
          <div className="space-y-2 text-sm">
            <p>
              <strong>1. Tempo médio por tipo:</strong> Compare o tempo médio de conclusão entre programas de CPU e I/O
            </p>
            <p>
              <strong>2. Efeito dos bilhetes:</strong> Observe como programas com mais bilhetes geralmente terminam mais
              rápido
            </p>
            <p>
              <strong>3. Justiça do algoritmo:</strong> Mesmo programas com poucos bilhetes eventualmente são executados
              e terminam
            </p>
            <p>
              <strong>4. Impacto das operações de I/O:</strong> Programas de I/O podem levar mais tempo devido às
              interrupções para operações de entrada/saída
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
