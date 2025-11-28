'use client'

import type React from 'react'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import BackButton from './BackButton'
import HorseCard from './HorseCard'
import { BACKEND_URL } from './config'
import { UUIDTypes } from 'uuid'

interface Race {
    numero: number
    nombre: string | null
    fecha: string
    distancia: number | null
    id: number
    hipodromo: string
    race_id: UUIDTypes
}
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
    race_id: number
}

interface RaceDetail {
    race: Race
    horses: Horse[]
}

const ProgramDetail: React.FC = () => {
    const { race_id } = useParams<{ race_id: UUIDTypes }>()
    const [raceDetail, setRaceDetail] = useState<RaceDetail | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        if (race_id) {
            fetchRaceDetail(race_id)
        }
    }, [race_id])

    const fetchRaceDetail = async (raceId: UUIDTypes) => {
        try {
            setLoading(true)
            setError(null)
            const response = await fetch(`${BACKEND_URL}/general/races/${raceId}`)

            if (!response.ok) {
                throw new Error('Error al cargar los detalles de la carrera')
            }

            const data = await response.json()
            setRaceDetail(data)
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error desconocido')
        } finally {
            setLoading(false)
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
                <div className="relative bg-gradient-to-r from-gray-900 to-gray-800 border-b border-gray-700">
                    <div className="relative max-w-7xl mx-auto px-4 py-6 sm:py-10">
                        <BackButton />
                    </div>
                </div>
                <div className="max-w-7xl mx-auto px-4 py-12">
                    <div className="flex items-center justify-center">
                        <div className="text-center">
                            <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent mb-4"></div>
                            <p className="text-gray-300 text-lg">Cargando detalles...</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    if (error || !raceDetail) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
                <div className="relative bg-gradient-to-r from-gray-900 to-gray-800 border-b border-gray-700">
                    <div className="relative max-w-7xl mx-auto px-4 py-6 sm:py-10">
                        <BackButton />
                    </div>
                </div>
                <div className="max-w-7xl mx-auto px-4 py-12">
                    <div className="bg-red-900/20 border border-red-800 rounded-xl p-6 text-center backdrop-blur-sm">
                        <p className="text-red-400 font-semibold text-lg mb-4">
                            Error: {error || 'No se encontró la carrera'}
                        </p>
                        <button
                            onClick={() => race_id && fetchRaceDetail(race_id)}
                            className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-semibold"
                        >
                            Reintentar
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    const { race, horses } = raceDetail

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
            {/* Hero Section with Race Info */}
            <div className="relative bg-gradient-to-r from-gray-900 to-gray-800 border-b border-gray-700">
                <div className="absolute inset-0 bg-[url('/dramatic-horse-racing-action-shot-with-jockey.jpg')] bg-cover bg-center opacity-10"></div>
                <div className="relative max-w-7xl mx-auto px-4 py-6 sm:py-10">
                    <BackButton />

                    <div className="mt-6 bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-2xl border border-gray-700 overflow-hidden shadow-2xl">
                        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-4 sm:px-6 sm:py-5">
                            <div className="flex items-center gap-4">
                                <span className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-white text-gray-900 text-xl sm:text-2xl font-bold rounded-xl shadow-lg">
                                    {race.numero}
                                </span>
                                <div>
                                    <h1 className="text-2xl sm:text-3xl font-bold text-white">
                                        {race.nombre || 'Sin nombre'}
                                    </h1>
                                    <p className="text-blue-100 text-sm sm:text-base mt-1">
                                        Detalles de la Carrera
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="p-4 sm:p-6">
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                                <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                                    <p className="text-xs sm:text-sm text-gray-400 font-semibold mb-2">
                                        Hipódromo
                                    </p>
                                    <p className="text-sm sm:text-base text-white font-bold">
                                        {race.hipodromo}
                                    </p>
                                </div>

                                {race.distancia && (
                                    <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                                        <p className="text-xs sm:text-sm text-gray-400 font-semibold mb-2">
                                            Distancia
                                        </p>
                                        <p className="text-sm sm:text-base text-white font-bold">
                                            {race.distancia}m
                                        </p>
                                    </div>
                                )}

                                <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                                    <p className="text-xs sm:text-sm text-gray-400 font-semibold mb-2">
                                        Fecha
                                    </p>
                                    <p className="text-sm sm:text-base text-white font-bold">
                                        {new Date(race.fecha).toLocaleDateString('es-ES', {
                                            day: '2-digit',
                                            month: '2-digit',
                                            year: 'numeric',
                                        })}
                                    </p>
                                </div>

                                <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                                    <p className="text-xs sm:text-sm text-gray-400 font-semibold mb-2">
                                        Hora
                                    </p>
                                    <p className="text-sm sm:text-base text-white font-bold">
                                        {new Date(race.fecha).toLocaleTimeString('es-ES', {
                                            hour: '2-digit',
                                            minute: '2-digit',
                                        })}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Horses Section */}
            <div className="max-w-7xl mx-auto px-4 py-6 sm:py-10">
                <div className="mb-6">
                    <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">Caballos Participantes</h2>
                    <p className="text-gray-400 text-sm sm:text-base">
                        <span className="text-blue-400 font-semibold">{horses.length}</span>{' '}
                        {horses.length === 1 ? 'caballo inscrito' : 'caballos inscritos'}
                    </p>
                </div>

                {horses.length === 0 ? (
                    <div className="bg-gray-800 border border-gray-700 rounded-xl p-12 text-center">
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
                                    d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                                />
                            </svg>
                        </div>
                        <p className="text-gray-300 text-lg">No hay caballos inscritos en esta carrera</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                        {horses.map(horse => (
                            <HorseCard key={horse.id} horse={horse} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default ProgramDetail
