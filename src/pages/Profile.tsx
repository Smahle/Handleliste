import { useParams, useNavigate } from "react-router-dom";
import { Button, List, ListItem } from "@mui/material";
import { Padding, Star, StarBorder } from "@mui/icons-material";
import { useUserContext } from "../context/UserContext";
import { useCartContext } from "../context/CartContext";
import styles from "./Profile.module.css";

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
    navigate("/create");
  };

  return (
    <div className={`${styles.profileContainer} tertiary`}>
      <div className={styles.title}>
        <h1>Profile of {username}</h1>
      </div>
      <div className={`${styles.ownedCarts} secondary`}>
        <h2>Shopping Carts</h2>
        {ownedProfileCarts.length > 0 ? (
          <List sx={{ display: "flex", flexWrap: "wrap", padding: 0 }}>
            {ownedProfileCarts.map((shoppingCart) => (
              <ListItem
                key={shoppingCart.id}
                sx={{ width: "fit-content", padding: "2px" }}
              >
                <Button onClick={() => handleNavigateClick(shoppingCart.id)}>
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
      </div>
      <div className={`${styles.favorites} secondary`}>
        <h1>Favorites</h1>
        {(profileUser?.favorites ?? []).length <= 0 ? (
          <p>No favorited lists.</p>
        ) : (
          <List>
            {carts
              .filter((cart) => profileUser?.favorites.includes(cart.id))
              .map((cart) => (
                <ListItem key={cart.id}>
                  <Button onClick={() => handleNavigateClick(cart.id)}>
                    {cart.name}
                  </Button>
                </ListItem>
              ))}
          </List>
        )}
      </div>
      <div className={`${styles.followedUsers} secondary`}>
        <h2>Followed Users</h2>
        {profileUser.following.length ? (
          <List>
            {users
              .filter((user) => profileUser.following.includes(user.username))
              .map((user) => (
                <ListItem key={user.username}>
                  <Button onClick={() => navigate(`/profile/${user.username}`)}>
                    {user.username}
                  </Button>
                </ListItem>
              ))}
          </List>
        ) : (
          <p>Not following anyone.</p>
        )}
      </div>
    </div>
  );
}
