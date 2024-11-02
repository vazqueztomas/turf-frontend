import React from 'react'
import { useNavigate } from 'react-router-dom'
import BackButton from './BackButton'
import { programs } from './programData'

const Programs: React.FC = () => {
    const navigate = useNavigate()

    return (
        <div className="p-4">
            <BackButton />
            <h2 className="text-2xl font-bold mb-4">Programas disponibles:</h2>
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
    )
}

export default Programs
