import { useState } from "react";
import ProductList from "./ProductList";
import SearchControls from "./SearchControls";
import { useFetchProducts } from "../api/api";
import styles from "./ProductSearch.module.css";
import ShoppingCart from "./ShoppingCart";
import { useLocalStorage } from "../hooks/useLocalStorage";

// TODO: lagre handlelister og gi de navn FEKS TACOLESTÅ/FREDAGSLESTÅ (local storage fer handleleste)
// TODO: La brukere dele handleliste med hverandre
// TODO: followe andre bruke (public, friends og private)
// TODO: kunne hake av ting du har
// TODO: TEMAER: TACO/PIZZA/SNACKS som har samlinger av oppskrifter
// TODO: filter på butikker - pris match på oppskrifter
// TODO: favoritte lister
// TODO: PROFILE: se alle lagrede handlelister, friends, followers(siste)

export default function ProductSearch() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sort, setSort] = useState<string>("price_desc");
  const { data: products, error, loading } = useFetchProducts(searchTerm, sort);
  const [cart, setCart] = useLocalStorage<Product[]>("shoppingCart", []);
  
  const retryFetch = () => {
    setSearchTerm((prev) => prev + " "); // Forces re-fetch by changing state
  };
  
  function clearCart(){
    setCart([]);
  }

  const incrementQuantity = (product: Product) => {
    setCart((prev) => {
      const index = prev.findIndex(cartProduct => cartProduct.id === product.id);
      if (index !== -1) {
        const updatedCart = [...prev];
        updatedCart[index] = { ...updatedCart[index], quantity: updatedCart[index].quantity + 1 };
        return updatedCart;
      }
      return prev;
    });
  };
  
  const decrementQuantity = (product: Product) => {
    setCart((prev) => {
      const index = prev.findIndex(cartProduct => cartProduct.id === product.id);
      if (index === -1) return prev;
  
      if (prev[index].quantity <= 1) {
        return prev.filter((_, i) => i !== index); // Remove item if quantity is 1
      } else {
        const updatedCart = [...prev];
        updatedCart[index] = { ...updatedCart[index], quantity: updatedCart[index].quantity - 1 };
        return updatedCart;
      }
    });
  };
  
  // Add to cart on double click
  const handleDoubleClickAddiction = (product: Product) => {
    const index = cart.findIndex(cartProduct => cartProduct.id === product.id);
  
    if (index !== -1) {
      incrementQuantity
    } else {
      setCart((prev) => [...prev, { ...product, quantity: 1 }]);
    }
  };
  

  const removeProduct = (product: Product) => {
    setCart((prevProducts) =>
      prevProducts.filter((cartProduct) => cartProduct.id !== product.id)
    );
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
            products={cart}
            removeProduct={removeProduct}
            onRemoveClick={clearCart}
            incrementQuantity={incrementQuantity}
            decrementQuantity={decrementQuantity}
          />
        </div>
      </div>
    </div>
  );
}
