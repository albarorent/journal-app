import { Button, Grid, Link, TextField } from "@mui/material";
import { AuthLayout } from "../layout/AuthLayout";
import { Link as RouterLink } from "react-router-dom";

export const Register = () => {
  return (
    <AuthLayout title="Registro">
      <form>
        <Grid container>
          <Grid item xs={12}>
            <TextField
              label="Nombre completo"
              type="text"
              placeholder="Tu nombre completo"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Correo"
              type="email"
              placeholder="correo@gmail.com"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Contraseña"
              type="password"
              placeholder="contraseña"
              fullWidth
            />
          </Grid>
          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
            <Grid item xs={12}>
              <Button variant="contained" fullWidth>
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
