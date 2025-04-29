import {
  Button,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import {
  AddShoppingCart,
  ContentCopy,
  Description,
  FormatListNumbered,
  Person,
  Star,
  StarBorder,
} from "@mui/icons-material";
import ShoppingCart from "./ShoppingCart";
import styles from "./ShoppingCartManager.module.css";
import { useCartContext } from "../context/CartContext";
import { useLocation, useNavigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
import CreateReceipt from "./CreateReceipt";
import { useState } from "react";

export default function ShoppingCartManager({
  showFullControls,
}: {
  showFullControls: boolean;
}) {
  const {
    createNewCart,
    activeCartId,
    carts,
    setActiveCartId,
    copyCart,
    unFavoriteCart,
    favoriteCart,
  } = useCartContext();
  const { activeUser } = useUserContext();
  const activeCart = carts.find((cart) => cart.id === activeCartId);
  const navigate = useNavigate();
  const [receiptOpen, setReceiptOpen] = useState(false);

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
        <Button onClick={createNewCart}>
          <AddShoppingCart />
        </Button>
        <InputLabel variant="standard" id="selected-cart">
          Select cart
        </InputLabel>
        <Select
          value={activeCartId || ""}
          onChange={handleChange}
          fullWidth
          labelId="selected-cart"
        >
          {carts.map((cart) => (
            <MenuItem key={cart.id} value={cart.id}>
              {cart.name}
            </MenuItem>
          ))}
        </Select>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.cartManagement}>
        <Button
          onClick={() => {
            createNewCart();
            navigateToHome();
          }}
        >
          <AddShoppingCart />
        </Button>
        <Button
          disabled={!activeCartId}
          onClick={() => {
            copyCart();
            navigateToHome();
          }}
        >
          <ContentCopy />{" "}
        </Button>
        <Button onClick={() => setReceiptOpen(true)}>
          <Description />
        </Button>

        <CreateReceipt
          open={receiptOpen}
          onClose={() => setReceiptOpen(false)}
        />
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
            {activeUser?.favorites.includes(activeCart.id) ? (
              <Star />
            ) : (
              <StarBorder />
            )}
          </Button>
        )}

        {activeCart && (
          <p style={{ paddingLeft: "1rem" }}>
            <Button
              onClick={() => navigate(`/profile/${activeCart.owner}`)}
              style={{ paddingLeft: "1rem" }}
            >
              <Person></Person>
              {activeCart.owner}
            </Button>
          </p>
        )}
        <div className={styles.dropDown}>
          <Select
            value={activeCart?.id || ""}
            onChange={handleChange}
            labelId="selected-cart"
          >
            {carts.map((cart) => (
              <MenuItem key={cart.id} value={cart.id}>
                {cart.name}
              </MenuItem>
            ))}
          </Select>
        </div>
      </div>

      <div className={styles.shoppingCart}>
        {activeCart && <ShoppingCart showFullControls={showFullControls} />}
      </div>
    </div>
  );
}
