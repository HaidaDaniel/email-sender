import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Container, TextField, Button, Typography, Link } from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { loginSchema } from "@/utils/authValidation";
import { login } from "@/store/slices/authSlice";
import { LoginUser } from "@/utils/types";
import { useAppDispatch, useAppSelector } from "@/store";

const AuthPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const token = useAppSelector((state) => state.auth.token);

  const { register, handleSubmit, formState: { errors } } = useForm<LoginUser>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginUser) => {
    dispatch(login(data));
  };

  useEffect(() => {
    if (token) {
      navigate("/emails");
    }
  }, [token, navigate]);

  return (
    <Container maxWidth="xs">
      <Typography variant="h4" align="center">Login</Typography>
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
          {...register("password")}
          type="password"
          label="Password"
          fullWidth
          margin="normal"
          error={!!errors.password}
          helperText={errors.password?.message}
        />

        <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }}>
          Log In
        </Button>

        <Typography align="center" sx={{ mt: 2 }}>
          Don't have an account?{" "}
          <Link component={RouterLink} to="/register">
            Register here
          </Link>
        </Typography>
      </form>
    </Container>
  );
};

export default AuthPage;

