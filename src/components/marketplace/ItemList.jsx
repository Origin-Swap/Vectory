// src/components/Marketplace/ItemList.jsx
import React, { useState, useEffect, useRef } from "react";
import { API_URL } from "../../config/ApiUrl";
import ItemCard from "./ItemCard";
import PromotionSlider from "./PromotionSlider";
import CategoryGrid from "./CategoryGrid";
import {
  BiSearch,
  BiTrendingUp,
  BiStar,
  BiTime,
  BiWallet,
  BiLock,
  BiShield,
  BiRocket,
  BiDollarCircle,
} from "react-icons/bi";
import { FiArrowRight, FiChevronRight, FiZap } from "react-icons/fi";
import { motion } from "framer-motion";

const ItemList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("new");
  const searchInputRef = useRef(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await fetch(`${API_URL}/api/items`);
        const data = await res.json();

        if (Array.isArray(data)) {
          setProducts(data);
        } else if (data.items && Array.isArray(data.items)) {
          setProducts(data.items);
        } else {
          setProducts([]);
        }
      } catch (err) {
        console.error("Gagal ambil items:", err);
        setProducts([]);
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

  const getActiveProducts = () => {
    switch (activeTab) {
      case "new":
        return newProducts.slice(0, 8);
      case "trending":
        return popularProducts.slice(0, 8);
      case "best":
        return mostPurchase.slice(0, 8);
      default:
        return newProducts.slice(0, 8);
    }
  };

  const stats = [
    { icon: BiDollarCircle, value: "$0", label: "Zero Admin Fees", color: "text-green-600", bgColor: "bg-green-50" },
    { icon: BiRocket, value: "10K+", label: "Active Products", color: "text-blue-600", bgColor: "bg-blue-50" },
    { icon: BiWallet, value: "5K+", label: "Active Sellers", color: "text-purple-600", bgColor: "bg-purple-50" },
    { icon: BiShield, value: "100%", label: "Blockchain Secured", color: "text-orange-600", bgColor: "bg-orange-50" },
  ];

  const features = [
    {
      icon: BiLock,
      title: "Zero Admin Fees",
      description: "Keep 100% of your earnings with our fee-free marketplace",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      icon: BiShield,
      title: "Smart Contract Escrow",
      description: "Secure transactions protected by blockchain technology",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      icon: BiRocket,
      title: "Instant Payouts",
      description: "Get paid immediately after each successful transaction",
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      icon: BiTrendingUp,
      title: "Analytics Dashboard",
      description: "Track your sales and performance in real-time",
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
  ];

  const paymentLogos = {
    KT: "/images/tokens/kt.png",
    USDT: "/images/tokens/tether-1.svg",
    USDC: "/images/tokens/usdc.png",
    ETH: "/images/tokens/ETH.png",
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Clean White Version */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100 rounded-full filter blur-3xl opacity-30" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-100 rounded-full filter blur-3xl opacity-30" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center lg:text-left"
            >
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Buy & Sell Digital
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                  Assets on Blockchain
                </span>
              </h1>
              <p className="text-lg text-gray-600 mb-8 max-w-lg mx-auto lg:mx-0">
                Experience zero-fee transactions, instant payouts, and true ownership with Kraftera - the next-gen Web3 marketplace.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                {/* Start Selling Button - Link ke /seller-board */}
                <button
                  onClick={() => window.location.href = '/seller-board'}
                  className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-8 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  Start Selling
                  <FiArrowRight className="inline ml-2 group-hover:translate-x-1 transition-transform" />
                </button>

                {/* Whitepaper Button - Link ke Google Drive */}
                <button
                  onClick={() => window.open('https://drive.google.com/file/d/1XeerOx7NQUVUbYjdb_ffgItS5llo_6yq/view?usp=sharing', '_blank')}
                  className="border-2 border-gray-300 hover:border-blue-500 text-gray-700 hover:text-blue-600 font-semibold px-8 py-3 rounded-xl transition-all duration-300"
                >
                  Whitepaper
                  <FiArrowRight className="inline ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-200 to-purple-200 rounded-2xl filter blur-2xl opacity-50" />
                <div className="relative bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 shadow-xl overflow-hidden">

                  {/* Decorative glow effects */}
                  <div className="absolute top-0 right-0 w-40 h-40 bg-yellow-400/10 rounded-full filter blur-3xl animate-pulse" />
                  <div className="absolute bottom-0 left-0 w-40 h-40 bg-purple-400/10 rounded-full filter blur-3xl" />

                  {/* Main Image Container */}
                  <div className="relative z-10">
                    <img
                      src="/images/3d-character-coin.png"
                      alt="3D Character holding Kraftera Coin"
                      className="w-full h-auto object-contain rounded-xl"
                      onError={(e) => {
                        e.target.src = "https://placehold.co/500x450/1e1b4b/ffffff?text=3D+Character+%2B+Kraftera+Coin";
                      }}
                    />

                    {/* Floating particles */}
                    <div className="absolute -top-2 -right-2 w-12 h-12 bg-yellow-400/20 rounded-full animate-ping" />
                    <div className="absolute bottom-4 left-4 w-8 h-8 bg-blue-400/20 rounded-full animate-pulse" />
                    <div className="absolute top-1/2 right-0 w-6 h-6 bg-purple-400/20 rounded-full animate-bounce" />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Stats Banner - Clean White */}
        <div className="relative border-t border-gray-100 bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, idx) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="text-center"
                  >
                    <div className={`inline-flex p-3 rounded-xl ${stat.bgColor} mb-3`}>
                      <Icon className={`w-6 h-6 ${stat.color}`} />
                    </div>
                    <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                    <div className="text-sm text-gray-500">{stat.label}</div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Search & Filter Section */}
      <section className="sticky top-14 z-20 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-2xl">
              <BiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search products, categories, or sellers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 text-gray-900"
              />
            </div>
            <div className="hidden md:block">
              <CategoryGrid
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Category Tabs for Mobile */}
        <div className="md:hidden mb-6 overflow-x-auto">
          <div className="flex gap-2 min-w-max">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === cat
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Product Tabs */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex gap-2 bg-gray-100 rounded-xl p-1">
            <button
              onClick={() => setActiveTab("new")}
              className={`px-6 py-2 rounded-lg font-medium transition-all ${
                activeTab === "new"
                  ? "bg-white text-blue-600 shadow-md"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <BiTime className="inline mr-2" />
              New Arrivals
            </button>
            <button
              onClick={() => setActiveTab("trending")}
              className={`px-6 py-2 rounded-lg font-medium transition-all ${
                activeTab === "trending"
                  ? "bg-white text-blue-600 shadow-md"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <BiTrendingUp className="inline mr-2" />
              Trending
            </button>
            <button
              onClick={() => setActiveTab("best")}
              className={`px-6 py-2 rounded-lg font-medium transition-all ${
                activeTab === "best"
                  ? "bg-white text-blue-600 shadow-md"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <BiStar className="inline mr-2" />
              Best Sellers
            </button>
          </div>
          <button className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center gap-1">
            View All
            <FiChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-100 rounded-xl h-48 mb-3" />
                <div className="h-4 bg-gray-100 rounded w-3/4 mb-2" />
                <div className="h-3 bg-gray-100 rounded w-1/2" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
            {getActiveProducts().map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
              >
                <ItemCard item={item} />
              </motion.div>
            ))}
          </div>
        )}

        {/* Features Section */}
        <section className="my-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Kraftera</span>?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Built for creators, powered by blockchain technology
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
                >
                  <div className={`inline-flex p-3 rounded-xl ${feature.bgColor} mb-4`}>
                    <Icon className={`w-6 h-6 ${feature.color}`} />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* CTA Section - Clean Version */}
        <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl my-20 shadow-xl">
          <div className="absolute inset-0 bg-black/10" />
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/10 rounded-full filter blur-3xl" />
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-white/10 rounded-full filter blur-3xl" />
          <div className="relative px-6 py-12 md:py-16 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Ready to Start Your Journey?
            </h2>
            <p className="text-white/90 mb-8 max-w-lg mx-auto">
              Join thousands of creators already selling on Kraftera
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white hover:bg-gray-100 text-gray-900 font-semibold px-8 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg">
                Become a Seller
              </button>
              <button className="border-2 border-white/30 hover:bg-white/10 text-white font-semibold px-8 py-3 rounded-xl transition-all duration-300">
                Explore Products
              </button>
            </div>
          </div>
        </section>

        {/* Payment Methods & Info */}
        <div className="border-t border-gray-100 pt-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
                Supported Payment Methods
              </p>
              <div className="flex flex-wrap items-center gap-4">
                {Object.entries(paymentLogos).map(([symbol, logo]) => (
                  <div
                    key={symbol}
                    className="flex items-center gap-2 bg-gray-50 rounded-xl px-4 py-2 border border-gray-100"
                  >
                    <img src={logo} alt={symbol} className="w-6 h-6" />
                    <span className="font-medium text-gray-700">{symbol}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="md:text-right">
              <p className="text-sm text-gray-600 leading-relaxed">
                Experience the Ease of Buying and Selling on Kraftera - The Web3-powered marketplace with zero admin fees.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ItemList;
