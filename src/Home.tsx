'use client'

import type React from 'react'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

const Home: React.FC = () => {
    const navigate = useNavigate()
    const [nextRaceTime, setNextRaceTime] = useState(15 * 60) // 15 minutes in seconds

    useEffect(() => {
        const timer = setInterval(() => {
            setNextRaceTime(prev => (prev > 0 ? prev - 1 : 0))
        }, 1000)
        return () => clearInterval(timer)
    }, [])

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60)
        const secs = seconds % 60
        return `${mins}:${secs.toString().padStart(2, '0')}`
    }

    return (
        <div className="min-h-screen bg-[#121212] text-white">
            {/* Hero Section */}
            <div className="relative h-[60vh] md:h-[70vh] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#121212]/50 to-[#121212]" />
                <img
                    src="/dramatic-horse-racing-action-shot-with-jockey.jpg"
                    alt="Horse Racing"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
                    <div className="inline-flex items-center gap-2 bg-red-600 px-4 py-2 rounded-full mb-4 animate-pulse">
                        <span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
                        </span>
                        <span className="text-sm font-bold uppercase tracking-wider">En Vivo Ahora</span>
                    </div>
                    <h1 className="text-4xl md:text-7xl font-black uppercase tracking-tight mb-4 text-balance">
                        La Emoción de las Carreras
                    </h1>
                    <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl text-balance">
                        Programas completos, estadísticas en tiempo real y transmisiones en vivo
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <button
                            onClick={() => navigate('/live')}
                            className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all transform hover:scale-105"
                        >
                            Ver Transmisión
                        </button>
                        <button
                            onClick={() => navigate('/programs')}
                            className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-lg font-bold text-lg transition-all border-2 border-white/20"
                        >
                            Ver Programas
                        </button>
                    </div>
                </div>
            </div>

            {/* Stats Bar */}
            <div className="bg-[#1a1a1a] border-y border-white/10">
                <div className="max-w-7xl mx-auto px-4 py-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
                        <div className="text-center">
                            <div className="text-3xl md:text-4xl font-black text-red-500 mb-1">+24</div>
                            <div className="text-xs md:text-sm text-gray-400 uppercase tracking-wide">
                                Carreras Hoy
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl md:text-4xl font-black text-yellow-500 mb-1">+200</div>
                            <div className="text-xs md:text-sm text-gray-400 uppercase tracking-wide">
                                Caballos Activos
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl md:text-4xl font-black text-blue-500 mb-1">3</div>
                            <div className="text-xs md:text-sm text-gray-400 uppercase tracking-wide">
                                Hipódromos
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl md:text-4xl font-black text-green-500 mb-1">
                                {formatTime(nextRaceTime)}
                            </div>
                            <div className="text-xs md:text-sm text-gray-400 uppercase tracking-wide">
                                Para nuestra actualización
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
                {/* Featured Section */}
                <div className="mb-12">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tight">
                            Carreras Destacadas
                        </h2>
                        <button
                            onClick={() => navigate('/programs')}
                            className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-1"
                        >
                            Ver Todas
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 5l7 7-7 7"
                                />
                            </svg>
                        </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {[3].map(i => (
                            <div
                                key={i}
                                onClick={() => navigate('/programs')}
                                className="relative group cursor-pointer overflow-hidden rounded-xl bg-[#1a1a1a] border border-white/10 hover:border-red-500/50 transition-all"
                            >
                                <div className="aspect-video relative overflow-hidden">
                                    <img
                                        src={`/horse-racing-track-number-.jpg?height=300&width=400&query=horse racing track number ${i}`}
                                        alt={`Race ${i}`}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold">
                                        CARRERA {i}
                                    </div>
                                </div>
                                <div className="p-4">
                                    <h3 className="font-bold text-lg mb-1">Hipódromo de Palermo</h3>
                                    <p className="text-sm text-gray-400">1200m • 14:30 hs</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Quick Access Cards */}
                <div className="mb-12">
                    <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tight mb-6">
                        Acceso Rápido
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <button
                            onClick={() => navigate('/programs')}
                            className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl p-6 md:p-8 text-left hover:scale-105 transition-transform group"
                        >
                            <div className="bg-white/10 rounded-lg p-3 w-fit mb-4 group-hover:bg-white/20 transition-colors">
                                <svg
                                    className="w-8 h-8"
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
                            </div>
                            <h3 className="text-2xl font-black mb-2">Programas</h3>
                            <p className="text-sm text-blue-100">
                                Consulta todas las carreras organizadas por fecha e hipódromo
                            </p>
                        </button>

                        <button
                            onClick={() => navigate('/horses')}
                            className="bg-gradient-to-br from-green-600 to-green-800 rounded-xl p-6 md:p-8 text-left hover:scale-105 transition-transform group"
                        >
                            <div className="bg-white/10 rounded-lg p-3 w-fit mb-4 group-hover:bg-white/20 transition-colors">
                                <svg
                                    className="w-8 h-8"
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
                            <h3 className="text-2xl font-black mb-2">Caballos</h3>
                            <p className="text-sm text-green-100">
                                Explora la base de datos completa con estadísticas detalladas
                            </p>
                        </button>

                        <button
                            onClick={() => navigate('/live')}
                            className="bg-gradient-to-br from-red-600 to-red-800 rounded-xl p-6 md:p-8 text-left hover:scale-105 transition-transform group relative overflow-hidden"
                        >
                            <div className="absolute top-3 right-3">
                                <span className="relative flex h-3 w-3">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
                                </span>
                            </div>
                            <div className="bg-white/10 rounded-lg p-3 w-fit mb-4 group-hover:bg-white/20 transition-colors">
                                <svg
                                    className="w-8 h-8"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                                    />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-black mb-2 flex items-center gap-2">
                                En Vivo
                                <span className="text-xs font-bold bg-white/20 px-2 py-1 rounded-full">
                                    LIVE
                                </span>
                            </h3>
                            <p className="text-sm text-red-100">
                                Transmisión en directo de las carreras del día
                            </p>
                        </button>
                    </div>
                </div>

                {/* Featured Horses */}
                <div>
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tight">
                            Caballos Destacados
                        </h2>
                        <button
                            onClick={() => navigate('/horses')}
                            className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-1"
                        >
                            Ver Todos
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 5l7 7-7 7"
                                />
                            </svg>
                        </button>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {['GOLDEN STAR', 'HAPPY QUEEN'].map((name, i) => (
                            <div
                                key={i}
                                onClick={() => navigate('/horses')}
                                className="bg-[#1a1a1a] rounded-xl overflow-hidden border border-white/10 hover:border-yellow-500/50 transition-all cursor-pointer group"
                            >
                                <div className="aspect-square relative overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900">
                                    <img
                                        src={`/champion-race-horse-portrait-.jpg?height=300&width=300&query=champion race horse portrait ${i + 1}`}
                                        alt={name}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className="absolute top-2 left-2 bg-yellow-500 text-black px-2 py-1 rounded text-xs font-bold">
                                        #{i + 1}
                                    </div>
                                </div>
                                <div className="p-3">
                                    <h3 className="font-bold text-sm mb-1">{name}</h3>
                                    <p className="text-xs text-gray-400">6P • 57kg</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home
