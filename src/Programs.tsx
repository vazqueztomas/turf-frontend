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
    hour: string | null
    // scraper-only fields
    _scraped?: boolean
    _horses?: ScraperHorse[]
}

interface ScraperHorse {
    numero: string
    nombre: string
    sexo: string
    peso: number
    herraje: string
    stud: string
    jockey: string
    peso_jockey: number
    entrenador: string
    padre_madre: string
    ultimas: string
}

const Programs: React.FC = () => {
    const navigate = useNavigate()
    const [races, setRaces] = useState<Race[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [selectedHipodromo, setSelectedHipodromo] = useState<string | null>(null)

    useEffect(() => {
        fetchRaces()
    }, [])

    const fetchRaces = async () => {
        try {
            setLoading(true)
            setError(null)

            const [dbRes, scraperRes] = await Promise.allSettled([
                fetch(`${BACKEND_URL}/general/races?limit=500`),
                fetch(`${BACKEND_URL}/san-isidro/scrape/upcoming`),
            ])

            const dbRaces: Race[] =
                dbRes.status === 'fulfilled' && dbRes.value.ok
                    ? ((await dbRes.value.json()).results ?? [])
                    : []

            let scraperRaces: Race[] = []
            if (scraperRes.status === 'fulfilled' && scraperRes.value.ok) {
                const scraperData = await scraperRes.value.json()
                const dbRaceIds = new Set(dbRaces.map(r => `${r.hipodromo}-${r.numero}-${r.fecha}`))

                scraperRaces = scraperData.races
                    .filter((r: { numero: number }) => {
                        const key = `San Isidro-${r.numero}-${scraperData.fecha}`
                        return !dbRaceIds.has(key)
                    })
                    .map((r: { numero: number; nombre: string; hora: string; distancia: number; horses: ScraperHorse[] }) => ({
                        race_id: `scraped-${scraperData.calendario_id}-${r.numero}` as unknown as UUIDTypes,
                        numero: r.numero,
                        nombre: r.nombre,
                        distancia: r.distancia,
                        fecha: scraperData.fecha,
                        hipodromo: 'San Isidro',
                        hour: r.hora,
                        id: -r.numero,
                        _scraped: true,
                        _horses: r.horses,
                    }))
            }

            const allRaces = [...dbRaces, ...scraperRaces]
            setRaces(allRaces)

            // auto-select first hipódromo
            if (allRaces.length > 0) {
                const first = allRaces[0].hipodromo
                setSelectedHipodromo(prev => prev ?? first)
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error desconocido')
        } finally {
            setLoading(false)
        }
    }

    const hipodromos = Array.from(new Set(races.map(r => r.hipodromo)))

    // Races for the selected hipódromo, grouped by date
    const racesByDate: Record<string, Race[]> = {}
    races
        .filter(r => r.hipodromo === selectedHipodromo)
        .forEach(race => {
            if (!racesByDate[race.fecha]) racesByDate[race.fecha] = []
            racesByDate[race.fecha].push(race)
        })
    const sortedDates = Object.keys(racesByDate).sort((a, b) => b.localeCompare(a))

    const handleRaceClick = (race: Race) => {
        if (race._scraped) {
            navigate(`/program/${race.race_id}`, {
                state: { raceDetail: { race, horses: race._horses ?? [] } },
            })
        } else {
            navigate(`/program/${race.race_id}`)
        }
    }

    const PageShell = ({ children }: { children: React.ReactNode }) => (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
            <div className="relative bg-gradient-to-r from-gray-900 to-gray-800 border-b border-gray-700">
                <div className="absolute inset-0 bg-[url('/horse-racing-track-number-.jpg')] bg-cover bg-center opacity-10" />
                <div className="relative max-w-7xl mx-auto px-4 py-6 sm:py-10">
                    <BackButton />
                    <h1 className="text-3xl sm:text-5xl font-bold text-white mt-4 tracking-tight">
                        Programas de Carreras
                    </h1>
                </div>
            </div>
            {children}
        </div>
    )

    if (loading) {
        return (
            <PageShell>
                <div className="max-w-7xl mx-auto px-4 py-12 flex justify-center">
                    <div className="text-center">
                        <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent mb-4" />
                        <p className="text-gray-300 text-lg">Cargando programas...</p>
                    </div>
                </div>
            </PageShell>
        )
    }

    if (error) {
        return (
            <PageShell>
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
            </PageShell>
        )
    }

    if (races.length === 0) {
        return (
            <PageShell>
                <div className="max-w-7xl mx-auto px-4 py-12">
                    <div className="bg-gray-800 border border-gray-700 rounded-xl p-12 text-center">
                        <p className="text-gray-300 text-lg">No hay programas disponibles</p>
                    </div>
                </div>
            </PageShell>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
            {/* Header */}
            <div className="relative bg-gradient-to-r from-gray-900 to-gray-800 border-b border-gray-700">
                <div className="absolute inset-0 bg-[url('/horse-racing-track-number-.jpg')] bg-cover bg-center opacity-10" />
                <div className="relative max-w-7xl mx-auto px-4 py-6 sm:py-10">
                    <BackButton />
                    <div className="mt-4">
                        <h1 className="text-3xl sm:text-5xl font-bold text-white mb-2 tracking-tight">
                            Programas de Carreras
                        </h1>
                        <p className="text-gray-400 text-sm sm:text-base">
                            Seleccioná un hipódromo para ver sus carreras
                        </p>
                    </div>

                    {/* Stats */}
                    <div className="mt-6 grid grid-cols-2 gap-3 sm:flex sm:gap-4">
                        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg px-4 py-3">
                            <p className="text-gray-400 text-xs mb-0.5">Total carreras</p>
                            <p className="text-white text-2xl font-bold">{races.length}</p>
                        </div>
                        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg px-4 py-3">
                            <p className="text-gray-400 text-xs mb-0.5">Hipódromos</p>
                            <p className="text-white text-2xl font-bold">{hipodromos.length}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Sticky hipódromo tabs */}
            <div className="sticky top-0 z-20 bg-gray-900/95 backdrop-blur-sm border-b border-gray-700">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex gap-2 overflow-x-auto py-3 scrollbar-hide">
                        {hipodromos.map(hip => (
                            <button
                                key={hip}
                                onClick={() => setSelectedHipodromo(hip)}
                                className={`flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all whitespace-nowrap ${
                                    selectedHipodromo === hip
                                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/40'
                                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white border border-gray-700'
                                }`}
                            >
                                {hip}
                                <span
                                    className={`text-xs px-1.5 py-0.5 rounded-full font-bold ${
                                        selectedHipodromo === hip
                                            ? 'bg-white/20 text-white'
                                            : 'bg-gray-700 text-gray-400'
                                    }`}
                                >
                                    {races.filter(r => r.hipodromo === hip).length}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Races grouped by date */}
            <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
                {sortedDates.length === 0 ? (
                    <div className="bg-gray-800 border border-gray-700 rounded-xl p-12 text-center">
                        <p className="text-gray-300 text-lg">No hay carreras para este hipódromo</p>
                    </div>
                ) : (
                    sortedDates.map(fecha => (
                        <div
                            key={fecha}
                            className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl border border-gray-700 overflow-hidden shadow-2xl"
                        >
                            {/* Date header */}
                            <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-3 sm:px-6 sm:py-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <svg
                                            className="w-5 h-5 text-white flex-shrink-0"
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
                                        <h2 className="text-base sm:text-lg font-bold text-white">{fecha}</h2>
                                    </div>
                                    <span className="bg-white/20 px-3 py-1 rounded-full text-white text-xs font-semibold">
                                        {racesByDate[fecha].length}{' '}
                                        {racesByDate[fecha].length === 1 ? 'carrera' : 'carreras'}
                                    </span>
                                </div>
                            </div>

                            {/* Race rows */}
                            <div className="divide-y divide-gray-700">
                                {racesByDate[fecha]
                                    .sort((a, b) => a.numero - b.numero)
                                    .map(race => (
                                        <div
                                            key={String(race.race_id)}
                                            onClick={() => handleRaceClick(race)}
                                            className="group flex items-center gap-3 sm:gap-4 p-4 sm:p-5 hover:bg-gray-800/50 cursor-pointer transition-all"
                                        >
                                            {/* Race number badge */}
                                            <span className="flex-shrink-0 inline-flex items-center justify-center w-10 h-10 bg-blue-900/60 border border-blue-700 text-blue-300 text-sm font-bold rounded-lg group-hover:bg-blue-700 group-hover:text-white transition-colors">
                                                {race.numero}
                                            </span>

                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm sm:text-base font-semibold text-white truncate group-hover:text-blue-300 transition-colors">
                                                    {race.nombre || 'Sin nombre'}
                                                </p>
                                                <div className="flex flex-wrap items-center gap-2 mt-1">
                                                    {race.distancia && (
                                                        <span className="text-xs px-2 py-0.5 bg-blue-900/50 text-blue-300 rounded-full border border-blue-800">
                                                            {race.distancia}m
                                                        </span>
                                                    )}
                                                    {race.hour && (
                                                        <span className="text-xs text-gray-400">{race.hour} hs</span>
                                                    )}
                                                </div>
                                            </div>

                                            <svg
                                                className="w-5 h-5 text-gray-600 group-hover:text-blue-400 group-hover:translate-x-1 transition-all flex-shrink-0"
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
                                    ))}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}

export default Programs
