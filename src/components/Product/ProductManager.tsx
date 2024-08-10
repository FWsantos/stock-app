import RestApiService from "../../services/RestApiService";
import { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import ProductTable from "./ProductTable";
import { Container, Typography } from "@mui/material";
import Product from "../../types/Product";
import CreateProduct from "./CreateProduct";
import DeleteProduct from "./DeleteProduct";
import UpdateProduct from "./UpdateProduct";

export default function ProductManager() {
  const apiService = new RestApiService();
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState<Product>({
    id: 0,
    name: "",
    description: "",
    price: 0,
    stock: 0,
  });
  const [openCreate, setOpenCreate] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const fetchProducts = async () => {
    try {
      const response = await apiService.getAllProducts();

      if (response.ok) {
        const responseData = await response.json();
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
      <ProductTable
        products={products}
        editAction={(product: Product) => {
          setSelectedProduct(product);
          setOpenUpdate(true);
        }}
        deleteAction={(product: Product) => {
          setSelectedProduct(product);
          setOpenDelete(true);
        }}
      />
      <CreateProduct
        open={openCreate}
        onClose={() => {
          setOpenCreate(false);
          fetchProducts();
        }}
      />
      <UpdateProduct
        open={openUpdate}
        product={selectedProduct}
        onClose={() => {
          setOpenUpdate(false);
          fetchProducts();
        }}
      />
      <DeleteProduct
        open={openDelete}
        product={selectedProduct}
        onClose={() => {
          setOpenDelete(false);
          fetchProducts();
        }}
      />
    </Container>
  );
}
