import { useParams } from "react-router-dom"; 
import { Button, List, ListItem } from "@mui/material";
import { useNavigate } from "react-router-dom";

type ProfileProps = {
  user: UserProps;
  cartProps: CartProps;
};

export default function Profile({ cartProps }: ProfileProps) {
  const { username } = useParams();
  const navigate = useNavigate();

  const userCarts = cartProps.carts.filter(
    (cart) => cart.owner.toLowerCase() === username?.toLowerCase()
  );

  return (
    <div>
      <h2>Profile of {username}</h2>
      <div>
        <h2>Shopping Carts</h2>
        {userCarts.length > 0 ? (
          <List>
            {userCarts.map((shoppingCart) => (
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
    </div>
  );
}
