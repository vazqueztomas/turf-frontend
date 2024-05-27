import { useForm } from "react-hook-form";
import { useAuth } from "./AuthContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Input,
  FormLabel,
  FormControl,
  Divider,
  Box,
} from "@chakra-ui/react";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const { login } = useAuth();
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate("/home");

  const onSubmit = async data => {
    try {
      await login(data.email, data.password);
      // Redirigir o mostrar mensaje de éxito
      navigate("/home");
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
      <FormControl>
        <Box>
          <FormLabel>Email:</FormLabel>
          <Input
            type="email"
            {...register("email", { required: "Este campo es obligatorio" })}
          />
          {errors.email && <span>{errors.email.message}</span>}
        </Box>
        <Box my={2}>
          <FormLabel>Contraseña:</FormLabel>
          <Input
            type="password"
            {...register("password", { required: "Este campo es obligatorio" })}
          />
          {errors.password && <span>{errors.password.message}</span>}
        </Box>
        <Divider my={4} />
        {errorMessage && (
          <Box my={4} style={{ color: "red" }}>
            {errorMessage}
          </Box>
        )}
      </FormControl>
      <Button type="submit" isLoading={isSubmitting}>
        Iniciar sesión
      </Button>
    </form>
  );
};

export default Login;
