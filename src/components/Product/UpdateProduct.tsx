import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Modal from "@mui/material/Modal";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import RestApiService from "../../services/RestApiService";
import React from "react";
import Product from "../../types/Product";

const defaultTheme = createTheme();

export default function UpdateProduct({
  product,
  open,
  onClose,
}: {
  product: Product;
  open: boolean;
  onClose: () => void;
}) {
  const apiService = new RestApiService();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const updatedProduct: Product = {
      id: product.id,
      name: data.get("name")?.toString() || "",
      description: data.get("description")?.toString() || "",
      price: parseFloat(data.get("price")?.toString() || ""),
      stock: parseFloat(data.get("stock")?.toString() || ""),
    };

    console.log("Updating product", updatedProduct);

    try {
      const response = await apiService.updateProduct(updatedProduct);
      console.log("Update product response", response);

      if (response.ok) {
        console.log("Product updated");
        onClose();
      } else {
        const errorData = await response.json();
        console.error(
          "Update product failed with status",
          response.status,
          errorData
        );
      }
    } catch (error) {
      console.error("Update product failed", error);
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
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography component="h1" variant="h5">
                Atualizar Produto
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
                      id="up-name"
                      label="Nome do Produto"
                      autoFocus
                      defaultValue={product.name}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      name="description"
                      required
                      fullWidth
                      id="up-description"
                      label="Descrição do Produto"
                      autoFocus
                      defaultValue={product.description}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      name="price"
                      required
                      fullWidth
                      type="number"
                      id="up-price"
                      label="Preço do Produto"
                      autoFocus
                      defaultValue={product.price}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      name="stock"
                      required
                      fullWidth
                      type="number"
                      id="up-stock"
                      label="Quantidade em Estoque"
                      autoFocus
                      defaultValue={product.stock}
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Atualizar
                </Button>
              </Box>
            </Box>
          </Box>
        </Modal>
      </Container>
    </ThemeProvider>
  );
}
