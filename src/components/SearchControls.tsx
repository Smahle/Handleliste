import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import styles from "./SearchControls.module.css";

type SearchControlsProps = {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  sortPrice: string;
  onSortPriceChange: (value: string) => void;
  stores: string[];
  selectedStore: string;
  onStoreChange: (value: string) => void;
};

export default function SearchControls({
  searchTerm,
  onSearchChange,
  sortPrice,
  onSortPriceChange,
  stores,
  selectedStore,
  onStoreChange,
}: SearchControlsProps) {
  return (
    <Box className={styles.searchControlsContainer}>
      <TextField
        type="text"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search for a product"
        fullWidth
        variant="filled"
        className={`${styles.search} tertiary`}
      />

      <Select
        value={sortPrice}
        onChange={(e) => onSortPriceChange(e.target.value)}
        displayEmpty
        inputProps={{ "aria-label": "Sort" }}
        className={`${styles.sortPrice} tertiary`}
        variant="filled"
      >
        <MenuItem value="price_desc">Price Descending</MenuItem>
        <MenuItem value="price_asc">Price Ascending</MenuItem>
      </Select>

      <Select
        value={selectedStore}
        onChange={(e) => onStoreChange(e.target.value)}
        displayEmpty
        inputProps={{ "aria-label": "Sort" }}
        className={`${styles.selectedStore} primary`}
        variant="filled"
      >
        <MenuItem value="">All Stores</MenuItem>
        {stores.map((store) => (
          <MenuItem key={store} value={store}>
            {store}
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
}
