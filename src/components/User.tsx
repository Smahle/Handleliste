import { List, ListItem } from "@mui/material";

export default function UserInfo(profileProps: UserAndCartsProps) {

  return (
    <div>
      <h2>My Shopping Carts</h2>
      {profileProps.cartProps.ownedCarts.length > 0 ? (
        <List>
          {profileProps.cartProps.ownedCarts.map((cart) => (
            <ListItem key={cart.id}>{cart.name}</ListItem>
          ))}
        </List>
      ) : (
        <p>No carts found</p>
      )}
    </div>
  );
}
