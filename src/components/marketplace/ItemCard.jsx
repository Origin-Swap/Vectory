// src/components/Marketplace/ItemCard.jsx
import React from "react";
import { Link } from "react-router-dom";

const truncate = (str, maxLength = 25) =>
  str.length > maxLength ? str.slice(0, maxLength) + "..." : str;

const ItemCard = ({ item }) => {
  return (
    <Link to={`/details/${item.id}`}>
    <div className="border rounded-lg p-4 shadow hover:shadow-md transition bg-white">
    <img
      src={item.image}
      alt={item.name}
      className="w-full aspect-[4/3] object-contain rounded mb-3 bg-white"
      loading="eager" fetchpriority="high"
    />
      <div className="md:text-sm text-xs text-gray-500">{item.category}</div>
      <h3 className="md:text-md text-sm text-yellow-600 font-bold">{item.name}</h3>
      <p className="text-xs text-gray-600">{ truncate(item.description)}</p>
      <div className="mt-1 text-xs text-yellow-500">{item.star}</div>
      <div className="flex mt-2 justify-between items-center">
      <div className="text-yellow-600 font-bold">{item.price} USDC</div>
      <div className="text-xs text-gray-500">{item.sales} sold</div>
      </div>
      {(item.views || item.likes) && (
        <div className="flex mt-2 justify-between items-center text-xs text-gray-500">
          {item.views && <div>{item.views} views</div>}
          {item.likes && <div>{item.likes} likes</div>}
        </div>
      )}
    </div>
    </Link>
  );
};

export default ItemCard;
