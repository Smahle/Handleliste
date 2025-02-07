import ProductManager from "../components/ProductManager";

type HomeProps = {
  user: User;
};


export default function Home({ cartProps, user }: UserAndCartsProps) {
  return (
    <>
      <ProductManager user={user} cartProps={cartProps}/>
    </>
  );
}
