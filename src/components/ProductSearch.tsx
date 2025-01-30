import { useState } from "react";
import ProductList from "./ProductList";
import SearchControls from "./SearchControls";
import { useFetchProducts } from "../api/api";

export default function ProductSearch() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sort, setSort] = useState<string>("price_desc");
  const { data: products, error, loading } = useFetchProducts(searchTerm, sort);

  const retryFetch = () => {
    setSearchTerm((prev) => prev + " "); // Forces re-fetch by changing state
  };

  return (
    <div>
      <SearchControls
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        sort={sort}
        onSortChange={setSort}
      />
      <ProductList products={products} loading={loading} error={error} onRetry={retryFetch} />
    </div>
  );
}
