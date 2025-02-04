import { Button, List, ListItem } from "@mui/material";
import ProductImage from "./ProductImage";
import styles from "./ShoppingCart.module.css";
import ArrowDropUp from '@mui/icons-material/ArrowDropUp';
import ArrowDropDown from '@mui/icons-material/ArrowDropDown';
import { Delete } from "@mui/icons-material";

type ShoppingCartProps = {
  products: Product[];
  removeProduct: (product: Product) => void;
  onRemoveClick: () => void;
  incrementQuantity: (product: Product) => void;
  decrementQuantity: (product: Product) => void;
};

export default function ShoppingCart({
  products,
  onRemoveClick,
  removeProduct,
  incrementQuantity,
  decrementQuantity

}: ShoppingCartProps) {
  return (
    <List sx={{ padding: 0, margin: 0 }}>
      {products.map((product) => (
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
        <button onClick={() => incrementQuantity(product)}><ArrowDropUp /></button>
        <button onClick={() => decrementQuantity(product)}><ArrowDropDown /></button>
        <button onClick={() => removeProduct(product)}><Delete /></button>
      </div>
    </ListItem>
      ))}
      <Button onClick={onRemoveClick}>Clear cart</Button>
    </List>
  );
}
