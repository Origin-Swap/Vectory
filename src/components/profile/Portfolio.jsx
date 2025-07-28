import React from "react";
import { FaWallet, FaCoins } from "react-icons/fa";
import { MdHistory } from "react-icons/md";
import { useAccount, useDisconnect } from 'wagmi';
import products from "../../data/mockProducts";

const ProfilePortfolio = () => {
  const { isConnected, address } = useAccount();
  const profile = {
    username: "UserName",
    wallet: "0xA12b...F9C7",
    avatar: "/images/avatar2.png",
    points: 860,
    balances: {
    SUPRA: 120.5,
    KT: 540.3,
    USDT: 82.75,
    USDC: 102.4,
  },
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

  const tokenData = {
    SUPRA: { logo: "/images/tokens/supra.webp", price: 0.25 },
    KT: { logo: "/images/tokens/kt.png", price: 0.1 },
    USDT: { logo: "/images/tokens/tether-1.svg", price: 1 },
    USDC: { logo: "/images/tokens/usdc.png", price: 1 },
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-2">
    <div className="relative rounded-xl overflow-hidden shadow-lg">
    <img
      src="/images/icons/banner1.png"
      alt="Profile Banner"
      className="w-full h-48 md:h-54 object-cover"
    />
  </div>

    <div className="relative -top-16 px-2 flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-8">
      {/* Kiri: Avatar dan Info */}
      <div className="flex flex-col items-center text-center md:flex-row md:items-start md:text-left gap-6">
        <div className="relative w-28 h-28">
          <img
            src={profile.avatar}
            alt="Profile"
            className="w-full h-full rounded-full border-4 border-gradient-to-tr from-blue-400 to-purple-500 shadow-lg"
          />
        </div>
        <div className="">
          <h1 className="text-3xl font-extrabold text-gray-800 dark:text-white">{profile.username}</h1>
          <p className="text-sm -top-2 text-gray-7500 font-mono mb-4">
            {isConnected ? `${address.slice(0, 6)}...${address.slice(-4)}` : 'Not connected'}
          </p>
          <div className="flex gap-3 mt-2 justify-center md:justify-start">
            <button className=" rounded-full px-4 py-1 font-medium text-sm hover:bg-gray-100 dark:hover:bg-gray-800 transition">
              Follower
            </button>
            <button className=" rounded-full px-4 py-1 font-medium text-sm hover:bg-gray-100 dark:hover:bg-gray-800 transition">
              Following
            </button>
          </div>

          {/* Mobile Buttons */}
          <div className="flex md:hidden flex-wrap gap-3 mt-4 justify-center">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-blue-700 transition">
              Follow
            </button>
            {isConnected && (
              <>
                <button className="bg-gray-200 text-gray-800 px-4 py-2 rounded-full text-sm font-semibold hover:bg-gray-300 transition">
                  Edit
                </button>
                <button className="bg-green-500 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-green-600 transition">
                  Launch Shop
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* PC Buttons */}
      {isConnected && (
        <div className="hidden md:flex gap-3 mt-2">
          <button className="bg-blue-600 text-white px-5 py-2 rounded-full font-semibold hover:bg-blue-700 transition text-sm">
            Follow
          </button>
          <button className="bg-gray-200 text-gray-800 px-5 py-2 rounded-full font-semibold hover:bg-gray-300 transition text-sm">
            Edit
          </button>
          <button className="bg-green-500 text-white px-5 py-2 rounded-full font-semibold hover:bg-green-600 transition text-sm">
            Launch Shop
          </button>
        </div>
      )}
    </div>


    {isConnected && (
      <div className="relative -top-16 bg-white dark:bg-gray-900 rounded-xl p-4 mb-4 shadow border">
        <h2 className="text-2xl font-semibold mb-4">My Wallets</h2>
        <div className="space-y-1">
          {Object.entries(profile.balances ?? {}).map(([token, value]) => {
            const logo = tokenData[token]?.logo || "/images/tokens/default.png";
            const price = tokenData[token]?.price || 0;
            const totalUSD = (value * price).toFixed(2);

            return (
              <div
                key={token}
                className="flex items-center justify-between px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-800 border shadow-sm"
              >
                {/* Kiri: Logo dan symbol */}
                <div className="flex items-center gap-4">
                  <img src={logo} alt={token} className="w-10 h-10 rounded-full" />
                  <div>
                    <div className="font-semibold text-gray-800 dark:text-white text-sm">{token}</div>
                    <div className="text-xs text-gray-500">Price: ${price}</div>
                  </div>
                </div>

                {/* Kanan: Balance dan total USD */}
                <div className="text-right">
                  <div className="font-semibold text-blue-600 text-sm">{value} {token}</div>
                  <div className="text-xs text-gray-500">≈ ${totalUSD}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    )}



    {isConnected && (
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
              {profile.orders.map((order) => {
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
    )}

    </div>
  );
};

export default ProfilePortfolio;
