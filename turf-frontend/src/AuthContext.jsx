import { createContext, useState, useContext } from 'react';
import { login as loginUser, register as registerUser, getProfile } from './auth';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token') || '');

    const login = async (email, password) => {
        const data = await loginUser(email, password);
        setToken(data.access_token);
        localStorage.setItem('token', data.access_token);
        const userData = await getProfile(data.access_token);
        setUser(userData);
    };

    const register = async (email, password) => {
        await registerUser(email, password);
        await login(email, password);
    };

    const logout = () => {
        setUser(null);
        setToken('');
        localStorage.removeItem('token');
    };

    return (
        <AuthContext.Provider value={{ user, token, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
