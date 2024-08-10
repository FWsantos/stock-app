import RestApiService from "../../services/RestApiService";
import { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import ProductTable from "./ProductTable";
import { Container, Typography } from "@mui/material";
import CreateProduct from "./CreateProduct";

export default function ProductManager() {
  const apiService = new RestApiService();
  const [products, setProducts] = useState([]);
  const [openCreate, setOpenCreate] = useState(false);

  const fetchProducts = async () => {
    try {
      const response = await apiService.getAllProducts();
      console.log("Products response", response);

      if (response.ok) {
        const responseData = await response.json();
        console.log("Products", responseData);
        setProducts(responseData.data.products);
      } else {
        console.error("Failed to fetch products with status", response.status);
      }
    } catch (error) {
      console.error("Failed to fetch products", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <Container>
      <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
        Produtos Cadastrados ({products.length})
      </Typography>
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        sx={{ mb: 2 }}
        onClick={() => setOpenCreate(true)}
      >
        Adicionar Produto
      </Button>
      <ProductTable products={products} />
      <CreateProduct
        open={openCreate}
        onClose={() => {
          setOpenCreate(false);
          fetchProducts();
        }}
      />
    </Container>
  );
}
