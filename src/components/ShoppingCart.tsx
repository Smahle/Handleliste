import { Button, List, ListItem } from "@mui/material";
import ProductImage from "./ProductImage";
import styles from "./ShoppingCart.module.css";
import ArrowDropUp from '@mui/icons-material/ArrowDropUp';
import ArrowDropDown from '@mui/icons-material/ArrowDropDown';
import { Delete } from "@mui/icons-material";

type ShoppingCartProps = {
  cart: Cart;
  removeProduct: (cartId: string, productId: string) => void;
  clearCart: (cartId: string) => void;
  incrementQuantity: (cartId: string, productId: string) => void;
  decrementQuantity: (cartId: string, productId: string) => void;
};

export default function ShoppingCart({
  cart,
  clearCart,
  removeProduct,
  incrementQuantity,
  decrementQuantity

}: ShoppingCartProps) {
  return (
    <div >
      <List sx={{ padding: 0, margin: 0 }} className={styles.container}>
        {cart.products.map((product) => (
      <ListItem   key={product.id}
      style={{
        cursor: "pointer",
        border: "1px solid gray",
      }}className={styles.itemContainer}>
        <div className={styles.item}>
          <ProductImage imageSrc={product.image} altText={product.name} />
          {product.name}
        </div>
        <div className={styles.itemQuantityContainer}>
          <div className={styles.itemQuantity}>{product.quantity}</div>
          <button onClick={() => incrementQuantity(cart.id, product.id)}><ArrowDropUp /></button>
          <button onClick={() => decrementQuantity(cart.id, product.id)}><ArrowDropDown /></button>
          <button onClick={() => removeProduct(cart.id, product.id)}><Delete /></button>
        </div>
      </ListItem>
        ))}
      </List>
          <Button onClick={() =>clearCart(cart.id)}>Clear cart</Button>
    </div>
  );
}
