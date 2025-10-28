'use client'

import type React from 'react'
import { useState, useEffect } from 'react'
import BackButton from './BackButton'
import HorseCard from './HorseCard'
import { BACKEND_URL } from './config'

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
                const response = await fetch(`${BACKEND_URL}/turf/horses?page=${currentPage}&limit=${limit}`)

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
        <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
            {/* Hero Section */}
            <div className="relative bg-gradient-to-r from-gray-900 to-gray-800 border-b border-gray-700">
                <div className="absolute inset-0 bg-[url('/champion-race-horse-portrait-.jpg')] bg-cover bg-center opacity-10"></div>
                <div className="relative max-w-7xl mx-auto px-4 py-6 sm:py-10">
                    <BackButton />
                    <div className="mt-4">
                        <h1 className="text-3xl sm:text-5xl font-bold text-white mb-3 tracking-tight">
                            Base de Datos de Caballos
                        </h1>
                        <p className="text-gray-300 text-base sm:text-lg max-w-2xl">
                            Explora nuestra colección completa de caballos de carrera con información
                            detallada
                        </p>
                    </div>

                    {/* Search Bar */}
                    <div className="mt-6 sm:mt-8">
                        <div className="relative max-w-2xl">
                            <input
                                type="text"
                                placeholder="Buscar por nombre, número, jockey o entrenador..."
                                value={searchTerm}
                                onChange={e => setSearchTerm(e.target.value)}
                                className="w-full px-4 py-3 sm:py-4 pl-12 pr-12 text-sm sm:text-base bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            />
                            <svg
                                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
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
                                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
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
                            <p className="text-sm text-gray-400 mt-3">
                                <span className="text-blue-400 font-semibold">{filteredHorses.length}</span>{' '}
                                {filteredHorses.length === 1
                                    ? 'resultado encontrado'
                                    : 'resultados encontrados'}
                            </p>
                        )}
                    </div>

                    {/* Stats Bar */}
                    {!loading && !error && (
                        <div className="mt-6 sm:mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
                            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-4">
                                <p className="text-gray-400 text-xs sm:text-sm mb-1">Total de caballos</p>
                                <p className="text-white text-xl sm:text-2xl font-bold">+250</p>
                            </div>
                            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-4">
                                <p className="text-gray-400 text-xs sm:text-sm mb-1">Página Actual</p>
                                <p className="text-white text-xl sm:text-2xl font-bold">{currentPage}</p>
                            </div>
                            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-4">
                                <p className="text-gray-400 text-xs sm:text-sm mb-1">Por Página</p>
                                <p className="text-white text-xl sm:text-2xl font-bold">{limit}</p>
                            </div>
                            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-4">
                                <p className="text-gray-400 text-xs sm:text-sm mb-1">Resultados</p>
                                <p className="text-white text-xl sm:text-2xl font-bold">
                                    {filteredHorses.length}
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Content Section */}
            <div className="max-w-7xl mx-auto px-4 py-6 sm:py-10">
                {loading && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                        {[1, 2, 3, 4, 5, 6].map(i => (
                            <div
                                key={i}
                                className="bg-gray-800 border border-gray-700 rounded-xl p-4 sm:p-6 animate-pulse"
                            >
                                <div className="h-6 bg-gray-700 rounded w-3/4 mb-4"></div>
                                <div className="h-4 bg-gray-700 rounded w-1/2 mb-2"></div>
                                <div className="h-4 bg-gray-700 rounded w-2/3"></div>
                            </div>
                        ))}
                    </div>
                )}

                {error && (
                    <div className="bg-red-900/20 border border-red-800 rounded-xl p-6 sm:p-8 text-center backdrop-blur-sm">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-red-900/50 rounded-full mb-4">
                            <svg
                                className="w-8 h-8 text-red-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                        </div>
                        <p className="text-red-400 font-semibold text-lg mb-2">Error al cargar</p>
                        <p className="text-red-300 text-sm sm:text-base">{error}</p>
                    </div>
                )}

                {!loading && !error && filteredHorses.length === 0 && (
                    <div className="bg-gray-800 border border-gray-700 rounded-xl p-8 sm:p-12 text-center">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-700 rounded-full mb-4">
                            <svg
                                className="w-8 h-8 text-gray-400"
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
                        </div>
                        <p className="text-gray-300 text-base sm:text-lg">
                            {searchTerm
                                ? 'No se encontraron caballos con ese criterio'
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

                        {/* Pagination */}
                        <div className="mt-8 sm:mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
                            <button
                                onClick={handlePreviousPage}
                                disabled={currentPage === 1}
                                className="w-full sm:w-auto px-8 py-3 bg-gray-800 border border-gray-700 rounded-xl font-semibold text-white hover:bg-gray-700 disabled:opacity-30 disabled:cursor-not-allowed transition-all text-sm sm:text-base hover:scale-105 active:scale-95"
                            >
                                ← Anterior
                            </button>

                            <div className="flex items-center gap-3 px-6 py-3 bg-gray-800 border border-gray-700 rounded-xl">
                                <span className="text-gray-400 text-sm">Página</span>
                                <span className="text-white font-bold text-lg">{currentPage}</span>
                            </div>

                            <button
                                onClick={handleNextPage}
                                disabled={!hasMore}
                                className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl font-semibold text-white hover:from-blue-700 hover:to-blue-800 disabled:opacity-30 disabled:cursor-not-allowed transition-all text-sm sm:text-base hover:scale-105 active:scale-95 shadow-lg shadow-blue-900/50"
                            >
                                Siguiente →
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}

export default Horses
