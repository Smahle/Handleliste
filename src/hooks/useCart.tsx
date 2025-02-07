import { useCallback, useState } from "react";
import { useLocalStorage } from "./useLocalStorage";

type UseCartProps = {
  user: User;
};

export default function useCart({ user }: UseCartProps) {
  const [carts, setCarts] = useLocalStorage<Cart[]>("shoppingCarts", []);
  const [activeCartId, setActiveCartId] = useState<string | null>(null);
  const ownedCarts = carts.filter((cart) => cart.owner.username === user.username);
  const activeCart = carts.find((cart) => cart.id === activeCartId);

  const createCart = useCallback(() => {
    const name = prompt("Enter cart name")?.trim();
    if (!name) return;

    const newCart: Cart = { id: crypto.randomUUID(), name, products: [], owner: user };
    setCarts((prev) => [...prev, newCart]);
    setActiveCartId(newCart.id);
  }, [user, setCarts, setActiveCartId]);

  const deleteCart = useCallback(
    (id: string) => {
      setCarts((prev) => prev.filter((cart) => cart.id !== id));
      if (id === activeCartId) setActiveCartId(null);
    },
    [setCarts, activeCartId, setActiveCartId]
  );
  const selectCart = (id: string | null) => {
    setActiveCartId(id);
  };
  const addProduct = useCallback(
    (cartId: string, product: Product) => {
      setCarts((prev) =>
        prev.map((cart) =>
          cart.id === cartId
            ? {
                ...cart,
                products: cart.products.some((p) => p.id === product.id)
                  ? cart.products.map((p) =>
                      p.id === product.id ? { ...p, quantity: (p.quantity ?? 1) + 1 } : p
                    )
                  : [...cart.products, { ...product, quantity: 1 }],
              }
            : cart
        )
      );
    },
    [setCarts]
  );
  

  const removeProduct = useCallback(
    (cartId: string, productId: string) => {
      setCarts((prev) =>
        prev.map((cart) =>
          cart.id === cartId
            ? { ...cart, products: cart.products.filter((p) => p.id !== productId) }
            : cart
        )
      );
    },
    [setCarts]
  );

  const incrementProduct = useCallback(
    (cartId: string, productId: string) => {
      setCarts((prev) =>
        prev.map((cart) =>
          cart.id === cartId
            ? {
                ...cart,
                products: cart.products.map((p) =>
                  p.id === productId ? { ...p, quantity: p.quantity + 1 } : p
                ),
              }
            : cart
        )
      );
    },
    [setCarts]
  );

  const decrementProduct = useCallback(
    (cartId: string, productId: string) => {
      setCarts((prev) =>
        prev.map((cart) =>
          cart.id === cartId
            ? {
                ...cart,
                products: cart.products.map((p) =>
                  p.id === productId ? { ...p, quantity: Math.max(1, p.quantity - 1) } : p
                ),
              }
            : cart
        )
      );
    },
    [setCarts]
  );

  const clearCart = useCallback(
    (cartId: string) => {
      if (!activeCartId) return;
      setCarts((prev) =>
        prev.map((cart) => (cartId === activeCartId ? { ...cart, products: [] } : cart))
      );
    },
    [setCarts, activeCartId]
  );

  return {
    createCart,
    deleteCart,
    addProduct,
    removeProduct,
    incrementProduct,
    decrementProduct,
    activeCart,
    clearCart,
    carts,
    setCarts,
    activeCartId,
    setActiveCartId,
    ownedCarts,
    selectCart
  };
}
