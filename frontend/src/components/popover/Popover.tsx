import {
  Box,
  Button,
  MenuItem,
  Popover,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { useCreateUser } from "../../hooks/users/useCreateUser";
import { createUserSchema } from "../../schema/validation/createUser";

type FormValues = {
  name: string;
  email: string;
  password: string;
  role: "ADMIN" | "TEACHER" | "PUPIL" | "";
  grade?: number;
};

type UserFormPopoverProps = {
  anchorEl: HTMLElement | null;
  onClose: () => void;
  defaultValues?: Partial<FormValues> & { id?: string };
};

export function UserFormPopover({
  anchorEl,
  onClose,
  defaultValues,
}: UserFormPopoverProps) {
  const isEdit = !!defaultValues?.id;

  const { mutate: createUser, isPending: creating } = useCreateUser();

  const {
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      name: defaultValues?.name ?? "",
      email: defaultValues?.email ?? "",
      role: defaultValues?.role ?? "",
      grade: defaultValues?.grade ?? 0,
      password: isEdit ? undefined : "",
    },
    resolver: yupResolver(createUserSchema),
  });

  const role = watch("role");

  const onSubmit = (data: FormValues) => {
    const payload = { ...data };

    createUser(payload, {
      onSuccess: () => {
        onClose();
        reset({
          name: "",
          email: "",
          role: "",
          grade: 0,
          password: "",
        });
      },
    });
  };

  const handleClose = () => {
    reset({
      name: defaultValues?.name ?? "",
      email: defaultValues?.email ?? "",
      role: defaultValues?.role ?? "",
      grade: defaultValues?.grade ?? 0,
      password: "",
    });
    onClose();
  };

  return (
    <Popover
      open={!!anchorEl}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
    >
      <Box sx={{ p: 2, width: 300 }}>
        <Typography variant="h6" gutterBottom>
          New User
        </Typography>

        <Stack spacing={2} component="form" onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <TextField
                label="Name"
                {...field}
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            )}
          />

          {!isEdit && (
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <TextField
                  label="Password"
                  type="password"
                  {...field}
                  error={!!errors.password}
                  helperText={errors.password?.message}
                />
              )}
            />
          )}

          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextField
                label="Email"
                {...field}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            )}
          />

          <Controller
            name="role"
            control={control}
            render={({ field }) => (
              <TextField
                select
                label="Role"
                {...field}
                error={!!errors.role}
                helperText={errors.role?.message}
              >
                <MenuItem value="TEACHER">Teacher</MenuItem>
                <MenuItem value="PUPIL">Pupil</MenuItem>
              </TextField>
            )}
          />

          {role === "PUPIL" && (
            <Controller
              name="grade"
              control={control}
              render={({ field }) => (
                <TextField
                  label="Grade"
                  {...field}
                  error={!!errors.grade}
                  helperText={errors.grade?.message}
                />
              )}
            />
          )}

          <Button type="submit" variant="contained" disabled={creating}>
            Create
          </Button>
        </Stack>
      </Box>
    </Popover>
  );
}
