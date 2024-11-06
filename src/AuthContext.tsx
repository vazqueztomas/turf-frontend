import React, { createContext, useState } from 'react'

interface AuthContextType {
    isAuthenticated: boolean
    loginAuthContext: () => void
    logoutAuthContext: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    const loginAuthContext = () => {
        setIsAuthenticated(true)
    }

    const logoutAuthContext = () => {
        setIsAuthenticated(false)
    }

    return <AuthContext.Provider value={{ isAuthenticated, loginAuthContext, logoutAuthContext }}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
    const context = React.useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within a AuthProvider')
    }
    return context
}
