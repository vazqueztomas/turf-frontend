'use client'

import type React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import BackButton from './BackButton'
import { BACKEND_URL } from './config'

interface Race {
    numero: number
    nombre: string | null
    fecha: string
    distancia: number | null
    id: number
    hipodromo: string
}

interface GroupedRaces {
    [key: string]: Race[]
}

const Programs: React.FC = () => {
    const navigate = useNavigate()
    const [races, setRaces] = useState<Race[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        fetchRaces()
    }, [])

    const fetchRaces = async () => {
        try {
            setLoading(true)
            setError(null)
            const response = await fetch(`${BACKEND_URL}/turf/races`)

            if (!response.ok) {
                throw new Error('Error al cargar las carreras')
            }

            const data = await response.json()
            setRaces(data.results || [])
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error desconocido')
        } finally {
            setLoading(false)
        }
    }

    const groupRacesByDateAndHipodromo = (): GroupedRaces => {
        const grouped: GroupedRaces = {}
        races.forEach(race => {
            const key = `${race.hipodromo}`

            if (!grouped[key]) {
                grouped[key] = []
            }
            grouped[key].push(race)
        })

        return grouped
    }

    const groupedRaces = groupRacesByDateAndHipodromo()

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
                <BackButton />
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8">Programas</h1>
                    <div className="flex items-center justify-center py-12">
                        <div className="text-center">
                            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mb-4"></div>
                            <p className="text-gray-600">Cargando programas...</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
                <BackButton />
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8">Programas</h1>
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
                        <p className="text-red-800 font-medium">Error: {error}</p>
                        <button
                            onClick={fetchRaces}
                            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                        >
                            Reintentar
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    if (races.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
                <BackButton />
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8">Programas</h1>
                    <div className="bg-gray-100 border border-gray-200 rounded-lg p-8 text-center">
                        <p className="text-gray-600">No hay programas disponibles</p>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
            <BackButton />
            <div className="max-w-7xl mx-auto">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Programas</h1>
                <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8">
                    {races.length} {races.length === 1 ? 'carrera disponible' : 'carreras disponibles'}
                </p>

                <div className="space-y-6 sm:space-y-8">
                    {Object.entries(groupedRaces).map(([key, groupRaces]) => (
                        <div
                            key={key}
                            className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
                        >
                            <div className="bg-gray-900 text-white px-4 py-3 sm:px-6 sm:py-4">
                                <h2 className="text-lg sm:text-xl font-bold">{key}</h2>
                            </div>

                            <div className="divide-y divide-gray-200">
                                {groupRaces.map(race => (
                                    <div
                                        key={race.id}
                                        onClick={() => navigate(`/program/${race.id}`)}
                                        className="p-4 sm:p-6 hover:bg-gray-50 cursor-pointer transition-colors"
                                    >
                                        <div className="flex items-start justify-between gap-4">
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2 sm:gap-3 mb-2">
                                                    <span className="inline-flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 bg-gray-900 text-white text-sm sm:text-base font-bold rounded flex-shrink-0">
                                                        {race.numero}
                                                    </span>
                                                    <h3 className="text-base sm:text-lg font-bold text-gray-900 truncate">
                                                        {race.nombre || 'Sin nombre'}
                                                    </h3>
                                                </div>

                                                <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-gray-600">
                                                    {race.distancia && (
                                                        <span className="inline-flex items-center px-2 py-1 bg-blue-50 text-blue-700 rounded font-medium">
                                                            {race.distancia}m
                                                        </span>
                                                    )}
                                                    <span className="text-gray-500">{race.fecha}</span>
                                                </div>
                                            </div>

                                            <svg
                                                className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400 flex-shrink-0"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M9 5l7 7-7 7"
                                                />
                                            </svg>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Programs
