import React from 'react'

interface ButtonProps {
    label: string
    onClick?: () => void
}

export const Button: React.FC<ButtonProps> = ({ label, onClick }) => {
    return (
        <button
            className="bg-white text-gray-900 hover:bg-gray-100 border-gray-300 shadow-lg p-4 rounded-xl"
            onClick={onClick}
        >
            {label}
        </button>
    )
}
