import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { Container, TextField, Button, Typography } from "@mui/material";
import { CreateUser } from "@/utils/types";
import { registerSchema } from "@/utils/authValidation";
import { registerUser } from "@/utils/api";

const RegisterPage = () => {
  const navigate = useNavigate();
  
  const { register, handleSubmit, formState: { errors } } = useForm<CreateUser>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: CreateUser) => {
    try {
      await registerUser(data);
      navigate("/auth");
    } catch (error) {
      console.error("Registration error", error);
    }
  };

  return (
    <Container maxWidth="xs">
      <Typography variant="h4" align="center">Register</Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          {...register("username")}
          label="Username"
          fullWidth
          margin="normal"
          error={!!errors.username}
          helperText={errors.username?.message}
        />

        <TextField
          {...register("email")}
          label="Email"
          fullWidth
          margin="normal"
          error={!!errors.email}
          helperText={errors.email?.message}
        />

        <TextField
          {...register("password")}
          type="password"
          label="Password"
          fullWidth
          margin="normal"
          error={!!errors.password}
          helperText={errors.password?.message}
        />

        <Button type="submit" fullWidth variant="contained">
          Register
        </Button>
      </form>
    </Container>
  );
};

export default RegisterPage;
