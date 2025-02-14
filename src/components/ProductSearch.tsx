import { useEffect, useState } from "react";
import ProductList from "./ProductList";
import SearchControls from "./SearchControls";
import { useFetchProducts } from "../api/useFetchProducts";
import styles from "./ProductSearch.module.css";
import { useCartContext } from "../context/CartContext";


export default function ProductSearch() {
  const {activeCartId, addProduct } = useCartContext()
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortPrice, setSortPrice] = useState<string>("price_desc");
  const { data: products, error, loading } = useFetchProducts(searchTerm, sortPrice);
  const [stores, setStores] = useState<string[]>([]);
  const [selectedStore, setSelectedStore] = useState<string>("")

  useEffect(() => {
    if (products.length > 0) {
      const storeNames = Array.from(new Set(products.map((p) => p.store.name))).filter(Boolean); // Filter out falsy values
      setStores(storeNames);
    }
  }, [products]);
  

  const retryFetch = () => {
    setSearchTerm((prev) => prev + " ");
  };

  const storeFilteredProducts = selectedStore
  ? products.filter((p) => p.store.name === selectedStore)
  : products;

  return (
    <div className={styles.container}>
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
