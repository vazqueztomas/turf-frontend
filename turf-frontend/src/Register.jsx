import { useForm } from "react-hook-form";
import { useAuth } from "./AuthContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Divider, FormControl, FormLabel, Input } from "@chakra-ui/react";

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
        <div>
          <FormLabel>Email:</FormLabel>
          <Input
            type="email"
            {...register("email", { required: "Este campo es obligatorio" })}
          />
          {errors.email && <span>{errors.email.message}</span>}
        </div>
        <div>
          <FormLabel>Contraseña:</FormLabel>
          <Input
            type="password"
            {...register("password", { required: "Este campo es obligatorio" })}
          />
          {errors.password && <span>{errors.password.message}</span>}
        </div>
      </FormControl>
      <Divider my={4}/>
      {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
      <Button type="submit" isLoading={isSubmitting}>
        Registrarse
      </Button>
    </form>
  );
};

export default Register;
