// Interface que define a estrutura de um processo
export interface Processo {
  id: string // Identificador do processo (P1, P2, etc.)
  tempoChegada: number // Tempo de chegada do processo
  tempoCPU: number // Tempo total de CPU necessário
  tempoRestante: number // Tempo restante de CPU
  bilhetes: number // Número de bilhetes (prioridade)
  tempoInicio: number // Tempo em que o processo começou a executar pela primeira vez
  tempoFim: number // Tempo em que o processo terminou
  tempoRetorno: number // Tempo total desde a chegada até a conclusão
  tempoEspera: number // Tempo de espera (tempoRetorno - tempoCPU)
  finalizado: boolean // Indica se o processo foi concluído
  tipo: "CPU" | "I/O" // Tipo do processo: CPU ou I/O (entrada/saída)
  estado: EstadoProcesso // Estado atual do processo
  tempoIO?: number // Tempo necessário para operação de I/O (apenas para processos I/O)
  tempoIORestante?: number // Tempo restante de operação de I/O (apenas para processos I/O)
  ciclosIO?: number // Número de ciclos de I/O que o processo precisa realizar
  ciclosIORestantes?: number // Número de ciclos de I/O restantes
}

// Enum para os possíveis estados de um processo
export type EstadoProcesso =
  | "novo" // Processo criado mas ainda não chegou
  | "pronto" // Processo pronto para executar
  | "executando" // Processo em execução na CPU
  | "bloqueado" // Processo bloqueado, esperando I/O
  | "finalizado" // Processo concluído

// Interface que define um registro de execução para o gráfico Gantt
export interface RegistroExecucao {
  tempo: number // Tempo da execução
  idProcesso: string // ID do processo que estava em execução (ou "ocioso" se ocioso)
  tipo?: "CPU" | "I/O" // Tipo do processo em execução
  estado?: EstadoProcesso // Estado do processo durante a execução
}
