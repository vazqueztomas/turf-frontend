'use client'

import type React from 'react'
import { useState, useEffect } from 'react'
import BackButton from './BackButton'

const Live: React.FC = () => {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

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

                    <div
                        className="relative w-full"
                        style={{ paddingBottom: '56.25%', marginBottom: '2rem' }}
                    >
                        <iframe
                            className="absolute top-0 left-0 w-full h-full rounded-lg"
                            src="https://www.youtube.com/embed/KmD-CDIWWdc?si=h3THoa1sVR1VVYt0"
                            title="YouTube video player"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen
                        ></iframe>
                    </div>

                    <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                        <iframe
                            className="absolute top-0 left-0 w-full h-full rounded-lg"
                            src="https://www.youtube.com/embed/lR7a1-h5QG0?si=6lPxgYS_Dwzmg-AD"
                            title="YouTube video player"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen
                        ></iframe>
                    </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 md:p-6">
                    <h2 className="text-lg font-semibold text-blue-900 mb-2">Transmisión en Vivo</h2>
                    <p className="text-sm text-blue-700">
                        Disfruta de la transmisión en vivo de las carreras. El video se actualiza
                        automáticamente durante los días de carrera.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Live
