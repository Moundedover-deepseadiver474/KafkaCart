import { useParams, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/useAppContext";
import usePageTitle from "../hooks/usePageTitle";

export default function ProductView() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { products, user, cart, addToCart, removeFromCart } = useAppContext();

  const product = products.find(p => p.id === Number(id));
  usePageTitle(product.name);

  if (!product) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center text-gray-400">
        product_not_found
      </div>
    );
  }

  const cartItem = cart.find(item => item.id === product.id);
  const isInCart = !!cartItem;

  const handleAddToCart = () => {
    if (!user) {
      alert("Please login to add items to cart");
      navigate("/login");
      return;
    }

    addToCart(product);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] p-8">

      {/* Title */}
      <h1 className="text-3xl font-bold text-center text-[#00ff88] mb-10">
        [ PRODUCT DETAILS ]
      </h1>

      <div className="max-w-6xl mx-auto bg-[#1a1a1a] p-8 grid grid-cols-1 md:grid-cols-2 gap-10">

        {/* Product Image */}
        <div className="w-full h-100 overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Product Info */}
        <div className="flex flex-col">

          <h2 className="text-2xl font-bold text-gray-200 mb-3">
            {product.name}
          </h2>

          <p className="text-[#00ff88] text-xl font-bold mb-4">
            ${product.price}
          </p>

          <p className="text-gray-400 mb-6">
            {product.description}
          </p>

          {/* Features */}
          {product.features && (
            <div className="mb-6">
              <h3 className="text-[#00ff88] font-semibold mb-2">
                features:
              </h3>

              <ul className="text-gray-300 list-disc list-inside space-y-1">
                {product.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Specs */}
          {product.specs && (
            <div className="mb-6">
              <h3 className="text-[#00ff88] font-semibold mb-2">
                specifications:
              </h3>

              <div className="text-gray-300 space-y-1">
                {Object.entries(product.specs).map(([key, value]) => (
                  <p key={key}>
                    <span className="text-gray-400">{key}:</span> {value}
                  </p>
                ))}
              </div>
            </div>
          )}

          {/* Buttons */}
          <div className="flex gap-4 mt-auto">

            {isInCart ? (
              <button
                onClick={() => removeFromCart(product.id)}
                className="bg-red-500 text-black px-6 py-2 hover:bg-red-600 font-bold"
              >
                [ REMOVE FROM CART ]
              </button>
            ) : (
              <button
                onClick={handleAddToCart}
                className="bg-[#00ff88] text-black px-6 py-2 hover:bg-[#00dd77] font-bold"
              >
                {user ? "[ ADD TO CART ]" : "[ LOGIN TO ADD ]"}
              </button>
            )}

            <button
              onClick={() => navigate("/products")}
              className="border border-gray-700 text-gray-300 px-6 py-2 hover:bg-[#252525]"
            >
              [ BACK ]
            </button>

          </div>

        </div>
      </div>

    </div>
  );
}
