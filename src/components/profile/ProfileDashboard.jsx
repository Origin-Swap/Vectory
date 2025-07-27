import React from "react";
import { Link } from "react-router-dom";
import { FaStar, FaShareAlt, FaHeart, FaPlus } from "react-icons/fa";

const StorePage = () => {
  const store = {
    name: "Synthwave Store",
    description: "Original synthwave music, templates & visual assets for creators.",
    banner: "/images/store-banner.webp",
    avatar: "/images/avatar2.png",
    stats: {
      followers: 120,
      items: 34,
      rating: 4.8,
    },
    products: [
      {
        id: 1,
        name: "Synthwave Music Pack",
        category: "Music",
        image: "/images/products/music-pack.webp",
        price: "1.2 USDC",
        rating: 5,
        likes: 42,
      },
      {
        id: 2,
        name: "Digital Art - Glitch Portrait",
        category: "Digital Art",
        image: "/images/products/glitch-art.webp",
        price: "0.8 USDC",
        rating: 4.5,
        likes: 17,
      },
    ],
  };

  // (Opsional) Ganti ini dengan status apakah user adalah pemilik toko
  const userIsOwner = true;

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      {/* Banner */}
      <div className="relative w-full h-48 rounded-xl overflow-hidden mb-6">
        <img
          src={store.banner}
          alt="Store Banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-4 flex items-center space-x-4 mb-4">
          <img
            src={store.avatar}
            alt="Store Avatar"
            className="w-16 h-16 rounded-full border-4 border-white shadow"
          />
          <div>
            <h1 className="text-xl font-bold text-white">{store.name}</h1>
            <p className="text-sm text-white">{store.description}</p>
          </div>
        </div>
      </div>

      {/* Stats & Buttons */}
      <div className="flex flex-wrap justify-between items-center mb-6">
        <div className="flex space-x-6 text-sm text-gray-600 dark:text-gray-300">
          <span><strong>{store.stats.followers}</strong> Followers</span>
          <span><strong>{store.stats.items}</strong> Items</span>
          <span className="flex items-center gap-1">
            <FaStar className="text-yellow-400" />
            {store.stats.rating}
          </span>
        </div>

        <div className="flex gap-2">
          <button className="px-4 py-1 border rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
            Follow
          </button>
          <button className="p-2 border rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
            <FaShareAlt />
          </button>
          {userIsOwner && (
            <Link to="/create-items">
              <button className="flex items-center px-4 py-1 bg-blue-500 text-white text-sm rounded-full hover:bg-blue-600">
                <FaPlus className="mr-1" />
                Add Product
              </button>
            </Link>
          )}
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {store.products.map((product) => (
          <div
            key={product.id}
            className="border rounded-lg p-3 bg-white dark:bg-gray-900 shadow-sm"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-40 object-cover rounded-md mb-3"
            />
            <h2 className="text-md font-semibold">{product.name}</h2>
            <p className="text-xs text-gray-500">{product.category}</p>
            <div className="mt-2 flex justify-between items-center text-sm">
              <span className="font-bold text-green-600">{product.price}</span>
              <span className="flex items-center gap-1">
                <FaHeart className="text-red-500" />
                {product.likes}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StorePage;
