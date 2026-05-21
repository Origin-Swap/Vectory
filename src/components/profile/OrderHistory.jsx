import React, { useEffect, useState } from "react";
import { MdHistory } from "react-icons/md";
import axios from "axios";
import { API_URL } from "../../config/ApiUrl";
import { useAccount } from "wagmi";

const OrderHistory = ({ products }) => {
  const { address } = useAccount();
  const [stats, setStats] = useState(null);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!address) return;

    const fetchData = async () => {
      try {
        const statsRes = await axios.get(`${API_URL}/api/order/buyer/${address}/stats`);
        setStats(statsRes.data);

        const ordersRes = await axios.get(`${API_URL}/api/order/${address}`);
        setOrders(ordersRes.data || []);
      } catch (err) {
        console.error("❌ Error fetching buyer data:", err);
      }
    };

    fetchData();
  }, [address]);


  return (
    <div className="relative -top-16 bg-white dark:bg-gray-900 rounded-xl p-4 shadow border">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <MdHistory className="text-green-500 text-xl" />
        <h3 className="text-lg font-semibold">Order History</h3>
      </div>

      {/* Stats */}
      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg text-center">
            <p className="text-sm text-gray-500">Total Orders</p>
            <h2 className="text-xl font-bold">{stats.totalOrders}</h2>
          </div>
          <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg text-center">
            <p className="text-sm text-gray-500">Completed</p>
            <h2 className="text-xl font-bold text-green-500">{stats.completedOrders}</h2>
          </div>
          <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg text-center">
            <p className="text-sm text-gray-500">Pending</p>
            <h2 className="text-xl font-bold text-yellow-500">{stats.pendingOrders}</h2>
          </div>
          <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg text-center">
            <p className="text-sm text-gray-500">Cancelled</p>
            <h2 className="text-xl font-bold text-red-500">{stats.cancelledOrders}</h2>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto">
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
              const item = order.Item || {};
              let images = item.images;

              // Handle array/string JSON
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
                    <img
                      src={imgSrc}
                      alt={item.title || "Product"}
                      className="w-12 h-12 rounded object-cover"
                    />
                  </td>
                  <td className="py-3 px-4 font-medium">{item.title || "Unknown"}</td>
                  <td className="py-3 px-4">${order.price} {order.paymentMethod}</td>
                  <td className="py-3 px-4">{order.quantity || 1}</td>
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
      </div>
    </div>
  );
};

export default OrderHistory;
