// src/components/Marketplace/ItemCard.jsx
import React from "react";
import { Link } from "react-router-dom";

const truncate = (str, maxLength = 25) =>
  str.length > maxLength ? str.slice(0, maxLength) + "..." : str;

const ItemCard = ({ item }) => {
  return (
    <Link to={`/details/${item.id}`}>
    <div className="p-2 rounded-xl shadow hover:shadow-md transition bg-white">
      <img
        src={item.image}
        alt={item.name}
        className="w-full aspect-[4/4] object-cover rounded-lg mb-3"
      />
      <div className="text-xs text-gray-500 font-semibold mb-1">{item.category}</div>
      <h3 className="text-base font-medium text-gray-800 mb-1">{truncate(item.name, 25)}</h3>
      <div className="flex justify-between items-center mb-1">
        <span className="text-amber-500 font-bold">{item.price} USDC</span>
      </div>
      <div className="flex justify-between text-xs text-gray-500">
        <span className="text-yellow-500">{item.star}</span>
        <span>{item.sales} sold</span>
      </div>
    </div>

    </Link>
  );
};

export default ItemCard;
