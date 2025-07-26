import React from "react";

const PointHistory = () => {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">🎯 Point History</h3>
      <ul className="space-y-2">
        <li className="border p-3 rounded shadow-sm">+100 Points - Referral Bonus</li>
        <li className="border p-3 rounded shadow-sm">-50 Points - Converted to Token</li>
      </ul>
    </div>
  );
};

export default PointHistory;
