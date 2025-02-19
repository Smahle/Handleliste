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
    receipts: Receipt[]
  };
  
  type Receipt = {
    title: string;
    steps: string[];
    time: "short" | "medium" | "long";
    difficulty: "easy" | "medium" | "difficult";
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
    createNewCart: () => void;
    copyCart: () => void;
    deleteCart: (id: string) => void;
    removeProduct: (cartId: string, productId: string) => void;
    incrementProduct: (cartId: string, productId: string) => void;
    decrementProduct: (cartId: string, productId: string) => void;
    clearCart: (cartId: string) => void;
    carts: Cart[];
    activeCartId: string | null;
    setActiveCartId: (id: string | null) => void;
    ownedCarts: (owner: User) => Cart[] | null;
    favoriteCart: (cartId: string) => void;
    unFavoriteCart: (cartId: string) => void;
    addProduct: (cartId: string, product: Product) => void;
    addReceipt: (cartId: string, receipt: Receipt) => void;
    removeReceipt: (cartId: string, receiptTitle: string) => void;
    updateReceipt: (cartId: string, updatedReceipt: Receipt) => void;
  };
  
  type UserState = {
    activeUser: User | null;
    setActiveUser: (user: User | null) => void;
    users: User[];
    createUser: (user: User) => boolean;
    followUser: (usernameToFollow: string) => void;
    unfollowUser: (usernameToUnfollow: string) => void;
    updateUser: (user: User) => void;
  };  
}

export {}; // Prevents this from becoming a module
