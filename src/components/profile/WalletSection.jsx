import React from 'react';
import { PiWallet } from "react-icons/pi";

const WalletSection = ({ balances, tokenData }) => (
  <div className="relative -top-16 bg-white dark:bg-gray-900 rounded-xl p-4 mb-4 shadow border">
    <h2 className="flex items-center gap-x-2 text-lg font-bold mb-4">
      <PiWallet className="w-5 h-5" />My Wallets
    </h2>
    <div className="space-y-1">
      {Object.entries(balances).map(([token, value]) => {
        const logo = tokenData[token]?.logo || "/images/tokens/default.png";
        const price = tokenData[token]?.price || 0;
        const totalUSD = (value * price).toFixed(5); // 🔹 total pakai 5 decimal

        return (
          <div
            key={token}
            className="flex items-center justify-between px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-800 border shadow-sm"
          >
            <div className="flex items-center gap-4">
              <img src={logo} alt={token} className="w-10 h-10 rounded-full" />
              <div>
                <div className="font-semibold text-gray-800 dark:text-white text-sm">{token}</div>
                <div className="text-xs text-gray-500">
                  Price: ${price.toFixed(5)} {/* 🔹 harga pakai 5 decimal */}
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="font-semibold text-blue-600 text-sm">
                {value} {token}
              </div>
              <div className="text-xs text-gray-500">
                ≈ ${totalUSD}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  </div>
);

export default WalletSection;
