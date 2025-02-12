import { Button, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import ShoppingCart from "./ShoppingCart";
import styles from "./ShoppingCartManager.module.css";


export default function ShoppingCartManager({
  createCart,
  deleteCart,
  removeProduct,
  incrementProduct,
  decrementProduct,
  activeCart,
  clearCart,
  carts,
  setActiveCartId
}: CartState) {

  const handleChange = (event: SelectChangeEvent)=>{
    setActiveCartId(event.target.value)
  }

  return (
    <div className={styles.container}>
      <div className={styles.cartManagement}>
        <Button onClick={createCart}>Create New Cart</Button>   
          <Select value={activeCart?.id || ""} onChange={handleChange}>
          {carts.map((cart) => (
           <MenuItem key={cart.id} value={cart.id}>{cart.name}</MenuItem>
          ))}
          </Select>
          <div style={{ paddingLeft: "1rem" }}>Cart owner: {activeCart?.owner} </div>       
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
