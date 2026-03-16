import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { useEffect } from "react";
import { sendEvent } from "../utils/eventSender";

export default function CartPage() {
  const navigate = useNavigate();
  const { user, cart, removeFromCart, updateQuantity, getCartTotal, getCartItemsCount } = useAppContext();

  useEffect(() => {
    if (!user) {
      alert("Please login to view cart");
      navigate("/login");
    }
  }, [user, navigate]);

  const total = getCartTotal();

  const handleCheckout = () => {
    sendEvent({
      eventId: crypto.randomUUID(),
      eventType: "CHECKOUT_STARTED",
      userId: user.userId,
      timestamp: Date.now(),
      source: "web",
      metadata: {
        cartValue: getCartTotal(),
        items: getCartItemsCount()
      }
    });

    navigate("/checkout")
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] p-8">

      <h1 className="text-3xl font-bold mb-8 text-center text-[#00ff88]">[ YOUR CART ]</h1>

      <div className="max-w-4xl mx-auto bg-[#1a1a1a] p-6">

        {cart.length === 0 ? (
          <p className="text-center text-gray-400">cart_is_empty</p>
        ) : (
          <>
            {cart.map(item => (
              <div
                key={item.id}
                className="flex items-center justify-between border-b border-gray-800 py-4"
              >

                {/* Product */}
                <div className="flex items-center gap-4 w-1/3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover"
                  />
                  <span className="font-medium text-gray-200">{item.name}</span>
                </div>

                {/* Price */}
                <div className="w-1/6 text-center text-gray-200">
                  ${item.price}
                </div>

                {/* Quantity */}
                <div className="w-1/6 text-center">
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) =>
                      updateQuantity(item.id, e.target.value)
                    }
                    className="w-16 px-2 py-1 text-center bg-[#0f0f0f] text-gray-200"
                  />
                </div>

                {/* Remove */}
                <div className="w-1/6 text-center">
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-400 hover:text-red-300"
                  >
                    [ remove ]
                  </button>
                </div>

              </div>
            ))}

            {/* Total Section */}
            <div className="flex justify-between items-center mt-6">

              <h2 className="text-xl font-semibold text-gray-200">
                total: ${total}
              </h2>

              <button
                onClick={() => handleCheckout()}
                className="bg-[#00ff88] text-black px-6 py-2 hover:bg-[#00dd77] font-bold"
              >
                [ CHECKOUT ]
              </button>

            </div>
          </>
        )}

      </div>

    </div>
  );
}