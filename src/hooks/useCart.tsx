import { useCallback, useState } from "react";
import { useLocalStorage } from "./useLocalStorage";
import useUser from "./useUser";  // Import useUser

export default function useCart() {
  const { activeUser } = useUser();  // Get active user
  const [carts, setCarts] = useLocalStorage<Cart[]>("shoppingCarts", []);
  const [activeCartId, setActiveCartId] = useState<string | null>(null);

  // Ensure activeUser exists before filtering
  const ownedCarts = activeUser
    ? carts.filter((cart) => cart.owner === activeUser.username)
    : [];

  const activeCart = carts.find((cart) => cart.id === activeCartId);

  const createCart = useCallback(() => {
    if (!activeUser) {
      console.error("No active user found.");
      return;
    }

    const name = prompt("Enter cart name")?.trim();
    if (!name) return;

    const newCart: Cart = {
      id: crypto.randomUUID(),
      name,
      products: [],
      owner: activeUser.username,  // Use active user
    };

    setCarts((prev) => [...prev, newCart]);
    setActiveCartId(newCart.id);
  }, [activeUser, setCarts, setActiveCartId]);

  const deleteCart = useCallback(
    (id: string) => {
      setCarts((prev) => prev.filter((cart) => cart.id !== id));
      if (id === activeCartId) setActiveCartId(null);
    },
    [setCarts, activeCartId, setActiveCartId]
  );

  return {
    createCart,
    deleteCart,
    activeCart,
    carts,
    ownedCarts,
    activeCartId,
    setActiveCartId,
  };
}
