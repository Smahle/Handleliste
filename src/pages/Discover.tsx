import ProductSearch from "../components/ProductSearch";

export default function Discover(){
    const handleProductDoubleClick = (product: Product) => {
        console.log(product.name)
    };
  
    return (
      <div>
        <div>
          <ProductSearch onDoubleClick={handleProductDoubleClick} />
        </div>
     </div>
    )
}