import { useState } from "react";
import { useFetchProducts } from "../api/api";
import SearchControls from "./SearchControls";
import ProductList from "./ProductList";

export default function ProductSearch() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sort, setSort] = useState<string>("price_desc");
  const { data: products, error, loading } = useFetchProducts(searchTerm, sort);

  return (
    <div>
      <SearchControls
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        sort={sort}
        onSortChange={setSort}
      />
      <ProductList products={products} loading={loading} error={error} />
    </div>
  );
}
