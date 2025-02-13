import { useParams, useNavigate } from "react-router-dom"; 
import { Button, List, ListItem } from "@mui/material";
import { Star, StarBorder } from "@mui/icons-material";

type ProfileProps = {
  userStateProps: UserState;
  cartProps: CartState;
};

export default function Profile({ cartProps, userStateProps }: ProfileProps) {
  const {username} = useParams();
  const {favoriteCart, unFavoriteCart, setActiveCartId} = cartProps;
  const {activeUser} = userStateProps;
  const navigate = useNavigate();
  const profileUser = userStateProps.users.find((u) => u.username === username);

  if (!profileUser) {
    return <h2>User not found</h2>;
  }
  
  const ownecProfileUserCarts = cartProps.ownedCarts(profileUser) || [];

 
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
                  {!(username==userStateProps.activeUser?.username) && (
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
