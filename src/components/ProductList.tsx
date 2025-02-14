import { List, ListItem } from "@mui/material";
import ProductImage from "./ProductImage";
import { useCartContext } from "../context/CartContext";

type ProductListProps = {
  products: Product[];
  loading: boolean;
  error: string | null;
  onRetry: () => void;
};

export default function ProductList({
  products,
  loading,
  error,
  onRetry,
}: ProductListProps) {
  const {addProduct, activeCartId} = useCartContext();
  if (loading) return <p>Loading...</p>;
  if (error)
    return (
      <p>
        Error: {error} <button onClick={onRetry}>Retry</button>
      </p>
    );
    if (!activeCartId) {
      return <p style={{ color: "red" }}>No cart selected. Please select a cart.</p>;
    }

  return (
    <List sx={{ padding: 0, margin: 0 }}>
      {products.map((product) => (
       <ListItem
        key={product.id}
        onDoubleClick={() => activeCartId && addProduct(activeCartId, product)}
        style={{
          cursor: activeCartId ? "pointer" : "not-allowed",
          border: "2px solid #3c4245",
          opacity: activeCartId ? 1 : 0.5, // Visually indicate it's disabled
        }}
      >
          <ProductImage imageSrc={product.image} altText={product.name} />
          {product.name}
        </ListItem>
      ))}
    </List>
  );
}
