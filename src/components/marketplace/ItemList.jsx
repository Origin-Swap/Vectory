// src/components/Marketplace/ItemList.jsx
import React, { useState } from "react";
import ItemCard from "./ItemCard";
import products from "../../data/mockProducts";
import PromotionSlider from "./PromotionSlider";
import CategoryGrid from "./CategoryGrid";
import { HiSearch } from "react-icons/hi";
import { BiCategory } from "react-icons/bi";


const ItemList = () => {
  const [activeTab, setActiveTab] = useState("newest");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Category");

  const categories = [
    "All Category",
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
      const matchesCategory = selectedCategory === "All Category" || item.category === selectedCategory;
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
        <div className="flex flex-col md:flex-row mb-4 justify-between items-stretch md:items-center gap-2">
        <div className="flex flex-wrap items-center gap-2 md:hidden block">
          <div className="flex items-center gap-1">
            <BiCategory className="w-5 h-5 text-gray-600" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="py-3 font-bold"
            >
              {categories.map((cat, idx) => (
                <option key={idx} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>


          <div className="relative w-full md:w-1/2">
            <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
              <HiSearch className="w-5 h-5" />
            </span>
            <input
              type="text"
              placeholder="Search items"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

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
