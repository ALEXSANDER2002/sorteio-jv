import { Cpu, Clock, Pause, Play, CheckCircle, HardDrive } from "lucide-react"

export default function ExplicacaoSimples() {
  return (
    <div className="bg-blue-50 p-4 rounded-lg shadow mb-6">
      <h2 className="text-xl font-bold mb-3 text-center text-blue-700">Como funciona o Sorteio de Processos?</h2>

      <div className="flex flex-col md:flex-row gap-4 items-start">
        <div className="flex-1">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <p className="text-lg mb-3">
              Imagine uma caixa com <span className="font-bold text-blue-600">bilhetes coloridos</span>!
            </p>

            <ul className="space-y-3">
              <li className="flex items-center">
                <div className="w-6 h-6 rounded-full bg-red-500 mr-2"></div>
                <span>
                  Cada <strong>programa</strong> (como navegador, jogo, etc.) ganha alguns bilhetes
                </span>
              </li>

              <li className="flex items-center">
                <div className="w-6 h-6 rounded-full bg-green-500 mr-2"></div>
                <span>
                  Programas <strong>mais importantes</strong> ganham mais bilhetes
                </span>
              </li>

              <li className="flex items-center">
                <div className="w-6 h-6 rounded-full bg-purple-500 mr-2"></div>
                <span>
                  A cada momento, <strong>sorteamos um bilhete</strong> da caixa
                </span>
              </li>

              <li className="flex items-center">
                <div className="w-6 h-6 rounded-full bg-yellow-500 mr-2"></div>
                <span>
                  O programa dono do bilhete <strong>ganha um tempinho</strong> para usar o computador
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex-1">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h3 className="font-bold text-center mb-2">Tipos de Programas:</h3>

            <div className="flex gap-4 mb-4">
              <div className="flex-1 bg-blue-50 p-3 rounded-lg">
                <div className="flex items-center mb-2">
                  <Cpu className="h-6 w-6 text-blue-600 mr-2" />
                  <span className="font-bold">Programas de CPU</span>
                </div>
                <p className="text-sm">
                  <strong>Exemplos:</strong> Calculadora, Jogos, Renderizador, Compilador
                </p>
                <p className="text-sm mt-1 text-blue-700">
                  <strong>Comportamento:</strong> Usam o processador intensamente para cálculos e não precisam esperar
                  por dados externos.
                </p>
              </div>

              <div className="flex-1 bg-green-50 p-3 rounded-lg">
                <div className="flex items-center mb-2">
                  <HardDrive className="h-6 w-6 text-green-600 mr-2" />
                  <span className="font-bold">Programas de I/O</span>
                </div>
                <p className="text-sm">
                  <strong>Exemplos:</strong> Navegador, Editor de Texto, Download, Impressora
                </p>
                <p className="text-sm mt-1 text-green-700">
                  <strong>Comportamento:</strong> Alternam entre usar a CPU e esperar por dados externos (como arquivos,
                  rede ou impressão).
                </p>
              </div>
            </div>

            <h3 className="font-bold text-center mb-2">Estados dos Programas:</h3>
            <div className="grid grid-cols-2 gap-2">
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1 text-gray-500" />
                <span className="text-sm">
                  <strong>Esperando</strong>: Ainda não iniciou
                </span>
              </div>
              <div className="flex items-center">
                <Play className="h-4 w-4 mr-1 text-yellow-600" />
                <span className="text-sm">
                  <strong>Pronto</strong>: Aguardando ser escolhido
                </span>
              </div>
              <div className="flex items-center">
                <Cpu className="h-4 w-4 mr-1 text-blue-600" />
                <span className="text-sm">
                  <strong>Executando</strong>: Usando o processador
                </span>
              </div>
              <div className="flex items-center">
                <Pause className="h-4 w-4 mr-1 text-orange-600" />
                <span className="text-sm">
                  <strong>Bloqueado</strong>: Esperando dados externos
                </span>
              </div>
              <div className="flex items-center col-span-2">
                <CheckCircle className="h-4 w-4 mr-1 text-green-600" />
                <span className="text-sm">
                  <strong>Finalizado</strong>: Terminou sua tarefa
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
