import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Product from "../../types/Product";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function ProductTable({
  products,
  editAction,
  deleteAction,
}: {
  products: Product[];
  editAction: (product: Product) => void;
  deleteAction: (product: Product) => void;
}) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Nome</TableCell>
            <TableCell align="right">Descrição</TableCell>
            <TableCell align="right">Preço</TableCell>
            <TableCell align="right">Estoque</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product: Product) => (
            <TableRow
              key={product.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {product.name}
              </TableCell>
              <TableCell align="right">{product.description}</TableCell>
              <TableCell align="right">{product.price}</TableCell>
              <TableCell align="right">{product.stock}</TableCell>
              <TableCell align="right">
                <IconButton
                  color="primary"
                  aria-label="Edita Produto"
                  onClick={() => editAction(product)}
                >
                  <EditIcon></EditIcon>
                </IconButton>
              </TableCell>
              <TableCell align="right">
                <IconButton
                  color="warning"
                  aria-label="Deleta Produto"
                  onClick={() => deleteAction(product)}
                >
                  <DeleteIcon></DeleteIcon>
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
