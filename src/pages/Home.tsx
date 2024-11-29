import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components'
import { MainLayout } from '../layout'

export const Home: React.FC = () => {
    const navigate = useNavigate()

    return (
        <MainLayout>
            <div className="h-full flex flex-col items-center pt-10 gap-2">
                <div className="w-full max-w-xs">
                    <Button label="Programas" onClick={() => navigate('/programs')} />
                </div>
                <div className="w-full max-w-xs">
                    <Button label="Iniciar Sesión" onClick={() => navigate('/login')} />
                </div>
            </div>
        </MainLayout>
    )
}
