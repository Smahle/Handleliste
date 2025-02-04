declare global {
  type Person = {
    id: string;
    firstName: string;
    lastName: string;
    age: number;
    email: string;
  };
  type Product = {
    id: number;
    name: string;
    image: string;
    current_price: number;
    quantity: number;
  };
}

export {}; // Prevents this from becoming a module
