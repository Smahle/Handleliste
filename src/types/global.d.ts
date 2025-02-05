declare global {
  type Product = {
    id: number;
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
}

export {}; // Prevents this from becoming a module
