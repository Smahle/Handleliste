import { Button, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { Star, StarBorder } from "@mui/icons-material";
import ShoppingCart from "./ShoppingCart";
import styles from "./ShoppingCartManager.module.css";
import { useCartContext } from "../context/CartContext";
import { useLocation, useNavigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";

export default function ShoppingCartManager({ showFullControls }: { showFullControls: boolean }) {
  const { createNewCart, activeCartId, carts, setActiveCartId, copyCart, unFavoriteCart, favoriteCart } = useCartContext();
  const { activeUser } = useUserContext();
  const activeCart = carts.find((cart) => cart.id === activeCartId);
  const navigate = useNavigate();

  const handleChange = (event: SelectChangeEvent) => {
    setActiveCartId(event.target.value);
  };
  const location = useLocation();
  const navigateToHome = () => {
    if (location.pathname !== "/") {
      navigate("/");
    }
  };
  
  // If no activeUser, only show the select button and create new cart
  if (!activeCart) {
    return (
      <div className={styles.container}>
        <Button onClick={createNewCart}>Create New Cart</Button>
        Select cart: 
        <Select value={activeCartId || ""} onChange={handleChange} fullWidth>
          {carts.map((cart) => (
            <MenuItem key={cart.id} value={cart.id}>{cart.name}</MenuItem>
          ))}
        </Select>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.cartManagement}>
        <Button onClick={() => { createNewCart(); navigateToHome(); }}>Create New Cart</Button>
        <Button disabled={!activeCartId} onClick={() => { copyCart(); navigateToHome(); }}>Copy Cart</Button>
        <Select value={activeCart?.id || ""} onChange={handleChange}>
          {carts.map((cart) => (
            <MenuItem key={cart.id} value={cart.id}>{cart.name}</MenuItem>
          ))}
        </Select>
        {activeCart && (
          <p style={{ paddingLeft: "1rem" }}>
            Cart owner:
            <Button onClick={() => navigate(`/profile/${activeCart.owner}`)} style={{ paddingLeft: "1rem" }}>
              {activeCart.owner}
            </Button>
          </p>
        )}
              {activeCart && (
        <Button
          disabled={!activeUser}
          onClick={() => {
            if (!activeUser) return;
            activeUser.favorites.includes(activeCart.id)
              ? unFavoriteCart(activeCart.id)
              : favoriteCart(activeCart.id);
          }}
        >
          {activeUser?.favorites.includes(activeCart.id) ? <Star /> : <StarBorder />}
       </Button>
    )}
      </div>

      <div className={styles.shoppingCart}>
        {activeCart && <ShoppingCart showFullControls={showFullControls} />}
      </div>
    </div>
  );
}
