import React from "react";
import { useNavigate } from "react-router-dom";
import AddToCartButton from "./AddToCartButton";
import mockUser from "../../data/mockUser";
import products from "../../data/mockProducts";
import ItemCard from "./ItemCard";

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

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Image */}
        <div className="md:w-1/2">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover rounded-lg shadow"
            loading="lazy"
          />
        </div>

        {/* Info */}
        <div className="md:w-1/2 flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">{item.name}</h1>
            <p className="text-gray-700 text-base">{item.description}</p>

            <div className="mt-4 flex items-center gap-2 text-yellow-500 text-xl">
              <span>{item.star}</span>
              <span className="text-sm text-gray-500">({item.rate})</span>
            </div>

            <div className="mt-6 space-y-2 text-sm text-gray-600">
              <div className="text-5xl font-bold text-yellow-500 mb-4">{item.price} USDC</div>
              <p><strong>Owner:</strong> {item.owner}</p>
              <p><strong>Category:</strong> {item.category}</p>
              <p><strong>Available:</strong> {item.available} items</p>
              <p><strong>Sold:</strong> {item.sales} items</p>
              <p><strong>Created:</strong> {item.createdAt}</p>
              {isOwner && (
                <p className="text-yellow-500 font-semibold">You are the owner of this product</p>
              )}
            </div>
          </div>

          {/* Price & Actions */}
          {!isOwner && (
            <div className="mt-6">
              <div className="flex gap-x-2">
                <AddToCartButton item={item} />
                <button
                  onClick={handleBuyNow}
                  className="w-full bg-yellow-400 hover:bg-green-700 text-black py-2 rounded-lg text-lg transition"
                >
                  Checkout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* About Product Section */}
      {item.about && (
        <div className="mt-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">About Product</h2>
          <p className="text-gray-700 leading-relaxed whitespace-pre-line">
            {item.about}
          </p>
        </div>
      )}

      {/* About Seller */}
      {seller && (
        <div className="mt-12 border-t pt-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">About Seller</h2>
          <div className="flex items-center gap-4">
            <img
              src={seller.avatar}
              alt="Seller Avatar"
              className="w-16 h-16 rounded-full object-cover border"
            />
            <div>
              <p className="text-lg font-bold">{seller.name}</p>
              <p className="text-sm text-gray-600">{seller.bio}</p>
            </div>
          </div>
        </div>
      )}

      {/* Other Items from Seller */}
      {otherItems.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">More from this Seller</h2>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4">
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
