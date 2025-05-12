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
  //TODO: PADDING
  return (
    <div className="shoppingCartManagerContainer">
      <div className="cartManagement">
        <Tooltip title="Create new cart">
          <Button
            onClick={() => {
              createNewCart();
              navigateToHome();
            }}
            sx={{
              backgroundColor: (theme) => theme.palette.primary.main,
              color: (theme) => theme.palette.primary.contrastText,
              marginRight: "10px",
              "&:hover": {
                backgroundColor: (theme) => theme.palette.primary.dark,
              },
            }}
          >
            <AddShoppingCart />
          </Button>
        </Tooltip>

        <Tooltip title={!activeCart ? "No cart to copy" : "Copy current cart"}>
          <Button
            disabled={!activeCart}
            onClick={() => {
              copyCart();
              navigateToHome();
            }}
            sx={{
              backgroundColor: (theme) => theme.palette.primary.main,
              color: (theme) => theme.palette.primary.contrastText,
              marginRight: "10px",
              "&:hover": {
                backgroundColor: (theme) => theme.palette.primary.dark,
              },
            }}
          >
            <ContentCopy />
          </Button>
        </Tooltip>

        <Tooltip
          title={!activeCart ? "No cart to create receipt" : "Create receipt"}
        >
          <Button
            disabled={!activeCart}
            onClick={() => setReceiptOpen(true)}
            sx={{
              backgroundColor: (theme) => theme.palette.primary.main,
              color: (theme) => theme.palette.primary.contrastText,
              marginRight: "10px",
              "&:hover": {
                backgroundColor: (theme) => theme.palette.primary.dark,
              },
            }}
          >
            <Description />
          </Button>
        </Tooltip>

        <CreateReceipt
          open={receiptOpen}
          onClose={() => setReceiptOpen(false)}
        />

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
          <Button
            disabled={!activeCart || !activeUser}
            onClick={() => {
              if (!activeCart || !activeUser) return;
              activeUser.favorites.includes(activeCart.id)
                ? unFavoriteCart(activeCart.id)
                : favoriteCart(activeCart.id);
            }}
            sx={{
              backgroundColor: (theme) => theme.palette.primary.main,
              color: (theme) => theme.palette.primary.contrastText,
              marginRight: "10px",
              "&:hover": {
                backgroundColor: (theme) => theme.palette.primary.dark,
              },
            }}
          >
            {activeCart && activeUser?.favorites.includes(activeCart.id) ? (
              <Star />
            ) : (
              <StarBorder />
            )}
          </Button>
        </Tooltip>

        {activeCart && (
          <Tooltip title="View cart owner profile">
            <Button
              onClick={() => navigate(`/profile/${activeCart.owner}`)}
              sx={{
                backgroundColor: (theme) => theme.palette.primary.main,
                color: (theme) => theme.palette.primary.contrastText,
                marginLeft: "1rem",
                "&:hover": {
                  backgroundColor: (theme) => theme.palette.primary.dark,
                },
              }}
            >
              <Person />
              {activeCart.owner}
            </Button>
          </Tooltip>
        )}

        <div className="dropDown">
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

      <div className="shoppingCart">
        {activeCart ? (
          <ShoppingCart showFullControls={showFullControls} />
        ) : (
          <div className="emptyCartPlaceholder">
            <p>No active cart selected</p>
          </div>
        )}
      </div>
    </div>
  );
}
