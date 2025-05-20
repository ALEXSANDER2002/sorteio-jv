import { Cpu, HardDrive, Clock, Pause, Play, CheckCircle, Info, HelpCircle } from "lucide-react"

export default function ExplicacaoProcessos() {
  return (
    <div className="bg-blue-50 p-4 rounded-lg shadow mb-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-bold text-blue-700">Como entender a tabela de programas</h3>
        <HelpCircle className="h-5 w-5 text-blue-500" />
      </div>

      <div className="space-y-3">
        <p className="text-sm">
          A tabela abaixo mostra todos os programas no sistema. Cada linha representa um programa diferente que está
          competindo pelo uso do processador.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="bg-white p-3 rounded border border-blue-200">
            <h4 className="font-medium text-blue-800 mb-1 flex items-center">
              <span className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center mr-2">
                <Info className="h-4 w-4 text-purple-600" />
              </span>
              Tipos de Programas
            </h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center">
                <Cpu className="h-4 w-4 mr-2 text-blue-600" />
                <span className="font-medium">Programas de CPU</span>
              </div>
              <p className="text-gray-600 text-xs ml-6">
                Fazem cálculos intensivos e usam o processador continuamente (jogos, calculadoras, renderizadores)
              </p>

              <div className="flex items-center">
                <HardDrive className="h-4 w-4 mr-2 text-green-600" />
                <span className="font-medium">Programas de I/O</span>
              </div>
              <p className="text-gray-600 text-xs ml-6">
                Alternam entre usar o processador e esperar por dados externos (navegadores, downloads, impressoras)
              </p>
            </div>
          </div>

          <div className="bg-white p-3 rounded border border-blue-200">
            <h4 className="font-medium text-blue-800 mb-1 flex items-center">
              <span className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center mr-2">
                <Info className="h-4 w-4 text-purple-600" />
              </span>
              Estados dos Programas
            </h4>
            <div className="space-y-1 text-sm">
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2 text-gray-500" />
                <span className="font-medium">Esperando</span>: Ainda não chegou
              </div>
              <div className="flex items-center">
                <Play className="h-4 w-4 mr-2 text-yellow-600" />
                <span className="font-medium">Pronto</span>: Aguardando ser escolhido
              </div>
              <div className="flex items-center">
                <Cpu className="h-4 w-4 mr-2 text-blue-600" />
                <span className="font-medium">Executando</span>: Usando o processador agora
              </div>
              <div className="flex items-center">
                <Pause className="h-4 w-4 mr-2 text-orange-600" />
                <span className="font-medium">Bloqueado</span>: Esperando dados externos
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                <span className="font-medium">Finalizado</span>: Terminou sua tarefa
              </div>
            </div>
          </div>

          <div className="bg-white p-3 rounded border border-blue-200">
            <h4 className="font-medium text-blue-800 mb-1 flex items-center">
              <span className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center mr-2">
                <Info className="h-4 w-4 text-purple-600" />
              </span>
              Bilhetes (Prioridade)
            </h4>
            <div className="space-y-2 text-sm">
              <p className="text-gray-600">
                Cada programa recebe <strong>bilhetes</strong> que determinam sua chance de ser escolhido:
              </p>
              <div className="flex items-center">
                <div className="w-24 h-4 bg-gray-200 rounded-full overflow-hidden mr-2">
                  <div className="h-full bg-blue-500" style={{ width: "20%" }}></div>
                </div>
                <span>2 bilhetes = 20% de chance</span>
              </div>
              <div className="flex items-center">
                <div className="w-24 h-4 bg-gray-200 rounded-full overflow-hidden mr-2">
                  <div className="h-full bg-blue-500" style={{ width: "80%" }}></div>
                </div>
                <span>8 bilhetes = 80% de chance</span>
              </div>
              <p className="text-gray-600 text-xs">
                Mova o controle deslizante para ajustar a prioridade de cada programa!
              </p>
            </div>
          </div>
        </div>

        <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200">
          <h4 className="font-medium text-yellow-800 mb-1 flex items-center">
            <span className="w-6 h-6 rounded-full bg-yellow-100 flex items-center justify-center mr-2">
              <Info className="h-4 w-4 text-yellow-600" />
            </span>
            Como ler a tabela
          </h4>
          <div className="space-y-2 text-sm">
            <p>
              <strong>Programa</strong>: Nome e cor única para identificação
            </p>
            <p>
              <strong>Tipo</strong>: Se é um programa de CPU ou I/O
            </p>
            <p>
              <strong>Chegada</strong>: Momento em que o programa entra no sistema
            </p>
            <p>
              <strong>Trabalho</strong>: Barras de progresso mostrando quanto trabalho já foi feito
            </p>
            <p>
              <strong>Bilhetes</strong>: Controle deslizante para ajustar a prioridade (mais bilhetes = mais chance)
            </p>
            <p>
              <strong>Estado</strong>: Situação atual do programa (esperando, pronto, executando, etc.)
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
