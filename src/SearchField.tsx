import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { fetchProducts } from "./hooks/api"; // Import the fetch function.

export default function ProductSearch() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [products, setProducts] = useState<any[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Fetch products on component mount
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const fetchedProducts = await fetchProducts();
        setProducts(fetchedProducts);
      } catch (err) {
        setError("Failed to load products");
        console.error(err);
      }
    };

    loadProducts();
  }, []);

  // Handle search input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Filter products by name
    const filtered = products.filter((product) =>
      product.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  return (
    <Box sx={{ p: 2 }}>
      <Box
        component="form"
        sx={{ display: "flex", alignItems: "center", gap: 2 }}
        onSubmit={handleSubmit}
      >
        <Input
          value={searchTerm}
          onChange={handleChange}
          placeholder="Search for a product"
        />
        <Button type="submit" variant="contained">
          Search
        </Button>
      </Box>

      {error && (
        <Typography color="error" sx={{ mt: 2 }}>
          {error}
        </Typography>
      )}

      {filteredProducts.length > 0 && (
        <Box sx={{ mt: 2 }}>
          <Typography variant="h6">Search Results:</Typography>
          <ul>
            {filteredProducts.map((product) => (
              <li key={product.id}>
                <Typography>{product.name}</Typography>
              </li>
            ))}
          </ul>
        </Box>
      )}

      {filteredProducts.length === 0 && searchTerm && (
        <Typography sx={{ mt: 2 }}>No products found.</Typography>
      )}
    </Box>
  );
}
