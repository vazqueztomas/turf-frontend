import { useForm } from 'react-hook-form';
import { useAuth } from './AuthContext';

const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { register: registerUser } = useAuth();

    const onSubmit = async (data) => {
        try {
            console.log(data)
            await registerUser(data.email, data.password);
            // Redirigir o mostrar mensaje de éxito
        } catch (error) {
            // Manejar error de registro
            console.error("Error en el registro", error);
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
            <button type="submit">Registrarse</button>
        </form>
    );
};

export default Register;
