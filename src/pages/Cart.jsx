import React, { useEffect, useState } from "react";
import { TiShoppingCart } from "react-icons/ti";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(stored);
  }, []);

  const handleSelect = (id) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
  };

  const removeFromCart = (id) => {
    const newCart = cartItems.filter((item) => item.id !== id);
    localStorage.setItem("cart", JSON.stringify(newCart));
    setCartItems(newCart);
    setSelectedItems((prev) => prev.filter((itemId) => itemId !== id));
  };

  const selectedProducts = cartItems.filter((item) => selectedItems.includes(item.id));
  const totalPrice = selectedProducts.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleCheckout = () => {
    alert("Checking out items:\n" + selectedProducts.map((i) => i.name).join(", "));
    // Tambahkan logika checkout Web3 di sini
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="flex text-xl items-center gap-x-2 font-bold mb-6">
        <TiShoppingCart className="text-3xl" />
        Your Cart
      </h1>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between border p-4 rounded shadow-sm"
            >
              <div className="flex items-center gap-x-4">
                <input
                  type="checkbox"
                  checked={selectedItems.includes(item.id)}
                  onChange={() => handleSelect(item.id)}
                  className="w-5 h-5"
                />
                <div className="h-16 w-16">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover rounded-lg shadow"
                    loading="lazy"
                  />
                </div>
                <div>
                  <h2 className="font-semibold">{item.name}</h2>
                  <p className="text-sm text-gray-500">{item.price} USDC</p>
                </div>
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 hover:underline text-sm"
              >
                Remove
              </button>
            </div>
          ))}

          <div className="border-t pt-4 mt-6 flex justify-between items-center">
            <span className="text-lg font-semibold">Total:</span>
            <span className="text-xl font-bold text-blue-600">
              {totalPrice.toFixed(2)} USDC
            </span>
          </div>

          <button
            onClick={handleCheckout}
            disabled={selectedItems.length === 0}
            className={`w-full mt-4 py-3 rounded-lg text-white ${
              selectedItems.length === 0
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
