import { List, ListItem } from "@mui/material";

;
export default function Profile({ cartProps, user }: UserAndCartsProps) {

  return (
    <div>
      <div>
        <h2>My Shopping Carts</h2>
        {cartProps.ownedCarts.length > 0 ? (
          <List>
            {cartProps.ownedCarts.map((shoppingCart) => (
              <ListItem key={shoppingCart.id}>{shoppingCart.name}</ListItem>
            ))}
          </List>
        ) : (
          <p>No carts found</p>
        )}
      </div>
      <div>
        
      </div>
    </div>
  );
}
