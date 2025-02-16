import { useParams, useNavigate } from "react-router-dom";
import { Button, List, ListItem } from "@mui/material";
import { Star, StarBorder } from "@mui/icons-material";
import { useUserContext } from "../context/UserContext";
import { useCartContext } from "../context/CartContext";

export default function Profile() {
  const { username } = useParams();
  const { favoriteCart, unFavoriteCart, setActiveCartId, ownedCarts, carts } =
    useCartContext();
  const { users, activeUser } = useUserContext();
  const navigate = useNavigate();
  const profileUser = users.find((u) => u.username === username);

  if (!profileUser) {
    return <h2>User not found</h2>;
  }

  const ownedProfileCarts = ownedCarts(profileUser) || [];

  const handleNavigateClick = (cartId: string) => {
    setActiveCartId(cartId);
    navigate("/");
  };

  return (
    <>
      <h2>Profile of {username}</h2>
      <>
        <h2>Shopping Carts</h2>
        {ownedProfileCarts.length > 0 ? (
          <List>
            {ownedProfileCarts.map((shoppingCart) => (
              <ListItem key={shoppingCart.id}>
                <Button
                  onClick={() => {
                    navigate("/");
                    setActiveCartId(shoppingCart.id);
                  }}
                >
                  {shoppingCart.name}
                </Button>
                {!(username == activeUser?.username) && (
                  <Button
                    onClick={() => {
                      {
                        activeUser?.favorites.includes(shoppingCart.id)
                          ? unFavoriteCart(shoppingCart.id)
                          : favoriteCart(shoppingCart.id);
                      }
                    }}
                  >
                    {!activeUser?.favorites.includes(shoppingCart.id) ? (
                      <StarBorder></StarBorder>
                    ) : (
                      <Star></Star>
                    )}
                  </Button>
                )}
              </ListItem>
            ))}
          </List>
        ) : (
          <p>No carts found</p>
        )}
      </>
      <>
        {username === activeUser?.username && (
          <>
            <h1>Favorites</h1>
            {(activeUser?.favorites ?? []).length <= 0 ? (
              <p>No favorited lists</p>
            ) : (
              <List>
                {carts
                  .filter((cart) => activeUser?.favorites.includes(cart.id))
                  .map((cart) => (
                    <ListItem key={cart.id}>
                      <Button onClick={() => handleNavigateClick(cart.id)}>
                        {cart.name}
                      </Button>
                    </ListItem>
                  ))}
              </List>
            )}
          </>
        )}
      </>
    </>
  );
}
