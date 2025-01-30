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
    if (loading) return <p>Loading products...</p>;
  
    if (error) {
      return (
        <div>
          <p style={{ color: "red", fontWeight: "bold" }}>{error}</p>
          <button onClick={onRetry}>Retry</button>
        </div>
      );
    }
  
    if (products.length === 0) {
      return <p style={{ fontWeight: "bold" }}>No products found.</p>;
    }
  
    return (
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <img
              src={product.image}
              alt={product.name}
              style={{ width: "50px", height: "50px", marginRight: "10px" }}
            />
            {product.name} - {product.current_price} NOK
          </li>
        ))}
      </ul>
    );
  }
  