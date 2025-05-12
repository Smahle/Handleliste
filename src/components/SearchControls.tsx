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
    <Box
      className={styles.searchControlsContainer}
      sx={{
        display: "flex",
        justifyContent: "", // Pushes items to the edges
      }}
    >
      <TextField
        type="text"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search for a product"
        fullWidth
        variant="outlined"
        className={`${styles.search} tertiary`}
        sx={{
          "& .MuiOutlinedInput-root": {
            border: "3px solid",
            borderColor: "primary.main",
            borderRadius: "4px",
            "& fieldset": {
              border: "none", // Remove default outline
            },
          },
        }}
      />

      <Select
        value={sortPrice}
        onChange={(e) => onSortPriceChange(e.target.value)}
        displayEmpty
        inputProps={{ "aria-label": "Sort" }}
        className={`${styles.sortPrice} tertiary`}
        sx={{
          border: "3px solid",
          borderColor: "primary.main",
        }}
      >
        <MenuItem value="price_desc">Price Descending</MenuItem>
        <MenuItem value="price_asc">Price Ascending</MenuItem>
      </Select>

      <Select
        value={selectedStore}
        onChange={(e) => onStoreChange(e.target.value)}
        displayEmpty
        inputProps={{ "aria-label": "Sort" }}
        className={`${styles.selectedStore} tertiary`}
        sx={{
          border: "3px solid",
          borderColor: "primary.main",
        }}
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
