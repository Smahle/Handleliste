export default function UserInfo(profileProps: UserAndCartsProps) {

  return (
    <div>
      <h2>My Shopping Carts</h2>
      {profileProps.cartProps.ownedCarts.length > 0 ? (
        <ul>
          {profileProps.cartProps.ownedCarts.map((cart) => (
            <li key={cart.id}>{cart.name}</li>
          ))}
        </ul>
      ) : (
        <p>No carts found</p>
      )}
    </div>
  );
}
