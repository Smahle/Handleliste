import ProductManager from "../components/ProductManager";

type HomeProps = {
  user: User;
};


export default function Home(cartProps: CartProps) {
  return (
    <>
      <ProductManager {...cartProps}/>
    </>
  );
}
