import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Header, Button } from '../components'

export const Home: React.FC = () => {
    const navigate = useNavigate()

    return (
        <div className="min-h-screen flex flex-col items-center pt-10 bg-gray-100 gap-2">
            <Header />
            <div className="w-full max-w-xs">
                <Button label="Programas" onClick={() => navigate('/programs')} />
            </div>
            <div className="w-full max-w-xs">
                <Button label="Iniciar Sesión" onClick={() => navigate('/login')} />
            </div>
        </div>
    )
}
