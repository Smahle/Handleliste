import ShoppingCartManager from "../components/ShoppingCartManager";
import styles from "./Shop.module.css";

export default function Shop() {
  return (
    <div className={styles.container}>
      <ShoppingCartManager showFullControls={false} />
    </div>
  );
}
