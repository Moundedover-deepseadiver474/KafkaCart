import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

export default function Navbar() {
  const navigate = useNavigate();
  const { user, getCartItemsCount, logout } = useAppContext();
  const cartCount = getCartItemsCount();

  const handleLogout = () => {
    logout();
    navigate("/products");
  };

  return (
    <nav className="sticky top-0 z-50 bg-[#0f0f0f] px-8 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">

        {/* Logo */}
        <Link to="/products" className="text-xl font-bold text-[#00ff88]">
          [ KafkaCart ]
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-6 text-gray-300 font-medium">

          <Link
            to="/products"
            className="hover:text-[#00ff88] transition"
          >
            &gt; products
          </Link>

          {user && (
            <Link
              to="/cart"
              className="hover:text-[#00ff88] transition relative"
            >
              &gt; cart
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-3 bg-[#00ff88] text-black text-xs w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
          )}

          {user ? (
            <>
              <span className="text-[#00ff88]">
                {user.name}
              </span>
              <button
                onClick={handleLogout}
                className="text-red-400 hover:text-red-300"
              >
                [ logout ]
              </button>
            </>
          ) : (
            <>
              <Link
                to="/signup"
                className="hover:text-[#00ff88] transition"
              >
                &gt; signup
              </Link>

              <Link
                to="/login"
                className="hover:text-[#00ff88] transition"
              >
                &gt; login
              </Link>
            </>
          )}

        </div>
      </div>
    </nav>
  );
}