import type React from 'react'

interface Horse {
    id: number
    numero: string
    nombre: string
    peso: number
    jockey: string
    entrenador: string
    padre_madre: string
    ultimas: string
    created_at: string
    page: number
    raw_rest: string
    line_index: number
}

interface HorseCardProps {
    horse: Horse
}

const HorseCard: React.FC<HorseCardProps> = ({ horse }) => {
    return (
        <div className="group bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl border border-gray-700 hover:border-blue-500 transition-all duration-300 overflow-hidden hover:shadow-2xl hover:shadow-blue-900/20 hover:scale-[1.02]">
            <div className="p-4 sm:p-6">
                <div className="flex items-start justify-between mb-3 sm:mb-4">
                    <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                            <span className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-600 to-blue-700 text-white text-sm sm:text-base font-bold rounded-lg shadow-lg">
                                {horse.numero}
                            </span>
                            <h3 className="text-lg sm:text-xl font-bold text-white leading-tight group-hover:text-blue-400 transition-colors">
                                {horse.nombre}
                            </h3>
                        </div>
                        <div className="flex items-center gap-2 flex-wrap">
                            <span className="inline-block px-3 py-1 bg-gray-700 text-gray-200 text-xs font-semibold rounded-full border border-gray-600">
                                {horse.peso} kg
                            </span>
                            {horse.ultimas && (
                                <span className="inline-block px-3 py-1 bg-blue-900/50 text-blue-300 text-xs font-semibold rounded-full border border-blue-800">
                                    {horse.ultimas}
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
                    {horse.jockey && (
                        <div className="flex items-start">
                            <span className="text-gray-400 font-semibold min-w-[80px] sm:min-w-[90px]">
                                Jockey:
                            </span>
                            <span className="text-gray-200 leading-relaxed">{horse.jockey}</span>
                        </div>
                    )}

                    {horse.entrenador && (
                        <div className="flex items-start">
                            <span className="text-gray-400 font-semibold min-w-[80px] sm:min-w-[90px]">
                                Entrenador:
                            </span>
                            <span className="text-gray-200 leading-relaxed">{horse.entrenador}</span>
                        </div>
                    )}

                    {horse.padre_madre && (
                        <div className="flex items-start">
                            <span className="text-gray-400 font-semibold min-w-[80px] sm:min-w-[90px]">
                                Padres:
                            </span>
                            <span className="text-gray-200 text-xs leading-relaxed break-words">
                                {horse.padre_madre}
                            </span>
                        </div>
                    )}
                </div>
            </div>

            <div className="px-4 py-3 sm:px-6 sm:py-4 bg-gray-900/50 border-t border-gray-700">
                <p className="text-xs text-gray-400">
                    Registrado:{' '}
                    <span className="text-gray-300 font-medium">
                        {new Date(horse.created_at).toLocaleDateString('es-ES', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                        })}
                    </span>
                </p>
            </div>
        </div>
    )
}

export default HorseCard
