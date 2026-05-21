// src/components/marketplace/CreateItemForm.jsx
import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import { useNavigate } from "react-router-dom";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { API_URL } from "../../config/ApiUrl";
import { useAccount, useConnect } from "wagmi";
import { IoIosArrowRoundBack } from "react-icons/io";

const CreateItemForm = () => {
  const { address, isConnected, status } = useAccount();
  const { connect, connectors } = useConnect();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    shortDesc: "",
    about: "",
    price: "",
    quantity: "",
    category: "Ebook",
    paymentMethod: "SUPRA",
    link: "",
    imageFiles: [],
    imagePreviews: [],
  });
  const [loading, setLoading] = useState(false);

  // Debug: Cek status koneksi
  useEffect(() => {
    console.log("Wallet Status:", { address, isConnected, status });
  }, [address, isConnected, status]);

  const categories = [
    "Ebook",
    "Template",
    "Digital Art",
    "Course",
    "Music",
    "Signature",
    "Game Asset",
    "Other",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const previews = files.map((file) => URL.createObjectURL(file));
    setForm({ ...form, imageFiles: files, imagePreviews: previews });
  };

  const handleConnectWallet = async () => {
    try {
      // Coba connect ke connector pertama (biasanya MetaMask)
      await connect({ connector: connectors[0] });
    } catch (error) {
      console.error("Failed to connect:", error);
      alert("Failed to connect wallet. Please try again.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Cek status koneksi dengan lebih teliti
    if (status !== 'connected' || !address || !isConnected) {
      alert("Please connect your wallet first!");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("userAddress", address);
      formData.append("title", form.title);
      formData.append("shortDesc", form.shortDesc);
      formData.append("about", form.about);
      formData.append("price", form.price);
      formData.append("quantity", form.quantity);
      formData.append("category", form.category);
      formData.append("paymentMethod", form.paymentMethod);
      formData.append("link", form.link);

      form.imageFiles.forEach((file) => formData.append("images", file));

      await axios.post(`${API_URL}/api/items`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Item created successfully!");
      navigate(`/seller-board`);
    } catch (err) {
      console.error(err);
      alert("Failed to create item.");
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => navigate("/seller-board");

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 mt-16 max-w-2xl mx-auto space-y-4 bg-white rounded shadow"
    >
      <p onClick={handleBack} className="flex items-center gap-1 mt-2 mb-4 cursor-pointer">
        <IoIosArrowRoundBack className="w-6 h-6" /> Back To Market
      </p>

      <h2 className="text-xl font-bold">Create New Item</h2>

      {/* Upload Gambar */}
      <div>
        <label className="block font-medium mb-1">Upload Images</label>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageUpload}
          className="w-full"
        />
        {form.imagePreviews.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
            {form.imagePreviews.map((src, idx) => (
              <img
                key={idx}
                src={src}
                alt={`Preview ${idx + 1}`}
                className="w-full h-40 object-contain border rounded"
              />
            ))}
          </div>
        )}
      </div>

      {/* Title */}
      <div>
        <label className="block font-medium mb-1">Title</label>
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Enter item title"
          className="w-full border rounded p-2"
          required
        />
      </div>

      {/* Short Description */}
      <div>
        <label className="block font-medium mb-1">Short Description</label>
        <input
          type="text"
          name="shortDesc"
          value={form.shortDesc}
          onChange={handleChange}
          placeholder="Short description (max 100 chars)"
          maxLength={100}
          className="w-full border rounded p-2"
        />
      </div>

      {/* About Product */}
      <div>
        <label className="block font-medium mb-1">About Product</label>
        <ReactQuill
          theme="snow"
          value={form.about}
          onChange={(value) => setForm({ ...form, about: value })}
          className="bg-white"
          modules={{
            toolbar: [
              [{ header: [1, 2, false] }],
              ["bold", "italic", "underline"],
              [{ list: "ordered" }, { list: "bullet" }],
              ["link"],
              ["clean"],
            ],
          }}
        />
      </div>

      {/* Category */}
      <div>
        <label className="block font-medium mb-1">Category</label>
        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          className="w-full border rounded p-2"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Price */}
      <div>
        <label className="block font-medium mb-1">Price</label>
        <input
          type="number"
          name="price"
          value={form.price}
          onChange={handleChange}
          placeholder="e.g. 1.5"
          className="w-full border rounded p-2"
          step="0.01"
          min="0"
          required
        />
      </div>

      {/* Quantity */}
      <div>
        <label className="block font-medium mb-1">Quantity / Stock</label>
        <input
          type="number"
          name="quantity"
          value={form.quantity}
          onChange={handleChange}
          placeholder="Total available items"
          className="w-full border rounded p-2"
          min="1"
          required
        />
      </div>

      {/* Link Item */}
      <div>
        <label className="block font-medium mb-1">Link to Item / File</label>
        <input
          type="url"
          name="link"
          value={form.link}
          onChange={handleChange}
          placeholder="https://your-link.com/item"
          className="w-full border rounded p-2"
        />
      </div>

      {/* Payment Method */}
      <div>
        <label className="block font-medium mb-1">Payment Method</label>
        <div className="flex gap-x-6 mt-2">
          {["SUPRA", "KT", "USDC", "USDT"].map((method) => (
            <label key={method} className="flex items-center gap-x-1">
              <input
                type="radio"
                name="paymentMethod"
                value={method}
                checked={form.paymentMethod === method}
                onChange={handleChange}
              />
              {method}
            </label>
          ))}
        </div>
      </div>

      <div className="pt-4">
        {status !== 'connected' ? (
          <button
            type="button"
            onClick={handleConnectWallet}
            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
          >
            Connect Wallet
          </button>
        ) : (
          <button
            type="submit"
            disabled={loading}
            className={`bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Processing..." : "Create Item"}
          </button>
        )}
      </div>
    </form>
  );
};

export default CreateItemForm;
