import { LucideIcon } from 'lucide-react'
import { ComponentProps, ForwardRefExoticComponent, SVGProps } from 'react'

declare module 'next/link' {
  const Link: React.FC<ComponentProps<'a'>>
  export default Link
}

declare module 'next/image' {
  const Image: React.FC<ComponentProps<'img'>>
  export default Image
}

declare module 'lucide-react' {
  export interface LucideIcon extends ForwardRefExoticComponent<SVGProps<SVGSVGElement>> {
    displayName?: string
  }
}

export interface Feature {
  icon: LucideIcon
  title: string
  description: string
  color: string
}

export interface TeamMember {
  name: string
  role: string
  image: string
  gradient: string
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any
    }
  }
}

export interface Processo {
  id: string
  tempoChegada: number
  tempoCPU: number
  tempoRestante: number
  bilhetes: number
  tempoInicio: number
  tempoFim: number
  tempoRetorno: number
  tempoEspera: number
  finalizado: boolean
  tipo: "CPU" | "I/O"
  estado: "novo" | "pronto" | "executando" | "bloqueado" | "finalizado"
  tempoIO?: number
  tempoIORestante?: number
  ciclosIO?: number
  ciclosIORestantes?: number
}

export interface RegistroExecucao {
  tempo: number
  idProcesso: string
  tipo?: "CPU" | "I/O"
  estado?: "executando" | "bloqueado"
} 