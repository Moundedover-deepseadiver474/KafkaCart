import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/useAppContext";
import { sendEvent } from "../utils/eventSender";
import usePageTitle from "../hooks/usePageTitle";

export default function CheckoutPage() {
  usePageTitle("Checkout");
  const navigate = useNavigate();
  const { user, cart, getCartTotal, getCartItemsCount, clearCart } = useAppContext();

  useEffect(() => {
    if (!user) {
      alert("Please login to checkout");
      navigate("/login");
    }
  }, [user, navigate]);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    city: "",
    payment: "card"
  });

  const total = getCartTotal();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    sendEvent({
      eventId: crypto.randomUUID(),
      eventType: "ORDER_PLACED",
      userId: user.userId,
      timestamp: Date.now(),
      source: "web",
      metadata: {
        orderId: crypto.randomUUID(),
        totalAmount: getCartTotal(),
        items: getCartItemsCount(),
        paymentMethod: formData.payment
      }
    });

    clearCart();
    navigate("/order-success");
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-400 text-xl mb-4">cart_is_empty</p>
          <button
            onClick={() => navigate("/products")}
            className="bg-[#00ff88] text-black px-6 py-2 hover:bg-[#00dd77] font-bold"
          >
            [ BROWSE PRODUCTS ]
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] p-8">

      <h1 className="text-3xl font-bold text-center mb-8 text-[#00ff88]">
        [ CHECKOUT ]
      </h1>

      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">

        {/* Shipping Form */}
        <div className="bg-[#1a1a1a] p-6">

          <h2 className="text-xl font-semibold mb-4 text-gray-200">
            &gt; shipping_details
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">

            <div>
              <label className="block text-sm font-medium mb-1 text-gray-300">
                &gt; full_name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-[#0f0f0f] text-gray-200 border border-gray-700 rounded focus:outline-none focus:border-[#00ff88]"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-gray-300">
                &gt; address
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-[#0f0f0f] text-gray-200 border border-gray-700 rounded focus:outline-none focus:border-[#00ff88]"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-gray-300">
                &gt; city
              </label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-[#0f0f0f] text-gray-200 border border-gray-700 rounded focus:outline-none focus:border-[#00ff88]"
                required
              />
            </div>

            {/* Payment */}
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300">
                &gt; payment_method
              </label>

              <select
                name="payment"
                value={formData.payment}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-[#0f0f0f] text-gray-200 border border-gray-700 rounded focus:outline-none focus:border-[#00ff88]"
              >
                <option value="card">credit_card</option>
                <option value="upi">upi</option>
                <option value="cod">cash_on_delivery</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-[#00ff88] text-black py-2 hover:bg-[#00dd77] font-bold"
            >
              [ PLACE ORDER ]
            </button>

          </form>
        </div>

        {/* Order Summary */}
        <div className="bg-[#1a1a1a] p-6">

          <h2 className="text-xl font-semibold mb-4 text-gray-200">
            &gt; order_summary
          </h2>

          {cart.map((item) => (
            <div
              key={item.id}
              className="flex justify-between border-b border-gray-800 py-2"
            >
              <span className="text-gray-300">
                {item.name} x {item.quantity}
              </span>

              <span className="text-gray-200">
                ${item.price * item.quantity}
              </span>
            </div>
          ))}

          <div className="flex justify-between mt-4 text-lg font-bold">
            <span className="text-gray-200">total</span>
            <span className="text-[#00ff88]">${total}</span>
          </div>

        </div>

      </div>

    </div>
  );
}