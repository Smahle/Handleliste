import { Button, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import ShoppingCart from "./ShoppingCart";
import styles from "./ShoppingCartManager.module.css";
import { useCartContext } from "../context/CartContext";

export default function ShoppingCartManager() {
  const {createNewCart, activeCartId, carts, setActiveCartId, copyCart} = useCartContext();
  const activeCart = carts.find((cart) => cart.id === activeCartId);

  const handleChange = (event: SelectChangeEvent)=>{
    console.log(event.target.value)
    setActiveCartId(event.target.value)
  }

  return (
    <div className={styles.container}>
      <div className={styles.cartManagement}>
        <Button onClick={createNewCart}>Create New Cart</Button>
        <Button disabled={!activeCartId} onClick={copyCart}>Copy Cart</Button>    
        <Select value={activeCart?.id || ""} onChange={handleChange}>
          {carts.map((cart) => (
           <MenuItem key={cart.id} value={cart.id}>{cart.name}</MenuItem>
          ))}
        </Select>
        <p style={{ paddingLeft: "1rem" }}>Cart owner: {activeCart?.owner} </p>       
     </div>

      <div className={styles.shoppingCart}>
        {activeCart && (
          <ShoppingCart/>
        )}
      </div>
    </div>
  );
}
