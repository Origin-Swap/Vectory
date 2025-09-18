// src/components/Marketplace/ItemCard.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const truncate = (text, maxLength = 50) => {
  if (!text || typeof text !== "string") return ""; // 🚀 fallback aman
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
};

// mapping logo
const paymentLogos = {
  SUPRA: "/images/tokens/supra.webp",
  KT: "/images/tokens/kt.png",
  USDT: "/images/tokens/tether-1.svg",
  USDC: "/images/tokens/usdc.png",
};

const ItemCard = ({ item }) => {
  const navigate = useNavigate();

  if (!item) return null;

  const handleClick = () => {
    navigate(`/details/${encodeURIComponent(item.title)}`);
  };

  const pm = (item.paymentMethod || "").toUpperCase();
    const logoSrc = paymentLogos[pm];

    return (
      <div
        onClick={handleClick}
        className="bg-white dark:bg-gray-900 border rounded-xl shadow-xl cursor-pointer hover:shadow-lg transition"
      >
        <img
          src={(item.images && item.images[0]) || "/images/placeholder.png"}
          alt={item.title || "Untitled"}
          className="w-full max-h-[200px] object-cover rounded-t-lg bg-gray-200"
        />
        <div className="mt-2 px-2 pb-2">
          <h3 className="text-xs font-semibold text-gray-800">
            {truncate(item.category || "Untitled", 40)}
          </h3>
          <h3 className="text-sm font-semibold text-gray-800">
            {truncate(item.title || "Untitled", 40)}
          </h3>
          <p className="text-xs text-gray-600">
            {truncate(item.shortDesc || "No description available", 60)}
          </p>

          <div className="mt-2 flex items-center gap-1 text-[15px] text-red-500 my-text">
            <span>${item.price ?? 0}</span>
            {logoSrc ? (
              <img src={logoSrc} alt={pm} className="w-3 h-3" />
            ) : (
              <span className="ml-1">{item.paymentMethod || ""}</span>
            )}
          </div>
        </div>
      </div>
    );
  };

  export default ItemCard;
