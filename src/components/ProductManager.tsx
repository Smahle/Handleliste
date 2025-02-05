import { useState } from "react";
import ShoppingCartManager from "./ShoppingCartManager";
import ProductSearch from "./ProductSearch";
import { useLocalStorage } from "../hooks/useLocalStorage";
import styles from "./ProductManager.module.css";

type ProductManagerProps = {
  user: User;
};

export default function ProductManager({user}: ProductManagerProps) {
  const [carts, setCarts] = useLocalStorage<Cart[]>("shoppingCarts", []);
  const [activeCartId, setActiveCartId] = useState<string | null>(null);
 
  //takes a product and updates the products for the active cart
  const addToCart = (product: Product) => {
    if (!activeCartId) return;
    setCarts((prev) =>
      prev.map((cart) =>
        cart.id === activeCartId
          ? {
              ...cart,
              products: updateProductCart(cart.products, product)
            }
          : cart
      )
    );
  };

  //checks if a product is in a list, updates its quantity if not
  const updateProductCart = (products: Product[], product: Product) => {
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
                user={user}
                carts={carts}
                setCarts={setCarts}
                activeCartId={activeCartId}
                setActiveCartId={setActiveCartId}
            />
            </div>

    </div>

  );
}
