import { List, ListItem } from "@mui/material";
import ProductImage from "./ProductImage";

type ShoppingCartProps = {
    products: Product[];
  };
  
  export default function ShoppingCart({ products }: ShoppingCartProps) {
    return (
    <List>
      {products.map((product) => (
        <ListItem
          key={product.id} 
          style={{ cursor: "pointer", padding: "10px", border: "1px solid gray", margin: "5px" }}
        >
          <ProductImage imageSrc={product.image} altText={product.name} />
          {product.name}
        </ListItem>
      ))}
    </List>
    );
  }
  