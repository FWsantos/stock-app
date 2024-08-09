import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import AuthProvider from "./context/AuthProvider";
import { useEffect, useState } from "react";
import Login from "./components/Login";

export default function App() {
  const [token, setToken] = useState<string>("");

  useEffect(() => {
    // setToken("JRR Token");
  }, []);

  return (
    <Container maxWidth="sm">
      {!token ? (
        <Login></Login>
      ) : (
        <AuthProvider>
          <Box sx={{ my: 4 }}>
            <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
              Material UI Vite.js example in TypeScript
            </Typography>
          </Box>
        </AuthProvider>
      )}
    </Container>
  );
}
