import React from "react";

const PurchaseHistory = () => {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">🛒 Purchase History</h3>
      <ul className="space-y-2">
        <li className="border p-3 rounded shadow-sm">Bought Music Track from 0x456... on 2024-06-25</li>
        <li className="border p-3 rounded shadow-sm">Bought Template from 0x789... on 2024-06-20</li>
      </ul>
    </div>
  );
};

export default PurchaseHistory;
