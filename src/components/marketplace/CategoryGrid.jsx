import React from "react";

const categories = [
  { name: "All Product", icon: "/images/icons/all.webp" },
  { name: "Ebook", icon: "/images/icons/ebook.webp" },
  { name: "Template", icon: "/images/icons/template.webp" },
  { name: "Digital Art", icon: "/images/icons/digital-art.webp" },
  { name: "Course", icon: "/images/icons/course.webp" },
  { name: "Music", icon: "/images/icons/music.png" },
  { name: "Signature", icon: "/images/icons/signature.webp" },
  { name: "Game Asset", icon: "/images/icons/game-assets.webp" },
];


const CategoryGrid = ({ onSelectCategory, selectedCategory }) => {
  return (
    <div className="grid grid-cols-4 sm:grid-cols-8 gap-4 my-6">
    {categories.map((cat, index) => (
      <div
        key={index}
        onClick={() => onSelectCategory(cat.name)}
        className={`flex flex-col items-center  text-center text-sm cursor-pointer rounded-lg p-2 transition-all ${
          selectedCategory === cat.name ? "bg-yellow-200 text-black" : "hover:bg-gray-100"
        }`}
      >
        <img
          src={cat.icon}
          alt={cat.name}
          className="w-12 h-12 mb-2 object-contain"
          loading="lazy"
        />
        <span>{cat.name}</span>
      </div>
    ))}
    </div>
  );
};

export default CategoryGrid;
