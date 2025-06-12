import { useCallback, useState } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { useUserContext } from "../context/UserContext";

const defaultCarts: Cart[] = [
  {
    id: "mock-cart-id",
    name: "Mock User's Cart",
    products: [],
    owner: "mockUser",
    receipts: [],
  },
];

export default function useCart() {
  const { activeUser, updateUser, setActiveUser } = useUserContext();
  const [carts, setCarts] = useLocalStorage<Cart[]>(
    "shoppingCarts",
    defaultCarts
  );
  const [activeCartId, setActiveCartId] = useState<string | null>(null);

  const ownedCarts = (owner: User): Cart[] => {
    return carts.filter(
      (cart) => cart.owner.toLowerCase() === owner.username?.toLowerCase()
    );
  };

  const createNewCart = useCallback(() => {
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
      owner: activeUser.username,
      receipts: [],
    };

    setCarts((prev) => [...prev, newCart]);
    setActiveCartId(newCart.id);
  }, [activeUser, setCarts, setActiveCartId]);

  const copyCart = useCallback(() => {
    if (!activeUser) {
      console.error("No active user found.");
      return;
    }

    if (!activeCartId) {
      console.error("No active cart ID set.");
      return;
    }

    const activeCart = carts.find((cart) => cart.id === activeCartId);
    if (!activeCart) {
      console.error("No active cart found.");
      return;
    }

    const name = prompt("Enter cart name")?.trim();
    if (!name) return;

    const newCart: Cart = {
      id: crypto.randomUUID(),
      name,
      products: activeCart.products || [],
      owner: activeUser.username,
      receipts: [],
    };
    console.log("Creating copy of:", activeCart);
    setCarts((prev) => [...prev, newCart]);
    setActiveCartId(newCart.id);
  }, [activeUser, activeCartId, carts]);

  const deleteCart = useCallback(
    (id: string) => {
      setCarts((prev) => prev.filter((cart) => cart.id !== id));
      if (id === activeCartId) setActiveCartId(null);
    },
    [setCarts, activeCartId, setActiveCartId]
  );

  const addProduct = useCallback(
    (cartId: string, product: Product) => {
      setCarts((prev) =>
        prev.map((cart) =>
          cart.id === cartId
            ? {
                ...cart,
                products: cart.products.some((p) => p.id === product.id)
                  ? cart.products.map((p) =>
                      p.id === product.id
                        ? { ...p, quantity: (p.quantity ?? 1) + 1 }
                        : p
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
            ? {
                ...cart,
                products: cart.products.filter((p) => p.id !== productId),
              }
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
                  p.id === productId
                    ? { ...p, quantity: Math.max(1, p.quantity - 1) }
                    : p
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
        prev.map((cart) =>
          cartId === activeCartId ? { ...cart, products: [] } : cart
        )
      );
    },
    [setCarts, activeCartId]
  );

  const favoriteCart = (cartId: string) => {
    if (!activeUser) return;
    if (!carts.find((cart) => cart.id === cartId)) {
      console.log("Favorite failed: cart not found");
      return;
    }

    if (activeUser?.favorites.includes(cartId)) {
      console.log("Cart is already favorited");
      return;
    }

    const updatedUser = {
      ...activeUser,
      favorites: [...(activeUser.favorites || []), cartId],
    };

    updateUser(updatedUser);
    setActiveUser(updatedUser);
  };

  const unFavoriteCart = (cartId: string) => {
    if (!activeUser) return;
    if (!carts.find((cart) => cart.id === cartId)) {
      console.log("Favorite failed: cart not found");
      return;
    }

    if (!activeUser?.favorites.includes(cartId)) {
      console.log("Cart is not favorited");
      return;
    }

    const updatedUser = {
      ...activeUser,
      favorites: activeUser.favorites.filter(
        (cartIdToUnFavorite) => cartId !== cartIdToUnFavorite
      ),
    };
    updateUser(updatedUser);
    setActiveUser(updatedUser);
  };

  const addReceipt = useCallback(
    (cartId: string, receipt: Receipt) => {
      setCarts((prev) =>
        prev.map((cart) =>
          cart.id === cartId
            ? { ...cart, receipts: [...cart.receipts, receipt] }
            : cart
        )
      );
    },
    [setCarts]
  );

  const removeReceipt = useCallback(
    (cartId: string, receiptTitle: string) => {
      setCarts((prev) =>
        prev.map((cart) =>
          cart.id === cartId
            ? {
                ...cart,
                receipts: cart.receipts.filter((r) => r.title !== receiptTitle),
              }
            : cart
        )
      );
    },
    [setCarts]
  );

  const updateReceipt = useCallback(
    (cartId: string, updatedReceipt: Receipt) => {
      setCarts((prev) =>
        prev.map((cart) =>
          cart.id === cartId
            ? {
                ...cart,
                receipts: cart.receipts.map((r) =>
                  r.title === updatedReceipt.title ? updatedReceipt : r
                ),
              }
            : cart
        )
      );
    },
    [setCarts]
  );

  return {
    addReceipt,
    removeReceipt,
    updateReceipt,
    createNewCart,
    copyCart,
    deleteCart,
    carts,
    ownedCarts,
    activeCartId,
    setActiveCartId,
    incrementProduct,
    decrementProduct,
    clearCart,
    removeProduct,
    addProduct,
    favoriteCart,
    unFavoriteCart,
  };
}
