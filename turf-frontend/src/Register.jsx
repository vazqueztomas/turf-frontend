import { useForm } from 'react-hook-form';
import { useAuth } from './AuthContext';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { register: registerUser } = useAuth();
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate("/home")

    const onSubmit = async (data) => {
        try {
            await registerUser(data.email, data.password);
            navigate("/home")
            // Redirigir o mostrar mensaje de éxito
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
            <button type="submit">Registrarse</button>
        </form>
    );
};

export default Register;
