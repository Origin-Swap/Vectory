// src/components/Dashboard/SellerBoard.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAccount } from "wagmi";
import { API_URL } from "../../config/ApiUrl";
import { Link } from "react-router-dom";
import MyProducts from "../profile/MyProducts";
import { BiCartAdd } from "react-icons/bi";

const SellerBoard = () => {
  const { address } = useAccount();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);
  const [topProducts, setTopProducts] = useState([]);
  const [orders, setOrders] = useState([]);

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
      } catch (err) {
        console.error("❌ Error fetching seller data:", err);
        setStats(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [address]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-500">
        Loading seller board...
      </div>
    );
  }

  return (
    <div className="min-h-screen mt-14 bg-gray-50 dark:bg-gray-900 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl md:text-3xl font-bold text-gray-800 dark:text-white">
            Seller Dashboard
          </h1>
          <Link
            to="/create-items"
            className="flex px-2 py-1 items-center bg-yellow-200 hover:bg-blue-700 text-black rounded-lg shadow"
          >
            <BiCartAdd className="w-6 h-6 mr-2 "/> Launch
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
          <div
            className={`p-6 rounded-xl shadow ${
              stats ? "bg-white dark:bg-gray-800" : "bg-gray-200 dark:bg-gray-700"
            }`}
          >
            <p className="text-sm text-gray-500">Total Sales</p>
            <h2 className="text-2xl font-bold">
              {stats ? stats.totalSold || 0 : "--"}
            </h2>
          </div>

          <div
            className={`p-6 rounded-xl shadow ${
              stats ? "bg-white dark:bg-gray-800" : "bg-gray-200 dark:bg-gray-700"
            }`}
          >
            <p className="text-sm text-gray-500">Total Revenue</p>
            <h2 className="text-2xl font-bold">
              {stats ? `$${stats.totalRevenue?.toLocaleString() || 0}` : "--"} SUPRA
            </h2>
          </div>

          <div
            className={`p-6 rounded-xl shadow ${
              stats ? "bg-white dark:bg-gray-800" : "bg-gray-200 dark:bg-gray-700"
            }`}
          >
            <p className="text-sm text-gray-500">Pending Orders</p>
            <h2 className="text-2xl font-bold">
              {stats ? stats.pendingOrders || 0 : "--"}
            </h2>
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow mb-4">
          <h2 className="text-xl font-bold mb-4">Top Selling Products</h2>
          {topProducts.length > 0 ? (
            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
              {topProducts.map((product, idx) => (
                <li key={idx} className="py-3 flex justify-between">
                  <span>{product.name}</span>
                  <span className="font-bold">{product.sales} sales</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No products sold yet.</p>
          )}
        </div>

        {/* Recent Orders */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow mb-16">
          <h2 className="text-xl font-bold mb-4">Recent Orders</h2>
          {orders.length > 0 ? (
            <table className="min-w-full text-sm text-left">
              <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                <tr>
                  <th className="py-2 px-4">Image</th>
                  <th className="py-2 px-4">Title</th>
                  <th className="py-2 px-4">Price</th>
                  <th className="py-2 px-4">Quantity</th>
                  <th className="py-2 px-4">Order Date</th>
                  <th className="py-2 px-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {orders.map((order) => {
                let images = order.images;
                if (typeof images === "string") {
                  try {
                    const parsed = JSON.parse(images);
                    if (Array.isArray(parsed)) images = parsed;
                  } catch (_) {}
                }
                const imgSrc =
                  Array.isArray(images) && images.length > 0
                    ? images[0]
                    : typeof images === "string" && images.length > 0
                    ? images
                    : "/images/default-product.png";

                return (
                  <tr key={order.id}>
                    <td className="py-3 px-4">
                      <img src={imgSrc} alt={order.title} className="w-12 h-12 rounded object-cover" />
                    </td>
                    <td className="py-3 px-4 font-medium">{order.title}</td>
                    <td className="py-3 px-4">${order.price} {order.paymentMethod}</td>
                    <td className="py-3 px-4">{order.quantity}</td>
                    <td className="py-3 px-4">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`text-xs font-semibold ${
                          order.status === "completed"
                            ? "text-green-600"
                            : order.status === "pending"
                            ? "text-yellow-500"
                            : "text-red-500"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
              </tbody>
            </table>
          ) : (
            <p className="text-gray-500">No recent orders.</p>
          )}
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow ">
        <MyProducts />
        </div>
      </div>
    </div>
  );
};

export default SellerBoard;
