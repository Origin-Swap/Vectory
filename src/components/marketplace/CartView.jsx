import React, { useEffect, useState } from "react";
import { useAccountSupra } from "../../context/account";

const CartView = () => {
  const { address } = useAccountSupra();
  const [cart, setCart] = useState([]);
  const [selected, setSelected] = useState([]); // item terpilih
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        if (!address) return;
        const res = await fetch(`http://localhost:5004/api/cart/${address}`);
        const data = await res.json();
        setCart(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error fetching cart:", err);
      }
    };
    fetchCart();
  }, [address]);

  const handleRemove = async (cartItemId) => {
    try {
      await fetch(`http://localhost:5004/api/cart/${cartItemId}`, {
        method: "DELETE",
      });
      setCart((prev) => prev.filter((c) => c.id !== cartItemId));
      setSelected((prev) => prev.filter((id) => id !== cartItemId));
    } catch (err) {
      console.error("Error removing item:", err);
    }
  };

  const toggleSelect = (cartItemId) => {
    setSelected((prev) =>
      prev.includes(cartItemId)
        ? prev.filter((id) => id !== cartItemId)
        : [...prev, cartItemId]
    );
  };

  const handlePurchase = () => {
    if (selected.length === 0) return alert("No items selected!");
    setShowPopup(true);
  };

  const confirmPurchase = async () => {
    try {
      // panggil API checkout
      const res = await fetch(`http://localhost:5004/api/cart/checkout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userAddress: address }),
      });
      const data = await res.json();
      if (res.ok) {
        alert("Purchase success!");
        setCart([]); // kosongkan cart
        setSelected([]);
      } else {
        alert(data.error || "Failed to purchase");
      }
    } catch (err) {
      console.error("Error purchasing:", err);
    } finally {
      setShowPopup(false);
    }
  };

  const getImageSrc = (cartItem) => {
    const item = cartItem?.Item || {};
    let images = item.images;
    if (typeof images === "string") {
      try {
        const parsed = JSON.parse(images);
        if (Array.isArray(parsed)) images = parsed;
      } catch (_) {}
    }
    if (Array.isArray(images) && images.length > 0) return images[0];
    if (typeof images === "string" && images.length > 0) return images;
    return "https://via.placeholder.com/150";
  };

  const total = cart
    .filter((c) => selected.includes(c.id))
    .reduce((sum, c) => sum + (c.Item?.price || 0) * c.quantity, 0);

  return (
    <div className="p-4 mt-14">
      <h2 className="text-xl my-text mb-4">Your Cart</h2>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul className="space-y-4">
            {cart.map((cartItem) => {
              const item = cartItem.Item || {};
              const imgSrc = getImageSrc(cartItem);

              return (
                <li key={cartItem.id} className="border-b pb-2">
                  <div className="flex justify-between items-center gap-4">
                    <input
                      type="checkbox"
                      checked={selected.includes(cartItem.id)}
                      onChange={() => toggleSelect(cartItem.id)}
                    />
                    <div className="h-16 w-16 bg-gray-100 flex items-center justify-center">
                      <img
                        src={imgSrc}
                        alt={item.title || "Product"}
                        className="w-full h-full object-cover rounded-lg shadow"
                      />
                    </div>

                    <div className="flex-1">
                      <h4 className="font-semibold">{item.title || "Unnamed item"}</h4>
                      <p className="text-sm text-gray-500">
                        {item.price ?? 0} {item.paymentMethod || "USDC"}
                      </p>
                      <p className="text-xs text-gray-400">
                        Qty: {cartItem.quantity || 1}
                      </p>
                    </div>

                    <button
                      onClick={() => handleRemove(cartItem.id)}
                      className="text-red-500 hover:text-red-600"
                    >
                      Remove
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>

          <div className="mt-6 flex justify-between items-center">
            <p className="font-semibold">
              Total: <span className="text-red-500">${total}</span>
            </p>
            <button
              onClick={handlePurchase}
              className="bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded-lg"
            >
              Purchase
            </button>
          </div>
        </>
      )}

      {/* Popup */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-lg font-bold mb-4">Confirm Purchase</h3>
            <p>You are about to purchase {selected.length} items.</p>
            <p className="mt-2">
              <strong>Total:</strong> ${total}
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setShowPopup(false)}
                className="px-4 py-2 border rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={confirmPurchase}
                className="px-4 py-2 bg-green-500 text-white rounded-lg"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartView;
