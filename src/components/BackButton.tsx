import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeftIcon } from '@radix-ui/react-icons'

export const BackButton: React.FC = () => {
    const navigate = useNavigate()

    return (
        <button className="my-8 hover:underline text-lg flex gap-2 items-center" onClick={() => navigate(-1)}>
            <ArrowLeftIcon />
            Volver
        </button>
    )
}
