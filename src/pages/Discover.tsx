import { useState } from "react";
import ProductSearch from "../components/ProductSearch";
import { List, ListItem } from "@mui/material";
import styles from "./Discover.module.css";
import ProductImage from "../components/ProductImage";

export default function Discover() {
  const [searchQuery, setSearchQuery] = useState<Product[]>([]);

  const addToQuery = (product: Product) => {
    if (!searchQuery.includes(product))
      setSearchQuery([...searchQuery, product]);
  };

  const handleProductDoubleClick = (product: Product) => {
    addToQuery(product);
    console.log(searchQuery);
  };

  return (
    <div className={styles.container}>
      <div className={styles.productList}>
        <ProductSearch onDoubleClick={handleProductDoubleClick} />
      </div>
      <List className={styles.searchQuery}>
        {Array.isArray(searchQuery) && searchQuery.length > 0 ? (
          searchQuery.map((product) => (
            <ListItem key={product.id}>
              <ProductImage imageSrc={product.id} altText={product.name} />
              {product.name}
            </ListItem>
          ))
        ) : (
          <p>No items selected for search</p>
        )}
      </List>
    </div>
  );
}
