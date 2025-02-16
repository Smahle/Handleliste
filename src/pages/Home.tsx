import styles from "./Home.module.css";
import { useCartContext } from "../context/CartContext";
import ShoppingCartManager from "../components/ShoppingCartManager";
import ProductSearch from "../components/ProductSearch";

export default function Home() {
  const { addProduct, activeCartId } = useCartContext();
  const handleProductDoubleClick = (product: Product) => {
    if (!activeCartId) return;
    addProduct(activeCartId, product);
  };

  return (
    <div className={styles.container}>
      <div className={styles.productList}>
        <ProductSearch onDoubleClick={handleProductDoubleClick} />
      </div>
      <div className={styles.shoppingCart}>
        <ShoppingCartManager />
      </div>
    </div>
  );
}
