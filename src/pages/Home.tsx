import styles from "./Home.module.css";
import { useCartContext } from "../context/CartContext";
import ShoppingCartManager from "../components/ShoppingCartManager";
import ProductSearch from "../components/ProductSearch";

export default function Home() {
  const { addProduct, activeCartId } = useCartContext();
  const onProductClick = (product: Product) => {
    if (!activeCartId) return;
    addProduct(activeCartId, product);
  };

  return (
    <div className={styles.homeContainer}>
      <div className={styles.productSearch}>
        <ProductSearch onProductClick={onProductClick} />
      </div>
      <div className={styles.shoppingCartManager}>
        <ShoppingCartManager showFullControls={true} />
      </div>
    </div>
  );
}
