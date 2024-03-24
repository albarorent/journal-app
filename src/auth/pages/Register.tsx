import { useMemo, useState } from "react";
import { Alert, Button, Grid, Link, TextField } from "@mui/material";
import { AuthLayout } from "../layout/AuthLayout";
import { Link as RouterLink } from "react-router-dom";
import { useForm } from "../../hooks";
import { FormValidationState } from "../../interface/Interfaces";
import { useAppDispatch } from "../../hooks/useDispatch";
import { starCreatingUserWithEmailPassword } from "../../store/auth";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

const formData = {
  email: "",
  password: "",
  displayName: "",
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
  const dispatch = useAppDispatch();
  const { status, errorMessage } = useSelector(
    (state: RootState) => state.auth
  );
  const isCheckingAuthentication = useMemo(
    () => status === "checking",
    [status]
  );
  const [formSubmit, setFormSubmit] = useState(false);

  const { formState, onInputChange, formValidation, isFormValid } = useForm(
    formData,
    formValidations
  );

  const { email, password, displayName } = formState;
  const { displayNameValid, emailValid, passwordValid } = formValidation;

  const onSubmit = (event: any): void => {
    event.preventDefault();
    setFormSubmit(true);
    if (!isFormValid) return;
    dispatch(
      starCreatingUserWithEmailPassword({ email, password, displayName })
    );
  };

  return (
    <AuthLayout title="Crear cuenta">
      {/* <h1>FormValid: {isFormValid ? 'Valido' : 'Incorrecto'}</h1> */}
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
              error={!!displayNameValid && formSubmit}
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
              error={!!emailValid && formSubmit}
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
              error={!!passwordValid && formSubmit}
              helperText={passwordValid}
            />
          </Grid>
          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
            
            <Grid item xs={12} display={!!errorMessage ? '' : 'none'}>
              <Alert severity="error">{errorMessage}</Alert>
            </Grid>

            <Grid item xs={12}>
              <Button
                disabled={isCheckingAuthentication}
                type="submit"
                variant="contained"
                fullWidth
              >
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
