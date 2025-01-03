import React from 'react'

interface ButtonProps {
    label: string
    onClick?: () => void
}

export const Button: React.FC<ButtonProps> = ({ label, onClick }) => {
    return (
        <button
            className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
            onClick={onClick}
        >
            {label}
        </button>
    )
}
