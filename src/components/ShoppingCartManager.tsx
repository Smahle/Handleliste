import {
  Button,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Tooltip,
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

  return (
    <div className={styles.container}>
      <div className={styles.cartManagement}>
        {/* New Cart Button - Always enabled */}
        <Tooltip title="Create new cart">
          <Button
            onClick={() => {
              createNewCart();
              navigateToHome();
            }}
          >
            <AddShoppingCart />
          </Button>
        </Tooltip>

        {/* Copy Cart Button - Disabled when no active cart */}
        <Tooltip title={!activeCart ? "No cart to copy" : "Copy current cart"}>
          <span>
            {" "}
            {/* Wrapper span for disabled tooltip */}
            <Button
              disabled={!activeCart}
              onClick={() => {
                copyCart();
                navigateToHome();
              }}
            >
              <ContentCopy />
            </Button>
          </span>
        </Tooltip>

        {/* Create Receipt Button - Disabled when no active cart */}
        <Tooltip
          title={!activeCart ? "No cart to create receipt" : "Create receipt"}
        >
          <span>
            <Button disabled={!activeCart} onClick={() => setReceiptOpen(true)}>
              <Description />
            </Button>
          </span>
        </Tooltip>

        <CreateReceipt
          open={receiptOpen}
          onClose={() => setReceiptOpen(false)}
        />

        {/* Favorite Button - Disabled when no active cart or user */}
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
        >
          <span>
            <Button
              disabled={!activeCart || !activeUser}
              onClick={() => {
                if (!activeCart || !activeUser) return;
                activeUser.favorites.includes(activeCart.id)
                  ? unFavoriteCart(activeCart.id)
                  : favoriteCart(activeCart.id);
              }}
            >
              {activeCart && activeUser?.favorites.includes(activeCart.id) ? (
                <Star color="primary" />
              ) : (
                <StarBorder />
              )}
            </Button>
          </span>
        </Tooltip>

        {/* Cart Owner Display - Only shows when active cart exists */}
        {activeCart && (
          <Tooltip title="View cart owner profile">
            <Button
              onClick={() => navigate(`/profile/${activeCart.owner}`)}
              style={{ marginLeft: "1rem" }}
            >
              <Person />
              {activeCart.owner}
            </Button>
          </Tooltip>
        )}

        {/* Cart Selector Dropdown */}
        <div className={styles.dropDown}>
          <Select
            value={activeCart?.id || ""}
            onChange={handleChange}
            labelId="selected-cart"
            displayEmpty
            renderValue={(selected) => {
              if (!selected) {
                return <em>Select a cart</em>;
              }
              return activeCart?.name || selected;
            }}
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
        </div>
      </div>

      {/* Shopping Cart Display */}
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
