import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

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
    <Box sx={{
      display: 'flex',
      justifyContent: '', // Pushes items to the edges
      
    }}>
      <TextField
        type="text"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search for a product"
        fullWidth
      />

      <Select
        value={sort}
        onChange={(e) => onSortChange(e.target.value)}
        displayEmpty
        inputProps={{ 'aria-label': 'Sort' }}
      >
        <MenuItem value="price_desc">Price Descending</MenuItem>
        <MenuItem value="price_asc">Price Ascending</MenuItem>
      </Select>
    </Box>
  );
}
