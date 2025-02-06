import { useState } from "react";
import ShoppingCartManager from "./ShoppingCartManager";
import ProductSearch from "./ProductSearch";
import { useLocalStorage } from "../hooks/useLocalStorage";
import styles from "./ProductManager.module.css";

type ProductManagerProps = {
  user: User;
};

export default function ProductManager({user}: ProductManagerProps) {
  return (
    <div className={styles.container}>
      <div className={styles.productList}>
        <ProductSearch user={user} />
      </div>
      <div className={styles.shoppingCart}>
        <ShoppingCartManager user={user} />
      </div>
    </div>
  );
}
