import ShoppingCartManager from "./ShoppingCartManager";
import ProductSearch from "./ProductSearch";
import styles from "./ProductManager.module.css";
import useCart from "../hooks/useCart";

type ProductManagerProps = {
  user: User;
};

export default function ProductManager({ user }: ProductManagerProps) {
  const cartProps = useCart({ user });

  return (
    <div className={styles.container}>
      <h2>Active Cart ID: {cartProps.activeCartId ?? "None"}</h2>
      <div className={styles.productList}>
      <ProductSearch 
  {...cartProps} 
  user={user} 
  addProduct={cartProps.addProduct}
/>
      </div>
      <div className={styles.shoppingCart}>
        <ShoppingCartManager {...cartProps} user={user} />
      </div>
    </div>
  );
}
