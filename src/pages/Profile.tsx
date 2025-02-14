import { useParams, useNavigate } from "react-router-dom"; 
import { Button, List, ListItem } from "@mui/material";
import { Star, StarBorder } from "@mui/icons-material";
import { useUserContext } from "../context/UserContext";
import { useCartContext } from "../context/CartContext";

export default function Profile() {
  const {username} = useParams();
  const {favoriteCart, unFavoriteCart, setActiveCartId, ownedCarts} = useCartContext()
  const {users, activeUser } = useUserContext();
  const navigate = useNavigate();
  const profileUser = users.find((u) => u.username === username);

  if (!profileUser) {
    return <h2>User not found</h2>;
  }
  
  const ownecProfileUserCarts = ownedCarts(profileUser) || [];

 
  return (
    <div>
      <h2>Profile of {username}</h2>
      <div>
        <h2>Shopping Carts</h2>
        {ownecProfileUserCarts.length > 0 ? (
          <List>
            {ownecProfileUserCarts.map((shoppingCart) => (
              <ListItem key={shoppingCart.id}>
                <Button 
                  onClick={() => {
                    navigate("/");
                    setActiveCartId(shoppingCart.id);
                  }}
                >
                  {shoppingCart.name}
                </Button>
                  {!(username==activeUser?.username) && (
                    <Button 
                      onClick={() => {
                        {{console.log(activeUser)}{activeUser?.favorites.includes(shoppingCart.id) ? unFavoriteCart(shoppingCart.id) : favoriteCart(shoppingCart.id)}}
                      }}>
                        {activeUser?.favorites.includes(shoppingCart.id) ? <StarBorder></StarBorder> : <Star></Star>}
                    </Button>)}
              </ListItem>
            ))}
          </List>
        ) : (
          <p>No carts found</p>
        )}
      </div>
      <div>
        {username==activeUser?.username && (
          <h1>Favorites</h1>)}
      </div>
    </div>
  );
}
