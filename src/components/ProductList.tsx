import { List, ListItem } from "@mui/material";
import ProductImage from "./ProductImage";

type ProductListProps = {
  products: Product[];
  loading: boolean;
  error: string | null;
  onRetry: () => void;
  onDoubleClick: (product: Product) => void;
};

export default function ProductList({
  products,
  loading,
  error,
  onRetry,
  onDoubleClick,
}: ProductListProps) {
  if (loading) return <p>Loading...</p>;
  if (error)
    return (
      <p>
        Error: {error} <button onClick={onRetry}>Retry</button>
      </p>
    );

  return (
    <List sx={{ padding: 0, margin: 0 }}>
      {products.map((product) => (
        <ListItem
          key={product.id}
          onDoubleClick={() => onDoubleClick(product)}
          style={{
            cursor: "pointer",
            border: "1px solid gray",
          }}
        >
          <ProductImage imageSrc={product.image} altText={product.name} />
          {product.name}
        </ListItem>
      ))}
    </List>
  );
}
