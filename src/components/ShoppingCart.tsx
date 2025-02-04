import { Button, List, ListItem } from "@mui/material";
import ProductImage from "./ProductImage";

type ShoppingCartProps = {
  products: Product[];
  onDoubleClick: (product: Product) => void;
  onRemoveClick: () => void;
};

export default function ShoppingCart({
  products,
  onDoubleClick,
  onRemoveClick
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
      <Button onClick={() => onRemoveClick()}>Clear cart</Button>
    </List>
  );
}
