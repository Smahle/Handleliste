import {
  Button,
  MenuItem,
  Select,
  SelectChangeEvent,
  Tooltip,
} from "@mui/material";
import {
  AddShoppingCart,
  ContentCopy,
  Description,
  Person,
  Star,
  StarBorder,
} from "@mui/icons-material";
import ShoppingCart from "./ShoppingCart";
import { useCartContext } from "../context/CartContext";
import { useLocation, useNavigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
import CreateReceipt from "./CreateReceipt";
import { useState } from "react";
import styles from "./ShoppingCartManager.module.css";

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

  return (
    <div className={`${styles.shoppingCartManagerContainer} tertiary`}>
      <div className={styles.cartManagement}>
        <div className={styles.selectCart}>
          <Tooltip title="Select cart" disableInteractive>
            <Select
              sx={{ width: 180 }}
              variant="filled"
              value={activeCart?.id || ""}
              onChange={handleChange}
              labelId="selected-cart"
              displayEmpty
              renderValue={(selected) =>
                selected ? activeCart?.name : <em>Select cart</em>
              }
            >
              {carts.length === 0 ? (
                <MenuItem disabled value="">
                  <em>No carts available</em>
                </MenuItem>
              ) : (
                carts.map((cart) => (
                  <MenuItem key={cart.id} value={cart.id}>
                    {cart.name}
                  </MenuItem>
                ))
              )}
            </Select>
          </Tooltip>
        </div>

        <div className={styles.managementItem}>
          <Tooltip title="Create new cart" disableInteractive>
            <Button
              variant="contained"
              onClick={() => {
                createNewCart();
                navigateToHome();
              }}
            >
              <AddShoppingCart />
            </Button>
          </Tooltip>
        </div>

        <div className={styles.managementItem}>
          <Tooltip
            title={!activeCart ? "No cart to copy" : "Copy current cart"}
            disableInteractive
          >
            <Button
              variant="contained"
              disabled={!activeCart}
              onClick={() => {
                copyCart();
                navigateToHome();
              }}
            >
              <ContentCopy />
            </Button>
          </Tooltip>
        </div>

        <div className={styles.managementItem}>
          <Tooltip
            title={!activeCart ? "No cart to create receipt" : "Create receipt"}
            disableInteractive
          >
            <Button
              disabled={!activeCart}
              variant="contained"
              onClick={() => setReceiptOpen(true)}
            >
              <Description />
            </Button>
          </Tooltip>
          <CreateReceipt
            open={receiptOpen}
            onClose={() => setReceiptOpen(false)}
          />
        </div>

        <div className={styles.managementItem}>
          <Tooltip
            title={
              !activeUser
                ? "Login to favorite"
                : !activeCart
                ? "No cart to favorite"
                : activeUser.favorites.includes(activeCart.id)
                ? "Unfavorite cart"
                : "Favorite cart"
            }
            disableInteractive
          >
            <Button
              variant="contained"
              disabled={!activeCart || !activeUser}
              onClick={() => {
                if (!activeCart || !activeUser) return;
                activeUser.favorites.includes(activeCart.id)
                  ? unFavoriteCart(activeCart.id)
                  : favoriteCart(activeCart.id);
              }}
            >
              {activeCart && activeUser?.favorites.includes(activeCart.id) ? (
                <Star />
              ) : (
                <StarBorder />
              )}
            </Button>
          </Tooltip>
        </div>

        <div className={styles.managementItem}>
          {activeCart && (
            <Tooltip title="View cart owner profile" disableInteractive>
              <Button
                variant="contained"
                onClick={() => navigate(`/profile/${activeCart.owner}`)}
              >
                <Person />
                {activeCart.owner}
              </Button>
            </Tooltip>
          )}
        </div>
      </div>

      <div className={styles.shoppingCart}>
        {activeCart ? (
          <ShoppingCart showFullControls={showFullControls} />
        ) : (
          <div className={styles.emptyCartPlaceholder}>
            <p>No active cart selected</p>
          </div>
        )}
      </div>
    </div>
  );
}
