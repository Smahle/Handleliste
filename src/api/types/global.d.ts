declare global {
    type Person = { id: number; firstName: string; lastName: string; age: number; email:string};
  }
  export {}; // Prevents this from becoming a module