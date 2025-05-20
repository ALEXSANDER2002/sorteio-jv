import Image from "next/image"
import { SyntheticEvent } from "react"

export default function SecaoUniversidade() {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-xl shadow-lg overflow-hidden">
      <div className="md:flex">
        <div className="md:w-1/3 p-8 flex items-center justify-center bg-blue-900/30">
          <Image
            src="/unifesspa-logo.png"
            alt="Logo da UNIFESSPA"
            width={200}
            height={200}
            className="max-w-[200px] max-h-[200px]"
            onError={(e: SyntheticEvent<HTMLImageElement>) => {
              const target = e.target as HTMLImageElement
              target.src = "/university-emblem.png"
            }}
          />
        </div>
        <div className="md:w-2/3 p-8">
          <h2 className="text-2xl font-bold mb-4">Universidade Federal do Sul e Sudeste do Pará (UNIFESSPA)</h2>
          <p className="mb-4">
            Este projeto foi desenvolvido como parte da disciplina de Sistemas Operacionais, sob orientação do Prof.
            João Victor.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h3 className="font-bold mb-1">Disciplina</h3>
              <p>Sistemas Operacionais - 2023/2</p>
            </div>
            <div>
              <h3 className="font-bold mb-1">Professor</h3>
              <p>Prof. João Victor</p>
            </div>
            <div>
              <h3 className="font-bold mb-1">Curso</h3>
              <p>Engenharia da Computação</p>
            </div>
            <div>
              <h3 className="font-bold mb-1">Semestre</h3>
              <p>2023/2</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 