import { useState } from "react";
import ShoppingCartManager from "./ShoppingCartManager";
import ProductSearch from "./ProductSearch";
import { useLocalStorage } from "../hooks/useLocalStorage";
import styles from "./ProductManager.module.css";

export default function ProductManager() {
  const [carts, setCarts] = useLocalStorage<Cart[]>("shoppingCarts", []);
  const [activeCartId, setActiveCartId] = useState<string | null>(null);

 
 
  const addToCart = (product: Product) => {
    if (!activeCartId) return;
    setCarts((prev) =>
      prev.map((cart) =>
        cart.id === activeCartId
          ? {
              ...cart,
              products: updateProductList(cart.products, product),
            }
          : cart
      )
    );
  };

  const updateProductList = (products: Product[], product: Product) => {
    const index = products.findIndex((p) => p.id === product.id);
    if (index !== -1) {
      const updatedProducts = [...products];
      updatedProducts[index] = {
        ...updatedProducts[index],
        quantity: updatedProducts[index].quantity + 1,
      };
      return updatedProducts;
    }
    return [...products, { ...product, quantity: 1 }];
  };

  return (
    <div className={styles.container}>
                    <div className={styles.productList}>
            <ProductSearch setAddToCart={addToCart} />
        </div>
        <div className={styles.shoppingCart}>
            <ShoppingCartManager
                carts={carts}
                setCarts={setCarts}
                activeCartId={activeCartId}
                setActiveCartId={setActiveCartId}
            />
            </div>

    </div>

  );
}
