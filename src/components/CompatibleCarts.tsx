import { Button, List, ListItem, Typography } from "@mui/material";
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

  return (
    <>
      {" "}
      <Typography
        variant="h5"
        className={styles.title}
        sx={{
          color: (theme) => theme.palette.secondary.contrastText,
          textAlign: "center",
        }}
      >
        Compatible Carts
      </Typography>
      {products.length > 0 && (
        <div className={`${styles.compatibleCartsContainer} tertiary`}>
          <List className={styles.list}>
            {compatibleCarts.map((cart) => (
              <ListItem key={cart.id} className={styles.listItem}>
                <Button
                  fullWidth
                  onClick={() => {
                    navigate("/");
                    setActiveCartId(cart.id);
                  }}
                  sx={{
                    backgroundColor: (theme) => theme.palette.primary.main,
                    color: (theme) => theme.palette.primary.contrastText,
                    "&:hover": {
                      backgroundColor: (theme) => theme.palette.primary.dark,
                    },
                  }}
                >
                  {cart.name}
                </Button>
              </ListItem>
            ))}
          </List>
        </div>
      )}
    </>
  );
}
