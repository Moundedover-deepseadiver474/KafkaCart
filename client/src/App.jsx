import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import { Toaster } from "react-hot-toast"

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Signup from "./components/Signup";
import Login from "./components/Login";

import ProductList from "./pages/ProductList";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import OrderSuccess from "./pages/OrderSuccess";
import ProductView from "./pages/ProductView";
import AnalyticsPage from "./pages/AnalyticsPage";

const App = () => {
  return (
    <AppProvider>
      <BrowserRouter>
        <div className="flex flex-col min-h-screen">
          <Navbar />

          <div className="grow w-full">
            <Routes>
              <Route path="/" element={<ProductList />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/products" element={<ProductList />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/order-success" element={<OrderSuccess />} />
              <Route path="/product/:id" element={<ProductView />} />
              <Route path="/analytics" element={<AnalyticsPage />} />
            </Routes>
          </div>

          <Footer />
          <Toaster
            position="top-center"
            reverseOrder={false}
          />
        </div>
      </BrowserRouter>
    </AppProvider>
  );
};

export default App;