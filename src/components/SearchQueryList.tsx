import { List, ListItem, IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";
import ProductImage from "../components/ProductImage";
import styles from "./SearchQueryList.module.css";

interface SearchQueryListProps {
  searchQuery: Product[];
  removeFromQuery: (productId: string) => void;
}

export default function SearchQueryList({
  searchQuery,
  removeFromQuery,
}: SearchQueryListProps) {
  return (
    <div className={`${styles.SearchQueryListcontainer} tertiary`}>
      <h3 className={`${styles.title} tertiary`}>Selected Products</h3>
      <List className={`${styles.list} tertiary`}>
        {searchQuery.length > 0 ? (
          searchQuery.map((product) => (
            <ListItem key={product.id} className={styles.listItem}>
              <ProductImage imageSrc={product.id} altText={product.name} />
              {product.name}
              <IconButton
                onClick={() => removeFromQuery(product.id)}
                aria-label="delete"
                color="error"
              >
                <Delete />
              </IconButton>
            </ListItem>
          ))
        ) : (
          <p>No items selected for search</p>
        )}
      </List>
    </div>
  );
}
