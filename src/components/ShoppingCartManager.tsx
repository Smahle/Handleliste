import { Button, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import ShoppingCart from "./ShoppingCart";
import styles from "./ShoppingCartManager.module.css";
import { useCartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

export default function ShoppingCartManager() {
  const {createNewCart, activeCartId, carts, setActiveCartId, copyCart} = useCartContext();
  const activeCart = carts.find((cart) => cart.id === activeCartId);
  const navigate = useNavigate()
  const handleChange = (event: SelectChangeEvent)=>{
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
        <p style={{ paddingLeft: "1rem" }}>Cart owner:
          <Button disabled={!activeCart} onClick={()=>navigate(`/profile/${activeCart?.owner}`)} style={{ paddingLeft: "1rem" }}> {activeCart?.owner} </Button>           
       </p>       
     </div>

      <div className={styles.shoppingCart}>
        {activeCart && (
          <ShoppingCart/>
        )}
      </div>
    </div>
  );
}
