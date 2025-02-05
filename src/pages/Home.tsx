import ProductManager from "../components/ProductManager";

type HomeProps = {
  user: User;
};


export default function Home({user}: HomeProps) {
  return (
    <>
      <ProductManager user={user}/>
    </>
  );
}
