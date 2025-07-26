import React from "react";

const SalesHistory = () => {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">💸 Sales History</h3>
      <ul className="space-y-2">
        <li className="border p-3 rounded shadow-sm">Sold Ebook: Learn Web3 to 0xABC... on 2024-07-01</li>
        <li className="border p-3 rounded shadow-sm">Sold Digital Art to 0x123... on 2024-07-03</li>
      </ul>
    </div>
  );
};

export default SalesHistory;
