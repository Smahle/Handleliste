import { useState } from "react";
import ProductList from "./ProductList";
import SearchControls from "./SearchControls";
import { useFetchProducts } from "../api/api";
import styles from './ProductSearch.module.css';
import ShoppingCart from "./ShoppingCart";

export default function ProductSearch() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sort, setSort] = useState<string>("price_desc");
  const { data: products, error, loading } = useFetchProducts(searchTerm, sort);
  const [shoppingCartProducts, setShoppingCartProducts] = useState<Product[]>([]);

  const retryFetch = () => {
    setSearchTerm((prev) => prev + " "); // Forces re-fetch by changing state
  };

  // Add to cart on double click
  const handleDoubleClick = (product: Product) => {
    setShoppingCartProducts((prev) => [...prev, product]);
  };

  return (
    <div className={styles.container}>
      <div className={styles.searchControls}>
        <SearchControls
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          sort={sort}
          onSortChange={setSort}
        />
      </div>
      
      <div className={styles.listsContainer}>
        <div className={styles.productList}>
          <ProductList 
            products={products} 
            loading={loading} 
            error={error} 
            onRetry={retryFetch} 
            onDoubleClick={handleDoubleClick} 
          />
        </div>

        <div className={styles.shoppingCart}>
          <ShoppingCart products={shoppingCartProducts}/>
        </div>
      </div>
    </div>
  );
}
