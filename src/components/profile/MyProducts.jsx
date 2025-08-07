import React from 'react';
import ItemCard from '../marketplace/ItemCard';

const MyProducts = ({ products }) => (
  <div className="relative -top-12 bg-white dark:bg-gray-900 rounded-xl p-4 mb-4 shadow border">
    <h3 className="text-lg font-semibold mb-2">📦 My Products</h3>
    {products.length === 0 ? (
      <p className="text-gray-500">You don't have any products listed.</p>
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
