import { useState } from "react";
import ProductList from "./ProductList";
import SearchControls from "./SearchControls";
import { useFetchProducts } from "../api/api";
import styles from "./ProductSearch.module.css";
import ShoppingCartManager from "./ShoppingCartManager";
import { useLocalStorage } from "../hooks/useLocalStorage";

// TODO: lagre handlelister og gi de navn FEKS TACOLESTÅ/FREDAGSLESTÅ (local storage fer handleleste)
// TODO: La brukere dele handleliste med hverandre
// TODO: followe andre bruke (public, friends og private)
// TODO: kunne hake av ting du har
// TODO: TEMAER: TACO/PIZZA/SNACKS som har samlinger av oppskrifter
// TODO: filter på butikker - pris match på oppskrifter
// TODO: favoritte lister
// TODO: PROFILE: se alle lagrede handlelister, friends, followers(siste)

type ProductSearchProps = {
  setAddToCart: (product: Product) => void;
};

export default function ProductSearch({
  setAddToCart

}: ProductSearchProps) {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sort, setSort] = useState<string>("price_desc");
  const { data: products, error, loading } = useFetchProducts(searchTerm, sort);
  
  const retryFetch = () => {
    setSearchTerm((prev) => prev + " "); // Forces re-fetch by changing state
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
            onDoubleClick={setAddToCart}
          />
        </div>
      </div>
    </div>
  );
}
