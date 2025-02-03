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
    <List sx={{ padding: 0, margin: 0 }}>
      {products.map((product) => (
        <ListItem
          key={product.id}
          style={{
            cursor: "pointer",
            border: "1px solid gray",
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
