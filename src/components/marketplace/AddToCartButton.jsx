import React from "react";
import { BsCartPlus } from "react-icons/bs";

const AddToCartButton = ({ item }) => {
  const handleAddToCart = () => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const exists = cart.find((i) => i.id === item.id);

    if (!exists) {
      cart.push({ ...item, quantity: 1 });
      localStorage.setItem("cart", JSON.stringify(cart));
      alert("Item added to cart!");
    } else {
      alert("Item already in cart.");
    }
  };

  return (
    <button
      onClick={handleAddToCart}
      className="flex items-center justify-center w-full gap-x-2 border border-red-200 hover:bg-red-100 text-black py-2 rounded-lg text-lg transition"
    >
      <BsCartPlus className="text-2xl" />
      Add to Cart
    </button>
  );
};

export default AddToCartButton;
