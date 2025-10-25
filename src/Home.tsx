'use client'

import type React from 'react'
import { useNavigate } from 'react-router-dom'

const Home: React.FC = () => {
    const navigate = useNavigate()

    return (
        <div className="min-h-screen flex flex-col items-center pt-6 md:pt-10 bg-gray-100 px-4">
            <div className="w-full max-w-2xl grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mt-4">
                <button
                    onClick={() => navigate('/programs')}
                    className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 text-left border-2 border-transparent hover:border-gray-300 group"
                >
                    <div className="flex items-start gap-4">
                        <div className="bg-blue-100 rounded-lg p-3 group-hover:bg-blue-200 transition-colors">
                            <svg
                                className="w-6 h-6 text-blue-600"
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
                        <div className="flex-1">
                            <h3 className="text-xl font-bold text-gray-900 mb-1">Programas</h3>
                            <p className="text-sm text-gray-600">
                                Consulta las carreras por fecha e hipódromo
                            </p>
                        </div>
                    </div>
                </button>

                <button
                    onClick={() => navigate('/horses')}
                    className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 text-left border-2 border-transparent hover:border-gray-300 group"
                >
                    <div className="flex items-start gap-4">
                        <div className="bg-green-100 rounded-lg p-3 group-hover:bg-green-200 transition-colors">
                            <svg
                                className="w-6 h-6 text-green-600"
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
                        <div className="flex-1">
                            <h3 className="text-xl font-bold text-gray-900 mb-1">Caballos</h3>
                            <p className="text-sm text-gray-600">
                                Busca y explora información de todos los caballos
                            </p>
                        </div>
                    </div>
                </button>

                <button
                    onClick={() => navigate('/live')}
                    className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 text-left border-2 border-transparent hover:border-red-300 group md:col-span-2"
                >
                    <div className="flex items-start gap-4">
                        <div className="bg-red-100 rounded-lg p-3 group-hover:bg-red-200 transition-colors relative">
                            <svg
                                className="w-6 h-6 text-red-600"
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
                            <span className="absolute -top-1 -right-1 flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                            </span>
                        </div>
                        <div className="flex-1">
                            <h3 className="text-xl font-bold text-gray-900 mb-1 flex items-center gap-2">
                                Transmitiendo en vivo
                                <span className="text-xs font-normal bg-red-100 text-red-600 px-2 py-1 rounded-full">
                                    LIVE
                                </span>
                            </h3>
                            <p className="text-sm text-gray-600">Mira las carreras en tiempo real</p>
                        </div>
                    </div>
                </button>
            </div>
        </div>
    )
}

export default Home
