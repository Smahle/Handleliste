import { useCallback } from "react";
import useCart from "./useCart";

type UseListProps = {
    user: User;
  };

export default function useList({user}: UseListProps){

    const {setCarts, activeCartId} = useCart({user})

  //takes a product and updates the products for the active cart
  const addToCart = useCallback((product: Product) => {
    if (!activeCartId) return;
    setCarts((prev) =>
      prev.map((cart) =>
        cart.id === activeCartId
          ? {
              ...cart,
              products: updateProductCart(cart.products, product)
            }
          : cart
      )
    );
  }, [setCarts, activeCartId]);

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
  return {addToCart}
}