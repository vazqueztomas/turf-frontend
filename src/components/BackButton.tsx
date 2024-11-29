import React from 'react'
import { useNavigate } from 'react-router-dom'

export const BackButton: React.FC = () => {
    const navigate = useNavigate()

    return (
        <button
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700"
            onClick={() => navigate(-1)}
        >
            Volver Atrás
        </button>
    )
}
