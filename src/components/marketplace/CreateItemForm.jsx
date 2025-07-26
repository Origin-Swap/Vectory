import React, { useState } from "react";

const CreateItemForm = () => {
  const [form, setForm] = useState({
    title: "",
    shortDesc: "",
    about: "",
    price: "",
    quantity: "",
    category: "Ebook",
    paymentMethod: "BAY",
    imageFiles: [],
    imagePreviews: [],
  });

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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
    alert("Item created! (dummy)");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 max-w-2xl mx-auto space-y-4 bg-white rounded shadow"
    >
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
        <textarea
          name="about"
          value={form.about}
          onChange={handleChange}
          placeholder="Describe your product in detail"
          rows={4}
          className="w-full border rounded p-2"
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

      {/* Payment Method */}
      <div>
        <label className="block font-medium mb-1">Payment Method</label>
        <div className="flex gap-x-6 mt-2">
          {["BAY", "USDC", "USDT"].map((method) => (
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

      {/* Submit */}
      <div className="pt-4">
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          Create Item
        </button>
      </div>
    </form>
  );
};

export default CreateItemForm;
