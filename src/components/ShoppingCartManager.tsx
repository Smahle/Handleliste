import { Button, List, ListItem } from "@mui/material";
import ShoppingCart from "./ShoppingCart";
import styles from "./ShoppingCartManager.module.css";
import useCart from "../hooks/useCart";

type ShoppingCartManagerProps = {
  user: User;
  carts: Cart[];
  setCarts: React.Dispatch<React.SetStateAction<Cart[]>>;
  activeCartId: string | null;
  setActiveCartId: React.Dispatch<React.SetStateAction<string | null>>;
};
// lag custom hooks fer create cart, delete, remove, increment etc
export default function ShoppingCartManager({
  user,
  carts,
  setCarts,
  activeCartId,
  setActiveCartId,
}: ShoppingCartManagerProps) {

const {createCart, deleteCart, addProduct, removeProduct, incrementProduct, decrementProduct, activeCart, clearCart} = useCart({ user, carts, setCarts, activeCartId, setActiveCartId })

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
