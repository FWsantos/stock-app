import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import RestApiService from "../../services/RestApiService";
import RegisterUser from "./RegisterUser";
import { useState } from "react";

const defaultTheme = createTheme();

interface LoginProps {
  setToken: (token: string) => void;
}

export default function Login({ setToken }: LoginProps) {
  const [openRegisterModal, setOpenRegisterModal] = useState(false);
  const [error, setError] = useState(false);
  const apiService = new RestApiService();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const taxNumber = data.get("taxNumber")?.toString() || "";
    const password = data.get("password")?.toString() || "";

    try {
      const response = await apiService.login(taxNumber, password);

      if (response.ok) {
        const responseData = await response.json();
        const token = responseData.data.token;
        sessionStorage.setItem("token", JSON.stringify(token));
        setToken(token);
      } else {
        if (response.status === 400) {
          console.error(
            "Login failed with status 400: Invalid tax number or password."
          );
          setError(true);
        } else {
          console.error("Login failed with status", response.status);
        }
      }
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="taxNumber"
              label="CPF/CNPJ"
              name="taxNumber"
              autoComplete="taxNumber"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            {error && (
              <Typography variant="caption" color="error">
                {" "}
                CPF/CNPJ ou senha inválidos{" "}
              </Typography>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Login
            </Button>
            <Grid container>
              <Grid item>
                <Button
                  variant="text"
                  onClick={() => setOpenRegisterModal(true)}
                  sx={{ textTransform: "none" }}
                >
                  {"Cadastrar novo usuário"}
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>

      <RegisterUser
        open={openRegisterModal}
        onClose={() => setOpenRegisterModal(false)}
      />
    </ThemeProvider>
  );
}
