// src/components/marketplace/CartView.jsx
import React, { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { API_URL } from "../../config/ApiUrl";
import { purchaseItems } from "../../services/purchaseService";

const CartView = () => {
  const { account, address, balance } = useAccount();

  const [cart, setCart] = useState([]);
  const [selected, setSelected] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(false);

  // Ambil cart user
  useEffect(() => {
    const fetchCart = async () => {
      if (!address) return;
      try {
        const res = await fetch(`${API_URL}/api/cart/${address}`);
        const data = await res.json();
        setCart(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error fetching cart:", err);
      }
    };
    fetchCart();
  }, [address]);

  // Toggle select item
  const toggleSelect = (cartItemId) => {
    setSelected((prev) =>
      prev.includes(cartItemId)
        ? prev.filter((id) => id !== cartItemId)
        : [...prev, cartItemId]
    );
  };

  // Update quantity
  const handleQuantityChange = (cartItemId, newQty) => {
    if (newQty < 1) return;
    setCart((prev) =>
      prev.map((c) => (c.id === cartItemId ? { ...c, quantity: newQty } : c))
    );
  };

  // Remove item
  const handleRemove = async (cartItemId) => {
    try {
      await fetch(`${API_URL}/api/cart/${cartItemId}`, { method: "DELETE" });
      setCart((prev) => prev.filter((c) => c.id !== cartItemId));
      setSelected((prev) => prev.filter((id) => id !== cartItemId));
    } catch (err) {
      console.error("Error removing item:", err);
    }
  };

  // Confirm purchase
  // Confirm purchase
  const confirmPurchase = async () => {
    if (!account || !address) return alert("Wallet not connected");
    if (selected.length === 0) return alert("No items selected!");

    const selectedItems = cart
      .filter((c) => selected.includes(c.id))
      .map((c) => ({
        id: c.id,
        itemId: c.Item?.id,
        quantity: c.quantity,
        price: c.Item?.price || 0,
        sellerAddress: c.Item?.Seller?.address || null,
      }));

    setLoading(true);
    try {
      // 1️⃣ Transfer SUPRA ke seller on-chain
      const txResult = await purchaseItems(account, address, selectedItems, balance * 1e8);
      if (!txResult.success || !txResult.txHashes?.length) throw new Error(txResult.error || "Tx failed");

      // 2️⃣ Simpan order ke backend dengan status completed
      for (const item of selectedItems) {
        const res = await fetch(`${API_URL}/api/order/create`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userAddress: address,  // buyer
            itemId: item.itemId,
            quantity: item.quantity,
            txHash: txResult.txHashes[0],
          }),
        });

        const data = await res.json();
        if (!res.ok) console.error("Failed to create order:", data);
      }

      alert("✅ Purchase success!");
      // Hapus item dari cart
      setCart((prev) => prev.filter((c) => !selected.includes(c.id)));
      setSelected([]);
    } catch (err) {
      console.error("Error purchasing:", err);
      alert(err.message || "Purchase failed");
    } finally {
      setShowPopup(false);
      setLoading(false);
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
                      <h4 className="font-semibold">
                        {item.title || "Unnamed item"}
                      </h4>
                      <p className="text-sm text-gray-500">
                        {item.price ?? 0} {item.paymentMethod || "USDC"}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <label className="text-xs text-gray-500">Qty:</label>
                        <input
                          type="number"
                          min="1"
                          value={cartItem.quantity || 1}
                          onChange={(e) =>
                            handleQuantityChange(
                              cartItem.id,
                              parseInt(e.target.value, 10)
                            )
                          }
                          className="w-16 border rounded px-2 py-1 text-sm"
                        />
                      </div>
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
              onClick={() => setShowPopup(true)}
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
                disabled={loading}
              >
                Cancel
              </button>
              <button
                onClick={confirmPurchase}
                className="px-4 py-2 bg-green-500 text-white rounded-lg"
                disabled={loading}
              >
                {loading ? "Processing..." : "Confirm"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartView;
