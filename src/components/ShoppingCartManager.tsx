import { Button, List, ListItem } from "@mui/material";
import ShoppingCart from "./ShoppingCart";
import styles from "./ShoppingCartManager.module.css";

type ShoppingCartManagerProps = {
  user: User;
  createCart: () => void;
  deleteCart: (id: string) => void;
  removeProduct: (cartId: string, productId: string) => void;
  incrementProduct: (cartId: string, productId: string) => void;
  decrementProduct: (cartId: string, productId: string) => void;
  activeCart: Cart | undefined;
  clearCart: (cartId: string) => void;
  carts: Cart[];
  activeCartId: string | null;
  setActiveCartId: (id: string | null) => void;
};

export default function ShoppingCartManager({
  user,
  createCart,
  deleteCart,
  removeProduct,
  incrementProduct,
  decrementProduct,
  activeCart,
  clearCart,
  carts,
  activeCartId,
  setActiveCartId,
}: ShoppingCartManagerProps) {

  return (
    <div className={styles.container}>
      <div className={styles.cartManagement}>
        <h2>Shopping Carts</h2>
        <Button onClick={createCart}>Create New Cart</Button>

        <List>
          {carts.map((cart) => (
            <ListItem key={cart.id}>
              <button onClick={() => setActiveCartId(cart.id)}>
                {cart.name} {activeCartId === cart.id && "(Active)"}
              </button>
              <button onClick={() => deleteCart(cart.id)}>❌</button>
            </ListItem>
          ))}
        </List>
      </div>

      <div className={styles.shoppingCart}>
        {activeCart && (
          <ShoppingCart
            cart={activeCart}
            removeProduct={removeProduct}
            clearCart={clearCart}
            incrementQuantity={incrementProduct}
            decrementQuantity={decrementProduct}
          />
        )}
      </div>
    </div>
  );
}
