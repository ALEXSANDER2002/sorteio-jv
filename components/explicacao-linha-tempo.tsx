import { Clock, Pause, Info } from "lucide-react"

export default function ExplicacaoLinhaTempo() {
  return (
    <div className="bg-purple-50 p-4 rounded-lg shadow mb-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-bold text-purple-700">Como ler a Linha do Tempo</h3>
        <Clock className="h-5 w-5 text-purple-500" />
      </div>

      <div className="space-y-3">
        <p className="text-sm">
          A linha do tempo mostra exatamente quando cada programa usou o processador, permitindo visualizar todo o
          histórico da simulação.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="bg-white p-3 rounded border border-purple-200">
            <h4 className="font-medium text-purple-800 mb-1 flex items-center">
              <span className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center mr-2">
                <Clock className="h-4 w-4 text-purple-600" />
              </span>
              Estrutura do Gráfico
            </h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center">
                <div className="w-4 h-4 rounded-full bg-blue-100 flex items-center justify-center mr-2 text-xs font-bold text-blue-600">
                  1
                </div>
                <span className="font-medium">Eixo horizontal</span>
                <span className="text-gray-500 text-xs ml-2">Representa o tempo (0, 1, 2, ...)</span>
              </div>

              <div className="flex items-center">
                <div className="w-4 h-4 rounded-full bg-blue-100 flex items-center justify-center mr-2 text-xs font-bold text-blue-600">
                  2
                </div>
                <span className="font-medium">Linhas horizontais</span>
                <span className="text-gray-500 text-xs ml-2">Cada linha representa um programa</span>
              </div>

              <div className="flex items-center">
                <div className="w-4 h-4 rounded-full bg-blue-100 flex items-center justify-center mr-2 text-xs font-bold text-blue-600">
                  3
                </div>
                <span className="font-medium">Blocos coloridos</span>
                <span className="text-gray-500 text-xs ml-2">Mostram quando um programa estava ativo</span>
              </div>

              <div className="mt-2 bg-gray-50 p-2 rounded text-xs">
                <strong>Exemplo:</strong> Um bloco colorido na linha "Calculadora" na coluna do tempo 5 significa que a
                Calculadora estava usando o processador naquele momento.
              </div>
            </div>
          </div>

          <div className="bg-white p-3 rounded border border-purple-200">
            <h4 className="font-medium text-purple-800 mb-1 flex items-center">
              <span className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center mr-2">
                <Info className="h-4 w-4 text-purple-600" />
              </span>
              Cores e Símbolos
            </h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center">
                <div className="w-6 h-6 rounded mr-2" style={{ backgroundColor: "hsl(200, 70%, 60%)" }}></div>
                <span className="font-medium">Blocos coloridos</span>
                <span className="text-gray-500 text-xs ml-2">Programa executando na CPU</span>
              </div>

              <div className="flex items-center">
                <div className="w-6 h-6 rounded mr-2 bg-orange-500 flex items-center justify-center">
                  <Pause className="h-3 w-3 text-white" />
                </div>
                <span className="font-medium">Blocos laranja</span>
                <span className="text-gray-500 text-xs ml-2">Programa em operação de I/O</span>
              </div>

              <div className="flex items-center">
                <div className="w-6 h-6 rounded mr-2 bg-gray-300 flex items-center justify-center">
                  <span className="text-gray-700 font-bold text-xs">💤</span>
                </div>
                <span className="font-medium">Blocos cinza</span>
                <span className="text-gray-500 text-xs ml-2">CPU ociosa (nenhum programa executando)</span>
              </div>

              <div className="mt-2 bg-gray-50 p-2 rounded text-xs">
                <strong>Dica:</strong> Use o botão "Visualização Compacta" para mostrar apenas os programas que
                apareceram no gráfico!
              </div>
            </div>
          </div>
        </div>

        <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200">
          <h4 className="font-medium text-yellow-800 mb-1 flex items-center">
            <span className="w-6 h-6 rounded-full bg-yellow-100 flex items-center justify-center mr-2">
              <Info className="h-4 w-4 text-yellow-600" />
            </span>
            O que observar na linha do tempo
          </h4>
          <div className="space-y-2 text-sm">
            <p>
              <strong>1. Alternância entre programas:</strong> Observe como o escalonador alterna entre diferentes
              programas ao longo do tempo
            </p>
            <p>
              <strong>2. Padrões de execução:</strong> Programas com mais bilhetes aparecem com mais frequência no
              gráfico
            </p>
            <p>
              <strong>3. Operações de I/O:</strong> Observe os blocos laranja que mostram quando um programa está
              realizando operações de entrada/saída
            </p>
            <p>
              <strong>4. Períodos ociosos:</strong> Momentos em que a CPU está ociosa (nenhum programa pronto para
              executar)
            </p>
          </div>
        </div>

        <div className="bg-white p-3 rounded-lg border border-gray-200">
          <h4 className="font-medium text-gray-800 mb-1">Exemplo de interpretação</h4>
          <div className="space-y-2 text-sm">
            <p>Imagine que você vê a seguinte sequência na linha do tempo para o programa "Navegador":</p>
            <div className="flex items-center justify-center gap-1 my-2">
              <div className="w-8 h-8 rounded bg-green-500 flex items-center justify-center">
                <span className="text-white font-bold text-xs">✓</span>
              </div>
              <div className="w-8 h-8 rounded bg-orange-500 flex items-center justify-center">
                <Pause className="h-4 w-4 text-white" />
              </div>
              <div className="w-8 h-8 rounded bg-orange-500 flex items-center justify-center">
                <Pause className="h-4 w-4 text-white" />
              </div>
              <div className="w-8 h-8 rounded bg-green-500 flex items-center justify-center">
                <span className="text-white font-bold text-xs">✓</span>
              </div>
            </div>
            <p>Isso significa que:</p>
            <ol className="list-decimal list-inside space-y-1">
              <li>O Navegador foi selecionado e executou na CPU</li>
              <li>Depois solicitou uma operação de I/O (como carregar uma página)</li>
              <li>Ficou bloqueado por 2 unidades de tempo durante a operação de I/O</li>
              <li>Voltou a executar na CPU quando a operação de I/O terminou</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  )
}
