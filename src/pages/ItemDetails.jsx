// 📁 pages/ItemDetails.jsx
import React from "react";
import { useParams } from "react-router-dom";
import ItemDetail from "../components/marketplace/ItemDetail";
import products from "../data/mockProducts";

const ItemDetails = () => {
  const { id } = useParams();
  const item = products.find((item) => item.id.toString() === id);

  return <ItemDetail item={item} />;
};

export default ItemDetails;
