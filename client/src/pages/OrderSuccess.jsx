import { useNavigate } from "react-router-dom";
import usePageTitle from "../hooks/usePageTitle";

export default function OrderSuccess() {
  usePageTitle("Order Success");
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a]">

      <div className="bg-[#1a1a1a] p-10 text-center max-w-md">

        {/* Success Icon */}
        <div className="text-[#00ff88] text-6xl mb-4">
          ✓
        </div>

        <h1 className="text-2xl font-bold mb-2 text-[#00ff88]">
          [ ORDER SUCCESSFUL ]
        </h1>

        <p className="text-gray-400 mb-6">
          thank_you_for_your_purchase.<br/>
          order_has_been_placed_successfully.
        </p>

        <button
          onClick={() => navigate("/products")}
          className="bg-[#00ff88] text-black px-6 py-2 hover:bg-[#00dd77] transition font-bold"
        >
          [ BACK TO HOME ]
        </button>

      </div>

    </div>
  );
}