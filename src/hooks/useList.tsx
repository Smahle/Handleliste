import { useCallback, useEffect, useState } from "react";
import useCart from "./useCart";

type UseListProps = {
  user: User;
};

export default function useList({ user }: UseListProps) {
  const { setCarts, activeCart, carts, activeCartId } = useCart({ user });

  useEffect(() => {
    console.log("useList updated, activeCartId:", activeCartId);
  }, [activeCartId]); // <--- Ensure useEffect runs when activeCartId changes

  console.log(
    "Cart IDs:",
    carts.map((cart) => cart.id)
  );
  console.log("active: " + activeCart?.id);

  function addToCart(product: Product) {
    if (!activeCart) return;
    setCarts((prev) =>
      prev.map((cart) =>
        cart.id === activeCart.id
          ? {
              ...cart,
              products: updateProductCart(cart.products, product),
            }
          : cart
      )
    );
  }

  //checks if a product is in a list, updates its quantity if not
  const updateProductCart = (products: Product[], product: Product) => {
    const index = products.findIndex((p) => p.id === product.id);
    if (index !== -1) {
      const updatedProducts = [...products];
      updatedProducts[index] = {
        ...updatedProducts[index],
        quantity: updatedProducts[index].quantity + 1,
      };
      return updatedProducts;
    }
    return [...products, { ...product, quantity: 1 }];
  };
  return { addToCart };
}
