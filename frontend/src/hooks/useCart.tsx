import { useCallback, useEffect, useState } from "react";
import { useUserContext } from "../context/UserContext";

export default function useCart() {
  const { activeUser, setActiveUser } = useUserContext();
  const [carts, setCarts] = useState<Cart[]>([]);
  const [activeCartId, setActiveCartId] = useState<string | null>(null);

  useEffect(() => {
    if (!activeUser) {
      const mockUser: User = {
        username: "testuser",
        favorites: [],
        following: [],
      };
      setActiveUser(mockUser);
    }
  }, [activeUser, setActiveUser]);

  useEffect(() => {
    if (!activeUser) return;

    fetch("/api/carts")
      .then((res) => {
        if (!res.ok) throw new Error(`Fetch failed with status ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (!Array.isArray(data)) return;

        const owned = data.filter(
          (cart: Cart) =>
            cart.owner.toLowerCase() === activeUser.username.toLowerCase()
        );

        setCarts(owned);

        if (owned.length > 0) {
          setActiveCartId(owned[0].id);
        } else {
          setActiveCartId(null);
        }
      })
      .catch((err) => {
        console.error("Failed to load carts:", err);
      });
  }, [activeUser]);

  const ownedCarts = (owner: User): Cart[] => {
    return carts.filter(
      (cart) => cart.owner.toLowerCase() === owner.username?.toLowerCase()
    );
  };

  const createNewCart = useCallback(async () => {
    if (!activeUser) return;

    const name = prompt("Enter cart name")?.trim();
    if (!name) return;

    const newCart: Cart = {
      id: crypto.randomUUID(),
      name,
      owner: activeUser.username,
      products: [],
      receipts: [],
    };

    try {
      const response = await fetch("/api/carts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCart),
      });

      if (!response.ok) throw new Error("Failed to create cart");

      setCarts((prev) => [...prev, newCart]);
      setActiveCartId(newCart.id);
    } catch (error) {
      console.error(error);
    }
  }, [activeUser]);

  const deleteCart = useCallback(
    async (id: string) => {
      try {
        const res = await fetch(`/api/carts/${id}`, {
          method: "DELETE",
        });

        if (!res.ok) throw new Error("Failed to delete cart");

        setCarts((prev) => prev.filter((cart) => cart.id !== id));
        if (id === activeCartId) setActiveCartId(null);
      } catch (err) {
        console.error(err);
      }
    },
    [activeCartId]
  );

  const copyCart = useCallback(() => {
    if (!activeUser || !activeCartId) return;

    const activeCart = carts.find((cart) => cart.id === activeCartId);
    if (!activeCart) return;

    const name = prompt("Enter cart name")?.trim();
    if (!name) return;

    const newCart: Cart = {
      id: crypto.randomUUID(),
      name,
      owner: activeUser.username,
      products: activeCart.products || [],
      receipts: [],
    };

    fetch("/api/carts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newCart),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to copy cart");
        setCarts((prev) => [...prev, newCart]);
        setActiveCartId(newCart.id);
      })
      .catch((err) => console.error(err));
  }, [activeUser, activeCartId, carts]);
  const addProduct = async (product: Product) => {
    if (!activeUser || !activeCartId) return;

    const cart = carts.find((c) => c.id === activeCartId);
    if (!cart) return;

    const existingProduct = cart.products.find((p) => p.id === product.id);
    let updatedProducts;

    if (existingProduct) {
      // Increment quantity if product already exists
      updatedProducts = cart.products.map((p) =>
        p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
      );
    } else {
      // Add new product with quantity 1
      updatedProducts = [...cart.products, { ...product, quantity: 1 }];
    }

    const updatedCart = { ...cart, products: updatedProducts };

    try {
      const res = await fetch(`/api/carts/${activeCartId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedCart),
      });
      if (!res.ok) throw new Error("Failed to update cart");

      setCarts((prev) =>
        prev.map((c) => (c.id === activeCartId ? updatedCart : c))
      );
    } catch (err) {
      console.error(err);
    }
  };

  const removeProduct = async (productId: string) => {
    if (!activeUser || !activeCartId) return;

    const cart = carts.find((c) => c.id === activeCartId);
    if (!cart) return;

    const updatedProducts = cart.products.filter((p) => p.id !== productId);
    const updatedCart = { ...cart, products: updatedProducts };

    try {
      const res = await fetch(`/api/carts/${activeCartId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedCart),
      });
      if (!res.ok) throw new Error("Failed to update cart");

      setCarts((prev) =>
        prev.map((c) => (c.id === activeCartId ? updatedCart : c))
      );
    } catch (err) {
      console.error(err);
    }
  };

  const incrementProduct = async (productId: string) => {
    if (!activeUser || !activeCartId) return;

    const cart = carts.find((c) => c.id === activeCartId);
    if (!cart) return;

    const updatedProducts = cart.products.map((p) =>
      p.id === productId ? { ...p, quantity: p.quantity + 1 } : p
    );

    const updatedCart = { ...cart, products: updatedProducts };

    try {
      const res = await fetch(`/api/carts/${activeCartId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedCart),
      });
      if (!res.ok) throw new Error("Failed to update cart");

      setCarts((prev) =>
        prev.map((c) => (c.id === activeCartId ? updatedCart : c))
      );
    } catch (err) {
      console.error(err);
    }
  };

  const decrementProduct = async (productId: string) => {
    if (!activeUser || !activeCartId) return;

    const cart = carts.find((c) => c.id === activeCartId);
    if (!cart) return;

    const updatedProducts = cart.products
      .map((p) => (p.id === productId ? { ...p, quantity: p.quantity - 1 } : p))
      .filter((p) => p.quantity > 0); // remove if quantity <= 0

    const updatedCart = { ...cart, products: updatedProducts };

    try {
      const res = await fetch(`/api/carts/${activeCartId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedCart),
      });
      if (!res.ok) throw new Error("Failed to update cart");

      setCarts((prev) =>
        prev.map((c) => (c.id === activeCartId ? updatedCart : c))
      );
    } catch (err) {
      console.error(err);
    }
  };

  const clearCart = async () => {
    if (!activeUser || !activeCartId) return;

    const cart = carts.find((c) => c.id === activeCartId);
    if (!cart) return;

    const updatedCart = { ...cart, products: [], receipts: [] };

    try {
      const res = await fetch(`/api/carts/${activeCartId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedCart),
      });
      if (!res.ok) throw new Error("Failed to clear cart");

      setCarts((prev) =>
        prev.map((c) => (c.id === activeCartId ? updatedCart : c))
      );
    } catch (err) {
      console.error(err);
    }
  };

  const favoriteCart = async (cartId: string) => {
    if (!activeUser) return;

    if (activeUser.favorites.includes(cartId)) return; // already favorited

    const updatedUser = {
      ...activeUser,
      favorites: [...activeUser.favorites, cartId],
    };

    try {
      const res = await fetch(`/api/users/${activeUser.username}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedUser),
      });
      if (!res.ok) throw new Error("Failed to favorite cart");

      setActiveUser(updatedUser);
    } catch (err) {
      console.error(err);
    }
  };

  const unFavoriteCart = async (cartId: string) => {
    if (!activeUser) return;

    const updatedUser = {
      ...activeUser,
      favorites: activeUser.favorites.filter((id) => id !== cartId),
    };

    try {
      const res = await fetch(`/api/users/${activeUser.username}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedUser),
      });
      if (!res.ok) throw new Error("Failed to unfavorite cart");

      setActiveUser(updatedUser);
    } catch (err) {
      console.error(err);
    }
  };

  const addReceipt = async (receipt: Receipt) => {
    if (!activeUser || !activeCartId) return;

    const cart = carts.find((c) => c.id === activeCartId);
    if (!cart) return;

    const updatedReceipts = [...cart.receipts, receipt];
    const updatedCart = { ...cart, receipts: updatedReceipts };

    try {
      const res = await fetch(`/api/carts/${activeCartId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedCart),
      });
      if (!res.ok) throw new Error("Failed to add receipt");

      setCarts((prev) =>
        prev.map((c) => (c.id === activeCartId ? updatedCart : c))
      );
    } catch (err) {
      console.error(err);
    }
  };

  const removeReceipt = async (receiptTitle: string) => {
    if (!activeUser || !activeCartId) return;

    const cart = carts.find((c) => c.id === activeCartId);
    if (!cart) return;

    const updatedReceipts = cart.receipts.filter(
      (r) => r.title !== receiptTitle
    );

    const updatedCart = { ...cart, receipts: updatedReceipts };

    try {
      const res = await fetch(`/api/carts/${activeCartId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedCart),
      });
      if (!res.ok) throw new Error("Failed to remove receipt");

      setCarts((prev) =>
        prev.map((c) => (c.id === activeCartId ? updatedCart : c))
      );
    } catch (err) {
      console.error(err);
    }
  };

  const updateReceipt = async (updatedReceipt: Receipt) => {
    if (!activeUser || !activeCartId) return;

    const cart = carts.find((c) => c.id === activeCartId);
    if (!cart) return;

    const updatedReceipts = cart.receipts.map((r) =>
      r.title === updatedReceipt.title ? updatedReceipt : r
    );

    const updatedCart = { ...cart, receipts: updatedReceipts };

    try {
      const res = await fetch(`/api/carts/${activeCartId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedCart),
      });
      if (!res.ok) throw new Error("Failed to update receipt");

      setCarts((prev) =>
        prev.map((c) => (c.id === activeCartId ? updatedCart : c))
      );
    } catch (err) {
      console.error(err);
    }
  };

  return {
    carts,
    activeCartId,
    setActiveCartId,
    ownedCarts,
    createNewCart,
    deleteCart,
    copyCart,
    addProduct,
    removeProduct,
    incrementProduct,
    decrementProduct,
    clearCart,
    addReceipt,
    removeReceipt,
    updateReceipt,
    favoriteCart,
    unFavoriteCart,
  };
}
