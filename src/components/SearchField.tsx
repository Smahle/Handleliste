import React, { useState } from "react";
import { useFetchProducts } from "../api/api";

export default function ProductSearch() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sort, setSort] = useState<string>("price_desc");
  const { data: products, error, loading } = useFetchProducts(searchTerm, sort);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSort(e.target.value);
  };

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Search for a product"
      />
      <select value={sort} onChange={handleSortChange}>
        <option value="price_desc">Price Descending</option>
        <option value="price_asc">Price Ascending</option>
      </select>
      <button onClick={() => console.log("Search triggered!")}>Search</button>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <img
              src={product.image}
              alt={product.name}
              style={{ width: "50px", height: "50px", marginRight: "10px" }}
            />
            {product.name} - {product.current_price} NOK
          </li>
        ))}
      </ul>
    </div>
  );
}
