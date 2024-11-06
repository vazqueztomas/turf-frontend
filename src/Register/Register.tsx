import React, { useState } from 'react'
import { createUser } from '../api/api'
import { useNavigate } from 'react-router-dom'

const Register: React.FC = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState<string | null>(null)
    const navigate = useNavigate()

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const handleCreateUser = async (e: React.FormEvent) => {
        e.preventDefault()

        try {
            await createUser(email, password, name)
            setSuccess('Usuario creado exitosamente')
            setError(null)
            navigate('/login')
        } catch (error) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            setError((error as any).message)
            setSuccess(null)
        }
    }

    return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                    <h2 className="text-2xl font-bold mb-6 text-center">Registrarse</h2>
                    <form onSubmit={handleCreateUser}>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2" htmlFor="name">
                                Nombre
                            </label>
                            <input
                                type="text"
                                id="name"
                                className="w-full px-3 py-2 border rounded"
                                value={name}
                                onChange={e => setName(e.target.value)}
                                required
                            />
                        </div>
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
                        <div className="mb-4">
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
                            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-700"
                        >
                            Registrarse
                        </button>
                    </form>
                    {error && <p className="mt-4 text-red-500">{error}</p>}
                    {success && <p className="mt-4 text-green-500">{success}</p>}
                </div>
            </div>
        )
    }

export default Register;
