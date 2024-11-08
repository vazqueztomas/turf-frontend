import React, { useState, useEffect } from 'react'
import { useParams, useLocation, useNavigate } from 'react-router-dom'
import Navbar from './Navbar'

interface RaceDetail {
    horse: string
    jockey: string
    trainer: string
    breeder: string
}

interface Race {
    number: number
    prize: string
    distance: string
    time: string
    details: RaceDetail[]
}

const ProgramDetail: React.FC = () => {
    const { date, hipodromo } = useParams<{ date: string; hipodromo: string }>()
    const location = useLocation()
    const navigate = useNavigate()
    const [selectedRace, setSelectedRace] = useState<Race | null>(null)

    useEffect(() => {
        if (!location.state) {
            // Redirigir a la página principal si no hay estado
            navigate('/programs')
        }
    }, [location.state, navigate])

    if (!location.state) {
        return null
    }

    const { races } = location.state as { races: Race[] }

    return (
        <>
            <Navbar />
            <div className="p-4">
                <h2 className="text-2xl font-bold mb-4">Detalles del Programa</h2>
                <p className="text-lg">Fecha: {date}</p>
                <p className="text-lg">Hipódromo: {hipodromo}</p>

                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white mt-4 border border-gray-300">
                        <thead>
                            <tr>
                                <th className="py-2 px-4 border border-gray-300">N Carrera</th>
                                <th className="py-2 px-4 border border-gray-300">Premio</th>
                                <th className="py-2 px-4 border border-gray-300">Distancia</th>
                                <th className="py-2 px-4 border border-gray-300">Hora</th>
                            </tr>
                        </thead>
                        <tbody>
                            {races.map((race, index) => (
                                <tr key={index}>
                                    <td className="py-2 px-4 border border-gray-300">{race.number}</td>
                                    <td
                                        className="py-2 px-4 border border-gray-300 text-blue-500 cursor-pointer hover:underline"
                                        onClick={() => setSelectedRace(race)}
                                    >
                                        {race.prize}
                                    </td>
                                    <td className="py-2 px-4 border border-gray-300">{race.distance}</td>
                                    <td className="py-2 px-4 border border-gray-300">{race.time}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {selectedRace && (
                    <div className="mt-4 p-4 bg-gray-100 rounded">
                        <h3 className="text-xl font-bold mb-2">Detalles de la Carrera</h3>
                        <p>
                            <strong>Número de Carrera:</strong> {selectedRace.number}
                        </p>
                        <p>
                            <strong>Premio:</strong> {selectedRace.prize}
                        </p>
                        <p>
                            <strong>Distancia:</strong> {selectedRace.distance}
                        </p>
                        <p>
                            <strong>Hora:</strong> {selectedRace.time}
                        </p>

                        <div className="overflow-x-auto mt-4">
                            <table className="min-w-full bg-white border border-gray-300">
                                <thead>
                                    <tr>
                                        <th className="py-2 px-4 border border-gray-300">Caballo</th>
                                        <th className="py-2 px-4 border border-gray-300">Jockey</th>
                                        <th className="py-2 px-4 border border-gray-300">Entrenador</th>
                                        <th className="py-2 px-4 border border-gray-300">Criador</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {selectedRace.details.map((detail, index) => (
                                        <tr key={index}>
                                            <td className="py-2 px-4 border border-gray-300">
                                                {detail.horse}
                                            </td>
                                            <td className="py-2 px-4 border border-gray-300">
                                                {detail.jockey}
                                            </td>
                                            <td className="py-2 px-4 border border-gray-300">
                                                {detail.trainer}
                                            </td>
                                            <td className="py-2 px-4 border border-gray-300">
                                                {detail.breeder}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

export default ProgramDetail
