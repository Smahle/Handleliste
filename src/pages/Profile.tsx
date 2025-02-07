;
export default function Profile({ cartProps, user }: UserAndCartsProps) {

  return (
    <div>
      <h2>My Shopping Carts</h2>
      {cartProps.ownedCarts.length > 0 ? (
        <ul>
          {cartProps.ownedCarts.map((shoppingCart) => (
            <li key={shoppingCart.id}>{shoppingCart.name}</li>
          ))}
        </ul>
      ) : (
        <p>No carts found</p>
      )}
    </div>
  );
}
