import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';

type SearchControlsProps = {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  sort: string;
  onSortChange: (value: string) => void;
};

export default function SearchControls({
  searchTerm,
  onSearchChange,
  sort,
  onSortChange,
}: SearchControlsProps) {
  return (
    <Box>
      {/* TextField for search input */}
      <TextField
        type="text"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search for a product"
      />

      {/* Select component for sorting */}
      <Select
        value={sort}
        onChange={(e) => onSortChange(e.target.value)}
        displayEmpty
        inputProps={{ 'aria-label': 'Sort' }}
      >
        <MenuItem value="price_desc">Price Descending</MenuItem>
        <MenuItem value="price_asc">Price Ascending</MenuItem>
      </Select>

      {/* Button for triggering search */}
      <Button variant="contained" onClick={() => console.log("Search triggered!")}>Search</Button>
    </Box>
  );
}
