'use client'

import type React from 'react'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import BackButton from './BackButton'
import HorseCard from './HorseCard'

interface Race {
    numero: number
    nombre: string | null
    fecha: string
    distancia: number | null
    id: number
    hipodromo: string
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
    const { id } = useParams<{ id: string }>()
    const [raceDetail, setRaceDetail] = useState<RaceDetail | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        if (id) {
            fetchRaceDetail(id)
        }
    }, [id])

    const fetchRaceDetail = async (raceId: string) => {
        try {
            setLoading(true)
            setError(null)
            const response = await fetch(`http://127.0.0.1:8000/turf/races/${raceId}`)

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
            <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
                <BackButton />
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center justify-center py-12">
                        <div className="text-center">
                            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mb-4"></div>
                            <p className="text-gray-600">Cargando detalles...</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    if (error || !raceDetail) {
        return (
            <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
                <BackButton />
                <div className="max-w-7xl mx-auto">
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
                        <p className="text-red-800 font-medium">
                            Error: {error || 'No se encontró la carrera'}
                        </p>
                        <button
                            onClick={() => id && fetchRaceDetail(id)}
                            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
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
        <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
            <BackButton />
            <div className="max-w-7xl mx-auto">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6 sm:mb-8 overflow-hidden">
                    <div className="bg-gray-900 text-white px-4 py-3 sm:px-6 sm:py-4">
                        <div className="flex items-center gap-3 mb-2">
                            <span className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-white text-gray-900 text-lg sm:text-xl font-bold rounded">
                                {race.numero}
                            </span>
                            <h1 className="text-xl sm:text-2xl font-bold">{race.nombre || 'Sin nombre'}</h1>
                        </div>
                    </div>

                    <div className="p-4 sm:p-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            <div>
                                <p className="text-xs sm:text-sm text-gray-500 font-medium mb-1">Hipódromo</p>
                                <p className="text-sm sm:text-base text-gray-900 font-semibold">
                                    {race.hipodromo}
                                </p>
                            </div>

                            {race.distancia && (
                                <div>
                                    <p className="text-xs sm:text-sm text-gray-500 font-medium mb-1">
                                        Distancia
                                    </p>
                                    <p className="text-sm sm:text-base text-gray-900 font-semibold">
                                        {race.distancia}m
                                    </p>
                                </div>
                            )}

                            <div>
                                <p className="text-xs sm:text-sm text-gray-500 font-medium mb-1">Fecha</p>
                                <p className="text-sm sm:text-base text-gray-900 font-semibold">
                                    {new Date(race.fecha).toLocaleDateString('es-ES', {
                                        day: '2-digit',
                                        month: '2-digit',
                                        year: 'numeric',
                                    })}
                                </p>
                            </div>

                            <div>
                                <p className="text-xs sm:text-sm text-gray-500 font-medium mb-1">Hora</p>
                                <p className="text-sm sm:text-base text-gray-900 font-semibold">
                                    {new Date(race.fecha).toLocaleTimeString('es-ES', {
                                        hour: '2-digit',
                                        minute: '2-digit',
                                    })}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mb-4">
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                        Caballos Participantes
                    </h2>
                    <p className="text-sm sm:text-base text-gray-600">
                        {horses.length} {horses.length === 1 ? 'caballo inscrito' : 'caballos inscritos'}
                    </p>
                </div>

                {horses.length === 0 ? (
                    <div className="bg-gray-100 border border-gray-200 rounded-lg p-8 text-center">
                        <p className="text-gray-600">No hay caballos inscritos en esta carrera</p>
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
