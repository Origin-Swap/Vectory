// src/components/Profile/ProductList.jsx
import React from "react";
import products from "../../data/mockProducts";
import mockUser from "../../data/mockUser";
import ItemCard from "../marketplace/ItemCard";

const ProductList = () => {
  const userWallet = mockUser.wallet;

  const userProducts = products.filter(
    (product) => product.owner === userWallet
  );

  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">📦 Your Products</h3>
      {userProducts.length === 0 ? (
        <p className="text-gray-500">You don't have any products listed.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-2">
          {userProducts.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;
