import Image from "next/image"
import { SyntheticEvent } from "react"
import type { TeamMember } from "../tipos.d"

export default function SecaoEquipe() {
  const equipe: TeamMember[] = [
    {
      name: "Alexsander",
      role: "Desenvolvedor Full Stack",
      image: "/team/alexsander.jpg",
      gradient: "from-blue-500 to-blue-600",
    },
    {
      name: "João",
      role: "Desenvolvedor Backend",
      image: "/team/joao.jpg",
      gradient: "from-green-500 to-green-600",
    },
    {
      name: "Maria",
      role: "Desenvolvedora Frontend",
      image: "/team/maria.jpg",
      gradient: "from-purple-500 to-purple-600",
    },
  ]

  return (
    <section className="mb-16">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-blue-700 mb-2">Equipe de Desenvolvimento</h2>
        <p className="text-gray-600 max-w-3xl mx-auto">
          Conheça os estudantes responsáveis pelo desenvolvimento deste simulador educacional
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {equipe.map((membro, index) => (
          <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className={`h-64 bg-gradient-to-br ${membro.gradient} relative`}>
              <Image
                src={membro.image}
                alt={membro.name}
                fill
                className="object-cover mix-blend-overlay"
                onError={(e: SyntheticEvent<HTMLImageElement>) => {
                  const target = e.target as HTMLImageElement
                  target.src = "/placeholder.png"
                }}
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-2">{membro.name}</h3>
              <p className="text-gray-600">{membro.role}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
} 