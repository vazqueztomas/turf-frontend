import { createContext, useState, useEffect, useContext } from 'react'

const AuthContext = createContext(null)
type Props = { children: React.ReactNode }

export const AuthProvider = ({ children }: Props) => {
    const [token, setToken] = useState(localStorage.getItem('token'))
    const [user, setUser] = useState(null)

    useEffect(() => {
        if (token) {
            localStorage.setItem('token', token)
        } else {
            localStorage.removeItem('token')
        }
    }, [token])

    const login = async (email: string, password: string) => {
        const res = await fetch('http://127.0.0.1:8000/users/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        })

        if (!res.ok) {
            throw new Error('Invalid credentials')
        }

        const data = await res.json()
        setToken(data.access_token)
    }

    const logout = () => {
        setToken(null)
        setUser(null)
    }

    return (
        // @ts-expect-error this is necessary to compile
        <AuthContext.Provider value={{ token, login, logout, user, setUser }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)
