'use client'

import type React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import BackButton from './BackButton'
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
            const response = await fetch(`${BACKEND_URL}/general/races`)

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
    console.log(groupedRaces)

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
                <div className="relative bg-gradient-to-r from-gray-900 to-gray-800 border-b border-gray-700">
                    <div className="relative max-w-7xl mx-auto px-4 py-6 sm:py-10">
                        <BackButton />
                        <h1 className="text-3xl sm:text-5xl font-bold text-white mt-4 tracking-tight">
                            Programas de Carreras
                        </h1>
                    </div>
                </div>
                <div className="max-w-7xl mx-auto px-4 py-12">
                    <div className="flex items-center justify-center">
                        <div className="text-center">
                            <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent mb-4"></div>
                            <p className="text-gray-300 text-lg">Cargando programas...</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
                <div className="relative bg-gradient-to-r from-gray-900 to-gray-800 border-b border-gray-700">
                    <div className="relative max-w-7xl mx-auto px-4 py-6 sm:py-10">
                        <BackButton />
                        <h1 className="text-3xl sm:text-5xl font-bold text-white mt-4 tracking-tight">
                            Programas de Carreras
                        </h1>
                    </div>
                </div>
                <div className="max-w-7xl mx-auto px-4 py-12">
                    <div className="bg-red-900/20 border border-red-800 rounded-xl p-6 text-center backdrop-blur-sm">
                        <p className="text-red-400 font-semibold text-lg mb-4">Error: {error}</p>
                        <button
                            onClick={fetchRaces}
                            className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-semibold"
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
            <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
                <div className="relative bg-gradient-to-r from-gray-900 to-gray-800 border-b border-gray-700">
                    <div className="relative max-w-7xl mx-auto px-4 py-6 sm:py-10">
                        <BackButton />
                        <h1 className="text-3xl sm:text-5xl font-bold text-white mt-4 tracking-tight">
                            Programas de Carreras
                        </h1>
                    </div>
                </div>
                <div className="max-w-7xl mx-auto px-4 py-12">
                    <div className="bg-gray-800 border border-gray-700 rounded-xl p-12 text-center">
                        <p className="text-gray-300 text-lg">No hay programas disponibles</p>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
            {/* Hero Section */}
            <div className="relative bg-gradient-to-r from-gray-900 to-gray-800 border-b border-gray-700">
                <div className="absolute inset-0 bg-[url('/horse-racing-track-number-.jpg')] bg-cover bg-center opacity-10"></div>
                <div className="relative max-w-7xl mx-auto px-4 py-6 sm:py-10">
                    <BackButton />
                    <div className="mt-4">
                        <h1 className="text-3xl sm:text-5xl font-bold text-white mb-3 tracking-tight">
                            Programas de Carreras
                        </h1>
                        <p className="text-gray-300 text-base sm:text-lg max-w-2xl">
                            Consulta todas las carreras programadas por fecha e hipódromo
                        </p>
                    </div>

                    {/* Stats */}
                    <div className="mt-6 sm:mt-8 grid grid-cols-2 sm:grid-cols-3 gap-4">
                        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-4">
                            <p className="text-gray-400 text-xs sm:text-sm mb-1">Total de Carreras</p>
                            <p className="text-white text-2xl sm:text-3xl font-bold">{races.length}</p>
                        </div>
                        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-4">
                            <p className="text-gray-400 text-xs sm:text-sm mb-1">Hipódromos</p>
                            <p className="text-white text-2xl sm:text-3xl font-bold">
                                {new Set(races.map(r => r.hipodromo)).size}
                            </p>
                        </div>
                        {/* <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-4 col-span-2 sm:col-span-1">
                            <p className="text-gray-400 text-xs sm:text-sm mb-1">Fechas</p>
                            <p className="text-white text-2xl sm:text-3xl font-bold">
                                {Object.keys(groupedRaces).length}
                            </p>
                        </div> */}
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-7xl mx-auto px-4 py-6 sm:py-10">
                <div className="space-y-6 sm:space-y-8">
                    {Object.entries(groupedRaces).map(([key, groupRaces]) => (
                        <div
                            key={key}
                            className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl border border-gray-700 overflow-hidden shadow-2xl"
                        >
                            <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-4 sm:px-6 sm:py-5">
                                <div className="flex items-center gap-3">
                                    <svg
                                        className="w-6 h-6 text-white"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                        />
                                    </svg>
                                    <h2 className="text-lg sm:text-xl font-bold text-white">{key}</h2>
                                    <span className="ml-auto bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-white text-sm font-semibold">
                                        {groupRaces.length} {groupRaces.length === 1 ? 'carrera' : 'carreras'}
                                    </span>
                                </div>
                            </div>

                            <div className="divide-y divide-gray-700">
                                {groupRaces.map(race => (
                                    <div
                                        key={race.race_id}
                                        onClick={() => navigate(`/general/races/${race.race_id}`)}
                                        className="group p-4 sm:p-6 hover:bg-gray-800/50 cursor-pointer transition-all duration-200"
                                    >
                                        <div className="flex items-center justify-between gap-4">
                                            <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
                                                {/* <span className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-blue-600 to-blue-700 text-white text-base sm:text-lg font-bold rounded-xl shadow-lg flex-shrink-0 group-hover:scale-110 transition-transform">
                                                    {race.numero}
                                                </span> */}
                                                <div className="flex-1 min-w-0">
                                                    <h3 className="text-base sm:text-lg font-bold text-white truncate group-hover:text-blue-400 transition-colors">
                                                        {race.nombre || 'Sin nombre'}
                                                    </h3>
                                                    <div className="flex flex-wrap items-center gap-2 mt-2">
                                                        {race.distancia && (
                                                            <span className="inline-flex items-center px-3 py-1 bg-blue-900/50 text-blue-300 rounded-full text-xs font-semibold border border-blue-800">
                                                                {race.distancia || 'Sin definir'}
                                                            </span>
                                                        )}
                                                        <span className="text-gray-400 text-xs sm:text-sm font-medium">
                                                            {race.fecha}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            <svg
                                                className="w-6 h-6 sm:w-7 sm:h-7 text-gray-500 group-hover:text-blue-400 group-hover:translate-x-1 transition-all flex-shrink-0"
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
