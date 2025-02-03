import { List, ListItem } from "@mui/material";
import ProductImage from "./ProductImage";

type ShoppingCartProps = {
  products: Product[];
  onDoubleClick: (product: Product) => void;
};

export default function ShoppingCart({
  products,
  onDoubleClick,
}: ShoppingCartProps) {
  return (
    <List>
      {products.map((product) => (
        <ListItem
          key={product.id}
          style={{
            cursor: "pointer",
            padding: "10px",
            border: "1px solid gray",
            margin: "5px",
          }}
          onDoubleClick={() => onDoubleClick(product)}
        >
          <ProductImage imageSrc={product.image} altText={product.name} />
          {product.name}
        </ListItem>
      ))}
    </List>
  );
}
