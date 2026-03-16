import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

export default function Signup() {
  const navigate = useNavigate();
  const { signup } = useAppContext();
  const [formData, setFormData] = useState({
    name: "",
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
    signup(formData.name, formData.email, formData.password);
    navigate("/products");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a]">
      <div className="bg-[#1a1a1a] p-8 w-full max-w-md">

        <h2 className="text-2xl font-bold text-center mb-6 text-[#00ff88]">
          [ CREATE ACCOUNT ]
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-300">
              &gt; name
            </label>
            <input
              type="text"
              name="name"
              placeholder="john_doe"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-[#0f0f0f] text-gray-200 "
              required
            />
          </div>

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
            [ CREATE ]
          </button>

          <p className="text-sm text-center mt-4 text-gray-400">
            already registered?{" "}
            <Link to="/login" className="text-[#00ff88] hover:underline">
              login here
            </Link>
          </p>

        </form>
      </div>
    </div>
  );
}