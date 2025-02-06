import { useLocalStorage } from "../hooks/useLocalStorage";

type UserProps = {
  user: User;
};

export default function User({ user }: UserProps) {
  const [carts] = useLocalStorage<Cart[]>("shoppingCarts", []);

  const userCarts = carts.filter(cart => cart.owner.username === user.username);

  return (
    <div>
      <h2>My Shopping Carts</h2>
      {userCarts.length > 0 ? (
        <ul>
          {userCarts.map((cart) => (
            <li key={cart.id}>{cart.name}</li>
          ))}
        </ul>
      ) : (
        <p>No carts found</p>
      )}
    </div>
  );
}
