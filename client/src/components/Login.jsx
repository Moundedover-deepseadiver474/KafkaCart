import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAppContext } from "../context/useAppContext";
import { toast } from "react-hot-toast"
import usePageTitle from "../hooks/usePageTitle";

export default function Login() {
  usePageTitle("Login");
  const navigate = useNavigate();
  const { login } = useAppContext();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const res = login(formData.email, formData.password);
    if (res) {
      toast.success("Login Successfull.");
      navigate("/products");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a]">
      <div className="bg-[#1a1a1a] p-8 w-full max-w-md">

        <h2 className="text-2xl font-bold text-center mb-6 text-[#00ff88]">
          [ LOGIN ]
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-300">
              &gt; email
            </label>
            <input
              type="email"
              name="email"
              placeholder="user@example.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-[#0f0f0f] text-gray-200"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-300">
              &gt; password
            </label>
            <input
              type="password"
              name="password"
              placeholder="********"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-[#0f0f0f] text-gray-200"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#00ff88] text-black py-2 hover:bg-[#00dd77] transition font-bold"
          >
            [ ENTER ]
          </button>

        </form>

        <p className="text-sm text-center mt-4 text-gray-400">
          no account?{" "}
          <Link to="/signup" className="text-[#00ff88] hover:underline">
            create one
          </Link>
        </p>

      </div>
    </div>
  );
}