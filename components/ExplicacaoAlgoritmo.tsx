// Componente que explica o algoritmo de Lottery Scheduling
export default function ExplicacaoAlgoritmo() {
  return (
    <div className="bg-blue-50 p-4 rounded-lg shadow mb-6">
      <h2 className="text-xl font-semibold mb-2">Como funciona o Escalonamento por Sorteio?</h2>

      <div className="space-y-3 text-sm">
        <p>
          O <strong>Escalonamento por Sorteio (Lottery Scheduling)</strong> é um algoritmo de escalonamento
          probabilístico onde cada processo recebe um número de bilhetes proporcional à sua prioridade.
        </p>

        <div className="bg-white p-3 rounded border border-blue-200">
          <h3 className="font-medium text-blue-800 mb-1">Funcionamento básico:</h3>
          <ol className="list-decimal list-inside space-y-1 ml-2">
            <li>Cada processo recebe um número de bilhetes (1-10 nesta simulação)</li>
            <li>A cada unidade de tempo, um bilhete é sorteado aleatoriamente</li>
            <li>O processo que possui o bilhete sorteado ganha a CPU por uma unidade de tempo</li>
            <li>Após a execução, um novo sorteio é realizado (preempção)</li>
          </ol>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="bg-white p-3 rounded border border-blue-200">
            <h3 className="font-medium text-blue-800 mb-1">Vantagens:</h3>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Justiça probabilística</li>
              <li>Simplicidade de implementação</li>
              <li>Evita inanição de processos</li>
              <li>Prioridades ajustáveis dinamicamente</li>
            </ul>
          </div>

          <div className="bg-white p-3 rounded border border-blue-200">
            <h3 className="font-medium text-blue-800 mb-1">Métricas importantes:</h3>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>
                <strong>Tempo de Retorno</strong>: tempo total desde a chegada até a conclusão
              </li>
              <li>
                <strong>Tempo de Espera</strong>: tempo que o processo ficou esperando
              </li>
              <li>
                <strong>Tempo de Resposta</strong>: tempo até a primeira execução
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
