import Image from "next/image"
import { SyntheticEvent } from "react"

export default function SecaoPreviaSimulador() {
  return (
    <section className="mb-16">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
        <div className="p-4 bg-gray-50 border-b border-gray-200">
          <h3 className="text-xl font-bold text-gray-800">Prévia do Simulador</h3>
        </div>
        <div className="p-2">
          <Image
            src="/simulador-preview.png"
            alt="Prévia do Simulador"
            width={1200}
            height={675}
            className="w-full h-auto rounded-lg shadow-sm"
            onError={(e: SyntheticEvent<HTMLImageElement>) => {
              const target = e.target as HTMLImageElement
              target.src = "/lottery-scheduling-simulator.png"
            }}
          />
        </div>
      </div>
    </section>
  )
} 