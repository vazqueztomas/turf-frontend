import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000'; // Asegúrate de que esto apunte a tu servidor FastAPI

export const register = async (email, password) => {
    const response = await axios.post(`${API_URL}/users/`, { email, password });
    return response.data;
};

export const login = async (email, password) => {
    const response = await axios.post(`${API_URL}/token/`, `username=${email}&password=${password}`, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });
    return response.data;
};

export const getProfile = async (token) => {
    const response = await axios.get(`${API_URL}/users/me/`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};