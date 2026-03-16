import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { sendEvent } from "../utils/eventSender";

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  const { user, cart, addToCart, removeFromCart } = useAppContext();

  // Check if product is in cart
  const cartItem = cart.find(item => item.id === product.id);
  const isInCart = !!cartItem;

  const handleProductView = (productId) => {
    sendEvent({
      eventId: crypto.randomUUID(),
      eventType: "PRODUCT_VIEW",
      userId: user?.userId,
      productId: productId,
      timestamp: Date.now(),
      source: "web",
      metadata: {}
    });

    navigate(`/product/${productId}`);
  };


  const handleAddToCart = () => {
    if (!user) {
      alert("Please login to add items to cart");
      navigate("/login");
      return;
    }
    addToCart(product);
  };

  return (
    <div className="bg-[#1a1a1a] hover:bg-[#252525] transition p-4 w-64">

      {/* Product Image */}
      <div className="w-full h-48 overflow-hidden"
        onClick={() => handleProductView(product.id)}
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Product Info */}
      <div className="mt-4">

        <h3 className="text-lg font-semibold text-gray-200">
          {product.name}
        </h3>

        <p className="text-[#00ff88] font-bold mt-1">
          ${product.price}
        </p>

        {isInCart ? (
          <div className="mt-4 space-y-2">
            <button
              onClick={() => removeFromCart(product.id)}
              className="w-full bg-red-500 text-black py-2 hover:bg-red-600 transition font-bold"
            >
              [ REMOVE ]
            </button>
          </div>
        ) : (
          <button
            onClick={handleAddToCart}
            className="mt-4 w-full bg-[#00ff88] text-black py-2 hover:bg-[#00dd77] transition font-bold"
          >
            {user ? "[ ADD TO CART ]" : "[ LOGIN TO ADD ]"}
          </button>
        )}

      </div>
    </div>
  );
}