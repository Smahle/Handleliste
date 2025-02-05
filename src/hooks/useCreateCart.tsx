

export default function useCreateCart(setCarts:()=>void, setActiveCartId:()=>void){
    const createCart = () => {
    const name = prompt("Enter cart name")?.trim();
    if (!name) return;

    const newCart = { id: crypto.randomUUID(), name, products: [], owner:user };
    
return{
    setCarts((prev) => [...prev, newCart]);
    setActiveCartId(newCart.id);
  };
}
}