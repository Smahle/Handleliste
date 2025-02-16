import { useState } from "react";
import ProductSearch from "../components/ProductSearch";
import CompatibleCarts from "../components/CompatibleCarts";
import SearchQueryList from "../components/SearchQueryList";
import styles from "./Discover.module.css";

export default function Discover() {
  const [searchQuery, setSearchQuery] = useState<Product[]>([]);

  const addToQuery = (product: Product) => {
    if (!searchQuery.some((p) => p.id === product.id))
      setSearchQuery([...searchQuery, product]);
  };

  const removeFromQuery = (productId: string) => {
    setSearchQuery(searchQuery.filter((p) => p.id !== productId));
  };

  const handleProductDoubleClick = (product: Product) => {
    addToQuery(product);
  };

  return (
    <div className={styles.container}>
      <div className={styles.cartContainer}>
        <div className={styles.searchQueryList}>
          <SearchQueryList
            searchQuery={searchQuery}
            removeFromQuery={removeFromQuery}
          />
        </div>
        <div className={styles.compatibleCarts}>
          <CompatibleCarts products={searchQuery} />
        </div>
      </div>
      <div className={styles.productList}>
        <ProductSearch onDoubleClick={handleProductDoubleClick} />
      </div>
    </div>
  );
}
