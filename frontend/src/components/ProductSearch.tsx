import { useEffect, useMemo, useState } from "react";
import ProductList from "./ProductList";
import SearchControls from "./SearchControls";
import { useFetchProducts } from "../api/useFetchProducts";
import styles from "./ProductSearch.module.css";
import { useCartContext } from "../context/CartContext";

type ProductSearchProps = {
  onProductClick?: (product: Product) => void;
  searchQuery?: Product[];
  excludeActiveCartProducts?: boolean;
};

export default function ProductSearch({
  onProductClick,
  searchQuery,
  excludeActiveCartProducts = true,
}: ProductSearchProps) {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortPrice, setSortPrice] = useState<string>("price_desc");
  const [retryTrigger, setRetryTrigger] = useState(0);
  const { activeCartId, carts } = useCartContext();
  const {
    data: products,
    error,
    loading,
  } = useFetchProducts(searchTerm, sortPrice, retryTrigger);
  const [stores, setStores] = useState<string[]>([]);
  const [selectedStore, setSelectedStore] = useState<string>("");
  const activeCart = carts.find((cart) => cart.id === activeCartId);

  useEffect(() => {
    if (products && products.length > 0) {
      const storeNames = Array.from(
        new Set(products.map((p) => p.store.name))
      ).filter(Boolean);
      setStores(storeNames);
    }
  }, [products]);

  const retryFetch = () => {
    setRetryTrigger((prev) => prev + 1);
  };

  const storeFilteredProducts = useMemo(() => {
    return products.filter(
      (p) =>
        (!selectedStore || p.store.name === selectedStore) &&
        (!excludeActiveCartProducts ||
          !activeCart?.products.some(
            (cartProduct) => cartProduct.id === p.id
          )) &&
        !searchQuery?.some((cartProduct) => cartProduct.id === p.id)
    );
  }, [
    products,
    selectedStore,
    activeCart?.products?.length,
    searchQuery,
    excludeActiveCartProducts,
  ]);

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
            onProductClick={onProductClick}
          />
        </div>
      </div>
    </div>
  );
}
