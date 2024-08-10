import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useEffect } from "react";
import Login from "./components/User/Login";
import useToken from "./hooks/useToken";
import ProductManager from "./components/Product/ProductManager";

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
    <Container maxWidth="lg">
      {!token ? (
        <Login setToken={setToken} />
      ) : (
        <>
          <Box sx={{ my: 4, display: "flex", alignItems: "center" }}>
            <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
              Gerenciamento de Produtos
            </Typography>
            <Button variant="text" onClick={logOut} sx={{ ml: "auto" }}>
              Sair
            </Button>
          </Box>
          <ProductManager />
        </>
      )}
    </Container>
  );
}
