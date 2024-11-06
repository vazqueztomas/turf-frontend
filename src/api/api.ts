import axios from 'axios';

const API_URL = process.env.VITE_API_URL;

if (!API_URL) {
  throw new Error('VITE_API_URL no está definida');
}

export const createUser = async (email: string, password: string, name: string) => {
  const userPayload = {
    email,
    password,
    name,
  };

  try {
    const response = await axios.post(`${API_URL}/create-user`, userPayload, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error: any) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || 'Error al crear el usuario');
    } else {
      throw new Error('Error al crear el usuario');
    }
  }
};

export const loginUser = async (email: string, password: string) => {
  const loginPayload = {
    username: email,
    password,
  };

  try {
    const response = await axios.post(`${API_URL}/token`, loginPayload, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    return response.data;
  } catch (error: any) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || 'Error al iniciar sesión');
    } else {
      throw new Error('Error al iniciar sesión');
    }
  }
};