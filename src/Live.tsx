'use client'

import type React from 'react'
import { useState, useEffect } from 'react'
import BackButton from './BackButton'

const Live: React.FC = () => {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    console.log(setError)

    useEffect(() => {
        // Simular carga
        const timer = setTimeout(() => {
            setLoading(false)
        }, 500)
        return () => clearTimeout(timer)
    }, [])

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-100 p-4 md:p-6">
                <BackButton />
                <div className="max-w-6xl mx-auto mt-6">
                    <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
                        <div className="animate-pulse">
                            <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
                            <div className="h-64 bg-gray-200 rounded"></div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-100 p-4 md:p-6">
                <BackButton />
                <div className="max-w-6xl mx-auto mt-6">
                    <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
                        <p className="text-red-600">{error}</p>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-100 p-4 md:p-6">
            <BackButton />

            <div className="max-w-6xl mx-auto mt-6">
                <div className="bg-white rounded-lg shadow-md p-4 md:p-6 mb-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="relative">
                            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                            <div className="absolute inset-0 w-3 h-3 bg-red-500 rounded-full animate-ping"></div>
                        </div>
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Transmisión en Vivo</h1>
                    </div>

                    <div className="bg-gray-900 rounded-lg aspect-video flex items-center justify-center">
                        <div className="text-center text-white p-6">
                            <svg
                                className="w-16 h-16 mx-auto mb-4 text-gray-400"
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
                            <p className="text-lg mb-2">No hay transmisión activa</p>
                            <p className="text-sm text-gray-400">
                                La transmisión comenzará cuando haya carreras en vivo
                            </p>
                        </div>
                    </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 md:p-6">
                    <h2 className="text-lg font-semibold text-blue-900 mb-2">Próximas transmisiones</h2>
                    <p className="text-sm text-blue-700">
                        Las transmisiones en vivo estarán disponibles durante los días de carrera. Vuelve a
                        consultar el horario de las carreras en la sección de Programas.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Live
