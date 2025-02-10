import ShoppingCartManager from "./ShoppingCartManager";
import ProductSearch from "./ProductSearch";
import styles from "./ProductManager.module.css";

export default function ProductManager(cartProps: CartProps) {
  

  return (
    <div className={styles.container}>
      <h2>Active Cart ID: {cartProps.activeCartId ?? "None"}</h2>
      <div className={styles.productList}>
      <ProductSearch 
  {...cartProps} 
  addProduct={cartProps.addProduct }
/>
      </div>
      <div className={styles.shoppingCart}>
        <ShoppingCartManager {...cartProps} />
      </div>
    </div>
  );
}
