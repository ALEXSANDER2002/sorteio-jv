// Interface que define a estrutura de um processo
export interface Process {
  id: string // Identificador do processo (P1, P2, etc.)
  arrivalTime: number // Tempo de chegada do processo
  burstTime: number // Tempo total de CPU necessário
  remainingTime: number // Tempo restante de CPU
  tickets: number // Número de bilhetes (prioridade)
  startTime: number // Tempo em que o processo começou a executar pela primeira vez
  endTime: number // Tempo em que o processo terminou
  turnaroundTime: number // Tempo total desde a chegada até a conclusão
  waitingTime: number // Tempo de espera (turnaround - burst)
  isFinished: boolean // Indica se o processo foi concluído
}

// Interface que define um registro de execução para o gráfico Gantt
export interface ExecutionLog {
  time: number // Tempo da execução
  processId: string // ID do processo que estava em execução (ou "idle" se ocioso)
}
