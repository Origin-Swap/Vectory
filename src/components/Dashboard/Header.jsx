import React from "react";

const Header = ({ onOpenCheckin }) => (
  <div className="flex justify-between items-center mb-8">
    <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">Dashboard</h1>
    <button
      onClick={onOpenCheckin}
      className="px-4 py-2 bg-yellow-200 hover:bg-blue-700 text-gray-800 rounded-lg transition-colors"
    >
      Checkin
    </button>
  </div>
);

export default Header;
