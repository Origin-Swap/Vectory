import React from "react";
import { useAccountSupra } from "../../context/account";
import { API_URL } from "../../config/ApiUrl";

const AddToCartButton = ({ item, userAddress }) => {
  const { address } = useAccountSupra();

  const handleAddToCart = async () => {
    const finalAddress = userAddress || address;
    if (!finalAddress) {
      alert("Please connect your wallet first!");
      return;
    }

    try {
      const res = await fetch(`${API_URL}/api/cart/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userAddress: finalAddress,
          itemId: item.id,
          quantity: 1,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        alert("Item added to cart!");
      } else {
        alert(data.error || "Failed to add to cart");
      }
    } catch (err) {
      console.error("Error adding to cart:", err);
    }
  };

  return (
    <button
      onClick={handleAddToCart}
      className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg text-lg transition"
    >
      Add to Cart
    </button>
  );
};

export default AddToCartButton;
