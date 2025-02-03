import { List, ListItem } from "@mui/material";
import ProductImage from "./ProductImage";


type ProductListProps = {
  products: Product[];
  loading: boolean;
  error: string | null;
  onRetry: () => void;
  onDoubleClick: (product: Product) => void; // Update to expect Product type
};

export default function ProductList({ products, loading, error, onRetry, onDoubleClick }: ProductListProps) {
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error} <button onClick={onRetry}>Retry</button></p>;

  return (
    <List>
      {products.map((product) => (
      <ListItem
      key={product.id} 
      onDoubleClick={() => onDoubleClick(product)}
      style={{ cursor: "pointer", padding: "10px", border: "1px solid gray", margin: "5px" }}
    >
      <ProductImage imageSrc={product.image} altText={product.name} />
      {product.name}
    </ListItem>
      ))}
    </List>
  );
}
