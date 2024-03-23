import { Button, Grid, Link, TextField } from "@mui/material";
import { AuthLayout } from "../layout/AuthLayout";
import { Link as RouterLink } from "react-router-dom";
import { useForm } from "../../hooks";
import { FormValidationState } from "../../interface/Interfaces";

const formData = {
  email: "alvaro@google.com",
  password: "123456",
  displayName: "Alvaro Renteria Arce",
};

const formValidations: FormValidationState = {
  email: [
    (value: string) => value.includes("@"),
    "El correo debe de tener un @.",
  ],
  password: [
    (value: string) => value.length >= 6,
    "El password debe de tener más de 6 letras.",
  ],
  displayName: [
    (value: string) => value.length >= 2,
    "El nombre es obligatorio.",
  ],
};

export const Register = () => {
  const { formState, onInputChange, formValidation } = useForm(
    formData,
    formValidations
  );

  const { email, password, displayName } = formState;
  const { displayNameValid, emailValid, passwordValid } = formValidation;

  const onSubmit = (event: any): void => {
    event.preventDefault();
    console.log(formState);
  };

  return (
    <AuthLayout title="Registro">
      <form onSubmit={onSubmit}>
        <Grid container>
          <Grid item xs={12}>
            <TextField
              label="Nombre completo"
              type="text"
              placeholder="Tu nombre completo"
              fullWidth
              name="displayName"
              value={displayName}
              onChange={onInputChange}
              error={displayNameValid && true}
              helperText={displayNameValid}
            />
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Correo"
              type="email"
              placeholder="correo@gmail.com"
              fullWidth
              name="email"
              value={email}
              onChange={onInputChange}
              error={emailValid && true}
              helperText={emailValid}
            />
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Contraseña"
              type="password"
              placeholder="contraseña"
              fullWidth
              name="password"
              value={password}
              onChange={onInputChange}
              error={passwordValid && true}
              helperText={passwordValid}
            />
          </Grid>
          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" fullWidth>
                Registrar
              </Button>
            </Grid>
          </Grid>
          <Grid container direction="row" justifyContent="end">
            <Link component={RouterLink} color="inherit" to="/auth/login">
              ¿Ya tienes una cuenta?
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};
