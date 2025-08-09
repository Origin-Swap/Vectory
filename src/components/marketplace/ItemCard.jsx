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
      <div className="flex justify-between text-xs text-gray-500">
        <span className="text-stone-500">{item.category}</span>
        <span>{item.sales} sold</span>
      </div>
      <h3 className="text-sm font-medium text-gray-800 mb-1">{truncate(item.name, 22)}</h3>
      <div className="flex justify-between items-center mb-1">
        <span className="md:text-md text-sm text-red-500 my-text">{item.price} USDC</span>
      </div>
      {/* <div className="flex justify-between text-xs text-gray-500">
        <span className="text-yellow-500">{item.star}</span>
        <span>{item.sales} sold</span>
      </div> */}
    </div>

    </Link>
  );
};

export default ItemCard;
