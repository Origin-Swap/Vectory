import React from "react";
import { FaWallet, FaCoins } from "react-icons/fa";
import { MdHistory } from "react-icons/md";

const ProfilePortfolio = () => {
  const profile = {
    username: "UserName",
    wallet: "0xA12b...F9C7",
    avatar: "/images/avatar2.png",
    balances: {
      SUPRA: 120.5,
      KT: 540.3,
      USDT: 82.75,
      USDC: 102.4,
    },
    points: 860,
    orders: [
      {
        id: "ORD-001",
        product: "Digital Art - Glitch Portrait",
        date: "2025-07-26",
        price: "0.8 USDC",
        status: "Completed",
      },
      {
        id: "ORD-002",
        product: "Synthwave Music Pack",
        date: "2025-07-20",
        price: "1.2 USDC",
        status: "Completed",
      },
    ],
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">

    <div className="flex flex-col items-center text-center md:flex-row md:items-start md:text-left gap-4 mb-6">
      <img
        src={profile.avatar}
        alt="Profile"
        className="w-28 h-28 rounded-full border-4 border-blue-500 shadow"
      />
      <div>
        <h1 className="text-2xl font-bold">{profile.username}</h1>
        <p className="text-gray-500 text-sm">{profile.wallet}</p>
        <div className="flex gap-2 text-sm items-center mt-2">
          <button className="border border-gray-200 rounded-full px-4 py-1 font-semibold hover:bg-gray-100 transition">
            Follower
          </button>
          <button className="border border-gray-200 rounded-full px-4 py-1 font-semibold hover:bg-gray-100 transition">
            Following
          </button>
        </div>
      </div>
    </div>

      {/* Menu Buttons */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        {[
          { name: "My Shop", icon: "🛍️", link: "/my-shop" },
          { name: "My Cart", icon: "🛒", link: "/my-cart" },
          { name: "My Point", icon: "🎯", link: "/my-point" },
          { name: "Staking", icon: "💰", link: "/staking" },
        ].map((item) => (
          <a
            key={item.name}
            href={item.link}
            className="flex flex-col justify-center items-center bg-white dark:bg-gray-800 px-5 py-6 rounded-lg shadow hover:bg-blue-100 dark:hover:bg-gray-700 transition"
          >
            <span className="text-2xl mb-2">{item.icon}</span>
            <span className="font-semibold">{item.name}</span>
          </a>
        ))}
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-xl p-6 mb-4 shadow border">
        <h2 className="text-2xl font-semibold mb-2">Total Balance</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Object.entries(profile.balances).map(([token, value]) => (
            <div
              key={token}
              className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 border"
            >
              <p className="text-sm text-gray-500">{token}</p>
              <p className="text-lg font-bold text-blue-600">{value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Order History */}
      <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow border">
        <div className="flex items-center gap-2 mb-4">
          <MdHistory className="text-green-500 text-xl" />
          <h3 className="text-lg font-semibold">Order History</h3>
        </div>
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {profile.orders.map((order) => (
            <li key={order.id} className="py-3">
              <div className="font-medium">{order.product}</div>
              <div className="text-sm text-gray-500">
                {order.date} • {order.price}
              </div>
              <div className="text-xs text-green-600">{order.status}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProfilePortfolio;
