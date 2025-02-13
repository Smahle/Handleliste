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
    owner: string;
  };
  type User = {
    username: string;
    firstName?: string;
    lastName?: string;
    age?: number;
    email?: string;
    following: string[];
    favorites: string[];
  }
  type CartState = {
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
    ownedCarts: (owner: User) => Cart[] | null;
    addProduct: (cartId: string, product: Product) => void;
  };
  type UserState = {
    activeUser: User | null;
    setActiveUser: (user: User | null) => void;
    users: User[];
    createUser: (user: User) => boolean;
    followUser: (usernameToFollow: string) => void;
    unfollowUser: (usernameToUnfollow: string) => void;
  };  
}

export {}; // Prevents this from becoming a module
