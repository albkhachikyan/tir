import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import {
  Box,
  Button,
  TextField,
  Typography,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { useState } from "react";
import { Iconify } from "../../components/iconify";
import { useRouter } from "../../routes/hooks";
import { useLogin } from "../../hooks/auth/useLogin";
import { LoginForm, loginSchema } from "../../schema/validation/login";

export function SignInView() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const { mutate: login } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data: LoginForm) => {
    try {
      login(data, {
        onSuccess: () => {
          router.push("/");
        },
      });
    } catch (err) {
      console.error(err);
      alert("Login failed");
    }
  };

  return (
    <>
      <Box sx={{ textAlign: "center", mb: 5 }}>
        <Typography variant="h5">Sign in</Typography>
      </Box>

      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        <TextField
          label="Email"
          fullWidth
          {...register("email")}
          error={!!errors.email}
          helperText={errors.email?.message}
        />

        <TextField
          label="Password"
          type={showPassword ? "text" : "password"}
          fullWidth
          {...register("password")}
          error={!!errors.password}
          helperText={errors.password?.message}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword((prev) => !prev)}
                  edge="end"
                >
                  <Iconify
                    icon={
                      showPassword ? "solar:eye-bold" : "solar:eye-closed-bold"
                    }
                  />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Button type="submit" variant="contained" size="large" fullWidth>
          Sign in
        </Button>
      </Box>
    </>
  );
}
