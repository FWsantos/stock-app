import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AuthProvider from "./context/AuthProvider";
import { useEffect } from "react";
import Login from "./components/Login";
import useToken from "./hooks/useToken";

export default function App() {
  const { token, setToken } = useToken();

  useEffect(() => {
    localStorage.getItem("token") &&
      setToken(localStorage.getItem("token") || "");
  }, []);

  const logOut = () => {
    setToken("");
    localStorage.removeItem("token");
  };

  return (
    <Container maxWidth="sm">
      {!token ? (
        <Login setToken={setToken}></Login>
      ) : (
        <>
          <Box sx={{ my: 4 }}>
            <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
              Material UI Vite.js example in TypeScript
            </Typography>
          </Box>
          <Button variant="contained" onClick={logOut}>
            Sair
          </Button>
        </>
      )}
    </Container>
  );
}
