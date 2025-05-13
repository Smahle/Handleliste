import { Button, List, ListItem } from "@mui/material";
import { useCartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import styles from "./CompatibleCarts.module.css";

interface CompatibleCartsProps {
  products: Product[];
}

export default function CompatibleCarts({ products }: CompatibleCartsProps) {
  const { carts, setActiveCartId } = useCartContext();
  const navigate = useNavigate();

  if (!carts) {
    console.error("carts is undefined");
    return <p>Error: Carts data missing</p>;
  }

  const compatibleCarts = carts.filter((cart) =>
    products.every((product) =>
      cart.products.some((cartProduct) => cartProduct.id === product.id)
    )
  );

  return products.length > 0 ? (
    <div className={styles.compatibleCartsContainer}>
      <h3 className={styles.title}>Compatible Carts</h3>
      <List className={styles.list}>
        {compatibleCarts.map((cart) => (
          <ListItem key={cart.id} className={styles.listItem}>
            <Button
              fullWidth
              onClick={() => {
                navigate("/");
                setActiveCartId(cart.id);
              }}
              style={{ justifyContent: "flex-start", textAlign: "left" }}
            >
              {cart.name}
            </Button>
          </ListItem>
        ))}
      </List>
    </div>
  ) : null;
}
