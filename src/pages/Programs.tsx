import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { programs } from '../assets/programs'
import { MainLayout } from '../layout'

export const Programs: React.FC = () => {
    const navigate = useNavigate()

    const hipodromos = Array.from(new Set(programs.map(p => p.hipodromo)))
    const [selectedHipodromo, setSelectedHipodromo] = useState(hipodromos[0])

    const filtered = programs.filter(p => p.hipodromo === selectedHipodromo)

    return (
        <MainLayout>
            <div className="min-h-screen bg-[#121212] text-white">
                {/* Page Header */}
                <div className="px-4 pt-8 pb-4 max-w-7xl mx-auto">
                    <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tight mb-1">
                        Programas
                    </h1>
                    <p className="text-gray-400 text-sm md:text-base">
                        Seleccioná un hipódromo para ver sus fechas disponibles
                    </p>
                </div>

                {/* Hipódromo Selector — sticky tabs */}
                <div className="sticky top-0 z-10 bg-[#121212]/95 backdrop-blur-sm border-b border-white/10">
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="flex gap-2 overflow-x-auto py-3 scrollbar-hide">
                            {hipodromos.map(hip => (
                                <button
                                    key={hip}
                                    onClick={() => setSelectedHipodromo(hip)}
                                    className={`flex-shrink-0 px-5 py-2.5 rounded-full text-sm font-bold transition-all whitespace-nowrap ${
                                        selectedHipodromo === hip
                                            ? 'bg-red-600 text-white'
                                            : 'bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white'
                                    }`}
                                >
                                    {hip}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Programs Grid */}
                <div className="max-w-7xl mx-auto px-4 py-6">
                    <div className="flex items-center gap-2 mb-5">
                        <h2 className="text-lg font-bold uppercase tracking-wide text-gray-200">
                            {selectedHipodromo}
                        </h2>
                        <span className="text-xs bg-white/10 text-gray-400 px-2 py-1 rounded-full">
                            {filtered.length} {filtered.length === 1 ? 'fecha' : 'fechas'}
                        </span>
                    </div>

                    {filtered.length === 0 ? (
                        <div className="text-center py-16 text-gray-500">
                            No hay programas disponibles para este hipódromo.
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {filtered.map((program, index) => {
                                const [year, month, day] = program.date.split('-')
                                const raceCount = program.races.length
                                return (
                                    <button
                                        key={index}
                                        onClick={() =>
                                            navigate(
                                                `/program/${program.date}/${program.hipodromo}`,
                                                { state: { races: program.races } }
                                            )
                                        }
                                        className="group text-left bg-[#1a1a1a] border border-white/10 hover:border-red-500/60 rounded-xl p-5 transition-all hover:bg-[#1f1f1f]"
                                    >
                                        <div className="flex items-start justify-between mb-3">
                                            <div className="bg-red-600/20 text-red-400 rounded-lg px-3 py-1 text-xs font-bold uppercase tracking-wider">
                                                {program.hipodromo}
                                            </div>
                                            <svg
                                                className="w-5 h-5 text-gray-600 group-hover:text-red-500 transition-colors mt-0.5"
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

                                        <div className="mb-3">
                                            <p className="text-3xl font-black text-white">
                                                {day}/{month}
                                            </p>
                                            <p className="text-sm text-gray-500">{year}</p>
                                        </div>

                                        <div className="flex items-center gap-1.5 text-xs text-gray-400">
                                            <svg
                                                className="w-3.5 h-3.5"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                                                />
                                            </svg>
                                            {raceCount} {raceCount === 1 ? 'carrera' : 'carreras'}
                                        </div>
                                    </button>
                                )
                            })}
                        </div>
                    )}
                </div>
            </div>
        </MainLayout>
    )
}
