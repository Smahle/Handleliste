import { Button, List, ListItem } from "@mui/material";
import { useNavigate } from "react-router-dom";

;
export default function Profile({ cartProps }: UserAndCartsProps) {
  const navigate = useNavigate();
  return (
    <div>
      <div>
        <h2>My Shopping Carts</h2>
        {cartProps.ownedCarts.length > 0 ? (
          <List>
            {cartProps.ownedCarts.map((shoppingCart) => (
              <ListItem key={shoppingCart.id}>
                <Button onClick={() => {navigate("/");cartProps.setActiveCartId(shoppingCart.id)}}>{shoppingCart.name}</Button>
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
