import { List, ListItem } from "@mui/material";
import ProductImage from "./ProductImage";
import styles from "./ProductList.module.css";

type ProductListProps = {
  products: Product[];
  loading: boolean;
  error: string | null;
  onRetry: () => void;
  onProductClick?: (product: Product) => void;
};

export default function ProductList({
  products,
  loading,
  error,
  onRetry,
  onProductClick,
}: ProductListProps) {
  if (loading) return <p>Loading...</p>;
  if (error)
    return (
      <p>
        Error: {error} <button onClick={onRetry}>Retry</button>
      </p>
    );

  return (
    <List className={styles.list}>
      {products.map((product) => (
        <ListItem
          className={styles.listItem}
          key={product.id}
          onClick={() => onProductClick?.(product)}
          sx={{
            "&:hover": {
              backgroundColor: "secondary.main",
              cursor: "pointer",
            },
          }}
        >
          <ProductImage imageSrc={product.image} altText={product.name} />
          {product.name}
        </ListItem>
      ))}
    </List>
  );
}
