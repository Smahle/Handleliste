declare global {
    type Person = { id: number; firstName: string; lastName: string; age: number; email:string};
    type Product = {
      id: number;
      name: string;
      image: string;
      current_price: number;
    };
  }


 
  export {}; // Prevents this from becoming a module