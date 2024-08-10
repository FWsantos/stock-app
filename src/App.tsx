import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AuthProvider from "./context/AuthProvider";
import { useEffect, useState } from "react";
import Login from "./components/Login";

export default function App() {
  const [token, setToken] = useState<string>("");

  useEffect(() => {
    sessionStorage.getItem("token") &&
      setToken(sessionStorage.getItem("token") || "");
  }, []);

  return (
    <Container maxWidth="sm">
      {!token ? (
        <Login setToken={setToken}></Login>
      ) : (
        <AuthProvider>
          <Box sx={{ my: 4 }}>
            <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
              Material UI Vite.js example in TypeScript
            </Typography>
          </Box>
          <Button variant="contained">Sair</Button>
        </AuthProvider>
      )}
    </Container>
  );
}
