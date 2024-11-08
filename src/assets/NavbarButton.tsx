import React from 'react'
import { useNavigate } from 'react-router-dom'

interface NavbarButtonProps {
    label: string
    path: string
}

const NavbarButton: React.FC<NavbarButtonProps> = ({ label, path }) => {
    const navigate = useNavigate()

    return (
        <button
            className="px-2 py-2 bg-blue-700 rounded hover:bg-blue-900 text-xs"
            onClick={() => navigate(path)}
        >
            {label}
        </button>
    )
}

export default NavbarButton
