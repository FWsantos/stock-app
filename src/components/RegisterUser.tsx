import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Modal from "@mui/material/Modal";
import IconButton from "@mui/material/IconButton";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import RestApiService from "../services/RestApiService";
import React from "react";

const defaultTheme = createTheme();

export default function RegisterUser({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const apiService = new RestApiService();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = data.get("name")?.toString() || "";
    const taxNumber = data.get("taxNumber")?.toString() || "";
    const email = data.get("email")?.toString() || "";
    const phone = data.get("phone")?.toString() || "";
    const password = data.get("password")?.toString() || "";
    console.log("Data", name, taxNumber, email, phone, password);

    try {
      const response = await apiService.registerUser(
        name,
        taxNumber,
        email,
        phone,
        password
      );

      if (response.ok) {
        console.log("User registered");
        onClose();
      } else {
        const errorData = await response.json();
        console.error("Login failed with status", response.status, errorData);
      }
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Container component="main" maxWidth="xs">
        <Modal
          open={open}
          onClose={() => onClose()}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            sx={{
              position: "relative",
              bgcolor: "whitesmoke",
              justifyContent: "center",
              alignItems: "center",
              margin: "auto",
              padding: "20px",
              marginTop: "10%",
              maxWidth: "50%",
              display: "flex",
              borderRadius: "10px",
            }}
          >
            {/* <IconButton
              onClick={() => setOpenRegisterModal(false)}
              sx={{
                position: "absolute",
                top: 8,
                right: 8,
              }}
            >
              x
            </IconButton> */}
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
                Cadastrar novo Usuário
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 3 }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      name="name"
                      required
                      fullWidth
                      id="name"
                      label="Nome completo"
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      name="taxNumber"
                      required
                      fullWidth
                      type="number"
                      id="taxNumber"
                      label="CPF/CNPJ"
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      type="email"
                      id="email"
                      label="Email"
                      name="email"
                      autoComplete="email"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      type="tel"
                      id="phone"
                      label="Telefone"
                      name="phone"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="password"
                      label="Senha"
                      type="password"
                      id="password"
                      autoComplete="new-password"
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Cadastrar
                </Button>
              </Box>
            </Box>
          </Box>
        </Modal>
      </Container>
    </ThemeProvider>
  );
}
