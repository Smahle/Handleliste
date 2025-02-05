import { useLocalStorage } from "../hooks/useLocalStorage";

type UserProps = {
  user: User;
};

export default function User({ user }: UserProps) {
  const [carts] = useLocalStorage<Cart[]>("shoppingCarts", []);

  // Filter carts owned by the user
  const userCarts = carts.filter(cart => cart.owner.username === user.username);

  return (
    <div>
      <h2>{user.username}'s Shopping Carts</h2>
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
