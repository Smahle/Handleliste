import CircularProgress from '@mui/material/CircularProgress';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ProductImage from './ProductImage'; // Import the ProductImage component

type Product = {
  id: number;
  name: string;
  image: string;
  current_price: number;
};

type ProductListProps = {
  products: Product[];
  loading: boolean;
  error: string | null;
  onRetry: () => void;
};

export default function ProductList({ products, loading, error, onRetry }: ProductListProps) {
  if (loading) return <CircularProgress />;

  if (error) {
    return (
      <div>
        <p style={{ color: 'red', fontWeight: 'bold' }}>{error}</p>
        <button onClick={onRetry}>Retry</button>
      </div>
    );
  }

  if (products.length === 0) {
    return <p style={{ fontWeight: 'bold' }}>No products found.</p>;
  }

  return (
    <List>
      {products.map((product) => (
        <ListItem key={product.id}>
          {/* Use ProductImage component here */}
          <ProductImage imageSrc={product.image} altText={product.name} />
          {product.name} - {product.current_price} NOK
        </ListItem>
      ))}
    </List>
  );
}
