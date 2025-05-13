import { useEffect, useMemo, useState } from "react";
import ProductList from "./ProductList";
import SearchControls from "./SearchControls";
import { useFetchProducts } from "../api/useFetchProducts";
import styles from "./ProductSearch.module.css";

type ProductSearchProps = { onDoubleClick?: (product: Product) => void };

export default function ProductSearch({ onDoubleClick }: ProductSearchProps) {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortPrice, setSortPrice] = useState<string>("price_desc");
  const [retryTrigger, setRetryTrigger] = useState(0);
  const {
    data: products,
    error,
    loading,
  } = useFetchProducts(searchTerm, sortPrice, retryTrigger);
  const [stores, setStores] = useState<string[]>([]);
  const [selectedStore, setSelectedStore] = useState<string>("");

  useEffect(() => {
    if (products && products.length > 0) {
      const storeNames = Array.from(
        new Set(products.map((p) => p.store.name))
      ).filter(Boolean); // Filter out falsy values
      setStores(storeNames);
    }
  }, [products]);

  const retryFetch = () => {
    setRetryTrigger((prev) => prev + 1);
  };

  const storeFilteredProducts = useMemo(() => {
    return selectedStore
      ? products.filter((p) => p.store.name === selectedStore)
      : products;
  }, [products, selectedStore]);

  return (
    <div className={`${styles.productSearchContainer} tertiary`}>
      <div className={styles.searchControls}>
        <SearchControls
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          sortPrice={sortPrice}
          onSortPriceChange={setSortPrice}
          stores={stores}
          selectedStore={selectedStore}
          onStoreChange={setSelectedStore}
        />
      </div>

      <div className={styles.listsContainer}>
        <div className={styles.productList}>
          <ProductList
            products={storeFilteredProducts}
            loading={loading}
            error={error}
            onRetry={retryFetch}
            onDoubleClick={onDoubleClick}
          />
        </div>
      </div>
    </div>
  );
}
