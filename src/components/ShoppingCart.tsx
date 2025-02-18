import { useState } from "react";
import { Button, List, ListItem } from "@mui/material";
import ProductImage from "./ProductImage";
import styles from "./ShoppingCart.module.css";
import ArrowDropUp from "@mui/icons-material/ArrowDropUp";
import ArrowDropDown from "@mui/icons-material/ArrowDropDown";
import { Delete } from "@mui/icons-material";
import { useCartContext } from "../context/CartContext";

export default function ShoppingCart({ showFullControls }: { showFullControls: boolean }) {
  const {
    activeCartId,
    carts,
    clearCart,
    removeProduct,
    incrementProduct,
    decrementProduct,
    deleteCart,
  } = useCartContext();

  const activeCart = carts.find((cart) => cart.id === activeCartId);
  const [hiddenProducts, setHiddenProducts] = useState<Set<string>>(new Set());

  if (!activeCart) {
    return <>Loading cart...</>;
  }

  const toggleHideProduct = (productId: string) => {
    setHiddenProducts((prev) => {
      const newHiddenProducts = new Set(prev);
      if (newHiddenProducts.has(productId)) {
        newHiddenProducts.delete(productId);
      } else {
        newHiddenProducts.add(productId);
      }
      return newHiddenProducts;
    });
  };

  return (
    <>
      <List sx={{ padding: 0, margin: 0 }} className={styles.container}>
        {activeCart.products.length > 0 ? (
          activeCart.products.map((product) => (
            <ListItem
              key={product.id}
              style={{
                cursor: "pointer",
                border: "2px solid #3c4245",
                textDecoration: hiddenProducts.has(product.id) ? "line-through" : "none",
                opacity: hiddenProducts.has(product.id) ? 0.5 : 1, // Reduce opacity when hidden
              }}
              className={styles.itemContainer}
            >
              <div className={styles.item}>
                <ProductImage imageSrc={product.image} altText={product.name} />
                {product.name}
              </div>
              <div className={styles.itemQuantityContainer}>
                {showFullControls ? (
                  <>
                    <div className={styles.itemQuantity}>{product.quantity}</div>
                    <button onClick={() => incrementProduct(activeCart.id, product.id)}>
                      <ArrowDropUp />
                    </button>
                    <button onClick={() => decrementProduct(activeCart.id, product.id)}>
                      <ArrowDropDown />
                    </button>
                    <button onClick={() => removeProduct(activeCart.id, product.id)}>
                      <Delete />
                    </button>
                  </>
                ) : (
                  <Button onClick={() => toggleHideProduct(product.id)}>Hide</Button>
                )}
              </div>
            </ListItem>
          ))
        ) : (
          <p>No products in cart</p>
        )}
      </List>

      {showFullControls && (
        <>
          <Button onClick={() => clearCart(activeCart.id)}>Clear cart</Button>
          <Button onClick={() => deleteCart(activeCart.id)}>Delete cart</Button>
        </>
      )}
    </>
  );
}
