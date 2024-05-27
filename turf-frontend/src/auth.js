import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000';

export const register = async (email, password) => {
    try {
        const response = await axios.post(`${API_URL}/users/`, { email, password });
        return response.data;
    } catch (error) {
        if (error.response) {
            throw error.response.data;
        }
        throw new Error('Ocurrió un error inesperado.');
    }
};

export const login = async (email, password) => {
    try {
        const response = await axios.post(`${API_URL}/token/`, `username=${email}&password=${password}`, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });        
        return response.data;
    } catch (error) {
        console.log(error)
        if (error.response) {
            throw error.response.data;
        }
        throw new Error('Ocurrió un error inesperado.');
    }
};

export const getProfile = async (token) => {
    try {
        const response = await axios.get(`${API_URL}/users/me/`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        if (error.response) {
            throw error.response.data;
        }
        throw new Error('Ocurrió un error inesperado.');
    }
};
