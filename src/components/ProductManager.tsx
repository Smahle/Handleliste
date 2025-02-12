import ShoppingCartManager from "./ShoppingCartManager";
import ProductSearch from "./ProductSearch";
import styles from "./ProductManager.module.css";

export default function ProductManager(cartProps: CartState) {
  

  return (
    <div className={styles.container}>
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
