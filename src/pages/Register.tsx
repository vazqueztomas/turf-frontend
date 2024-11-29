import React, { useState } from 'react'
import { MainLayout } from '../layout'

export const Register: React.FC = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Aquí puedes agregar la lógica para manejar el registro
        console.log('Email:', email)
        console.log('Password:', password)
        console.log('Confirm Password:', confirmPassword)
    }

    return (
        <MainLayout>
            <div className="h-full flex justify-center">
                <div className="bg-gray-100 p-8 rounded shadow-md w-full mt-8 max-w-md h-3/5">
                    <h2 className="text-2xl font-bold mb-6 text-center">Registrarse</h2>
                    <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center gap-6">
                        <div className="w-full">
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
                        <div className="w-full">
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
                        <div className="w-full">
                            <label className="block text-gray-700 mb-2" htmlFor="confirmPassword">
                                Confirmar Contraseña
                            </label>
                            <input
                                type="password"
                                id="confirmPassword"
                                className="w-full px-3 py-2 border rounded"
                                value={confirmPassword}
                                onChange={e => setConfirmPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-700"
                        >
                            Registrarse
                        </button>
                    </form>
                </div>
            </div>
        </MainLayout>
    )
}
