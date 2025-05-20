"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function SecaoHeroi() {
  return (
    <div className="relative overflow-hidden bg-blue-600 text-white">
      {/* Fundo com padrão de circuitos */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[url('/circuit-pattern.png')] bg-repeat opacity-20"></div>
      </div>
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Simulador de Escalonamento por Sorteio
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100">
            Uma implementação interativa do algoritmo Lottery Scheduling para visualizar como os processos são
            gerenciados em sistemas operacionais
          </p>
          <Link href="/simulador">
            <Button
              size="lg"
              className="bg-white text-blue-600 hover:bg-blue-50 text-lg px-8 py-6 rounded-full shadow-lg transition-transform hover:scale-105"
            >
              Iniciar Simulação
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent"></div>
    </div>
  )
} 