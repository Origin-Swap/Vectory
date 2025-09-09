import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from '../config/ApiUrl';
import { FaUsers, FaCrown, FaFileAlt, FaBox, FaDollarSign } from "react-icons/fa";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  LineChart,
  Line,
} from "recharts";

export default function StatsDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/stats`);
        setStats(res.data);
      } catch (err) {
        console.error("Gagal ambil stats:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-gray-900"></div>
      </div>
    );
  }

  if (!stats) {
    return <p className="text-center text-red-500">Gagal memuat statistik.</p>;
  }

  // ✅ Hitung revenue
  const revenueTotal = stats.premiumUsers * 1000;
  const revenueMonthly = revenueTotal; // anggap tiap premium bayar per bulan
  const revenueWeekly = Math.floor(revenueTotal / 4); // kira-kira 1/4 bulanan

  const cards = [
    {
      title: "Total Users",
      value: stats.totalUsers,
      icon: <FaUsers className="w-6 h-6 text-blue-600" />,
      color: "bg-blue-50 border-blue-200",
    },
    {
      title: "Premium Users",
      value: stats.premiumUsers,
      icon: <FaCrown className="w-6 h-6 text-yellow-600" />,
      color: "bg-yellow-50 border-yellow-200",
    },
    {
      title: "Total Posts",
      value: stats.totalPosts,
      icon: <FaFileAlt className="w-6 h-6 text-green-600" />,
      color: "bg-green-50 border-green-200",
    },
    {
      title: "Total Products",
      value: stats.totalProducts,
      icon: <FaBox className="w-6 h-6 text-purple-600" />,
      color: "bg-purple-50 border-purple-200",
    },
    {
      title: "Revenue (Total)",
      value: `${revenueTotal} SUPRA`,
      icon: <FaDollarSign className="w-6 h-6 text-green-700" />,
      color: "bg-emerald-50 border-emerald-200",
    },
    {
      title: "Revenue (Monthly)",
      value: `${revenueMonthly} SUPRA`,
      icon: <FaDollarSign className="w-6 h-6 text-indigo-700" />,
      color: "bg-indigo-50 border-indigo-200",
    },
    {
      title: "Revenue (Weekly)",
      value: `${revenueWeekly} SUPRA`,
      icon: <FaDollarSign className="w-6 h-6 text-pink-700" />,
      color: "bg-pink-50 border-pink-200",
    },
  ];

  // Data untuk chart
  const chartData = [
    { name: "Users", value: stats.totalUsers },
    { name: "Premium", value: stats.premiumUsers },
    { name: "Posts", value: stats.totalPosts },
    { name: "Products", value: stats.totalProducts },
  ];

  // Data revenue chart
  const revenueData = [
    { name: "Weekly", value: revenueWeekly },
    { name: "Monthly", value: revenueMonthly },
    { name: "Total", value: revenueTotal },
  ];

  const COLORS = ["#3B82F6", "#FACC15", "#22C55E", "#A855F7"];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">📊 Platform Statistics</h2>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 md:gap-6 gap-2">
        {cards.map((card, i) => (
          <div
            key={i}
            className={`rounded-2xl border shadow-sm p-5 flex flex-col items-start gap-4 ${card.color}`}
          >
            <div className="p-2 rounded-lg bg-white shadow">{card.icon}</div>
            <div>
              <h3 className="text-lg font-semibold">{card.title}</h3>
              <p className="text-2xl font-bold">{card.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Bar Chart */}
        <div className="p-6 bg-white border rounded-2xl shadow">
          <h3 className="text-lg font-semibold mb-4">Bar Overview</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#3B82F6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="p-6 bg-white border rounded-2xl shadow">
          <h3 className="text-lg font-semibold mb-4">Distribution</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={90}
                label
              >
                {chartData.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Line Chart Revenue */}
        <div className="p-6 bg-white border rounded-2xl shadow lg:col-span-2">
          <h3 className="text-lg font-semibold mb-4">Revenue Overview</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#10B981" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
