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
      <div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search for a product"
        />
        <select value={sort} onChange={(e) => onSortChange(e.target.value)}>
          <option value="price_desc">Price Descending</option>
          <option value="price_asc">Price Ascending</option>
        </select>
        <button onClick={() => console.log("Search triggered!")}>Search</button>
      </div>
    );
  }
  