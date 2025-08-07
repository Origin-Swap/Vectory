import React from 'react';
import { MdHistory } from 'react-icons/md';

const OrderHistory = ({ orders, products }) => (
  <div className="relative -top-16 bg-white dark:bg-gray-900 rounded-xl p-4 shadow border">
    <div className="flex items-center gap-2 mb-4">
      <MdHistory className="text-green-500 text-xl" />
      <h3 className="text-lg font-semibold">Order History</h3>
    </div>
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
            const product = products.find((p) => p.name === order.product);
            return (
              <tr key={order.id}>
                <td className="py-3 px-4">
                  <img
                    src={product?.image || "/images/default-product.png"}
                    alt={order.product}
                    className="w-12 h-12 rounded object-cover"
                  />
                </td>
                <td className="py-3 px-4 font-medium">{order.product}</td>
                <td className="py-3 px-4">{order.price}</td>
                <td className="py-3 px-4">1</td>
                <td className="py-3 px-4">{order.date}</td>
                <td className="py-3 px-4">
                  <span className={`text-xs font-semibold ${order.status === "Completed" ? "text-green-600" : "text-yellow-500"}`}>
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

export default OrderHistory;
