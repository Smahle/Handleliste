import ShoppingCartManager from "./ShoppingCartManager";
import ProductSearch from "./ProductSearch";
import styles from "./ProductManager.module.css";

export default function ProductManager() {
  

  return (
    <div className={styles.container}>
      <div className={styles.productList}>
        <ProductSearch/>
      </div>
      <div className={styles.shoppingCart}>
        <ShoppingCartManager/>
      </div>
    </div>
  );
}
