// src/components/Dashboard/SellerBoard.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAccount } from "wagmi";
import { API_URL } from "../../config/ApiUrl";
import { Link } from "react-router-dom";
import MyProducts from "../profile/MyProducts";
import {
  BiCartAdd,
  BiTrendingUp,
  BiDollarCircle,
  BiTime,
  BiPackage,
  BiShoppingBag,
  BiStar,
  BiWallet,
  BiLineChart
} from "react-icons/bi";
import {
  FiArrowUpRight,
  FiUsers,
  FiTruck,
  FiBarChart2
} from "react-icons/fi";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Line, Doughnut } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const SellerBoard = () => {
  const { address } = useAccount();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);
  const [topProducts, setTopProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [salesData, setSalesData] = useState([]);
  const [totalCustomers, setTotalCustomers] = useState(0);

  useEffect(() => {
    if (!address) return;

    const fetchData = async () => {
      try {
        const statsRes = await axios.get(`${API_URL}/api/order/seller/${address}/stats`);
        setStats(statsRes.data || null);

        const productRes = await axios.get(
          `${API_URL}/api/order/seller/${address}/top-products?limit=5`
        );
        setTopProducts(productRes.data || []);

        const ordersRes = await axios.get(
          `${API_URL}/api/order/seller/${address}/orders?limit=5`
        );
        setOrders(ordersRes.data || []);

        // Mock sales data for chart (replace with actual API)
        setSalesData([12, 19, 15, 17, 14, 18, 22, 25, 23, 28, 32, 38]);

        // Mock customers data
        setTotalCustomers(24);

      } catch (err) {
        console.error("❌ Error fetching seller data:", err);
        setStats(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [address]);

  // Chart configuration
  const lineChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Sales',
        data: salesData,
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          usePointStyle: true,
          boxWidth: 10,
        },
      },
    },
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const statsCards = [
    {
      title: "Total Sales",
      value: stats?.totalSold || 0,
      icon: BiShoppingBag,
      color: "blue",
      change: "+12%",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
      iconColor: "text-blue-600",
    },
    {
      title: "Total Revenue",
      value: `$${stats?.totalRevenue?.toLocaleString() || 0}`,
      subtitle: "KT",
      icon: BiDollarCircle,
      color: "green",
      change: "+8%",
      bgColor: "bg-green-50 dark:bg-green-900/20",
      iconColor: "text-green-600",
    },
    {
      title: "Pending Orders",
      value: stats?.pendingOrders || 0,
      icon: BiTime,
      color: "orange",
      change: "-3%",
      bgColor: "bg-orange-50 dark:bg-orange-900/20",
      iconColor: "text-orange-600",
    },
    {
      title: "Total Customers",
      value: totalCustomers,
      icon: FiUsers,
      color: "purple",
      change: "+15%",
      bgColor: "bg-purple-50 dark:bg-purple-900/20",
      iconColor: "text-purple-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header Section */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-14 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Seller Dashboard
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Manage your products and track your sales performance
              </p>
            </div>
            <Link
              to="/create-items"
              className="group flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 font-semibold"
            >
              <BiCartAdd className="w-5 h-5 group-hover:scale-110 transition-transform" />
              Launch New Product
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statsCards.map((stat, index) => {
            const Icon = stat.icon;
            const isNegative = stat.change?.startsWith('-');
            return (
              <div
                key={index}
                className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-transparent to-gray-50 dark:to-gray-700/50 rounded-bl-full" />
                <div className="relative p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                      <Icon className={`w-6 h-6 ${stat.iconColor}`} />
                    </div>
                    {stat.change && (
                      <div className={`flex items-center gap-1 text-xs font-semibold ${
                        isNegative ? 'text-red-600' : 'text-green-600'
                      }`}>
                        <FiArrowUpRight className={`w-3 h-3 ${isNegative ? 'rotate-90' : ''}`} />
                        {stat.change}
                      </div>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {stat.value}
                    {stat.subtitle && <span className="text-sm font-normal ml-1">{stat.subtitle}</span>}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Sales Chart */}
          <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Sales Overview</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Monthly sales performance</p>
              </div>
              <div className="flex items-center gap-2">
                <BiLineChart className="w-5 h-5 text-gray-400" />
                <span className="text-xs text-gray-500">vs last year</span>
              </div>
            </div>
            <div className="h-64">
              <Line data={lineChartData} options={chartOptions} />
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Stats</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                    <FiTruck className="w-4 h-4 text-green-600" />
                  </div>
                  <span className="text-sm text-gray-700 dark:text-gray-300">Completion Rate</span>
                </div>
                <span className="text-lg font-semibold text-green-600">94%</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                    <BiStar className="w-4 h-4 text-blue-600" />
                  </div>
                  <span className="text-sm text-gray-700 dark:text-gray-300">Avg. Rating</span>
                </div>
                <span className="text-lg font-semibold text-blue-600">4.8 ★</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                    <BiWallet className="w-4 h-4 text-purple-600" />
                  </div>
                  <span className="text-sm text-gray-700 dark:text-gray-300">Active Products</span>
                </div>
                <span className="text-lg font-semibold text-purple-600">{topProducts.length || 0}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Top Products & Recent Orders */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Top Selling Products */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Top Selling Products</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Best performing items</p>
                </div>
                <BiTrendingUp className="w-5 h-5 text-green-500" />
              </div>
            </div>
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {topProducts.length > 0 ? (
                topProducts.map((product, idx) => (
                  <div key={idx} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 flex-1">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-sm font-bold">
                          {idx + 1}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-gray-900 dark:text-white">{product.name}</p>
                          <p className="text-xs text-gray-500">{product.category || 'Digital Product'}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-blue-600">{product.sales} sales</p>
                        <p className="text-xs text-gray-500">${(product.price || 0).toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center">
                  <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-3">
                    <BiPackage className="w-8 h-8 text-gray-400" />
                  </div>
                  <p className="text-gray-500">No products sold yet</p>
                  <Link to="/create-items" className="text-blue-600 text-sm hover:underline mt-2 inline-block">
                    Create your first product →
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Recent Orders */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Orders</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Latest transactions</p>
                </div>
                <FiBarChart2 className="w-5 h-5 text-gray-400" />
              </div>
            </div>
            <div className="divide-y divide-gray-200 dark:divide-gray-700 max-h-96 overflow-y-auto">
              {orders.length > 0 ? (
                orders.map((order) => {
                  let images = order.images;
                  if (typeof images === "string") {
                    try {
                      const parsed = JSON.parse(images);
                      if (Array.isArray(parsed)) images = parsed;
                    } catch (_) {}
                  }
                  const imgSrc = Array.isArray(images) && images.length > 0
                    ? images[0]
                    : "/images/default-product.png";

                  return (
                    <div key={order.id} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                      <div className="flex items-center gap-3">
                        <img
                          src={imgSrc}
                          alt={order.title}
                          className="w-12 h-12 rounded-lg object-cover"
                          onError={(e) => { e.target.src = "/images/default-product.png"; }}
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-gray-900 dark:text-white truncate">{order.title}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs text-gray-500">Qty: {order.quantity || 1}</span>
                            <span className="text-xs text-gray-400">•</span>
                            <span className="text-xs text-gray-500">{order.paymentMethod}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-gray-900 dark:text-white">
                            ${order.price?.toLocaleString() || 0}
                          </p>
                          <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                            order.status === "completed"
                              ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                              : order.status === "pending"
                              ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                              : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                          }`}>
                            {order.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="p-8 text-center">
                  <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-3">
                    <FiTruck className="w-8 h-8 text-gray-400" />
                  </div>
                  <p className="text-gray-500">No recent orders</p>
                  <p className="text-sm text-gray-400 mt-1">Orders will appear here once customers purchase</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* My Products Section */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">My Products</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Manage your product inventory</p>
              </div>
              <Link
                to="/create-items"
                className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
              >
                Add New <BiCartAdd className="w-4 h-4" />
              </Link>
            </div>
          </div>
          <div className="p-6">
            <MyProducts />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerBoard;
