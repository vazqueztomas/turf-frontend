import React from 'react'
import { useNavigate } from 'react-router-dom'
import { BackButton } from '../components'
import { programs } from '../assets/programs'
import { MainLayout } from '../layout'

export const Programs: React.FC = () => {
    const navigate = useNavigate()

    return (
        <MainLayout>
            <div className="p-4">
                <h2 className="text-2xl font-bold">Programas disponibles</h2>
                <BackButton />
                <div className="flex flex-wrap gap-4">
                    {programs.map((program, index) => {
                        const [, month, day] = program.date.split('-')
                        return (
                            <button
                                key={index}
                                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                                onClick={() =>
                                    navigate(`/program/${program.date}/${program.hipodromo}`, {
                                        state: { races: program.races },
                                    })
                                }
                            >
                                {day}/{month} - {program.hipodromo}
                            </button>
                        )
                    })}
                </div>
            </div>
        </MainLayout>
    )
}
