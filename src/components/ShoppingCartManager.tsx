import ShoppingCart from "./ShoppingCart";
import styles from "./ShoppingCartManager.module.css";

type ShoppingCartManagerProps = {
  carts: Cart[];
  setCarts: React.Dispatch<React.SetStateAction<Cart[]>>;
  activeCartId: string | null;
  setActiveCartId: React.Dispatch<React.SetStateAction<string | null>>;
};

export default function ShoppingCartManager({
  carts,
  setCarts,
  activeCartId,
  setActiveCartId,
}: ShoppingCartManagerProps) {
  const createCart = () => {
    const name = prompt("Enter cart name")?.trim();
    if (!name) return;

    const newCart = { id: crypto.randomUUID(), name, products: [] };
    setCarts((prev) => [...prev, newCart]);
    setActiveCartId(newCart.id);
  };

  const deleteCart = (id: string) => {
    setCarts((prev) => prev.filter((cart) => cart.id !== id));
    if (id === activeCartId) setActiveCartId(null);
  };

  const removeProduct = (product: Product) => {
    if (!activeCartId) return;
    setCarts((prev) =>
      prev.map((cart) =>
        cart.id === activeCartId
          ? { ...cart, products: cart.products.filter((p) => p.id !== product.id) }
          : cart
      )
    );
  };

  const clearCart = () => {
    if (!activeCartId) return;
    setCarts((prev) =>
      prev.map((cart) =>
        cart.id === activeCartId ? { ...cart, products: [] } : cart
      )
    );
  };

  const incrementQuantity = (product: Product) => {
    if (!activeCartId) return;
    setCarts((prev) =>
      prev.map((cart) =>
        cart.id === activeCartId
          ? {
              ...cart,
              products: cart.products.map((p) =>
                p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
              ),
            }
          : cart
      )
    );
  };

  const decrementQuantity = (product: Product) => {
    if (!activeCartId) return;
    setCarts((prev) =>
      prev.map((cart) =>
        cart.id === activeCartId
          ? {
              ...cart,
              products: cart.products
                .map((p) =>
                  p.id === product.id ? { ...p, quantity: p.quantity - 1 } : p
                )
                .filter((p) => p.quantity > 0),
            }
          : cart
      )
    );
  };

  const activeCart = carts.find((cart) => cart.id === activeCartId);

  return (
    <div className={styles.container}>
        <div className={styles.cartManagement}>
        <h2>Shopping Carts</h2>
      <button onClick={createCart}>Create New Cart</button>

      <ul>
        {carts.map((cart) => (
          <li key={cart.id}>
            <button onClick={() => setActiveCartId(cart.id)}>
              {cart.name} {activeCartId === cart.id && "(Active)"}
            </button>
            <button onClick={() => deleteCart(cart.id)}>❌</button>
          </li>
        ))}
      </ul>
        </div>

<div className={styles.shoppingCart}>
{activeCart && (
        <ShoppingCart
          products={activeCart.products}
          removeProduct={removeProduct}
          onRemoveClick={clearCart}
          incrementQuantity={incrementQuantity}
          decrementQuantity={decrementQuantity}
        />
      )}
</div>
    
    </div>
  );
}
