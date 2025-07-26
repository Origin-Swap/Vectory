// src/components/Marketplace/ItemList.jsx
import React, { useState } from "react";
import ItemCard from "./ItemCard";
import products from "../../data/mockProducts";
import PromotionSlider from "./PromotionSlider";
import CategoryGrid from "./CategoryGrid";


const ItemList = () => {
  const [activeTab, setActiveTab] = useState("newest");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Product");

  const categories = [
    "All Product",
    "Ebook",
    "Template",
    "Digital Art",
    "Course",
    "Music",
    "Signature",
    "Game Asset"
  ];

  const filteredProducts = products
    .filter((item) => {
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "All Product" || item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (activeTab === "newest") {
        return new Date(b.createdAt) - new Date(a.createdAt);
      } else if (activeTab === "best") {
        return b.sales - a.sales;
      }
      return 0;
    });

    return (
      <div className="p-4">
        {/* Promo slider */}
        <PromotionSlider />

        <div className="md:block hidden">
        <CategoryGrid
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
        </div>

        {/* Filter dan Search */}
        <div className="flex mb-4 justify-between items-center gap-x-2">
        <div className="flex flex-wrap items-center md:hidden block">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 border text-sm md:text-lg border-gray-300 rounded"
          >
            {categories.map((cat, idx) => (
              <option key={idx} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          </div>

        {/* Search */}
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-1/2 px-3 py-2 border border-gray-300 rounded-xl"
          />
        </div>

        {/* Produk */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-5 gap-2">
          {filteredProducts.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
          {filteredProducts.length === 0 && (
            <div className="col-span-full text-center text-gray-500">No items found.</div>
          )}
        </div>
      </div>
    );
};

export default ItemList;
