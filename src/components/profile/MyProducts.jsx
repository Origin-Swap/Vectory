import React from 'react';
import ItemCard from '../marketplace/ItemCard';
import { Link } from "react-router-dom";
import { MdAddShoppingCart } from "react-icons/md";

const MyProducts = ({ products }) => (
  <div className="relative -top-12 bg-white dark:bg-gray-900 rounded-xl p-4 mb-4 shadow border">
    <div className="flex justify-between items-center">
      <h3 className="text-lg font-semibold mb-2">📦 My Products</h3>
      <Link to={`/create-items`} className="flex gap-x-2 items-center text-md">
        <MdAddShoppingCart />Add
      </Link>
    </div>

    {(!products || products.length === 0) ? (
      <div className="flex justify-center items-center h-32">
        <p className="text-gray-500 text-center text-sm">
          🚫 No product found
        </p>
      </div>
    ) : (
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-5 gap-4">
        {products.map((item) => (
          <ItemCard key={item.id} item={item} />
        ))}
      </div>
    )}
  </div>
);

export default MyProducts;
