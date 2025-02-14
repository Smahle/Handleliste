import { Button, List, ListItem } from "@mui/material";
import ProductImage from "./ProductImage";
import styles from "./ShoppingCart.module.css";
import ArrowDropUp from '@mui/icons-material/ArrowDropUp';
import ArrowDropDown from '@mui/icons-material/ArrowDropDown';
import { Delete } from "@mui/icons-material";
import { useCartContext } from "../context/CartContext";

export default function ShoppingCart(){
    const {activeCartId, carts, clearCart,
      removeProduct,
      incrementProduct,
      decrementProduct,
      deleteCart} = useCartContext()
      const activeCart = carts.find((cart) => cart.id === activeCartId);
      if(!activeCart){
        return <div>Loading cart...</div>;
      }
  return (
    <>
      {activeCart.products.length > 0 ? (
        <List sx={{ padding: 0, margin: 0 }} className={styles.container}>
          {activeCart.products.map((product) => (
            <ListItem
              key={product.id}
              style={{
                cursor: "pointer",
                border: "2px solid #3c4245",
              }}
              className={styles.itemContainer}
            >
              <div className={styles.item}>
                <ProductImage imageSrc={product.image} altText={product.name} />
                {product.name}
              </div>
              <div className={styles.itemQuantityContainer}>
                <div className={styles.itemQuantity}>{product.quantity}</div>
                <button onClick={() => incrementProduct(activeCart.id, product.id)}>
                  <ArrowDropUp />
                </button>
                <button onClick={() => decrementProduct(activeCart.id, product.id)}>
                  <ArrowDropDown />
                </button>
                <button onClick={() => removeProduct(activeCart.id, product.id)}>
                  <Delete />
                </button>
              </div>
            </ListItem>
          ))}
        </List>
      ) : (
        <p>No products in cart</p>
      )}
      
      <Button onClick={() => clearCart(activeCart.id)}>Clear cart</Button>
      <Button onClick={() => deleteCart(activeCart.id)}>Delete cart</Button>
    </>
  );
  
}
