import { useParams, useNavigate } from "react-router-dom"; 
import { Button, List, ListItem } from "@mui/material";

type ProfileProps = {
  userStateProps: UserState;
  cartProps: CartState;
};

export default function Profile({ cartProps, userStateProps }: ProfileProps) {
  const { username } = useParams();
  const navigate = useNavigate();

  const profileUser = userStateProps.users.find((u) => u.username === username);

  if (!profileUser) {
    return <h2>User not found</h2>;
  }
  
  const profileUserCarts = cartProps.ownedCarts(profileUser) || [];

  return (
    <div>
      <h2>Profile of {username}</h2>
      <div>
        <h2>Shopping Carts</h2>
        {profileUserCarts.length > 0 ? (
          <List>
            {profileUserCarts.map((shoppingCart) => (
              <ListItem key={shoppingCart.id}>
                <Button 
                  onClick={() => {
                    navigate("/");
                    cartProps.setActiveCartId(shoppingCart.id);
                  }}
                >
                  {shoppingCart.name}
                </Button>
              </ListItem>
            ))}
          </List>
        ) : (
          <p>No carts found</p>
        )}
      </div>
      <div>
        {username==userStateProps.activeUser?.username && (
          <h1>Favorites</h1>)}
      </div>
    </div>
  );
}
