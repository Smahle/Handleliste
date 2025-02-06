import useCart from "../hooks/useCart";

type UserProps = {
  user: User;
};

export default function User({ user }: UserProps) {
  const {ownedCarts} = useCart({user});

  return (
    <div>
      <h2>My Shopping Carts</h2>
      {ownedCarts.length > 0 ? (
        <ul>
          {ownedCarts.map((cart) => (
            <li key={cart.id}>{cart.name}</li>
          ))}
        </ul>
      ) : (
        <p>No carts found</p>
      )}
    </div>
  );
}
