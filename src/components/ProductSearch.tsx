import { useState } from "react";
import ProductList from "./ProductList";
import SearchControls from "./SearchControls";
import { useFetchProducts } from "../api/api";
import styles from "./ProductSearch.module.css";
import ShoppingCart from "./ShoppingCart";

// TODO: La brukere dele handleliste med hverandre
// TODO: followe andre bruke (public, friends og private)

export default function ProductSearch() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sort, setSort] = useState<string>("price_desc");
  const { data: products, error, loading } = useFetchProducts(searchTerm, sort);
  const [shoppingCartProducts, setShoppingCartProducts] = useState<Product[]>(
    []
  );

  const retryFetch = () => {
    setSearchTerm((prev) => prev + " "); // Forces re-fetch by changing state
  };

  // Add to cart on double click
  const handleDoubleClickAddiction = (product: Product) => {
    setShoppingCartProducts((prev) => [...prev, product]);
  };

  const handleDoubleClickSubtraction = (product: Product) => {
    setShoppingCartProducts((prevProducts) =>
      prevProducts.filter((cartProduct) => cartProduct.id !== product.id)
    );
    console.log("After update:", shoppingCartProducts);
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
            onDoubleClick={handleDoubleClickAddiction}
          />
        </div>

        <div className={styles.shoppingCart}>
          <ShoppingCart
            products={shoppingCartProducts}
            onDoubleClick={handleDoubleClickSubtraction}
          />
        </div>
      </div>
    </div>
  );
}
