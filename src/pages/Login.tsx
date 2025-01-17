import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MainLayout } from '../layout'

export const Login: React.FC = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Aquí puedes agregar la lógica para manejar la autenticación
        console.log('Email:', email)
        console.log('Password:', password)
    }

    return (
        <MainLayout>
            <div className="h-full flex justify-center">
                <div className="bg-gray-100 p-8 rounded shadow-md w-full mt-16 max-w-md h-1/2">
                    <h2 className="text-2xl font-bold mb-6 text-center">Iniciar Sesión</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2" htmlFor="email">
                                Correo Electrónico
                            </label>
                            <input
                                type="email"
                                id="email"
                                className="w-full px-3 py-2 border rounded"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700 mb-2" htmlFor="password">
                                Contraseña
                            </label>
                            <input
                                type="password"
                                id="password"
                                className="w-full px-3 py-2 border rounded"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-700 mb-4"
                        >
                            Iniciar Sesión
                        </button>
                    </form>
                    <button
                        className="w-full bg-gray-500 text-white py-2 rounded hover:bg-gray-700"
                        onClick={() => navigate('/register')}
                    >
                        Registrarse
                    </button>
                </div>
            </div>
        </MainLayout>
    )
}
