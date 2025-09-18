// src/components/marketplace/AddToCartButton.jsx
import React, { useState } from "react";
import { API_URL } from "../../config/ApiUrl";

const AddToCartButton = ({ item, userAddress }) => {
  const [loading, setLoading] = useState(false);

  const handleAdd = async () => {
    if (!userAddress) {
      alert("Please connect your wallet first!");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/cart/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userAddress: userAddress, // pembeli
          itemId: item.id,     // produk
          quantity: 1,         // default, bisa ubah sesuai kebutuhan
        }),
      });

      const data = await res.json();
      if (res.ok) {
        alert("Item added to cart!");
      } else {
        alert(data.error || "Failed to add to cart");
      }
    } catch (err) {
      console.error("Error add to cart:", err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleAdd}
      disabled={loading}
      className={`w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-lg transition ${
        loading ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      {loading ? "Adding..." : "Add to Cart"}
    </button>
  );
};

export default AddToCartButton;
