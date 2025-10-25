'use client'

import type React from 'react'
import { useState, useEffect } from 'react'
import BackButton from './BackButton'
import HorseCard from './HorseCard'
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

const Horses: React.FC = () => {
    const [horses, setHorses] = useState<Horse[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [currentPage, setCurrentPage] = useState(1)
    const [limit] = useState(12)
    const [hasMore, setHasMore] = useState(true)
    const [searchTerm, setSearchTerm] = useState('')

    useEffect(() => {
        const fetchHorses = async () => {
            try {
                setLoading(true)
                setError(null)
                const response = await fetch(
                    `http://127.0.0.1:8000/turf/horses?page=${currentPage}&limit=${limit}`,
                )

                if (!response.ok) {
                    throw new Error('Error al cargar los caballos')
                }

                const data = await response.json()
                setHorses(data)
                setHasMore(data.length === limit)
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Error desconocido')
            } finally {
                setLoading(false)
            }
        }

        fetchHorses()
    }, [currentPage, limit])

    const filteredHorses = horses.filter(
        horse =>
            horse.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
            horse.numero.includes(searchTerm) ||
            horse.jockey?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            horse.entrenador?.toLowerCase().includes(searchTerm.toLowerCase()),
    )

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1)
            window.scrollTo({ top: 0, behavior: 'smooth' })
        }
    }

    const handleNextPage = () => {
        if (hasMore) {
            setCurrentPage(currentPage + 1)
            window.scrollTo({ top: 0, behavior: 'smooth' })
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 pb-8">
            <div className="bg-white shadow-sm border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 py-4 sm:py-6">
                    <div className="flex items-center gap-4 mb-3 sm:mb-4">
                        <BackButton />
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Caballos</h1>
                    <p className="text-gray-600 mt-1 sm:mt-2 text-sm sm:text-base">
                        Lista completa de caballos registrados
                    </p>

                    <div className="mt-4">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Buscar por nombre, número, jockey o entrenador..."
                                value={searchTerm}
                                onChange={e => setSearchTerm(e.target.value)}
                                className="w-full px-4 py-2.5 sm:py-3 pl-10 pr-4 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                            />
                            <svg
                                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                />
                            </svg>
                            {searchTerm && (
                                <button
                                    onClick={() => setSearchTerm('')}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                    <svg
                                        className="w-5 h-5"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                </button>
                            )}
                        </div>
                        {searchTerm && !loading && (
                            <p className="text-sm text-gray-600 mt-2">
                                {filteredHorses.length}{' '}
                                {filteredHorses.length === 1 ? 'resultado' : 'resultados'} encontrados
                            </p>
                        )}
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-4 sm:py-8">
                {loading && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                        {[1, 2, 3, 4, 5, 6].map(i => (
                            <div
                                key={i}
                                className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 animate-pulse"
                            >
                                <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                                <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                            </div>
                        ))}
                    </div>
                )}

                {error && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 sm:p-6 text-center">
                        <p className="text-red-800 font-medium">Error</p>
                        <p className="text-red-600 mt-2 text-sm sm:text-base">{error}</p>
                    </div>
                )}

                {!loading && !error && filteredHorses.length === 0 && (
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 sm:p-12 text-center">
                        <p className="text-gray-500 text-base sm:text-lg">
                            {searchTerm
                                ? 'No se encontraron caballos con ese criterio de búsqueda'
                                : 'No hay caballos registrados'}
                        </p>
                    </div>
                )}

                {!loading && !error && filteredHorses.length > 0 && (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                            {filteredHorses.map(horse => (
                                <HorseCard key={horse.id} horse={horse} />
                            ))}
                        </div>

                        <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
                            <button
                                onClick={handlePreviousPage}
                                disabled={currentPage === 1}
                                className="w-full sm:w-auto px-6 py-2 bg-white border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm sm:text-base"
                            >
                                Anterior
                            </button>

                            <span className="text-gray-700 font-medium text-sm sm:text-base">
                                Página {currentPage}
                            </span>

                            <button
                                onClick={handleNextPage}
                                disabled={!hasMore}
                                className="w-full sm:w-auto px-6 py-2 bg-white border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm sm:text-base"
                            >
                                Siguiente
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}

export default Horses
