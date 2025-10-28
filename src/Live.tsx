'use client'

import type React from 'react'
import { useState, useEffect } from 'react'
import BackButton from './BackButton'

const Live: React.FC = () => {
    const [loading, setLoading] = useState(true)
    // @ts-expect-error this is spected
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false)
        }, 500)
        return () => clearTimeout(timer)
    }, [])

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
                <div className="relative bg-gradient-to-r from-gray-900 to-gray-800 border-b border-gray-700">
                    <div className="relative max-w-7xl mx-auto px-4 py-6 sm:py-10">
                        <BackButton />
                    </div>
                </div>
                <div className="max-w-6xl mx-auto px-4 py-12">
                    <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 md:p-8 animate-pulse">
                        <div className="h-8 bg-gray-700 rounded w-1/3 mb-4"></div>
                        <div className="h-96 bg-gray-700 rounded"></div>
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
                    </div>
                </div>
                <div className="max-w-6xl mx-auto px-4 py-12">
                    <div className="bg-red-900/20 border border-red-800 rounded-xl p-6 text-center backdrop-blur-sm">
                        <p className="text-red-400">{error}</p>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
            {/* Hero Section */}
            <div className="relative bg-gradient-to-r from-gray-900 to-gray-800 border-b border-gray-700">
                <div className="absolute inset-0 bg-[url('/dramatic-horse-racing-action-shot-with-jockey.jpg')] bg-cover bg-center opacity-10"></div>
                <div className="relative max-w-7xl mx-auto px-4 py-6 sm:py-10">
                    <BackButton />
                    <div className="mt-4">
                        <div className="flex items-center gap-4 mb-3">
                            <div className="relative">
                                <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                                <div className="absolute inset-0 w-4 h-4 bg-red-500 rounded-full animate-ping"></div>
                            </div>
                            <h1 className="text-3xl sm:text-5xl font-bold text-white tracking-tight">
                                Transmisión en Vivo
                            </h1>
                        </div>
                        <p className="text-gray-300 text-base sm:text-lg">
                            Disfruta de las carreras en tiempo real desde cualquier dispositivo
                        </p>
                    </div>
                </div>
            </div>

            {/* Video Section */}
            <div className="max-w-6xl mx-auto px-4 py-6 sm:py-10">
                <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border border-gray-700 overflow-hidden shadow-2xl">
                    <div className="bg-gradient-to-r from-red-600 to-red-700 px-4 py-4 sm:px-6 sm:py-5">
                        <div className="flex items-center gap-3">
                            <div className="relative flex-shrink-0">
                                <div className="w-3 h-3 bg-white rounded-full"></div>
                                <div className="absolute inset-0 w-3 h-3 bg-white rounded-full animate-ping"></div>
                            </div>
                            <div>
                                <h2 className="text-lg sm:text-xl font-bold text-white">EN VIVO AHORA</h2>
                                <p className="text-red-100 text-xs sm:text-sm">Transmisión en directo</p>
                            </div>
                            <div className="ml-auto bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                                <span className="text-white text-xs sm:text-sm font-semibold">HD</span>
                            </div>
                        </div>
                    </div>

                    <div className="p-4 sm:p-6">
                        <div
                            className="relative w-full rounded-xl overflow-hidden shadow-2xl"
                            style={{ paddingBottom: '56.25%' }}
                        >
                            <iframe
                                className="absolute top-0 left-0 w-full h-full"
                                src="https://www.youtube.com/embed/KmD-CDIWWdc?si=ljxynbPvh2MA-0Yd"
                                title="YouTube video player"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                referrerPolicy="strict-origin-when-cross-origin"
                                allowFullScreen
                            />
                        </div>
                    </div>

                    <div className="p-4 sm:p-6">
                        <div
                            className="relative w-full rounded-xl overflow-hidden shadow-2xl"
                            style={{ paddingBottom: '56.25%' }}
                        >
                            <iframe
                                className="absolute top-0 left-0 w-full h-full"
                                src="https://www.youtube.com/embed/lR7a1-h5QG0?si=6lPxgYS_Dwzmg-AD"
                                title="YouTube video player"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                referrerPolicy="strict-origin-when-cross-origin"
                                allowFullScreen
                            />
                        </div>
                    </div>
                </div>

                {/* Info Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                    <div className="bg-gradient-to-br from-blue-900/30 to-blue-800/30 border border-blue-700 rounded-xl p-6 backdrop-blur-sm">
                        <div className="flex items-start gap-4">
                            <div className="flex-shrink-0 w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
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
                                        d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                                    />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-white mb-2">Calidad HD</h3>
                                <p className="text-sm text-blue-200">
                                    Transmisión en alta definición para que no te pierdas ningún detalle de
                                    las carreras
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-purple-900/30 to-purple-800/30 border border-purple-700 rounded-xl p-6 backdrop-blur-sm">
                        <div className="flex items-start gap-4">
                            <div className="flex-shrink-0 w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center">
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
                                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-white mb-2">En Tiempo Real</h3>
                                <p className="text-sm text-purple-200">
                                    Sigue las carreras en vivo con actualizaciones instantáneas durante los
                                    días de competencia
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Live
