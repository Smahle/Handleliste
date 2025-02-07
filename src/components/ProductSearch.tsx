import { useState } from "react";
import ProductList from "./ProductList";
import SearchControls from "./SearchControls";
import { useFetchProducts } from "../api/api";
import styles from "./ProductSearch.module.css";


export default function ProductSearch({activeCartId, addProduct }: CartProps) {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sort, setSort] = useState<string>("price_desc");
  const { data: products, error, loading } = useFetchProducts(searchTerm, sort);

  const retryFetch = () => {
    setSearchTerm((prev) => prev + " ");
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
  onDoubleClick={(product) => {
    if (activeCartId) {
      addProduct(activeCartId, product);
    } else {
      alert("No cart selected")
    }
  }}
/>
        </div>
      </div>
    </div>
  );
}
