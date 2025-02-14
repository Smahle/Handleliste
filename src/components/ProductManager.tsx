import ShoppingCartManager from "./ShoppingCartManager";
import ProductSearch from "./ProductSearch";
import styles from "./ProductManager.module.css";
import { useCartContext } from "../context/CartContext";

export default function ProductManager() {
  const {addProduct, activeCartId} = useCartContext();
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
