import { useForm } from "react-hook-form";
import { useAuth } from "./AuthContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Divider,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const { register: registerUser } = useAuth();
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate("/home");

  const onSubmit = async data => {
    try {
      await registerUser(data.email, data.password);
      navigate("/home");
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
      </FormControl>
      <Divider my={4} />
      {errorMessage && (
        <Box my={4} style={{ color: "red" }}>
          {errorMessage}
        </Box>
      )}
      <Button type="submit" isLoading={isSubmitting}>
        Registrarse
      </Button>
    </form>
  );
};

export default Register;
