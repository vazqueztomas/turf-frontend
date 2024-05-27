import { useForm } from 'react-hook-form';
import { useAuth } from './AuthContext';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { login } = useAuth();
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate("/home")

    const onSubmit = async (data) => {
        try {
            await login(data.email, data.password);
            // Redirigir o mostrar mensaje de éxito
            navigate("/home")
        } catch (error) {
            if (error.response && error.response.status === 400) {
                setErrorMessage(error.response.data.detail);
            } else {
                console.error("Error en el registro", error);
                setErrorMessage(error.detail);
            }
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label>Email:</label>
                <input
                    type="email"
                    {...register('email', { required: 'Este campo es obligatorio' })}
                />
                {errors.email && <span>{errors.email.message}</span>}
            </div>
            <div>
                <label>Contraseña:</label>
                <input
                    type="password"
                    {...register('password', { required: 'Este campo es obligatorio' })}
                />
                {errors.password && <span>{errors.password.message}</span>}
            </div>
            {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
            <button type="submit">Iniciar sesión</button>
        </form>
    );
};

export default Login;
