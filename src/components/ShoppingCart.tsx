import { Button, List, ListItem } from "@mui/material";
import ProductImage from "./ProductImage";
import styles from "./ShoppingCart.module.css";
import ArrowDropUp from '@mui/icons-material/ArrowDropUp';
import ArrowDropDown from '@mui/icons-material/ArrowDropDown';

type ShoppingCartProps = {
  products: Product[];
  onDoubleClick: (product: Product) => void;
  onRemoveClick: () => void;
};

export default function ShoppingCart({
  products,
  onDoubleClick,
  onRemoveClick
}: ShoppingCartProps) {
  return (
    <List sx={{ padding: 0, margin: 0 }}>
      {products.map((product) => (
     <ListItem   key={product.id}
     style={{
       cursor: "pointer",
       border: "1px solid gray",
     }}onDoubleClick={() => onDoubleClick(product)} className={styles.itemContainer}>
      <div className={styles.item}>
        <ProductImage imageSrc={product.image} altText={product.name} />
        {product.name}
      </div>
      <div className={styles.itemQuantity}>
        <button><ArrowDropUp /></button>
        <button><ArrowDropDown /></button>
      </div>
    </ListItem>
      ))}
      <Button onClick={onRemoveClick}>Clear cart</Button>
    </List>
  );
}
