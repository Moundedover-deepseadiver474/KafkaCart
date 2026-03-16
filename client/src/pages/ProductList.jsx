import { useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { useAppContext } from "../context/AppContext";

export default function ProductList() {
  const { products } = useAppContext();


  return (
    <div className="min-h-screen bg-[#0a0a0a] p-8">

      <h1 className="text-3xl font-bold mb-8 text-center text-[#00ff88]">
        [ PRODUCTS ]
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}