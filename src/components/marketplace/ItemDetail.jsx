import React from "react";
import { useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { BsBagCheck,BsCartCheck } from "react-icons/bs";
import { TbCalendarCheck } from "react-icons/tb";
import { IoIosArrowRoundBack } from "react-icons/io";
import AddToCartButton from "./AddToCartButton";
import mockUser from "../../data/mockUser";
import products from "../../data/mockProducts";
import ItemCard from "./ItemCard";

// Ulasan pembeli (mock)
const mockReviews = {
  1: [
    {
      name: "Alice Johnson",
      rating: 4,
      review: "A very accessible introduction to Web3. Great for beginners!",
      date: "2025-07-10",
    },
    {
      name: "Markus Lee",
      rating: 3,
      review: "Covers the basics well, but lacks advanced content.",
      date: "2025-07-08",
    },
  ],
  2: [
    {
      name: "Sophia Tran",
      rating: 5,
      review: "Clean design and easy to customize. Perfect for my crypto project!",
      date: "2025-07-12",
    },
    {
      name: "James Carter",
      rating: 4,
      review: "Responsive and lightweight as promised. Would love more variants.",
      date: "2025-07-09",
    },
  ],
  3: [
    {
      name: "Yuki Aoki",
      rating: 5,
      review: "Amazing retro vibes. I used them in my YouTube videos and they fit perfectly.",
      date: "2025-07-14",
    },
    {
      name: "Carlos Mendes",
      rating: 4,
      review: "Great quality tracks. Would be nice to have stems too.",
      date: "2025-07-11",
    },
  ],
  4: [
    {
      name: "Emma L.",
      rating: 4,
      review: "Beautiful and unique piece. Looks great in my digital frame.",
      date: "2025-07-15",
    },
    {
      name: "Nathan K.",
      rating: 3,
      review: "Cool style, but I expected a bit more detail for the resolution.",
      date: "2025-07-13",
    },
  ]
};


const ItemDetail = ({ item }) => {
  const navigate = useNavigate();

  if (!item) return <div className="p-4">Item not found.</div>;

  const handleBuyNow = () => {
    let cart = JSON.parse(localStorage.getItem("checkout")) || [];
    const exists = cart.find((i) => i.id === item.id);
    if (!exists) {
      cart.push({ ...item, quantity: 1 });
      localStorage.setItem("checkout", JSON.stringify(cart));
    }
    navigate(`/details/${item.id}/checkout`);
  };

  const isOwner = item.owner === mockUser.wallet;
  const seller = isOwner ? mockUser : null;

  const otherItems = products.filter(
    (p) => p.owner === item.owner && p.id !== item.id
  );

  const handleBack = () => navigate('/');

  return (
    <div className="md:p-4 p-2 mt-16 bg-gray-100 mx-auto font-sans">
    <p onClick={handleBack} className="flex items-center gap-1 mt-2 mb-4 cursor-pointer">
    <IoIosArrowRoundBack className="w-6 h-6"/> Back To Market
    </p>
    <div className="flex flex-col md:flex-row gap-4">
      {/* Bagian Produk */}
      <div className="md:w-4/6 w-full bg-white rounded-lg shadow p-4 md:p-6 flex flex-col md:flex-row gap-6">
        {/* Gambar Produk */}
        <div className="md:w-1/3 w-full">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover rounded-2xl"
            loading="eager"
          />
        </div>

        {/* Info Produk */}
        <div className="md:w-2/3 w-full flex flex-col justify-between">
          <div className="space-y-2">
            <h1 className="md:text-2xl text-lg font-bold text-gray-800">[{item.category}] {item.name}</h1>
            {/* <p className="text-base text-gray-700">{item.description}</p>

            <div className="flex items-center gap-2 text-yellow-500 text-xl">
              <span>{item.star}</span>
              <span className="text-sm text-gray-500">({item.rate})</span>
            </div> */}

            <div className="mt-4 space-y-1 text-sm text-gray-600">
              <div className="md:text-3xl text-xl my-text text-red-500 mb-2">
                {item.price} USDC
              </div>
              <p className="flex items-center gap-1">
                <BsBagCheck /><strong>Available,</strong> {item.available} items
              </p>
              <p className="flex items-center gap-1">
                <BsCartCheck /><strong>Sold:</strong> {item.sales} items
              </p>
              <p className="flex items-center gap-1">
                <TbCalendarCheck /><strong>Last Updates, </strong> {item.createdAt}
              </p>
              {isOwner && (
                <p className="text-yellow-500 font-semibold">
                  You are the owner of this product
                </p>
              )}
            </div>
          </div>

          {!isOwner && (
            <div className="mt-6">
              <div className="flex flex-col md:flex-row gap-3">
                <AddToCartButton item={item} />
                <button
                  onClick={handleBuyNow}
                  className="w-full bg-yellow-400 hover:bg-green-600 text-black py-2 rounded-lg text-lg transition"
                >
                  Checkout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bagian Seller */}
      {seller && (
        <div className="mt-2 md:w-2/6 w-full bg-white rounded-lg shadow p-4 md:p-6">
          <h2 className="text-sm font-semibold text-gray-800 mb-3 border-b pb-2">
            Seller Info
          </h2>

          <div className="flex flex-col items-center gap-3 text-center">
            <img
              src={seller.avatar}
              alt="Seller Avatar"
              className="w-16 h-16 rounded-full object-cover border"
            />

            <p className="text-lg font-bold">{seller.name}</p>
            <p className="text-sm text-gray-600">{seller.bio}</p>

            {/* Followers dan Following */}
            <div className="flex gap-6 mt-2 text-sm text-gray-700">
              <div>
                <span className="font-bold">{seller.followers}</span> Followers
              </div>
              <div>
                <span className="font-bold">{seller.following}</span> Following
              </div>
            </div>

            {/* Tombol Chat dan Follow */}
            <div className="flex gap-3 mt-4 w-full">
              <button
                // onClick={handleChat}
                className="w-1/2 text-gray-800 py-2 px-4 rounded-lg text-sm transition"
              >
                Chat
              </button>
              <button
                // onClick={handleFollow}
                className="w-1/2 bg-yellow-400 hover:bg-yellow-500 text-black py-2 px-4 rounded-lg text-sm font-semibold transition"
              >
                Follow
              </button>
              <button
                // onClick={handleFollow}
                className="w-1/2 text-black py-2 px-4 rounded-lg text-sm font-semibold transition"
              >
                Share
              </button>
            </div>
          </div>
        </div>
      )}

    </div>


      {/* About Product */}
      {item.about && (
        <div className="mt-2 bg-white p-4 md:p-6 rounded-xl shadow">
          <h2 className="md:text-xl text-lg my-text font-semibold text-gray-800 mb-2 border-b-2">About Product</h2>
          <p className="text-gray-700 leading-relaxed whitespace-pre-line">
            {item.about}
          </p>
        </div>
      )}

      {/* ⭐ Ulasan Pembeli */}
      <div className="mt-2 bg-white p-4 md:p-6 rounded-xl shadow">
        <h2 className="md:text-xl text-lg my-text font-semibold text-gray-800 mb-4">
          Buyer Review
        </h2>
        <div className="space-y-2">
        {(mockReviews[item.id] || []).map((review, index) => (
            <div key={index} className="bg-gray-50 p-2 rounded-lg border">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-semibold">{review.name}</h4>
                <span className="text-sm text-gray-400">{review.date}</span>
              </div>
              <div className="flex items-center text-yellow-500 mb-1">
                {[...Array(review.rating)].map((_, i) => (
                  <FaStar key={i} />
                ))}
              </div>
              <p className="text-gray-700">{review.review}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Other Items */}
      {otherItems.length > 0 && (
        <div className="mt-6 bg-white p-4 md:p-6 rounded-xl">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            More from this Seller
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-6 gap-4">
            {otherItems.map((p) => (
              <ItemCard key={p.id} item={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ItemDetail;
