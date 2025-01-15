import React from 'react'
import { Link } from 'react-router-dom'

const sections = [
    { label: 'Inicio', href: '/' },
    { label: 'Programas', href: '/programs' },
    { label: 'Iniciar sesión', href: '/login' },
]

export const Header: React.FC = () => {
    const location = window.location.pathname

    return (
        <header className="flex items-center justify-between w-full px-12 py-6 bg-gray-100">
            <h1 className="text-3xl font-bold text-blue-500">
                <Link to="/">Turf premium</Link>
            </h1>
            <nav>
                <ul className="flex gap-6">
                    {sections.map((section, index) => (
                        <li key = {index}>
                            <Link
                                key={index}
                                to={section.href}
                                className={`${location === section.href ? 'text-blue-600 hover:underline font-bold' : 'text-blue-500 hover:underline'}`}
                            >
                                {section.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </header>
    )
}
