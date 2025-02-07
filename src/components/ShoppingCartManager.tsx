import { Button, FormControl, List, ListItem, MenuItem, Select, SelectChangeEvent } from "@mui/material";
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

  const handleChange = (event: SelectChangeEvent)=>{
    setActiveCartId(event.target.value)
  }

  return (
    <div className={styles.container}>
      <div className={styles.cartManagement}>
        <h2>Shopping Carts</h2>
        <Button onClick={createCart}>Create New Cart</Button>   
         <FormControl>
          <Select  onChange={handleChange}>
          {carts.map((cart) => (
           <MenuItem value={cart.id}>{cart.name}</MenuItem>
          ))}
          </Select>
         </FormControl>             
      </div>

      <div className={styles.shoppingCart}>
        {activeCart && (
          <ShoppingCart
            cart={activeCart}
            removeProduct={removeProduct}
            clearCart={clearCart}
            deleteCart={deleteCart}
            incrementQuantity={incrementProduct}
            decrementQuantity={decrementProduct}
          />
        )}
      </div>
    </div>
  );
}
