// src/components/Marketplace/ItemList.jsx
import React, { useState, useEffect } from "react";
import { API_URL } from "../../config/ApiUrl";
import ItemCard from "./ItemCard";
import PromotionSlider from "./PromotionSlider";
import CategoryGrid from "./CategoryGrid";
import { BiCategory } from "react-icons/bi";

const ItemList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await fetch(`${API_URL}/api/items`);
        const data = await res.json();

        // pastikan data array
        if (Array.isArray(data)) {
          setProducts(data);
        } else if (data.items && Array.isArray(data.items)) {
          setProducts(data.items);
        } else {
          setProducts([]); // fallback
        }
      } catch (err) {
        console.error("Gagal ambil items:", err);
        setProducts([]); // supaya tidak error saat render
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, []);


  const categories = [
    "All Categories",
    "Ebook",
    "Template",
    "Digital Art",
    "Course",
    "Music",
    "Signature",
    "Game Asset",
  ];

  // filter by search + category
  const filterProducts = (list) =>
    list.filter((item) => {
      const matchesSearch = item.title
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === "All Categories" ||
        item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });

  // kategori besar
  const newProducts = filterProducts(
    [...products].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  );

  const mostPurchase = filterProducts(
    [...products].sort((a, b) => (b.sales || 0) - (a.sales || 0))
  );

  const popularProducts = filterProducts(
    [...products].sort(
      (a, b) => ((b.views || 0) + (b.sales || 0)) - ((a.views || 0) + (a.sales || 0))
    )
  );

  const paymentLogos = {
    SUPRA: "/images/tokens/supra.webp",
    KT: "/images/tokens/kt.png",
    USDT: "/images/tokens/tether-1.svg",
    USDC: "/images/tokens/usdc.png",
};

  return (
    <div className="w-full md:p-4 p-2 mt-16">
      {/* Promo slider */}
      <PromotionSlider />

      <div className="md:block hidden">
        <CategoryGrid
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
      </div>

      {/* Filter mobile */}
      <div className="flex flex-col md:flex-row mb-4 justify-between items-stretch md:items-center gap-2">
        <div className="flex flex-wrap items-center gap-2 md:hidden block">
          <div className="flex items-center gap-1">
            <BiCategory className="w-5 h-5 text-gray-600" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="py-3 my-text"
            >
              {categories.map((cat, idx) => (
                <option key={idx} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="col-span-full text-center text-gray-500">Loading...</div>
      ) : (
        <>
          {/* New Products */}
          <h2 className="text-xl font-bold mb-3 mt-6">🆕 New Products</h2>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-6 gap-2">
            {newProducts.slice(0, 6).map((item) => (
              <ItemCard key={item.title} item={item} />
            ))}
            {newProducts.length === 0 && (
              <div className="col-span-full text-center text-gray-500">
                No new items found.
              </div>
            )}
          </div>

          {/* Most Purchase */}
          <h2 className="text-xl font-bold mb-3 mt-8">🔥 Most Purchase</h2>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-6 gap-2">
            {mostPurchase.slice(0, 6).map((item) => (
              <ItemCard key={item.title} item={item} />
            ))}
            {mostPurchase.length === 0 && (
              <div className="col-span-full text-center text-gray-500">
                No popular purchase found.
              </div>
            )}
          </div>

          {/* Popular Product */}
          <h2 className="text-xl font-bold mb-3 mt-8">⭐ Popular Product</h2>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-6 gap-2">
            {popularProducts.slice(0, 6).map((item) => (
              <ItemCard key={item.title} item={item} />
            ))}
            {popularProducts.length === 0 && (
              <div className="col-span-full text-center text-gray-500">
                No popular items found.
              </div>
            )}
          </div>
        </>
      )}
      <div className="my-8 border-t-2 ">
      <div className="my-4">
      <p className="text-[14px] my-text mb-2">
      Experience the Ease of Buying and Selling on Kraftera
      </p>
      <p className="text-[12px]">
      Welcome to Kraftera, the Web3-powered marketplace with zero admin fees, designed to make your transactions smarter, faster, and more cost-efficient. Discover a wide range of digital products—from ebooks, courses, templates, and music to game assets, artwork, and more—all without the extra charges that often burden creators and sellers.

At Kraftera, we are committed to delivering a seamless and enjoyable buying and selling experience for everyone. Whether you’re a small business owner, a student, a freelancer, or a digital creator, Kraftera empowers you through innovative, user-friendly features and the transparency of blockchain technology.

Enjoy a fast, secure, and admin-free Web3 marketplace with Kraftera. Why wait? Switch to Kraftera today and unlock the future of digital commerce!
      </p>
      </div>
      </div>
      <div className="my-8">
        <div className="my-4">
          <p className="text-[14px] my-text mb-2">
            Payment Method
          </p>
          <div className="flex flex-wrap items-center gap-4">
            {Object.entries(paymentLogos).map(([symbol, logo]) => (
              <div key={symbol} className="flex items-center gap-1 border-2 rounded-xl px-2 py-1">
                <img src={logo} alt={symbol} className="md:w-6 md:h-6 w-4 h-4" />
                <span className="text-[12px]">{symbol}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};

export default ItemList;
