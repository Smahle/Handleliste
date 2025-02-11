import ProductManager from "../components/ProductManager";

export default function Home(cartProps: CartState) {
  return (
    <>
      <ProductManager {...cartProps}/>
    </>
  );
}
