import { useCallback, useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  CartesianGrid
} from "recharts";

import {
  demoSummary,
  demoTopProducts,
  demoCart,
  demoPayments
} from "../data/demoAnalytics";
import usePageTitle from "../hooks/usePageTitle";

const API_BASE = "http://localhost:3000";

export default function AnalyticsPage() {
  usePageTitle("Analytics");
  const [mode, setMode] = useState(null); // demo | live

  const [summary, setSummary] = useState(null);
  const [topProducts, setTopProducts] = useState([]);
  const [cart, setCart] = useState(null);
  const [payments, setPayments] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [lastUpdated, setLastUpdated] = useState(null);

  /* ---------------- FETCH ANALYTICS ---------------- */

  const fetchAnalytics = useCallback(async () => {

    if (mode === "demo") {

      setSummary(demoSummary);
      setTopProducts(demoTopProducts);
      setCart(demoCart);
      setPayments(demoPayments);

      setLastUpdated(new Date());
      setLoading(false);
      setError(null);

      return;
    }

    try {

      setLoading(true);

      const responses = await Promise.all([
        fetch(`${API_BASE}/analytics/summary`),
        fetch(`${API_BASE}/analytics/top-products`),
        fetch(`${API_BASE}/analytics/cart`),
        fetch(`${API_BASE}/analytics/payments`)
      ]);

      const [summaryData, productsData, cartData, paymentsData] =
        await Promise.all(responses.map(r => r.json()));

      setSummary(summaryData || {});
      setTopProducts(productsData || []);
      setCart(cartData || {});
      setPayments(paymentsData || {});

      setLastUpdated(new Date());
      setError(null);

    } catch (err) {

      console.error("Analytics fetch failed", err);
      setError("Failed to load analytics");

    } finally {

      setLoading(false);

    }
  }, [mode]);

  /* ---------------- AUTO REFRESH ---------------- */

  useEffect(() => {

    if (!mode) return;

    fetchAnalytics();

    if (mode === "live") {
      const interval = setInterval(fetchAnalytics, 10000);
      return () => clearInterval(interval);
    }

  }, [mode, fetchAnalytics]);

  /* ---------------- MODE SELECTOR ---------------- */

  if (!mode) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">

        <div className="bg-[#141414] border border-[#222] rounded-md p-6 w-[320px] text-center">

          <h2 className="text-lg font-semibold text-[#00ff88] mb-3">
            Analytics Mode
          </h2>

          <p className="text-sm text-gray-400 mb-6">
            Choose how you want to view analytics
          </p>

          <div className="flex gap-3 justify-center">

            <button
              onClick={() => setMode("demo")}
              className="bg-[#00ff88] text-black px-4 py-2 rounded hover:bg-[#00dd77]"
            >
              Demo
            </button>

            <button
              onClick={() => setMode("live")}
              className="border border-[#00ff88] text-[#00ff88] px-4 py-2 rounded hover:bg-[#00ff88] hover:text-black"
            >
              Real-Time
            </button>

          </div>

        </div>

      </div>
    );
  }

  /* ---------------- LOADING ---------------- */

  if (loading && !summary) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center text-gray-400 text-xl">
        Loading analytics...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center text-red-400 text-xl">
        {error}
      </div>
    );
  }

  /* ---------------- DATA PREP ---------------- */

  const paymentData = Object.entries(payments || {}).map(([key, value]) => ({
    name: key.toUpperCase(),
    value
  }));

  const cartData = [
    { name: "Add To Cart", value: cart?.addToCart || 0 },
    { name: "Removed", value: cart?.removeFromCart || 0 }
  ];

  const eventDistribution = [
    { name: "Logins", value: summary?.logins || 0 },
    { name: "Signups", value: summary?.signups || 0 },
    { name: "Views", value: summary?.productViews || 0 },
    { name: "Cart Adds", value: summary?.addToCart || 0 },
    { name: "Orders", value: summary?.orders || 0 }
  ];

  const conversionRate = summary?.productViews ? ((summary.orders / summary.productViews) * 100).toFixed(2) : 0;

  const cartRate = summary?.productViews ? ((summary.addToCart / summary.productViews) * 100).toFixed(2) : 0;

  const COLORS = [
    "#22c55e",
    "#3b82f6",
    "#f59e0b",
    "#ef4444",
    "#a855f7",
    "#14b8a6"
  ];

  const formatNumber = (num) => {
    if (!num) return 0;
    return num.toLocaleString();
  };

  /* ---------------- UI ---------------- */

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-200">

      <div className="max-w-7xl mx-auto p-4">

        {/* HEADER */}

        <div className="flex items-center justify-between mb-6">

          <div>

            <div className="flex items-center gap-3">

              <h1 className="text-xl font-semibold text-[#00ff88]">
                Real-Time Analytics
              </h1>

              {/* <span className={`text-xs px-2 py-1 rounded 
                ${mode === "demo"
                  ? "bg-yellow-500 text-black"
                  : "bg-green-600 text-white"
                }`}
              >
                {mode === "demo" ? "DEMO MODE" : "LIVE"}
              </span> */}

            </div>

            {lastUpdated && (
              <p className="text-xs text-gray-200">
                Updated at :
                <span className="text-green-500 ml-1">
                  {lastUpdated.toLocaleTimeString()}
                </span>
              </p>
            )}

          </div>

          <button
            onClick={fetchAnalytics}
            className="bg-[#00ff88] text-black text-sm px-3 py-1 rounded hover:bg-[#00dd77]"
          >
            Refresh
          </button>

        </div>

        {/* KPI CARDS */}

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-6">

          <Card title="Total Events" value={formatNumber(summary?.totalEvents)} />
          <Card title="Product Views" value={formatNumber(summary?.productViews)} />
          <Card title="Orders" value={formatNumber(summary?.orders)} />
          <Card title="Revenue" value={`₹${formatNumber(summary?.revenue)}`} />
          <Card title="Logins" value={formatNumber(summary?.logins)} />
          <Card title="Signups" value={formatNumber(summary?.signups)} />
          <Card title="Add To Cart" value={formatNumber(summary?.addToCart)} />
          <Card title="Avg Order Value" value={`₹${formatNumber(summary?.avgOrderValue)}`} />
          <Card title="Conversion Rate" value={`${conversionRate}%`} />
          <Card title="Cart Rate" value={`${cartRate}%`} />

        </div>

        {/* CHARTS */}

        <div className="grid lg:grid-cols-2 gap-4">

          <ChartContainer title="Top Viewed Products">

            <ResponsiveContainer width="100%" height={180}>

              <BarChart data={topProducts}>

                <CartesianGrid stroke="#1f1f1f" />

                <XAxis dataKey="productId" stroke="#888" fontSize={10} />

                <YAxis stroke="#888" fontSize={10} />

                <Tooltip />

                <Bar dataKey="views" fill="#00ff88" radius={[4, 4, 0, 0]} />

              </BarChart>

            </ResponsiveContainer>

          </ChartContainer>

          <ChartContainer title="Payment Distribution">

            <ResponsiveContainer width="100%" height={180}>

              <PieChart>

                <Pie
                  data={paymentData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={50}
                  label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                >
                  {paymentData.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>

                <Tooltip />
                <Legend iconSize={8} wrapperStyle={{ fontSize: "11px" }} />

              </PieChart>

            </ResponsiveContainer>

          </ChartContainer>

          <ChartContainer title="Cart Activity">

            <ResponsiveContainer width="100%" height={180}>

              <BarChart data={cartData}>

                <CartesianGrid stroke="#1f1f1f" />
                <XAxis dataKey="name" stroke="#888" fontSize={10} />
                <YAxis stroke="#888" fontSize={10} />
                <Tooltip />

                <Bar dataKey="value" fill="#00ff88" radius={[4, 4, 0, 0]} />

              </BarChart>

            </ResponsiveContainer>

          </ChartContainer>

          <ChartContainer title="Event Distribution">

            <ResponsiveContainer width="100%" height={180}>

              <BarChart data={eventDistribution}>

                <CartesianGrid stroke="#1f1f1f" />
                <XAxis dataKey="name" stroke="#888" fontSize={10} />
                <YAxis stroke="#888" fontSize={10} />
                <Tooltip />

                <Bar dataKey="value" fill="#00ff88" radius={[4, 4, 0, 0]} />

              </BarChart>

            </ResponsiveContainer>

          </ChartContainer>

        </div>

      </div>

    </div>
  );
}

/* ---------------- KPI CARD ---------------- */

function Card({ title, value }) {

  return (
    <div className="bg-[#141414] border border-[#222] rounded-md px-3 py-2">

      <p className="text-[11px] text-gray-400">{title}</p>

      <h3 className="text-lg font-semibold text-[#00ff88]">
        {value}
      </h3>

    </div>
  );
}

/* ---------------- CHART CONTAINER ---------------- */

function ChartContainer({ title, children }) {

  return (
    <div className="bg-[#141414] border border-[#222] rounded-md p-3">

      <h2 className="text-xs font-semibold text-[#00ff88] mb-2">
        {title}
      </h2>

      {children}

    </div>
  );
}