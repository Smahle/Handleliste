import { useState } from "react";
import { Button, List, ListItem } from "@mui/material";
import ProductImage from "./ProductImage";
import styles from "./ShoppingCart.module.css";
import ArrowDropUp from "@mui/icons-material/ArrowDropUp";
import ArrowDropDown from "@mui/icons-material/ArrowDropDown";
import { Delete } from "@mui/icons-material";
import { useCartContext } from "../context/CartContext";

export default function ShoppingCart({
  showFullControls,
}: {
  showFullControls: boolean;
}) {
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

  const toggleHideShow = (productId: string): string => {
    if (hiddenProducts.has(productId)) {
      return "SHOW";
    } else return "HIDE";
  };

  return (
    <>
      <List
        sx={{ padding: 0, margin: 0 }}
        className={styles.shoppingCartContainer}
      >
        {activeCart.products.length > 0 ? (
          activeCart.products.map((product) => (
            <ListItem key={product.id} className={styles.itemContainer}>
              <div className={styles.item}>
                <ProductImage imageSrc={product.image} altText={product.name} />
                <div
                  className={
                    hiddenProducts.has(product.id)
                      ? `${styles.listItem} ${styles.hiddenListItem}`
                      : styles.listItem
                  }
                >
                  {product.name}
                </div>
              </div>
              <div className={styles.itemQuantityContainer}>
                {showFullControls ? (
                  <>
                    <div className={styles.itemQuantity}>
                      {product.quantity}
                    </div>
                    <button
                      onClick={() =>
                        incrementProduct(activeCart.id, product.id)
                      }
                    >
                      <ArrowDropUp />
                    </button>
                    <button
                      onClick={() =>
                        decrementProduct(activeCart.id, product.id)
                      }
                    >
                      <ArrowDropDown />
                    </button>
                    <button
                      onClick={() => removeProduct(activeCart.id, product.id)}
                    >
                      <Delete />
                    </button>
                  </>
                ) : (
                  <Button onClick={() => toggleHideProduct(product.id)}>
                    {toggleHideShow(product.id)}
                  </Button>
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
          <Button
            sx={{
              backgroundColor: (theme) => theme.palette.primary.main,
              color: (theme) => theme.palette.primary.contrastText,
            }}
            onClick={() => clearCart(activeCart.id)}
          >
            Clear cart
          </Button>
          <Button
            sx={{
              backgroundColor: (theme) => theme.palette.primary.main,
              color: (theme) => theme.palette.primary.contrastText,
            }}
            onClick={() => deleteCart(activeCart.id)}
          >
            Delete cart
          </Button>
        </>
      )}
    </>
  );
}
