import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import RestApiService from "../../services/RestApiService";
import Product from "../../types/Product";

const defaultTheme = createTheme();

export default function DeleteProduct({
  product,
  open,
  onClose,
}: {
  product: Product;
  open: boolean;
  onClose: () => void;
}) {
  const apiService = new RestApiService();

  const onClick = () => {
    console.log("Deleting product", product);
    try {
      apiService.deleteProduct(product.id).then((response) => {
        console.log("Delete product response", response);

        if (response.ok) {
          console.log("Product deleted");
          onClose();
        } else {
          console.error("Delete product failed with status", response.status);
        }
      });
    } catch (error) {
      console.error("Delete product failed", error);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Container component="main" maxWidth="xs">
        <Dialog
          open={open}
          onClose={onClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Deletar Produto</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Deseja deletar o produto {product.name} da lista?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={onClick} autoFocus>
              Sim
            </Button>
            <Button onClick={onClose}>Não</Button>
          </DialogActions>
        </Dialog>
      </Container>
    </ThemeProvider>
  );
}
