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
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200">
            <div className="p-4 sm:p-6">
                <div className="flex items-start justify-between mb-3 sm:mb-4">
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="inline-flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 bg-gray-900 text-white text-xs sm:text-sm font-bold rounded">
                                {horse.numero}
                            </span>
                            <h3 className="text-lg sm:text-xl font-bold text-gray-900 leading-tight">
                                {horse.nombre}
                            </h3>
                        </div>
                        <div className="flex items-center gap-2 flex-wrap">
                            <span className="inline-block px-2 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded">
                                {horse.peso} kg
                            </span>
                            {horse.ultimas && (
                                <span className="inline-block px-2 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded">
                                    {horse.ultimas}
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
                    {horse.jockey && (
                        <div className="flex items-start">
                            <span className="text-gray-500 font-medium min-w-[70px] sm:min-w-[80px]">
                                Jockey:
                            </span>
                            <span className="text-gray-900 leading-relaxed">{horse.jockey}</span>
                        </div>
                    )}

                    {horse.entrenador && (
                        <div className="flex items-start">
                            <span className="text-gray-500 font-medium min-w-[70px] sm:min-w-[80px]">
                                Entrenador:
                            </span>
                            <span className="text-gray-900 leading-relaxed">{horse.entrenador}</span>
                        </div>
                    )}

                    {horse.padre_madre && (
                        <div className="flex items-start">
                            <span className="text-gray-500 font-medium min-w-[70px] sm:min-w-[80px]">
                                Padres:
                            </span>
                            <span className="text-gray-900 text-xs leading-relaxed break-words">
                                {horse.padre_madre}
                            </span>
                        </div>
                    )}
                </div>
            </div>

            <div className="px-4 py-2 sm:px-6 sm:py-3 bg-gray-50 border-t border-gray-100 rounded-b-lg">
                <p className="text-xs text-gray-500">
                    Registrado:{' '}
                    {new Date(horse.created_at).toLocaleDateString('es-ES', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                    })}
                </p>
            </div>
        </div>
    )
}

export default HorseCard
