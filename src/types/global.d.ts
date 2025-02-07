declare global {
  type Product = {
    id: string;
    name: string;
    image: string;
    current_price: number;
    quantity: number;
  };
  type Cart = {
    id: string;
    name: string;
    products: Product[];
    owner: User;
  };
  type User = {
    username: string;
    carts?: Cart[];
    firstName?: string;
    lastName?: string;
    age?: number;
    email?: string;
  }
  type CartProps = {
    createCart: () => void;
    deleteCart: (id: string) => void;
    removeProduct: (cartId: string, productId: string) => void;
    incrementProduct: (cartId: string, productId: string) => void;
    decrementProduct: (cartId: string, productId: string) => void;
    activeCart: Cart | undefined;
    clearCart: (cartId: string) => void;
    carts: Cart[];
    activeCartId: string | null;
    setActiveCartId: (id: string | null) => void;
    ownedCarts: Cart[];
    addProduct: (cartId: string, product: Product) => void;
  };
  type UserAndCartsProps = {
    cartProps: CartProps;
    user: User;
  };

}

export {}; // Prevents this from becoming a module
