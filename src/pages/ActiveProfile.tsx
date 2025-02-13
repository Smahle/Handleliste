
type ActiveProfileProps = {
    userStateProps: UserState;
    cartProps: CartState;
  };

export default function ActiveProfile({ cartProps, userStateProps }: ActiveProfileProps)){

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
      </div>
    );
}